import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { openai } from "@/lib/ai/openai";
import { getUserVoiceProfile } from "@/lib/db/queries/voice-profiles";
import {
  createMultipleCaptions,
  getUserCaptions,
} from "@/lib/db/queries/captions";
import { prisma } from "@/lib/db/prisma";
import { subscriptionPlans } from "@/config/plans";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      contentInput,
      contextData,
      selectedContextItems,
      options,
      parentGenerationBatchId,
    } = body;

    if (!contentInput || contentInput.trim() === "") {
      return NextResponse.json(
        { error: "Content input is required" },
        { status: 400 }
      );
    }

    // Check subscription and usage limits
    let subscription = await prisma.subscription.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    // Check if billing period has ended and reset if needed
    const now = new Date();
    if (subscription && now > subscription.currentPeriodEnd) {
      // Reset counter and move to next period
      const nextPeriodEnd = new Date(subscription.currentPeriodEnd);
      nextPeriodEnd.setDate(nextPeriodEnd.getDate() + 30);

      subscription = await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          generationsUsed: 0,
          currentPeriodEnd: nextPeriodEnd,
        },
      });
    }

    const plan = subscription?.plan || "free";
    const planConfig =
      subscriptionPlans[plan as keyof typeof subscriptionPlans];
    const generationsLimit = planConfig?.limits.captionsPerMonth || 10;
    const variationsLimit = planConfig?.limits.variationsPerGeneration || 5;

    // If this is a variation (has parentGenerationBatchId), check variation limits
    if (parentGenerationBatchId) {
      // Count how many variations have been generated from this parent batch
      // Using raw query for now until Prisma types are updated
      const variationCount = await prisma.$queryRaw<
        Array<{ generationBatchId: string }>
      >`
        SELECT DISTINCT "generationBatchId"
        FROM captions
        WHERE "userId" = ${user.id}::uuid
          AND "parentGenerationBatchId" = ${parentGenerationBatchId}
          AND "generationBatchId" IS NOT NULL
      `;

      const variationsUsed = variationCount.length;

      // Check variation limit (unlimited is -1)
      if (variationsLimit !== -1 && variationsUsed >= variationsLimit) {
        return NextResponse.json(
          {
            error: "Variation limit exceeded",
            message: `You've reached your limit of ${variationsLimit} variations per generation. Upgrade to ${
              plan === "free" ? "Pro" : "Enterprise"
            } for more variations.`,
            variationLimitReached: true,
            variations: {
              used: variationsUsed,
              limit: variationsLimit,
            },
            requiredPlan: plan === "free" ? "pro" : "enterprise",
          },
          { status: 429 }
        );
      }
    } else {
      // This is a new generation (not a variation), check generation limits
      // For unlimited plans, skip the limit check
      if (generationsLimit !== -1) {
        const generationsUsed = subscription?.generationsUsed || 0;
        const currentPeriodEnd = subscription?.currentPeriodEnd || new Date();

        // Check if user has exceeded their limit
        if (generationsUsed >= generationsLimit) {
          return NextResponse.json(
            {
              error: "Usage limit exceeded",
              message: "You've reached your generation limit for this period",
              limitReached: true,
              usage: {
                used: generationsUsed,
                limit: generationsLimit,
                resetDate: currentPeriodEnd,
              },
            },
            { status: 429 }
          );
        }
      }
    }

    // Fetch user's voice profile
    const voiceProfile = await getUserVoiceProfile(user.id);

    // Build context information
    let contextInfo = "";
    let hasImage = false;
    let imageBase64 = null;

    if (selectedContextItems && selectedContextItems.length > 0) {
      const contextParts = [];
      if (
        selectedContextItems.includes("product-link") &&
        contextData?.productLink
      ) {
        contextParts.push(`Product link: ${contextData.productLink}`);
      }
      if (
        selectedContextItems.includes("upload-image") &&
        contextData?.imageBase64
      ) {
        hasImage = true;
        imageBase64 = contextData.imageBase64;
        contextParts.push(
          `Image: The user has uploaded an image. Analyze it and incorporate what you see into the captions.`
        );
      }
      if (
        selectedContextItems.includes("previous-post") &&
        contextData?.selectedPreviousPost
      ) {
        contextParts.push(`Related to: ${contextData.selectedPreviousPost}`);
      }
      if (contextParts.length > 0) {
        contextInfo = "\n\nAdditional context:\n" + contextParts.join("\n");
      }
    }

    // Build the AI prompt based on voice profile and options
    const systemPrompt = buildSystemPrompt(voiceProfile, options);
    const userPrompt = buildUserPrompt(
      contentInput,
      contextInfo,
      options,
      variationsLimit
    );

    // Build messages array - include image if present
    const messages: any[] = [{ role: "system", content: systemPrompt }];

    if (hasImage && imageBase64) {
      // Use vision capabilities when image is present
      // Using "low" detail mode for social media captions (85 tokens vs ~3,500)
      // This is perfect for caption generation - we don't need to analyze tiny details
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: userPrompt,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
              detail: "low", // Reduces tokens from ~3,500 to 85
            },
          },
        ],
      });
    } else {
      // Text-only when no image
      messages.push({
        role: "user",
        content: userPrompt,
      });
    }

    // Generate captions using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: voiceProfile?.voiceStrength
        ? (100 - voiceProfile.voiceStrength) / 100
        : 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from AI");
    }

    // Parse the response to extract individual captions
    const captions = parseGeneratedCaptions(response, variationsLimit);

    // Determine platform
    const platform = voiceProfile?.platform?.name?.toLowerCase() || "instagram";

    // Generate a unique batch ID for this generation request
    const generationBatchId = `gen_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    // Save captions to database with metadata
    const captionInputs = captions.map((caption, index) => {
      const style = determineCaptionStyle(caption, index);
      const metadata = getCaptionMetadata(caption);

      return {
        userId: user.id,
        content: caption,
        context: JSON.stringify({
          contentInput,
          contextData,
          selectedContextItems,
          options,
        }),
        voiceProfile: voiceProfile?.id,
        platform,
        style,
        metadata,
        generationBatchId, // Group all captions from this request
        parentGenerationBatchId: parentGenerationBatchId || null, // Link to original if this is a variation
      };
    });

    await createMultipleCaptions(captionInputs);

    // Increment generation counter
    if (subscription) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          generationsUsed: {
            increment: 1,
          },
        },
      });
    }

    // Fetch the saved captions to get their IDs
    const captionsWithIds = await getUserCaptions(user.id, captions.length);

    return NextResponse.json({
      success: true,
      captions,
      captionIds: captionsWithIds.map((c: any) => c.id),
      captionsData: captionsWithIds.map((c: any) => ({
        id: c.id,
        content: c.content,
        isSaved: c.isSaved || false,
      })),
      platform: voiceProfile?.platform?.name || "Instagram",
      generationBatchId, // Return batch ID so frontend can track it for variations
    });
  } catch (error) {
    console.error("Caption generation error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate caption";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function buildSystemPrompt(voiceProfile: any, options: any): string {
  let prompt = `You are an expert social media caption writer. Your task is to generate engaging, authentic captions that drive engagement.`;

  if (voiceProfile) {
    const { tone, platform, stylePreferences, examples } = voiceProfile;

    if (tone) {
      prompt += `\n\nBrand Tone: ${tone.name} - ${tone.description}`;
    }

    if (platform) {
      prompt += `\n\nTarget Platform: ${platform.name}`;
    }

    if (stylePreferences) {
      const prefs =
        typeof stylePreferences === "string"
          ? JSON.parse(stylePreferences)
          : stylePreferences;

      prompt += `\n\nStyle Preferences:`;
      if (prefs.useQuestions) prompt += `\n- Include engaging questions`;
      if (prefs.includeEmojis) prompt += `\n- Use relevant emojis naturally`;
      if (prefs.includeCTA) prompt += `\n- Include clear calls-to-action`;
    }

    if (examples && examples.length > 0) {
      prompt += `\n\nExample captions in the user's voice:\n${examples
        .slice(0, 3)
        .map((ex: string, i: number) => `${i + 1}. ${ex}`)
        .join("\n")}`;
      prompt += `\n\nMirror this tone, style, and voice in the generated captions.`;
    }
  }

  return prompt;
}

function buildUserPrompt(
  contentInput: string,
  contextInfo: string,
  options: any,
  captionCount: number = 5
): string {
  let prompt = `Generate ${captionCount} unique, engaging captions for the following content:\n\n${contentInput}${contextInfo}`;

  if (options) {
    prompt += `\n\nRequirements:`;

    if (options.captionLength) {
      const lengthGuide = {
        short: "50-100 characters",
        medium: "100-200 characters",
        long: "200-400 characters",
      };
      prompt += `\n- Length: ${
        lengthGuide[options.captionLength as keyof typeof lengthGuide] ||
        "Medium (100-200 characters)"
      }`;
    }

    if (options.emojiStyle) {
      const emojiGuide = {
        none: "No emojis",
        minimal: "Use 1-2 emojis",
        moderate: "Use 3-5 emojis",
        expressive: "Use 5+ emojis naturally",
      };
      prompt += `\n- Emoji style: ${
        emojiGuide[options.emojiStyle as keyof typeof emojiGuide] || "Moderate"
      }`;
    }

    if (options.cta && options.cta !== "none") {
      if (options.cta === "custom" && options.customCta) {
        prompt += `\n- Include this CTA before any hashtags: "${options.customCta}"`;
      } else {
        const ctaGuide: Record<string, string> = {
          "link-in-bio":
            "a creative call-to-action directing users to check the link in bio (avoid generic phrases, make it contextual and engaging)",
          "shop-now":
            "a creative call-to-action encouraging users to shop or make a purchase (make it natural and compelling)",
          "dm-me":
            "a creative call-to-action inviting users to send a direct message (make it conversational and welcoming)",
          "comment-below":
            "a creative call-to-action encouraging users to comment (make it engaging and specific to the content)",
        };
        prompt += `\n- Include ${
          ctaGuide[options.cta] || "a creative call-to-action"
        } before any hashtags`;
      }
    }

    if (options.hashtagCount > 0) {
      prompt += `\n- Include ${options.hashtagCount} relevant hashtags at the end of the caption`;
    }
  }

  const styles = [
    "Hook-first (start with an attention-grabbing question or statement)",
    "Story-driven (tell a brief story or share an experience)",
    "Direct & actionable (clear, straightforward message)",
    "Question-based (engage with a thought-provoking question)",
    "Inspirational (motivational and uplifting)",
    "Emotional & relatable (connect on a personal level)",
    "Educational (teach something valuable)",
    "Behind-the-scenes (give an insider perspective)",
    "Humorous & playful (light and fun)",
    "Controversial/Bold (challenge conventional thinking)",
  ];

  prompt += `\n\nGenerate ${captionCount} diverse captions with different styles:\n`;
  for (let i = 0; i < captionCount; i++) {
    prompt += `${i + 1}. ${styles[i] || styles[i % styles.length]}\n`;
  }

  prompt += `\nIMPORTANT: Structure each caption in this order:
1. Main content/message
2. Call-to-action (if specified)
3. Hashtags (if specified)

Format: Return ONLY the ${captionCount} captions, each on a new line, separated by "---"`;

  return prompt;
}

function parseGeneratedCaptions(
  response: string,
  expectedCount: number = 5
): string[] {
  // Try to split by --- first
  let captions = response
    .split("---")
    .map((c) => c.trim())
    .filter((c) => c.length > 0);

  // If that doesn't work, try splitting by numbered list
  if (captions.length < 2) {
    captions = response
      .split(/\d+\.\s+/)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
  }

  // If still not enough, try splitting by double newlines
  if (captions.length < 2) {
    captions = response
      .split("\n\n")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
  }

  // Ensure we have the expected number of captions
  if (captions.length > expectedCount) {
    captions = captions.slice(0, expectedCount);
  } else if (captions.length < expectedCount) {
    // If we have fewer than expected, duplicate some with slight variations
    while (captions.length < expectedCount && captions.length > 0) {
      captions.push(captions[captions.length - 1]);
    }
  }

  return captions;
}

function determineCaptionStyle(caption: string, index: number): string {
  // Map index to intended style from our prompt (expanded for Pro/Enterprise plans)
  const styles = [
    "Hook-first",
    "Story-driven",
    "Direct",
    "Question-based",
    "Inspirational",
    "Emotional",
    "Educational",
    "Behind-the-scenes",
    "Humorous",
    "Bold",
  ];

  // Also check content to determine style
  const lowerCaption = caption.toLowerCase();

  if (
    caption.startsWith("?") ||
    lowerCaption.includes("have you") ||
    lowerCaption.includes("did you know")
  ) {
    return "Question-based";
  } else if (
    lowerCaption.includes("story") ||
    lowerCaption.includes("journey") ||
    lowerCaption.includes("experience")
  ) {
    return "Story-driven";
  } else if (lowerCaption.includes("tip") || lowerCaption.includes("how to")) {
    return "Educational";
  } else if (lowerCaption.includes("behind") || lowerCaption.includes("bts")) {
    return "Behind the Scenes";
  } else if (
    caption.split("\n").filter((line) => line.trim().match(/^\d+\./)).length > 2
  ) {
    return "Listicle";
  }

  return styles[index % styles.length] || "Engagement";
}

function getCaptionMetadata(caption: string) {
  const length = caption.length;
  const isQuestion = caption.includes("?");
  const isStory =
    caption.toLowerCase().includes("story") ||
    caption.toLowerCase().includes("journey") ||
    caption.toLowerCase().includes("experience");
  const isDirect =
    caption.includes("!") ||
    caption.toLowerCase().includes("now") ||
    caption.toLowerCase().includes("today");

  let lengthCategory: "short" | "medium" | "long";
  if (length < 100) lengthCategory = "short";
  else if (length < 200) lengthCategory = "medium";
  else lengthCategory = "long";

  let styleType: "hook-first" | "story-driven" | "cta-focused";
  if (
    caption.startsWith("Did you know") ||
    caption.startsWith("Have you ever") ||
    isQuestion
  ) {
    styleType = "hook-first";
  } else if (isStory) {
    styleType = "story-driven";
  } else {
    styleType = "cta-focused";
  }

  let engagementScore: "high" | "medium" | "low";
  if (isQuestion && length > 50 && length < 150) {
    engagementScore = "high";
  } else if (isStory || isDirect) {
    engagementScore = "medium";
  } else {
    engagementScore = "low";
  }

  return {
    length: lengthCategory,
    style: styleType,
    engagementScore,
    isQuestion,
    isStory,
    isDirect,
  };
}

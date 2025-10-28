import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/prisma";
import { openai } from "@/lib/ai/openai";

/**
 * Generate an AI-powered voice preview based on user's training samples
 * This provides an authentic preview of how captions will actually be generated
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      platformName,
      toneName,
      contentTypeName,
      voiceStrength,
      stylePreferences,
    } = await request.json();

    // Fetch user's voice profile with training samples
    const voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
      select: {
        examples: true,
        style: true,
      },
    });

    if (!voiceProfile || voiceProfile.examples.length === 0) {
      return NextResponse.json(
        {
          error:
            "No training samples found. Please upload samples in the Voice Training tab first.",
        },
        { status: 400 }
      );
    }

    // Build the AI prompt based on user settings
    const trainingExamples = voiceProfile.examples.join("\n\n");
    const styleInstructions = buildStyleInstructions(
      stylePreferences,
      voiceStrength
    );

    const systemPrompt = `You are a social media caption writer. Analyze the user's writing style from their training samples and generate a caption that matches their voice.

Training Samples:
${trainingExamples}

Platform: ${platformName}
Tone: ${toneName}
Content Type: ${contentTypeName || "General"}
Voice Strength: ${voiceStrength}% (${
      voiceStrength < 40
        ? "More creative and varied"
        : voiceStrength < 70
        ? "Balanced approach"
        : "Strictly match training samples"
    })

${styleInstructions}

Generate a single caption that demonstrates how the AI will write in this user's voice. Make it feel authentic and natural. Do not include any explanations or meta-commentary, just the caption itself.`;

    const userPrompt = `Generate a sample ${
      contentTypeName || "general"
    } caption for ${platformName} in a ${toneName.toLowerCase()} tone.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: voiceStrength < 40 ? 0.9 : voiceStrength < 70 ? 0.7 : 0.5,
      max_tokens: 300,
    });

    const generatedCaption = completion.choices[0]?.message?.content?.trim();

    if (!generatedCaption) {
      return NextResponse.json(
        { error: "Failed to generate preview" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      preview: generatedCaption,
      tokensUsed: completion.usage?.total_tokens || 0,
    });
  } catch (error) {
    console.error("Error generating AI preview:", error);
    return NextResponse.json(
      { error: "Failed to generate AI preview" },
      { status: 500 }
    );
  }
}

/**
 * Build style instructions based on user preferences
 */
function buildStyleInstructions(
  stylePreferences: {
    useQuestions: boolean;
    includeEmojis: boolean;
    includeCTA: boolean;
  },
  voiceStrength: number
): string {
  const instructions: string[] = [];

  if (stylePreferences.includeEmojis) {
    instructions.push("- Include relevant emojis naturally");
  } else {
    instructions.push("- Do NOT use any emojis");
  }

  if (stylePreferences.useQuestions) {
    instructions.push("- End with an engaging question to prompt interaction");
  } else {
    instructions.push("- Do NOT end with a question");
  }

  if (stylePreferences.includeCTA) {
    instructions.push(
      "- Include a clear call-to-action (e.g., comment, share, engage)"
    );
  } else {
    instructions.push("- Do NOT include a call-to-action");
  }

  return `Style Preferences:\n${instructions.join("\n")}`;
}

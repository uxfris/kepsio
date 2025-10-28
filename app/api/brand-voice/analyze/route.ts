import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { openai } from "@/lib/ai/openai";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's voice profile with training samples
    const voiceProfile = await prisma.voiceProfile.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
        examples: true,
      },
    });

    if (!voiceProfile) {
      return NextResponse.json(
        { error: "Voice profile not found" },
        { status: 404 }
      );
    }

    // Check if there are enough samples to analyze
    const MIN_SAMPLES = 3;
    if (voiceProfile.examples.length < MIN_SAMPLES) {
      return NextResponse.json(
        {
          error: "Not enough training samples",
          message: `You need at least ${MIN_SAMPLES} training samples to analyze your voice.`,
        },
        { status: 400 }
      );
    }

    // Prepare the training samples for analysis
    const samplesText = voiceProfile.examples
      .map((example, index) => `${index + 1}. ${example}`)
      .join("\n\n");

    // Call OpenAI to analyze the writing style
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert at analyzing writing styles and brand voices for social media captions. Your analysis will be used to help users understand their unique writing style and generate on-brand content.

Analyze the provided captions carefully and extract specific, actionable insights about the writing style.`,
        },
        {
          role: "user",
          content: `Analyze these social media captions and provide detailed insights about the writing style:

${samplesText}

Return a JSON object with the following structure and guidelines:

{
  "tone": "A clear, concise description of the overall tone (e.g., 'Friendly and professional with motivational undertones')",
  
  "topPhrases": ["3-5 most commonly used phrases or expressions that appear in the captions, exactly as they appear"],
  
  "emojiUsage": "Specific pattern like 'Moderate (2-3 per caption)' or 'Heavy (5+ per caption)' or 'Minimal (1-2 occasionally)' or 'None detected'",
  
  "avgLength": "Specific range like '120-150 characters' or 'Short (50-80 characters)' or 'Long (200+ characters)'",
  
  "questionFrequency": "Percentage with context like '60% of captions' or 'Rarely used' or 'Frequently (in 70% of posts)'",
  
  "ctaStyle": "Brief description like 'Conversational asks' or 'Direct action prompts' or 'Soft engagement invitations'",
  
  "keyThemes": ["2-4 main topics or themes found in the captions"],
  
  "sentenceStructure": "One sentence describing patterns like 'Short, punchy sentences' or 'Mix of short and long sentences with storytelling'",
  
  "vocabularyStyle": "One sentence like 'Accessible and conversational' or 'Professional with industry terms' or 'Casual with slang'",
  
  "uniqueCharacteristics": "One compelling sentence describing what makes this voice distinctive and memorable"
}

Important formatting rules:
- For emojiUsage: Use format "Frequency (X per caption)" or descriptive terms
- For avgLength: Always include numbers in characters like "X-Y characters"
- For questionFrequency: Include percentage like "X% of captions" when present
- For topPhrases: Extract exact phrases as they appear, 3-5 phrases maximum
- For keyThemes: Keep to 2-4 themes maximum
- Be specific and concise - this will be displayed to users`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const analysisContent = completion.choices[0]?.message?.content;
    if (!analysisContent) {
      throw new Error("No analysis returned from OpenAI");
    }

    // Parse the analysis
    const analysis = JSON.parse(analysisContent);

    // Store the analysis in the voice profile
    await prisma.voiceProfile.update({
      where: { id: voiceProfile.id },
      data: {
        style: JSON.stringify(analysis),
      },
    });

    return NextResponse.json({
      success: true,
      analysis,
      message: "Voice analysis completed successfully",
    });
  } catch (error) {
    console.error("Error analyzing voice:", error);

    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "OpenAI API configuration error" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to analyze voice" },
      { status: 500 }
    );
  }
}

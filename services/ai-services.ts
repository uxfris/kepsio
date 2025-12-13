// services/ai-services.ts
import { openai } from "@/lib/openai";
import { AI_MODELS } from "@/config/ai";
import { CaptionForm } from "@/types";
import { buildCaptionPrompt } from "./prompt-builders/caption-prompt";

export async function generateResponse(form: CaptionForm) {
    const prompt = buildCaptionPrompt(form);

    const response = await openai.responses.create({
        model: AI_MODELS.fast,
        input: prompt,
    });

    const text = response.output_text;

    if (!text) {
        throw new Error("No output_text returned from OpenAI");
    }

    let captions;
    try {
        captions = JSON.parse(text);
    } catch (e) {
        console.error("Raw model output:", text);
        throw new Error("Failed to parse AI response as JSON");
    }

    return captions;
}


// export async function generateStreamingResponse(message: string) {
//     return await openai.responses.create({
//         model: AI_MODELS.fast,
//         input: message,
//         stream: true,
//     });
// }

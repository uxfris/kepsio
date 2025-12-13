// services/ai-services.ts
import { openai } from "@/lib/openai";
import { AI_MODELS } from "@/config/ai";
import { CaptionForm } from "@/types";
import { buildCaptionPrompt } from "./prompt-builders/caption-prompt";

export async function generateResponse(form: CaptionForm) {
    console.log(form);

    const prompt = buildCaptionPrompt(form);

    let input: any = prompt;
    let model = AI_MODELS.fast;

    if (form.imageBase64) {
        model = AI_MODELS.vision;
        // Responses API requires explicit 'type: message' for input items
        input = [
            {
                type: "message",
                role: "user",
                content: [
                    { type: "input_text", text: prompt },
                    {
                        type: "input_image",
                        image_url: form.imageBase64,
                    },
                ],
            },
        ];
        console.log("DEBUG: imageBase64 type:", typeof form.imageBase64);
        console.log("DEBUG: Payload:", JSON.stringify(input, null, 2));
    }

    let response;
    try {
        response = await openai.responses.create({
            model,
            input,
            tools: form.productLink ? [{ type: "web_search" }] : undefined,
        });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw error;
    }

    const text = response.output_text;

    if (!text) {
        throw new Error("No output_text returned from OpenAI");
    }

    // Clean up markdown code blocks if present
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();

    let captions;
    try {
        captions = JSON.parse(cleanedText);
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

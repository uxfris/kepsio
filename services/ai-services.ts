import { openai } from "@/lib/openai";
import { AI_MODELS } from "../config/ai";

export async function generateChatResponse(message: string) {
    return await openai.responses.create({
        model: AI_MODELS.fast,
        input: message,
    });
}

export async function generateStreamingResponse(message: string) {
    return await openai.responses.create({
        model: AI_MODELS.fast,
        input: message,
        stream: true,
    });
}

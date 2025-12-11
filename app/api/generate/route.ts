import { openai } from "@/lib/openai";
import { generateChatResponse } from "@/services/ai-services";


export async function POST(req: Request) {
    const { message } = await req.json();

    const response = await generateChatResponse(message);

    console.log(response.output_text);

    return Response.json({
        reply: response.output_text
    })
}
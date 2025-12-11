import { openai } from "@/lib/openai";
import { generateChatResponse } from "@/services/ai-services";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export async function POST(req: Request) {
    const form = await req.json();

    console.log(form);

    await delay(5000)


    // const response = await generateChatResponse(message);

    // console.log(response.output_text);

    return Response.json({
        reply: form
    })
    // return Response.json({
    //     reply: response.output_text
    // })
}
import { generateResponse } from "@/services/openai/ai-services";
import { CaptionForm } from "@/types";
import { saveGeneratedCaptions } from "@/services/prisma/prisma-services";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";





export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const form = await req.json() as CaptionForm;

    const captions = await generateResponse(form);

    const savedCaptions = await saveGeneratedCaptions(session.user.id, form.platform, captions);

    const responseCaptions = savedCaptions.map(c => ({
        ...c,
        text: c.content
    }));


    return Response.json(responseCaptions)
}
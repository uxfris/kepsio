import { generateResponse } from "@/services/ai-services";
import { CaptionForm } from "@/types";
import { randomUUID } from "crypto";


export async function POST(req: Request) {
    const form = await req.json() as CaptionForm;

    const captions = await generateResponse(form);

    console.log(captions);


    const captionsWithIDs = captions.map((c: any) => ({
        id: randomUUID(),
        platform: form.platform,
        ...c,
    }));


    return Response.json(captionsWithIDs)
}
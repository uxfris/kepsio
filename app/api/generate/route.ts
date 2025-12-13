import { generateResponse } from "@/services/ai-services";
import { CaptionForm } from "@/types";
import { randomUUID } from "crypto";


function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


export async function POST(req: Request) {
    // const form = await req.json() as CaptionForm;

    // const captions = await generateResponse(form);

    // console.log(captions);


    // const captionsWithIDs = captions.map((c: any) => ({
    //     id: randomUUID(),
    //     platform: form.platform,
    //     ...c,
    // }));


    // return Response.json(captionsWithIDs)

    await delay(2000);

    return Response.json([
        {
            localId: 1,
            isTopPick: true,
            isHighPotential: true,
            text: '🚀 What a night! Don’t miss the highlights from our epic event. DM me to get exclusive insights! 👀 #EventRecap #Networking #Success',
            length: 'Short',
            style: 'Hook-first'
        },
        {
            localId: 2,
            isTopPick: false,
            isHighPotential: true,
            text: 'Did you catch all the game-changing moments from our event? 🤔 Hit my DMs for the full scoop! 🌟 #EventRecap #Growth #Inspiration',
            length: 'Short',
            style: 'Question-based'
        },
        {
            localId: 3,
            isTopPick: false,
            isHighPotential: false,
            text: 'From unforgettable keynotes to powerful connections, this event had it all. DM me to relive the best moments! 🔥 #EventRecap #Community #Leadership',
            length: 'Short',
            style: 'CTA-focused'
        },
        {
            localId: 4,
            isTopPick: false,
            isHighPotential: false,
            text: 'The excitement, the insights, the energy — our event was a journey to remember. Swipe through the highlights and DM me for more exclusive content! 🌟🔥🎉 #EventRecap #Motivation #Networking',
            length: 'Long',
            style: 'Story-driven'
        },
        {
            localId: 5,
            isTopPick: false,
            isHighPotential: false,
            text: 'Relive the magic of the event and discover why everyone is talking about it. Want the inside track? DM me now! ✨💬🙌 #EventRecap #Innovation #Connect',
            length: 'Long',
            style: 'CTA-focused'
        }
    ])

}
import { generateResponse } from "@/services/ai-services";
import { CaptionForm } from "@/types";
import { randomUUID } from "crypto";


function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


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

    //for tesing
    await delay(2000);

    // return Response.json([
    //     {
    //         localId: 1,
    //         isTopPick: true,
    //         isHighPotential: false,
    //         text: '🚀 Ready to revolutionize UX? Our AI UX Reviewer just launched and spots issues faster than ever! But don’t wait—early access is limited and spots are filling up quickly! Comment "UX" NOW to claim your priority pass and transform your design process today! 💡✨ #AIUXReviewer #ProductLaunch #UXDesign #UserExperience #EarlyAccess #SaaSLaunch #TechInnovation #DesignTools #UXOptimization #LimitedOffer',
    //         length: 'Long',
    //         style: 'Hook-first'
    //     },
    //     {
    //         localId: 2,
    //         isTopPick: false,
    //         isHighPotential: true,
    //         text: `What if you could instantly improve your design feedback with just one tool? Our AI UX Reviewer is here, but hurry—early access spots are vanishing fast! Comment "UX" below to grab yours before it's too late! ⏳ #AIUXReviewer #UXTools #DesignThinking #SaaS #TechLaunch #ProductivityBoost #EarlyAccess #UserExperience #Innovation #LimitedSeats`,
    //         length: 'Long',
    //         style: 'Question-based'
    //     },
    //     {
    //         localId: 3,
    //         isTopPick: false,
    //         isHighPotential: true,
    //         text: 'The wait is over! Say hello to AI UX Reviewer—the future of UX optimization. We’re opening early access, but only for a short time! Don’t miss your chance to get ahead. Comment "UX" NOW to unlock exclusive access and watch your designs shine! 🚀🔍 #UXReview #AIInnovation #SaaSLaunch #DesignTools #EarlyAccess #UserExperience #UXDesigners #TechTrends #ProductLaunch #LimitedTime',
    //         length: 'Long',
    //         style: 'Story-driven'
    //     },
    //     {
    //         localId: 4,
    //         isTopPick: false,
    //         isHighPotential: false,
    //         text: 'Time’s ticking! ⏰ Comment "UX" to get early access to the AI UX Reviewer before it’s gone. Don’t miss out! #AIUXReviewer #ProductLaunch #UXDesign #EarlyAccess #SaaS #Innovation #TechTools #UserExperience #UXOptimization #LimitedOffer',
    //         length: 'Short',
    //         style: 'CTA-focused'
    //     },
    //     {
    //         localId: 5,
    //         isTopPick: false,
    //         isHighPotential: false,
    //         text: '🚨 Early access to AI UX Reviewer is almost full! Comment "UX" to secure your spot and make your design reviews smarter and faster—act fast! 🚨 #UXTools #SaaSLaunch #Productivity #AIUXReviewer #TechInnovation #UserExperience #DesignProcess #EarlyAccess #UXDesign #LimitedSeats',
    //         length: 'Short',
    //         style: 'Hook-first'
    //     }
    // ])

}
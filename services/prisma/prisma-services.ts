import prisma from "@/lib/prisma";

export async function saveGeneratedCaptions(
    userId: string,
    platform: string,
    captions: any[]
) {
    return await prisma.$transaction(
        captions.map((caption) =>
            prisma.generatedCaption.create({
                data: {
                    userId,
                    platform,
                    content: caption.text,
                    length: caption.length,
                    style: caption.style,
                    isTopPick: caption.isTopPick ?? false,
                    isHighPotential: caption.isHighPotential ?? false,
                },
            })
        )
    );
}

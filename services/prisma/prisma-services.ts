import prisma from "@/lib/prisma";

export async function saveGeneratedCaptions(
    userId: string,
    platform: string,
    captions: any[]
) {
    return await prisma.$transaction(async (tx) => {
        const promises = captions.map((caption) =>
            tx.generatedCaption.create({
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
        );
        return await Promise.all(promises);
    }, {
        maxWait: 10000,
        timeout: 20000,
    });
}

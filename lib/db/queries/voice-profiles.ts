import { prisma } from "../prisma";

export async function getUserVoiceProfile(userId: string) {
  return await prisma.voiceProfile.findFirst({
    where: { userId },
    include: {
      platform: true,
      tone: true,
    },
  });
}

export async function getVoiceProfileWithExamples(userId: string) {
  const voiceProfile = await prisma.voiceProfile.findFirst({
    where: { userId },
    include: {
      platform: true,
      tone: true,
    },
  });

  if (!voiceProfile) {
    return null;
  }

  return {
    ...voiceProfile,
    examples: voiceProfile.examples || [],
  };
}

export async function updateVoiceProfileExamples(
  userId: string,
  examples: string[]
) {
  const voiceProfile = await prisma.voiceProfile.findFirst({
    where: { userId },
  });

  if (!voiceProfile) {
    throw new Error("Voice profile not found");
  }

  return await prisma.voiceProfile.update({
    where: { id: voiceProfile.id },
    data: {
      examples,
      updatedAt: new Date(),
    },
  });
}

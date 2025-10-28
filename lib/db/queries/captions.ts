import { prisma } from "../prisma";
import type { Caption } from "@/types";

export interface CreateCaptionInput {
  userId: string;
  content: string;
  context?: string;
  voiceProfile?: string;
  platform?: string;
  style?: string;
  metadata?: any;
}

export async function createCaption(input: CreateCaptionInput) {
  return await prisma.caption.create({
    data: {
      userId: input.userId,
      content: input.content,
      context: input.context,
      voiceProfile: input.voiceProfile,
      platform: input.platform,
      style: input.style,
      metadata: input.metadata,
    },
  });
}

export async function createMultipleCaptions(inputs: CreateCaptionInput[]) {
  return await prisma.caption.createMany({
    data: inputs.map((input) => ({
      userId: input.userId,
      content: input.content,
      context: input.context,
      voiceProfile: input.voiceProfile,
      platform: input.platform,
      style: input.style,
      metadata: input.metadata,
    })),
  });
}

export async function getUserCaptions(userId: string, limit: number = 10) {
  return await prisma.caption.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getCaptionById(id: string, userId: string) {
  return await prisma.caption.findFirst({
    where: {
      id,
      userId,
    },
  });
}

export async function deleteCaption(id: string, userId: string) {
  return await prisma.caption.delete({
    where: {
      id,
      userId,
    },
  });
}

export async function updateCaption(
  id: string,
  userId: string,
  content: string
) {
  return await prisma.caption.update({
    where: {
      id,
      userId,
    },
    data: {
      content,
      updatedAt: new Date(),
    },
  });
}

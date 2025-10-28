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
  // Verify user owns this caption first
  const caption = await prisma.caption.findFirst({
    where: { id, userId },
  });

  if (!caption) {
    throw new Error(
      "Caption not found or you don't have permission to edit it"
    );
  }

  return await prisma.caption.update({
    where: {
      id,
    },
    data: {
      content,
      updatedAt: new Date(),
    },
  });
}

export async function toggleCaptionSaved(id: string, userId: string) {
  // First get the current state
  const caption = await prisma.caption.findFirst({
    where: {
      id,
      userId,
    },
    select: {
      isSaved: true,
    },
  });

  if (!caption) {
    throw new Error("Caption not found");
  }

  // Toggle the saved state
  return await prisma.caption.update({
    where: {
      id,
    },
    data: {
      isSaved: !caption.isSaved,
      updatedAt: new Date(),
    },
  });
}

export async function getSavedCaptions(userId: string) {
  return await prisma.caption.findMany({
    where: {
      userId,
      isSaved: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

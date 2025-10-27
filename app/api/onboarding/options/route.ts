import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const [platforms, brandTones, contentTypes] = await Promise.all([
      prisma.platform.findMany({
        select: { id: true, name: true, network: true, description: true },
      }),
      prisma.brandTone.findMany({
        select: {
          id: true,
          name: true,
          emoji: true,
          description: true,
          example: true,
        },
      }),
      prisma.contentType.findMany({
        select: { id: true, name: true },
      }),
    ]);

    return NextResponse.json(
      {
        platforms,
        brandTones,
        contentTypes,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching onboarding options:", error);
    return NextResponse.json(
      { error: "Failed to fetch onboarding options" },
      { status: 500 }
    );
  }
}

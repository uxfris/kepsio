import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { prisma } from "../../../../lib/db/prisma";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        notificationPreferences: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the preferences or default values
    const preferences = (dbUser.notificationPreferences as Record<
      string,
      boolean
    >) || {
      emailNotifications: true,
      weeklyDigest: true,
      tipsAndTricks: false,
      productUpdates: true,
    };

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error("Error fetching notification preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch notification preferences" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { preferences } = await request.json();

    // Validate preferences structure
    const validKeys = [
      "emailNotifications",
      "weeklyDigest",
      "tipsAndTricks",
      "productUpdates",
    ];

    const isValid = Object.keys(preferences).every(
      (key) => validKeys.includes(key) && typeof preferences[key] === "boolean"
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid preferences format" },
        { status: 400 }
      );
    }

    // Update user's notification preferences
    await prisma.user.update({
      where: { id: user.id },
      data: {
        notificationPreferences: preferences,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notification preferences updated successfully",
      preferences,
    });
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    return NextResponse.json(
      { error: "Failed to update notification preferences" },
      { status: 500 }
    );
  }
}


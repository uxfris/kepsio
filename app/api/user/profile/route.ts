import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET user profile data
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user data from database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        image: dbUser.image,
        createdAt: dbUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

// PATCH update user profile
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email } = body;

    // Validate input
    if (!name && !email) {
      return NextResponse.json(
        { error: "At least one field (name or email) is required" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: { name?: string; email?: string } = {};

    if (name !== undefined) {
      if (name.trim().length < 2) {
        return NextResponse.json(
          { error: "Name must be at least 2 characters long" },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }

    if (email !== undefined) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }

      // Check if email is already taken by another user
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email.toLowerCase(),
          NOT: { id: user.id },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email is already taken" },
          { status: 409 }
        );
      }

      updateData.email = email.toLowerCase();

      // Update email in Supabase Auth as well
      const { error: authError } = await supabase.auth.updateUser({
        email: email.toLowerCase(),
      });

      if (authError) {
        return NextResponse.json(
          { error: "Failed to update email in authentication system" },
          { status: 500 }
        );
      }
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: email
        ? "Profile updated. Please check your new email for a confirmation link."
        : "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// DELETE user account
export async function DELETE() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete user profile image from storage if exists
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { image: true },
    });

    if (dbUser?.image) {
      const imagePath = dbUser.image.split("/").pop();
      if (imagePath) {
        await supabase.storage
          .from("avatars")
          .remove([`${user.id}/${imagePath}`]);
      }
    }

    // Delete user from database (this will cascade delete related records)
    await prisma.user.delete({
      where: { id: user.id },
    });

    // Sign out the user (auth deletion will be handled by Supabase)
    await supabase.auth.signOut();

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}

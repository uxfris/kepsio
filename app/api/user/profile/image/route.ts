import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// POST upload profile image
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Delete old profile image if exists
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { image: true },
    });

    if (dbUser?.image) {
      // Extract file path from URL
      const oldImagePath = dbUser.image.split("/").pop();
      if (oldImagePath) {
        const { error: deleteError } = await supabase.storage
          .from("avatars")
          .remove([`${user.id}/${oldImagePath}`]);

        if (deleteError) {
          console.error("Error deleting old image:", deleteError);
        }
      }
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // Update user image in database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { image: publicUrl },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return NextResponse.json(
      { error: "Failed to upload profile image" },
      { status: 500 }
    );
  }
}

// DELETE remove profile image
export async function DELETE() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current image
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { image: true },
    });

    if (dbUser?.image) {
      // Extract file path from URL
      const imagePath = dbUser.image.split("/").pop();
      if (imagePath) {
        const { error: deleteError } = await supabase.storage
          .from("avatars")
          .remove([`${user.id}/${imagePath}`]);

        if (deleteError) {
          console.error("Error deleting image from storage:", deleteError);
        }
      }
    }

    // Remove image from database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { image: null },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Profile picture removed successfully",
    });
  } catch (error) {
    console.error("Error removing profile image:", error);
    return NextResponse.json(
      { error: "Failed to remove profile image" },
      { status: 500 }
    );
  }
}


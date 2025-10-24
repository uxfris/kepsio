import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get user's captions logic will be implemented here

    return NextResponse.json({
      success: true,
      captions: [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch captions" },
      { status: 500 }
    );
  }
}

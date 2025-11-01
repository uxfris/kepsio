import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // For now, we can only sign out the current session
    // Full session management requires Supabase Admin API
    // This is a placeholder for future implementation
    return NextResponse.json(
      {
        message:
          "Session revoke is not available in the current configuration. Please use 'Sign out on all devices' from your account settings.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error revoking session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

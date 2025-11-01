import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function GET(req: NextRequest) {
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

    // Get current session
    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();

    // Create a basic session list with current session
    // Note: For full session management, you'd need Supabase Admin API access
    const formattedSessions = [];

    if (currentSession) {
      formattedSessions.push({
        id: currentSession.user.id,
        device: parseUserAgent(req.headers.get("user-agent")),
        location: req.headers.get("x-forwarded-for") || "Unknown location",
        time: "Current session",
        status: "active" as const,
        createdAt: currentSession.user.created_at,
        updatedAt: new Date().toISOString(),
        ip: req.headers.get("x-forwarded-for"),
        userAgent: req.headers.get("user-agent"),
      });
    }

    return NextResponse.json({ sessions: formattedSessions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to parse user agent
function parseUserAgent(userAgent: string | null): string {
  if (!userAgent) return "Unknown Device";

  // Simple user agent parsing
  if (userAgent.includes("iPhone")) return "iPhone";
  if (userAgent.includes("iPad")) return "iPad";
  if (userAgent.includes("Android")) return "Android Device";
  if (userAgent.includes("Macintosh")) return "MacBook";
  if (userAgent.includes("Windows")) return "Windows PC";
  if (userAgent.includes("Linux")) return "Linux PC";

  return "Unknown Device";
}

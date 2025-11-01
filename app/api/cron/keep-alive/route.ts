import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

/**
 * Cron job endpoint to keep the Supabase database active
 * This prevents free-tier projects from pausing after 7 days of inactivity
 *
 * Security: Vercel Cron jobs automatically include a special header
 * You can also add a secret token for additional security
 */
export async function GET(request: NextRequest) {
  try {
    // Optional: Verify the request is from a legitimate cron service
    // const authHeader = request.headers.get("authorization");

    // // Check for Vercel Cron secret or custom cron secret
    // if (process.env.CRON_SECRET) {
    //   const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
    //   if (authHeader !== expectedAuth) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    //   }
    // }

    // Perform a simple database query to keep the connection alive
    // This is lightweight and just checks if we can connect
    const result = await prisma.$queryRaw`SELECT 1 as ping`;

    // Get the current timestamp for logging
    const timestamp = new Date().toISOString();

    console.log(
      `[Keep-Alive Cron] Database pinged successfully at ${timestamp}`
    );

    return NextResponse.json({
      success: true,
      message: "Database pinged successfully",
      timestamp,
      result,
    });
  } catch (error) {
    console.error("[Keep-Alive Cron] Error pinging database:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to ping database",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

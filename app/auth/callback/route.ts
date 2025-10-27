import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/generate";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(new URL("/", requestUrl.origin));
    }

    // If this is a new user (first time signing in), redirect to onboarding
    if (data.user) {
      try {
        // Check if user already exists in database (by ID for faster lookup)
        let user = await prisma.user.findUnique({
          where: { id: data.user.id },
        });

        // If user doesn't exist, create them in the database
        if (!user) {
          user = await prisma.user.create({
            data: {
              id: data.user.id,
              email: data.user.email ?? "",
              name:
                data.user.user_metadata?.full_name ??
                data.user.user_metadata?.name ??
                null,
              image:
                data.user.user_metadata?.avatar_url ??
                data.user.user_metadata?.picture ??
                null,
            },
          });
          console.log("Created new user in database:", user.id);
        }

        // Check if user has completed onboarding
        if (!user.onboardingCompleted) {
          // Redirect new users to onboarding
          return NextResponse.redirect(
            new URL("/onboarding", requestUrl.origin)
          );
        }

        // For existing users who completed onboarding, redirect to dashboard
      } catch (dbError) {
        console.error("Database error in auth callback:", dbError);
        // Continue with normal flow if database operation fails
        // Fallback: check creation time to guess if it's a new user
        const userCreatedAt = new Date(data.user.created_at);
        const now = new Date();
        const timeDiff = now.getTime() - userCreatedAt.getTime();
        const isNewUser = timeDiff < 60000; // Created within last minute

        if (isNewUser) {
          return NextResponse.redirect(
            new URL("/onboarding", requestUrl.origin)
          );
        }
      }
    }
  }

  // Redirect to the dashboard or the specified next URL
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

// GET - Check 2FA status
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

    // Get MFA factors for the user
    const { data: factors, error: factorsError } =
      await supabase.auth.mfa.listFactors();

    if (factorsError) {
      console.error("Error fetching MFA factors:", factorsError);
      return NextResponse.json(
        { error: "Failed to fetch 2FA status" },
        { status: 500 }
      );
    }

    // Check if user has any verified TOTP factors
    const has2FA =
      factors?.totp?.some((factor) => factor.status === "verified") || false;

    return NextResponse.json(
      {
        enabled: has2FA,
        factors: factors?.totp || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking 2FA status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Enroll in 2FA (generates QR code)
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

    const { action, factorId, code } = await req.json();

    if (action === "enroll") {
      // Start enrollment process
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: user.email || "Default",
      });

      if (error) {
        console.error("Error enrolling in 2FA:", error);
        return NextResponse.json(
          { error: error.message || "Failed to enroll in 2FA" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          message: "2FA enrollment initiated",
          qrCode: data.totp.qr_code,
          secret: data.totp.secret,
          factorId: data.id,
        },
        { status: 200 }
      );
    } else if (action === "verify") {
      // Verify the TOTP code
      if (!factorId || !code) {
        return NextResponse.json(
          { error: "Factor ID and code are required" },
          { status: 400 }
        );
      }

      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code,
      });

      if (error) {
        console.error("Error verifying 2FA:", error);
        return NextResponse.json(
          { error: error.message || "Invalid verification code" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          message: "2FA enabled successfully",
          verified: true,
        },
        { status: 200 }
      );
    } else if (action === "unenroll") {
      // Disable 2FA
      if (!factorId) {
        return NextResponse.json(
          { error: "Factor ID is required" },
          { status: 400 }
        );
      }

      const { error } = await supabase.auth.mfa.unenroll({
        factorId,
      });

      if (error) {
        console.error("Error disabling 2FA:", error);
        return NextResponse.json(
          { error: error.message || "Failed to disable 2FA" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "2FA disabled successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error managing 2FA:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

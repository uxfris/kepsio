import { createClient } from "./client";

export interface AuthResponse {
  error: string | null;
  success: boolean;
}

export async function signUp(email: string): Promise<AuthResponse> {
  try {
    const supabase = createClient();

    // Use OTP for passwordless signup
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: true, // Create user if they don't exist
      },
    });

    if (error) {
      return { error: error.message, success: false };
    }

    return { error: null, success: true };
  } catch (error: any) {
    return {
      error: error.message || "An unexpected error occurred",
      success: false,
    };
  }
}

export async function signIn(email: string): Promise<AuthResponse> {
  try {
    const supabase = createClient();

    // Use OTP for passwordless signin
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: true, // Create user if they don't exist
      },
    });

    if (error) {
      return { error: error.message, success: false };
    }

    return { error: null, success: true };
  } catch (error: any) {
    return {
      error: error.message || "An unexpected error occurred",
      success: false,
    };
  }
}

export async function signInWithGoogle(): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw error;
  }
}

export async function signInWithTwitter(): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

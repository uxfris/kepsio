import { createClient } from "@/lib/supabase/server";

export async function getServerUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    // Return user data directly from Supabase
    // We'll fetch additional data from Prisma in the page component if needed
    return {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name || user.user_metadata?.full_name || null,
      image: user.user_metadata?.avatar_url || null,
    };
  } catch (error) {
    console.error("Failed to get server user:", error);
    return null;
  }
}

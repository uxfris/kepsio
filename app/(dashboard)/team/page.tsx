import { TeamPageWrapper } from "../../../components/team/TeamPageWrapper";
import { ToastProvider } from "../../../components/ui/Toast";
import { getServerUser } from "../../../lib/auth/server";
import { redirect } from "next/navigation";

/**
 * Team collaboration page
 *
 * Performance optimization: Check subscription status FIRST before running any queries.
 * If user doesn't have Pro/Enterprise plan, no need to fetch team data - just show the paywall.
 * Data is now fetched client-side via /api/team/data when user has access.
 */
export default async function TeamPage() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  // No queries here! TeamPageWrapper will check subscription first,
  // then fetch data client-side only if user has access
  return (
    <ToastProvider>
      <TeamPageWrapper />
    </ToastProvider>
  );
}

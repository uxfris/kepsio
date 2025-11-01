import { TeamPageWrapper } from "../../../components/team/TeamPageWrapper";
import { ToastProvider } from "../../../components/ui/Toast";

/**
 * Team collaboration page
 *
 * Performance optimization: Check subscription status FIRST before running any queries.
 * If user doesn't have Pro/Enterprise plan, no need to fetch team data - just show the paywall.
 * Data is now fetched client-side via /api/team/data when user has access.
 *
 * Note: Authentication is handled by middleware, so this page assumes user is authenticated.
 * The middleware redirects unauthenticated users to "/" before reaching this component.
 */
export default async function TeamPage() {
  // Authentication is already handled by middleware
  // No need for additional auth check here to avoid cookie timing issues in production

  return (
    <ToastProvider>
      <TeamPageWrapper />
    </ToastProvider>
  );
}

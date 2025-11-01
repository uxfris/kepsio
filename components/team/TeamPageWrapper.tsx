"use client";

import { useState, useEffect } from "react";
import { FeatureLock } from "../shared/FeatureLock";
import { TeamCollaborationClient } from "./TeamCollaborationClient";
import { TeamPageSkeleton } from "./TeamPageSkeleton";
import { useSubscription } from "../../contexts/SubscriptionContext";
import type {
  TeamMember,
  PendingInvite,
  SharedCaption,
} from "../../types/team";
import { Users } from "lucide-react";

interface TeamData {
  teamMembers: TeamMember[];
  pendingInvites: PendingInvite[];
  sharedCaptions: SharedCaption[];
  currentUserRole: string;
}

/**
 * Wrapper component that checks subscription and shows FeatureLock
 * for free users or TeamCollaborationClient for Pro/Enterprise users
 *
 * Performance optimization: Only fetches team data if user has access to the feature.
 * Uses client-side fetching with caching to avoid blocking server-side rendering.
 */
export function TeamPageWrapper() {
  const { isPro, isEnterprise, isLoading } = useSubscription();
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasAccess = isPro || isEnterprise;

  // Only fetch data if user has access
  useEffect(() => {
    if (!isLoading && hasAccess && !teamData) {
      fetchTeamData();
    }
  }, [isLoading, hasAccess, teamData]);

  const fetchTeamData = async () => {
    setIsLoadingData(true);
    setError(null);

    try {
      const response = await fetch("/api/team/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Don't cache - get fresh data
      });

      if (!response.ok) {
        throw new Error("Failed to fetch team data");
      }

      const data = await response.json();
      setTeamData(data);
    } catch (err: any) {
      console.error("Error fetching team data:", err);
      setError(err.message || "Failed to load team data");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Show loading state while checking subscription
  if (isLoading) {
    return <TeamPageSkeleton />;
  }

  // Show lock for free users (NO DATA FETCHED - FAST!)
  if (!hasAccess) {
    return (
      <FeatureLock
        icon={Users}
        title="Unlock Team Collaboration"
        description="Upgrade to Pro to collaborate with your team, share captions, and manage team members"
        features={[
          {
            title: "Team Members",
            description: "Invite and manage up to 3 team members",
          },
          {
            title: "Shared Workspace",
            description: "Collaborate on captions with your team",
          },
          {
            title: "Role Management",
            description: "Assign roles and permissions to team members",
          },
          {
            title: "Caption Sharing",
            description: "Share captions for review and approval",
          },
        ]}
        requiredPlan="pro"
        fullPage={true}
      />
    );
  }

  // Show loading state while fetching data
  if (isLoadingData || !teamData) {
    return <TeamPageSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchTeamData}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show team collaboration for Pro/Enterprise users
  return (
    <TeamCollaborationClient
      initialTeamMembers={teamData.teamMembers}
      initialPendingInvites={teamData.pendingInvites}
      initialSharedCaptions={teamData.sharedCaptions}
      currentUserRole={teamData.currentUserRole}
      onDataRefresh={fetchTeamData}
    />
  );
}

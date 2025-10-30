"use client";

import { FeatureLock } from "../shared/FeatureLock";
import { TeamCollaborationClient } from "./TeamCollaborationClient";
import { useSubscription } from "../../contexts/SubscriptionContext";
import type {
  TeamMember,
  PendingInvite,
  SharedCaption,
} from "../../types/team";
import { Users } from "lucide-react";

interface TeamPageWrapperProps {
  initialTeamMembers: TeamMember[];
  initialPendingInvites: PendingInvite[];
  initialSharedCaptions: SharedCaption[];
  currentUserRole: string;
}

/**
 * Wrapper component that checks subscription and shows FeatureLock
 * for free users or TeamCollaborationClient for Pro/Enterprise users
 */
export function TeamPageWrapper({
  initialTeamMembers,
  initialPendingInvites,
  initialSharedCaptions,
  currentUserRole,
}: TeamPageWrapperProps) {
  const { isPro, isEnterprise, isLoading } = useSubscription();

  // Show loading state while checking subscription
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-body">Loading...</div>
      </div>
    );
  }

  // Show lock for free users
  if (!isPro && !isEnterprise) {
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

  // Show team collaboration for Pro/Enterprise users
  return (
    <TeamCollaborationClient
      initialTeamMembers={initialTeamMembers}
      initialPendingInvites={initialPendingInvites}
      initialSharedCaptions={initialSharedCaptions}
      currentUserRole={currentUserRole}
    />
  );
}

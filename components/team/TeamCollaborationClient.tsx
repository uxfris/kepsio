"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import type { TeamMember, PendingInvite, SharedCaption } from "@/types/team";
import { TeamHeader } from "./TeamHeader";
import { TeamTabs, type TabType } from "./TeamTabs";
import { TeamMembersTab } from "./TeamMembersTab";
import { SharedCaptionsTab } from "./SharedCaptionsTab";
import { PendingInvitesTab } from "./PendingInvitesTab";
import { InviteModal } from "./InviteModal";

interface TeamCollaborationClientProps {
  teamMembers: TeamMember[];
  pendingInvites: PendingInvite[];
  sharedCaptions: SharedCaption[];
}

export function TeamCollaborationClient({
  teamMembers,
  pendingInvites,
  sharedCaptions,
}: TeamCollaborationClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("members");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const stats = {
    totalMembers: teamMembers.length,
    activeThisWeek: teamMembers.filter((m) => m.status === "active").length,
    totalCaptions: teamMembers.reduce((sum, m) => sum + m.captionsCreated, 0),
    pendingInvites: pendingInvites.length,
  };

  const tabs = [
    {
      id: "members" as TabType,
      label: "Team Members",
      count: teamMembers.length,
    },
    {
      id: "shared" as TabType,
      label: "Shared Captions",
      count: sharedCaptions.length,
    },
    {
      id: "pending" as TabType,
      label: "Pending Invites",
      count: pendingInvites.length,
    },
  ];

  const handleInvite = (email: string, role: string) => {
    console.log("Inviting:", email, role);
    // TODO: Implement API call to send invitation
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <TeamHeader onInviteClick={() => setShowInviteModal(true)} />

      {/* Tabs */}
      <TeamTabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />

      {/* Content Area */}
      <div className="p-8">
        {/* Team Members Tab */}
        {activeTab === "members" && (
          <TeamMembersTab members={teamMembers} stats={stats} />
        )}

        {/* Shared Captions Tab */}
        {activeTab === "shared" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-body">
                Captions shared with your team for review and collaboration
              </p>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-body hover:bg-section-light border border-border rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                Filter by Status
              </button>
            </div>
            <SharedCaptionsTab captions={sharedCaptions} />
          </div>
        )}

        {/* Pending Invites Tab */}
        {activeTab === "pending" && (
          <div>
            <p className="text-sm text-text-body mb-6">
              Team invitations waiting for acceptance
            </p>
            <PendingInvitesTab invites={pendingInvites} />
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}

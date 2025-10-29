"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import type {
  TeamMember,
  PendingInvite,
  SharedCaption,
  TeamRole,
} from "@/types/team";
import { TeamHeader } from "./TeamHeader";
import { TeamTabs, type TabType } from "./TeamTabs";
import { TeamMembersTab } from "./TeamMembersTab";
import { SharedCaptionsTab } from "./SharedCaptionsTab";
import { PendingInvitesTab } from "./PendingInvitesTab";
import { InviteModal } from "./InviteModal";
import { EditRoleModal } from "./EditRoleModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { useToast } from "@/components/ui/Toast";

interface TeamCollaborationClientProps {
  initialTeamMembers: TeamMember[];
  initialPendingInvites: PendingInvite[];
  initialSharedCaptions: SharedCaption[];
  currentUserRole: string;
}

export function TeamCollaborationClient({
  initialTeamMembers,
  initialPendingInvites,
  initialSharedCaptions,
  currentUserRole,
}: TeamCollaborationClientProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("members");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  // Member management modals
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Local state for optimistic updates
  const [teamMembers] = useState(initialTeamMembers);
  const [pendingInvites] = useState(initialPendingInvites);
  const [sharedCaptions] = useState(initialSharedCaptions);

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

  const handleInvite = async (email: string, role: string) => {
    setIsInviting(true);
    try {
      const response = await fetch("/api/team/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send invitation");
      }

      showToast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${email}`,
      });

      // Refresh the page data
      router.refresh();
    } catch (error: any) {
      showToast({
        title: "Failed to send invitation",
        description: error.message,
        variant: "error",
      });
    } finally {
      setIsInviting(false);
    }
  };

  const handleResendInvite = async (inviteId: string) => {
    try {
      const response = await fetch("/api/team/invites/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inviteId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend invitation");
      }

      showToast({
        title: "Invitation resent",
        description: "The invitation has been resent successfully",
      });
    } catch (error: any) {
      showToast({
        title: "Failed to resend invitation",
        description: error.message,
        variant: "error",
      });
    }
  };

  const handleDeleteInvite = async (inviteId: string) => {
    try {
      const response = await fetch(`/api/team/invites?id=${inviteId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete invitation");
      }

      showToast({
        title: "Invitation cancelled",
        description: "The invitation has been cancelled",
      });

      // Refresh the page data
      router.refresh();
    } catch (error: any) {
      showToast({
        title: "Failed to cancel invitation",
        description: error.message,
        variant: "error",
      });
    }
  };

  const handleUpdateCaptionStatus = async (
    sharedCaptionId: string,
    status: string
  ) => {
    try {
      const response = await fetch("/api/team/shared-captions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sharedCaptionId, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update caption status");
      }

      showToast({
        title: "Status updated",
        description: `Caption ${
          status === "approved" ? "approved" : "marked as needs changes"
        }`,
      });

      // Refresh the page data
      router.refresh();
    } catch (error: any) {
      showToast({
        title: "Failed to update status",
        description: error.message,
        variant: "error",
      });
    }
  };

  const handleEditRole = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (member) {
      setSelectedMember(member);
      setShowEditRoleModal(true);
    }
  };

  const handleConfirmEditRole = async (memberId: string, newRole: TeamRole) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/team/members/${memberId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update role");
      }

      showToast({
        title: "Role updated",
        description: `Successfully updated ${selectedMember?.name}'s role`,
      });

      setShowEditRoleModal(false);
      setSelectedMember(null);

      // Refresh the page data
      router.refresh();
    } catch (error: any) {
      showToast({
        title: "Failed to update role",
        description: error.message,
        variant: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (member) {
      setSelectedMember(member);
      setShowRemoveDialog(true);
    }
  };

  const handleConfirmRemove = async () => {
    if (!selectedMember) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/team/members/${selectedMember.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove member");
      }

      showToast({
        title: "Member removed",
        description: `${selectedMember.name} has been removed from the team`,
      });

      setShowRemoveDialog(false);
      setSelectedMember(null);

      // Refresh the page data
      router.refresh();
    } catch (error: any) {
      showToast({
        title: "Failed to remove member",
        description: error.message,
        variant: "error",
      });
    } finally {
      setIsUpdating(false);
    }
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
          <TeamMembersTab
            members={teamMembers}
            stats={stats}
            currentUserRole={currentUserRole}
            onEditRole={handleEditRole}
            onRemoveMember={handleRemoveMember}
          />
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
            <SharedCaptionsTab
              captions={sharedCaptions}
              onUpdateStatus={handleUpdateCaptionStatus}
            />
          </div>
        )}

        {/* Pending Invites Tab */}
        {activeTab === "pending" && (
          <div>
            <p className="text-sm text-text-body mb-6">
              Team invitations waiting for acceptance
            </p>
            <PendingInvitesTab
              invites={pendingInvites}
              onResend={handleResendInvite}
              onDelete={handleDeleteInvite}
            />
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInvite}
        isLoading={isInviting}
      />

      {/* Edit Role Modal */}
      <EditRoleModal
        isOpen={showEditRoleModal}
        member={selectedMember}
        currentUserRole={currentUserRole}
        onClose={() => {
          setShowEditRoleModal(false);
          setSelectedMember(null);
        }}
        onConfirm={handleConfirmEditRole}
        isLoading={isUpdating}
      />

      {/* Remove Member Confirmation */}
      <ConfirmDialog
        isOpen={showRemoveDialog}
        title="Remove Team Member"
        description={`Are you sure you want to remove ${selectedMember?.name} from the team? This action cannot be undone.`}
        confirmText="Remove Member"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmRemove}
        onCancel={() => {
          setShowRemoveDialog(false);
          setSelectedMember(null);
        }}
        isLoading={isUpdating}
      />
    </div>
  );
}

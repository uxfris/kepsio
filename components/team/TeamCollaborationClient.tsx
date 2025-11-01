"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
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
  onDataRefresh?: () => Promise<void>;
}

export function TeamCollaborationClient({
  initialTeamMembers,
  initialPendingInvites,
  initialSharedCaptions,
  currentUserRole,
  onDataRefresh,
}: TeamCollaborationClientProps) {
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
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [pendingInvites, setPendingInvites] = useState(initialPendingInvites);
  const [sharedCaptions, setSharedCaptions] = useState(initialSharedCaptions);

  // Refresh data function
  const refreshData = async () => {
    if (onDataRefresh) {
      await onDataRefresh();
    }
  };

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

      showToast(`Invitation sent to ${email}`, "success");

      // Optimistic update: Add new invite to pending list
      const newInvite: PendingInvite = {
        id: data.inviteId || crypto.randomUUID(),
        email,
        role: role as any,
        sentBy: "You",
        sentDate: "Just now",
      };
      setPendingInvites([newInvite, ...pendingInvites]);

      // Refresh full data in background
      await refreshData();
    } catch (error: any) {
      showToast(error.message || "Failed to send invitation", "error");
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

      showToast("Invitation resent successfully", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to resend invitation", "error");
    }
  };

  const handleDeleteInvite = async (inviteId: string) => {
    // Optimistic update: Remove invite from list immediately
    const originalInvites = [...pendingInvites];
    setPendingInvites(pendingInvites.filter((inv) => inv.id !== inviteId));

    try {
      const response = await fetch(`/api/team/invites?id=${inviteId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        // Rollback on error
        setPendingInvites(originalInvites);
        throw new Error(data.error || "Failed to delete invitation");
      }

      showToast("Invitation cancelled successfully", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to cancel invitation", "error");
    }
  };

  const handleUpdateCaptionStatus = async (
    sharedCaptionId: string,
    status: string
  ) => {
    // Optimistic update: Update caption status immediately
    const originalCaptions = [...sharedCaptions];
    setSharedCaptions(
      sharedCaptions.map((cap) =>
        cap.id === sharedCaptionId ? { ...cap, status: status as any } : cap
      )
    );

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
        // Rollback on error
        setSharedCaptions(originalCaptions);
        throw new Error(data.error || "Failed to update caption status");
      }

      showToast(
        `Caption ${
          status === "approved" ? "approved" : "marked as needs changes"
        }`,
        "success"
      );
    } catch (error: any) {
      showToast(error.message || "Failed to update status", "error");
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

    // Optimistic update: Update member role immediately
    const originalMembers = [...teamMembers];
    setTeamMembers(
      teamMembers.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );

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
        // Rollback on error
        setTeamMembers(originalMembers);
        throw new Error(data.error || "Failed to update role");
      }

      showToast(
        `Successfully updated ${selectedMember?.name}'s role`,
        "success"
      );

      setShowEditRoleModal(false);
      setSelectedMember(null);
    } catch (error: any) {
      showToast(error.message || "Failed to update role", "error");
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

    // Optimistic update: Remove member immediately
    const originalMembers = [...teamMembers];
    setTeamMembers(teamMembers.filter((m) => m.id !== selectedMember.id));

    try {
      const response = await fetch(`/api/team/members/${selectedMember.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        // Rollback on error
        setTeamMembers(originalMembers);
        throw new Error(data.error || "Failed to remove member");
      }

      showToast(
        `${selectedMember.name} has been removed from the team`,
        "success"
      );

      setShowRemoveDialog(false);
      setSelectedMember(null);
    } catch (error: any) {
      showToast(error.message || "Failed to remove member", "error");
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

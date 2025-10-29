"use client";

import { useState } from "react";
import { X, Shield, Edit3, Eye, Crown } from "lucide-react";
import { Button } from "../ui/Button";
import type { TeamMember, TeamRole } from "@/types/team";

interface EditRoleModalProps {
  isOpen: boolean;
  member: TeamMember | null;
  currentUserRole: string;
  onClose: () => void;
  onConfirm: (memberId: string, newRole: TeamRole) => Promise<void>;
  isLoading?: boolean;
}

export function EditRoleModal({
  isOpen,
  member,
  currentUserRole,
  onClose,
  onConfirm,
  isLoading = false,
}: EditRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<TeamRole>(
    member?.role || "editor"
  );

  if (!isOpen || !member) return null;

  const handleConfirm = async () => {
    if (selectedRole !== member.role) {
      await onConfirm(member.id, selectedRole);
    }
    onClose();
  };

  // Role options based on current user permissions
  const roleOptions: Array<{
    value: TeamRole;
    label: string;
    description: string;
    icon: typeof Shield;
    disabled: boolean;
  }> = [
    {
      value: "owner",
      label: "Owner",
      description: "Full access, billing, and team management",
      icon: Crown,
      disabled: currentUserRole !== "owner",
    },
    {
      value: "admin",
      label: "Admin",
      description: "Manage team members and approve content",
      icon: Shield,
      disabled: false,
    },
    {
      value: "editor",
      label: "Editor",
      description: "Create, edit, and share captions",
      icon: Edit3,
      disabled: false,
    },
    {
      value: "viewer",
      label: "Viewer",
      description: "View shared captions only",
      icon: Eye,
      disabled: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-primary mb-1">Change Role</h2>
            <p className="text-sm text-text-body">
              Update {member.name}'s role and permissions
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-section-light rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-text-body" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {roleOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedRole === option.value;
            const isDisabled = option.disabled;

            return (
              <button
                key={option.value}
                onClick={() => !isDisabled && setSelectedRole(option.value)}
                disabled={isDisabled}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className={`w-5 h-5 mt-0.5 ${
                      isSelected ? "text-accent" : "text-text-body"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${
                          isSelected ? "text-accent" : "text-primary"
                        }`}
                      >
                        {option.label}
                      </span>
                      {isDisabled && (
                        <span className="text-xs text-text-body">
                          (requires owner)
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-body mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="accent"
            className="flex-1"
            disabled={selectedRole === member.role || isLoading}
            loading={isLoading}
          >
            Update Role
          </Button>
        </div>
      </div>
    </div>
  );
}

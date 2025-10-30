"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit3, Trash2, UserCog, Crown } from "lucide-react";
import type { TeamMember } from "@/types/team";

interface MemberActionsDropdownProps {
  member: TeamMember;
  currentUserRole: string;
  onEditRole: (memberId: string) => void;
  onRemoveMember: (memberId: string) => void;
  onTransferOwnership?: (memberId: string) => void;
}

export function MemberActionsDropdown({
  member,
  currentUserRole,
  onEditRole,
  onRemoveMember,
  onTransferOwnership,
}: MemberActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Determine what actions are allowed
  const canEdit =
    currentUserRole === "owner" ||
    (currentUserRole === "admin" && member.role !== "owner");
  const canRemove =
    currentUserRole === "owner" ||
    (currentUserRole === "admin" &&
      member.role !== "owner" &&
      member.role !== "admin");
  const canTransferOwnership =
    currentUserRole === "owner" && member.role !== "owner";

  // Don't show dropdown if no actions are available
  if (!canEdit && !canRemove && !canTransferOwnership) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-section-light rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4 text-text-body" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-lg border border-border z-50">
          <div className="py-1">
            {canEdit && (
              <button
                onClick={() => {
                  onEditRole(member.id);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-text-head hover:bg-section-light transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Change Role
              </button>
            )}

            {canTransferOwnership && (
              <>
                <div className="border-t border-border my-1" />
                <button
                  onClick={() => {
                    onTransferOwnership?.(member.id);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-text-head hover:bg-section-light transition-colors flex items-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  Transfer Ownership
                </button>
              </>
            )}

            {canRemove && (
              <>
                <div className="border-t border-border my-1" />
                <button
                  onClick={() => {
                    onRemoveMember(member.id);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove from Team
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


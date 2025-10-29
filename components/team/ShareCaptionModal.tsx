"use client";

import { useState } from "react";
import { X, Share2, Check } from "lucide-react";
import { Button } from "../ui/Button";
import type { TeamMember } from "@/types/team";

interface ShareCaptionModalProps {
  isOpen: boolean;
  caption: { id: string; content: string } | null;
  teamMembers: TeamMember[];
  currentUserId: string;
  onClose: () => void;
  onShare: (
    captionId: string,
    sharedWith: string[],
    message?: string
  ) => Promise<void>;
  isLoading?: boolean;
}

export function ShareCaptionModal({
  isOpen,
  caption,
  teamMembers,
  currentUserId,
  onClose,
  onShare,
  isLoading = false,
}: ShareCaptionModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  if (!isOpen || !caption) return null;

  // Filter out current user from team members list
  const availableMembers = teamMembers.filter((m) => m.email !== currentUserId);

  const handleToggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleShare = async () => {
    if (selectedMembers.length === 0) return;

    await onShare(caption.id, selectedMembers, message);
    setSelectedMembers([]);
    setMessage("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-primary mb-1">
              Share Caption with Team
            </h2>
            <p className="text-sm text-text-body">
              Select team members to share this caption with
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

        {/* Caption Preview */}
        <div className="mb-6 p-4 bg-section rounded-lg border border-border">
          <p className="text-sm text-text-body line-clamp-3">
            {caption.content}
          </p>
        </div>

        {/* Team Members Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-primary mb-3">
            Share with ({selectedMembers.length} selected)
          </label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableMembers.map((member) => {
              const isSelected = selectedMembers.includes(member.id);
              return (
                <button
                  key={member.id}
                  onClick={() => handleToggleMember(member.id)}
                  disabled={isLoading}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                    isSelected
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-accent border-accent"
                        : "border-border bg-surface"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="w-8 h-8 bg-linear-to-br from-accent to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary text-sm">
                      {member.name}
                    </p>
                    <p className="text-xs text-text-body">{member.email}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-section rounded text-text-body">
                    {member.role}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-primary mb-2">
            Add a message (optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add context or ask for specific feedback..."
            disabled={isLoading}
            rows={3}
            className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 bg-surface text-primary disabled:opacity-50"
          />
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
            onClick={handleShare}
            variant="accent"
            className="flex-1"
            leftIcon={<Share2 className="w-4 h-4" />}
            disabled={selectedMembers.length === 0 || isLoading}
            loading={isLoading}
          >
            Share Caption
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { X, Mail } from "lucide-react";
import { Button } from "../ui/Button";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: string) => Promise<void>;
  isLoading?: boolean;
}

export function InviteModal({
  isOpen,
  onClose,
  onInvite,
  isLoading = false,
}: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (email) {
      await onInvite(email, role);
      setEmail("");
      setRole("editor");
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && email) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-primary mb-1">
              Invite Team Member
            </h2>
            <p className="text-sm text-text-body">
              Add someone to your Caption Studio team
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

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="teammate@company.com"
              disabled={isLoading}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 bg-surface text-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 bg-surface text-primary disabled:opacity-50"
            >
              <option value="admin">
                Admin - Can manage team and approve content
              </option>
              <option value="editor">
                Editor - Can create and edit captions
              </option>
              <option value="viewer">
                Viewer - Can only view shared captions
              </option>
            </select>
          </div>
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
            onClick={handleSubmit}
            variant="accent"
            className="flex-1"
            leftIcon={<Mail className="w-4 h-4" />}
            disabled={!email || isLoading}
            loading={isLoading}
          >
            {isLoading ? "Sending..." : "Send Invite"}
          </Button>
        </div>
      </div>
    </div>
  );
}

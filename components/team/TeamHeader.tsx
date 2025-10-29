"use client";

import { Users, Zap, UserPlus } from "lucide-react";
import { Button } from "../ui/Button";

interface TeamHeaderProps {
  onInviteClick: () => void;
}

export function TeamHeader({ onInviteClick }: TeamHeaderProps) {
  return (
    <div className="bg-surface border-b border-border px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-7 h-7 text-accent" />
            <h1 className="text-2xl font-bold text-primary">
              Team Collaboration
            </h1>
            <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded flex items-center gap-1">
              <Zap className="w-3 h-3" />
              PRO
            </span>
          </div>
          <p className="text-text-body">
            Manage your team, share captions, and collaborate on content
          </p>
        </div>
        <Button
          onClick={onInviteClick}
          variant="accent"
          size="md"
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Invite Team Member
        </Button>
      </div>
    </div>
  );
}

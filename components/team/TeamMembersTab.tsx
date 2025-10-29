"use client";

import { Search, Filter } from "lucide-react";
import type { TeamMember } from "@/types/team";
import { TeamStats } from "./TeamStats";
import { TeamMembersTable } from "./TeamMembersTable";
import { RolePermissionsInfo } from "./RolePermissionsInfo";

interface TeamMembersTabProps {
  members: TeamMember[];
  stats: {
    totalMembers: number;
    activeThisWeek: number;
    totalCaptions: number;
    pendingInvites: number;
  };
}

export function TeamMembersTab({ members, stats }: TeamMembersTabProps) {
  return (
    <div>
      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-body" />
          <input
            type="text"
            placeholder="Search team members..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 bg-surface text-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-body hover:bg-section-light border border-border rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Team Stats */}
      <TeamStats stats={stats} />

      {/* Members Table */}
      <TeamMembersTable members={members} />

      {/* Role Permissions Info */}
      <RolePermissionsInfo />
    </div>
  );
}

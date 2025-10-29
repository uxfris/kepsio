"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import type { TeamMember, TeamRole } from "@/types/team";
import { TeamStats } from "./TeamStats";
import { TeamMembersTable } from "./TeamMembersTable";
import { RolePermissionsInfo } from "./RolePermissionsInfo";
import type { SortDirection } from "./SortableTableHeader";

interface TeamMembersTabProps {
  members: TeamMember[];
  stats: {
    totalMembers: number;
    activeThisWeek: number;
    totalCaptions: number;
    pendingInvites: number;
  };
  currentUserRole: string;
  onEditRole: (memberId: string) => void;
  onRemoveMember: (memberId: string) => void;
  onTransferOwnership?: (memberId: string) => void;
}

export function TeamMembersTab({
  members,
  stats,
  currentUserRole,
  onEditRole,
  onRemoveMember,
  onTransferOwnership,
}: TeamMembersTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<TeamRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Filtered and sorted members
  const filteredMembers = useMemo(() => {
    let filtered = members.filter((member) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const matchesRole = roleFilter === "all" || member.role === roleFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });

    // Apply sorting
    if (sortKey && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any = a[sortKey as keyof TeamMember];
        let bValue: any = b[sortKey as keyof TeamMember];

        // Handle different data types
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [members, searchQuery, roleFilter, statusFilter, sortKey, sortDirection]);

  const hasActiveFilters =
    searchQuery !== "" || roleFilter !== "all" || statusFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-body" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 bg-surface text-primary"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 text-sm text-text-body hover:bg-section-light border rounded-lg transition-colors ${
              showFilters || hasActiveFilters
                ? "border-accent bg-accent/5"
                : "border-border"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 bg-accent text-white text-xs rounded">
                {
                  [roleFilter !== "all", statusFilter !== "all"].filter(Boolean)
                    .length
                }
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-3 py-2 text-sm text-text-body hover:bg-section-light rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 bg-surface text-primary"
                >
                  <option value="all">All Roles</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 bg-surface text-primary"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      {hasActiveFilters && (
        <div className="mb-4 text-sm text-text-body">
          Showing {filteredMembers.length} of {members.length} members
        </div>
      )}

      {/* Team Stats */}
      <TeamStats stats={stats} />

      {/* Members Table or Empty State */}
      {filteredMembers.length === 0 ? (
        <div className="bg-surface rounded-xl border border-border p-12 text-center">
          <Search className="w-12 h-12 text-text-body mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">
            No members found
          </h3>
          <p className="text-text-body mb-4">
            {hasActiveFilters
              ? "Try adjusting your search or filters"
              : "No team members yet"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-accent hover:underline text-sm font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <TeamMembersTable
          members={filteredMembers}
          currentUserRole={currentUserRole}
          onEditRole={onEditRole}
          onRemoveMember={onRemoveMember}
          onTransferOwnership={onTransferOwnership}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}

      {/* Role Permissions Info */}
      <RolePermissionsInfo />
    </div>
  );
}

import { Crown, Shield, Edit3, Eye } from "lucide-react";
import type { TeamMember, TeamRole } from "@/types/team";
import { cn } from "@/lib/utils/cn";
import { MemberActionsDropdown } from "./MemberActionsDropdown";
import { SortableTableHeader, type SortDirection } from "./SortableTableHeader";

interface TeamMembersTableProps {
  members: TeamMember[];
  currentUserRole: string;
  onEditRole: (memberId: string) => void;
  onRemoveMember: (memberId: string) => void;
  onTransferOwnership?: (memberId: string) => void;
  sortKey: string | null;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
}

const roleConfig: Record<
  TeamRole,
  { label: string; color: string; icon: typeof Crown }
> = {
  owner: {
    label: "Owner",
    color: "text-accent bg-accent/10",
    icon: Crown,
  },
  admin: {
    label: "Admin",
    color: "text-blue-700 bg-blue-100",
    icon: Shield,
  },
  editor: {
    label: "Editor",
    color: "text-green-700 bg-green-100",
    icon: Edit3,
  },
  viewer: {
    label: "Viewer",
    color: "text-text-body bg-section",
    icon: Eye,
  },
};

export function TeamMembersTable({
  members,
  currentUserRole,
  onEditRole,
  onRemoveMember,
  onTransferOwnership,
  sortKey,
  sortDirection,
  onSort,
}: TeamMembersTableProps) {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-section border-b border-border">
            <tr>
              <SortableTableHeader
                label="Member"
                sortKey="name"
                currentSortKey={sortKey}
                currentSortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeader
                label="Role"
                sortKey="role"
                currentSortKey={sortKey}
                currentSortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeader
                label="Captions"
                sortKey="captionsCreated"
                currentSortKey={sortKey}
                currentSortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeader
                label="Last Active"
                sortKey="lastActive"
                currentSortKey={sortKey}
                currentSortDirection={sortDirection}
                onSort={onSort}
              />
              <SortableTableHeader
                label="Status"
                sortKey="status"
                currentSortKey={sortKey}
                currentSortDirection={sortDirection}
                onSort={onSort}
              />
              <th className="px-6 py-3 text-right text-xs font-medium text-text-body uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member) => {
              const config = roleConfig[member.role];
              const RoleIcon = config.icon;
              return (
                <tr
                  key={member.id}
                  className="hover:bg-section transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-accent to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-primary">
                          {member.name}
                        </p>
                        <p className="text-sm text-text-body">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium",
                        config.color
                      )}
                    >
                      <RoleIcon className="w-3.5 h-3.5" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-primary">
                      {member.captionsCreated}
                    </p>
                    <p className="text-xs text-text-body">
                      Since {member.joinedDate}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-primary">{member.lastActive}</p>
                  </td>
                  <td className="px-6 py-4">
                    {member.status === "active" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-text-body">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <MemberActionsDropdown
                      member={member}
                      currentUserRole={currentUserRole}
                      onEditRole={onEditRole}
                      onRemoveMember={onRemoveMember}
                      onTransferOwnership={onTransferOwnership}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

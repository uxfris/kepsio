import { Mail, Trash2 } from "lucide-react";
import type { PendingInvite, TeamRole } from "@/types/team";
import { Crown, Shield, Edit3, Eye } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "../ui/Button";

interface PendingInvitesTabProps {
  invites: PendingInvite[];
  onResend?: (inviteId: string) => Promise<void>;
  onDelete?: (inviteId: string) => Promise<void>;
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

export function PendingInvitesTab({
  invites,
  onResend,
  onDelete,
}: PendingInvitesTabProps) {
  if (invites.length === 0) {
    return (
      <div className="bg-surface rounded-xl border border-border p-12 text-center">
        <Mail className="w-12 h-12 text-text-body mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-primary mb-2">
          No pending invites
        </h3>
        <p className="text-text-body mb-4">
          All team invitations have been accepted
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      {invites.map((invite, index) => (
        <div
          key={invite.id}
          className={cn(
            "p-6 flex items-center justify-between",
            index !== invites.length - 1 && "border-b border-border"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-section rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-text-body" />
            </div>
            <div>
              <p className="font-medium text-primary">{invite.email}</p>
              <p className="text-sm text-text-body">
                Invited by {invite.sentBy} • {invite.sentDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-medium",
                roleConfig[invite.role].color
              )}
            >
              {roleConfig[invite.role].label}
            </span>
            {onResend && (
              <Button
                size="sm"
                variant="ghost"
                className="text-accent"
                onClick={() => onResend(invite.id)}
              >
                Resend
              </Button>
            )}
            {onDelete && (
              <button
                className="p-2 text-text-body hover:bg-section-light rounded-lg transition-colors"
                onClick={() => onDelete(invite.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

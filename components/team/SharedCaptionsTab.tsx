import {
  MessageSquare,
  Users,
  Copy,
  MoreVertical,
  Check,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import type { SharedCaption, SharedCaptionStatus } from "@/types/team";
import { cn } from "@/lib/utils/cn";
import { Button } from "../ui/Button";

interface SharedCaptionsTabProps {
  captions: SharedCaption[];
}

const statusConfig: Record<
  SharedCaptionStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  "pending-review": {
    label: "Pending Review",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  "needs-changes": {
    label: "Needs Changes",
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
  },
};

export function SharedCaptionsTab({ captions }: SharedCaptionsTabProps) {
  return (
    <div className="space-y-4">
      {captions.map((caption) => {
        const status = statusConfig[caption.status];
        const StatusIcon = status.icon;
        return (
          <div
            key={caption.id}
            className="bg-surface rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-accent to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {caption.createdBy
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-primary">
                    {caption.createdBy}
                  </p>
                  <p className="text-sm text-text-body">
                    {caption.createdDate}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
                  status.color
                )}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                {status.label}
              </span>
            </div>

            <p className="text-primary mb-4 leading-relaxed">{caption.text}</p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4 text-sm text-text-body">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  {caption.comments} comments
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  Shared with {caption.sharedWith.length}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {caption.status === "pending-review" && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-green-100 hover:bg-green-200 text-green-700"
                      leftIcon={<Check className="w-4 h-4" />}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-red-100 hover:bg-red-200 text-red-700"
                      leftIcon={<X className="w-4 h-4" />}
                    >
                      Request Changes
                    </Button>
                  </>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<Copy className="w-4 h-4" />}
                >
                  Copy
                </Button>
                <button className="p-1.5 hover:bg-section-light rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-text-body" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

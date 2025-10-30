import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

interface EmptySharedCaptionsProps {
  onShareCaption?: () => void;
}

export function EmptySharedCaptions({
  onShareCaption,
}: EmptySharedCaptionsProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">
          No shared captions yet
        </h3>
        <p className="text-text-body mb-6">
          Share captions with your team for review and collaboration. Team
          members can approve, request changes, and provide feedback.
        </p>
        {onShareCaption && (
          <Button
            onClick={onShareCaption}
            variant="accent"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Share Your First Caption
          </Button>
        )}
      </div>
    </div>
  );
}


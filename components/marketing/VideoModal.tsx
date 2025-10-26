"use client";

import React, { memo } from "react";
import { Play, X } from "lucide-react";
import { Button } from "../ui/Button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal = memo(function VideoModal({
  isOpen,
  onClose,
}: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface rounded-2xl max-w-4xl w-full overflow-hidden"
      >
        <div className="aspect-video bg-primary flex items-center justify-center relative">
          <Play className="w-20 h-20 text-surface opacity-50" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-surface/10 hover:bg-surface/20 text-surface"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-primary/60 to-transparent">
            <p className="text-surface text-sm">
              Demo video: See Kepsio in action (2:30)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

import React from "react";
import { AlertCircle, Check } from "lucide-react";
import {
  MIN_SAMPLES_FOR_TRAINING,
  GOOD_SAMPLES_THRESHOLD,
} from "../../lib/constants/brand-voice";

interface StatusAlertProps {
  uploadedCaptions: number;
}

export const StatusAlert: React.FC<StatusAlertProps> = React.memo(
  ({ uploadedCaptions }) => {
    if (uploadedCaptions < MIN_SAMPLES_FOR_TRAINING) {
      return (
        <div className="flex items-start gap-3 p-3 bg-warning/5 border border-warning/10 rounded-lg">
          <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div className="text-sm text-warning">
            <p className="font-medium mb-0.5">Getting Started</p>
            <p className="text-warning/70 text-xs">
              Upload at least {MIN_SAMPLES_FOR_TRAINING} captions to begin
              training your voice. More samples = better results.
            </p>
          </div>
        </div>
      );
    }

    if (uploadedCaptions < GOOD_SAMPLES_THRESHOLD) {
      return (
        <div className="flex items-start gap-3 p-3 bg-info/5 border border-info/10 rounded-lg">
          <AlertCircle className="w-4 h-4 text-info shrink-0 mt-0.5" />
          <div className="text-sm text-info">
            <p className="font-medium mb-0.5">Good Progress</p>
            <p className="text-info/70 text-xs">
              Add {GOOD_SAMPLES_THRESHOLD - uploadedCaptions} more samples for
              optimal voice matching.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-start gap-3 p-3 bg-success/5 border border-success/10 rounded-lg">
        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
        <div className="text-sm text-success">
          <p className="font-medium mb-0.5">Excellent Training Data</p>
          <p className="text-success/70 text-xs">
            You have enough samples for high-quality voice matching.
          </p>
        </div>
      </div>
    );
  }
);

StatusAlert.displayName = "StatusAlert";

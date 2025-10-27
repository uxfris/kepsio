import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = React.memo(
  ({ message = "Loading..." }) => (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-text-body">{message}</p>
      </div>
    </div>
  )
);

LoadingSpinner.displayName = "LoadingSpinner";

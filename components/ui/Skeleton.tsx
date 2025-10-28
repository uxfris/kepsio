import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}) => {
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Skeleton components for common patterns
export const CaptionCardSkeleton: React.FC = () => {
  return (
    <div className="border border-border rounded-xl p-4 space-y-4 bg-surface">
      {/* Platform Badge and Date */}
      <div className="flex items-center justify-between">
        <Skeleton width={80} height={24} className="rounded-full" />
        <Skeleton width={60} height={16} />
      </div>

      {/* Caption Preview */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Style Tag */}
      <div className="flex gap-2">
        <Skeleton width={70} height={24} className="rounded-full" />
        <Skeleton width={60} height={24} className="rounded-full" />
      </div>
    </div>
  );
};

export const StatCardSkeleton: React.FC = () => {
  return (
    <div className="border border-border rounded-xl p-6 bg-surface">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton width={48} height={48} className="rounded-xl" />
          <div className="space-y-2 flex-1">
            <Skeleton width={120} height={16} />
            <Skeleton width={80} height={14} />
          </div>
        </div>
        <Skeleton width={100} height={32} />
      </div>
    </div>
  );
};

import React from "react";
import { cn } from "../../lib/utils/cn";

export interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    { value, max = 100, size = "md", variant = "default", className, ...props },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-3",
    };

    const variants = {
      default: "bg-accent",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full bg-section rounded-full overflow-hidden",
          sizes[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };

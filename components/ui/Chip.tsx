import React from "react";
import { cn } from "../../lib/utils/cn";

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "selected" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full";

    const variants = {
      default:
        "bg-chip-bg text-text-body hover:bg-section-light focus:ring-primary",
      selected:
        "bg-primary text-surface hover:bg-primary-hover focus:ring-primary",
      outline:
        "border border-border text-text-head hover:bg-section-light focus:ring-primary",
    };

    const sizes = {
      sm: "h-6 px-3 text-xs",
      md: "h-8 px-4 text-sm",
      lg: "h-10 px-5 text-base",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Chip.displayName = "Chip";

export { Chip };

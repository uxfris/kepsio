import React from "react";
import { cn } from "../../lib/utils/cn";

export interface SegmentedControlProps {
  options: Array<{
    value: string;
    label: string;
  }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(({ options, value, onChange, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex bg-section rounded-lg p-1 border border-border",
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all duration-150",
            value === option.value
              ? "bg-surface text-text-head shadow-sm border border-border"
              : "text-text-body hover:text-text-head hover:bg-section-light"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
});

SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };

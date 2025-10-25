import React from "react";
import { cn } from "../../lib/utils/cn";

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        "group inline-flex items-center justify-between bg-section-light rounded-2xl p-1",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-4 py-3 text-xs font-medium rounded-xl transition-all duration-200 focus:outline-none w-full",
              isSelected
                ? "bg-surface text-primary group-hover:bg-transparent hover:bg-surface"
                : "text-secondary hover:text-primary hover:bg-surface"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

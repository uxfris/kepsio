import React from "react";
import { cn } from "../../lib/utils/cn";

export interface UnderlineTabOption {
  value: string;
  label: string;
}

export interface UnderlineTabsProps {
  options: UnderlineTabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function UnderlineTabs({
  options,
  value,
  onChange,
  className,
}: UnderlineTabsProps) {
  return (
    <div className={cn("flex border-b border-border", className)}>
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative px-6 py-4 text-sm font-medium transition-all duration-200 focus:outline-none",
              "hover:text-text-head",
              isSelected ? "text-accent" : "text-text-body"
            )}
          >
            {option.label}
            {isSelected && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

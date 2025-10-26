import React from "react";
import { cn } from "../../lib/utils/cn";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { checked, onChange, disabled = false, size = "md", className, ...props },
    ref
  ) => {
    const sizes = {
      sm: "w-8 h-4",
      md: "w-11 h-6",
      lg: "w-14 h-8",
    };

    const thumbSizes = {
      sm: "w-3 h-3",
      md: "w-5 h-5",
      lg: "w-7 h-7",
    };

    const translateSizes = {
      sm: "translate-x-4",
      md: "translate-x-5",
      lg: "translate-x-6",
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          sizes[size],
          checked ? "bg-accent" : "bg-border",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-surface shadow transform ring-0 transition duration-200 ease-in-out",
            thumbSizes[size],
            checked ? translateSizes[size] : "translate-x-0"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };

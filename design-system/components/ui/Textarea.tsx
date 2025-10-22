import React from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      resize = "vertical",
      id,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    const baseStyles =
      "flex min-h-[80px] w-full rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-3 py-2 text-sm transition-colors placeholder:text-[var(--color-hint)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    const stateStyles = {
      default:
        "border-[var(--color-border)] focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)]",
      error:
        "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]",
      success:
        "border-[var(--color-success)] focus:border-[var(--color-success)] focus:ring-1 focus:ring-[var(--color-success)]",
    };

    const resizeStyles = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    const getStateStyle = () => {
      if (hasError) return stateStyles.error;
      if (hasSuccess) return stateStyles.success;
      return stateStyles.default;
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--color-text-head)] mb-2"
          >
            {label}
          </label>
        )}

        <textarea
          className={cn(
            baseStyles,
            getStateStyle(),
            resizeStyles[resize],
            className
          )}
          ref={ref}
          id={textareaId}
          {...props}
        />

        {(helperText || error) && (
          <p
            className={cn(
              "mt-2 text-sm",
              hasError
                ? "text-[var(--color-error)]"
                : "text-[var(--color-hint)]"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

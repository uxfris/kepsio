import React, { useId } from "react";
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
    const generatedId = useId();
    const textareaId = id || `textarea-${generatedId}`;
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    const baseStyles =
      "flex min-h-[80px] w-full rounded-lg border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-hint focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    const stateStyles = {
      default: "border-border",
      error: "border-error",
      success: "border-success",
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
            className="block text-sm font-medium text-text-head mb-2"
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
              hasError ? "text-error" : "text-hint"
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

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  autoExpand?: boolean;
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
      autoExpand = false,
      id,
      ...props
    },
    ref
  ) => {
    const [textareaId, setTextareaId] = useState<string>("");

    // Generate ID only on client side to avoid hydration mismatch
    useEffect(() => {
      if (!id) {
        setTextareaId(`textarea-${Math.random().toString(36).substr(2, 9)}`);
      }
    }, [id]);

    const finalTextareaId = id || textareaId;
    const hasError = !!error;
    const hasSuccess = success && !hasError;
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const baseStyles =
      "flex min-h-[40px] w-full rounded-lg border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-hint focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

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

    // Auto-expand functionality
    useEffect(() => {
      if (!autoExpand || !textareaRef.current) return;

      const textarea = textareaRef.current;

      const adjustHeight = () => {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = "auto";
        // Get the computed minimum height from CSS
        const computedStyle = window.getComputedStyle(textarea);
        const minHeight = parseInt(computedStyle.minHeight) || 40; // fallback to 40px
        // Set height to the larger of scrollHeight or minHeight
        const newHeight = Math.max(textarea.scrollHeight, minHeight);
        textarea.style.height = `${newHeight}px`;
      };

      // Initial adjustment with a small delay to ensure CSS is applied
      const timeoutId = setTimeout(adjustHeight, 10);

      // Add event listener for input changes
      textarea.addEventListener("input", adjustHeight);

      // Cleanup
      return () => {
        clearTimeout(timeoutId);
        textarea.removeEventListener("input", adjustHeight);
      };
    }, [autoExpand, textareaRef, props.value]);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={finalTextareaId}
            className="block text-sm font-medium text-text-head mb-2"
          >
            {label}
          </label>
        )}

        <textarea
          className={cn(
            baseStyles,
            getStateStyle(),
            autoExpand ? "resize-none overflow-hidden" : resizeStyles[resize],
            className
          )}
          ref={textareaRef}
          id={finalTextareaId}
          style={autoExpand ? { height: "auto" } : undefined}
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

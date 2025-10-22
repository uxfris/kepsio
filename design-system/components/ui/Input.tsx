import React from "react";
import { cn } from "../../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    const baseStyles =
      "flex h-10 w-full rounded-[var(--radius-lg)] border bg-[var(--color-surface)] px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-hint)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    const stateStyles = {
      default:
        "border-[var(--color-border)] focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)]",
      error:
        "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]",
      success:
        "border-[var(--color-success)] focus:border-[var(--color-success)] focus:ring-1 focus:ring-[var(--color-success)]",
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
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-text-head)] mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-hint)]">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              baseStyles,
              getStateStyle(),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            id={inputId}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-hint)]">
              {rightIcon}
            </div>
          )}
        </div>

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

Input.displayName = "Input";

export { Input };

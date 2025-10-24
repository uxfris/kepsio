import React, { useId } from "react";
import { cn } from "../../lib/utils/cn";

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
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    const baseStyles =
      "flex h-10 w-full rounded-lg border bg-surface px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-hint focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    const stateStyles = {
      default:
        "border-border focus:border-border-focus focus:ring-1 focus:ring-border-focus",
      error: "border-error focus:border-error focus:ring-1 focus:ring-error",
      success:
        "border-success focus:border-success focus:ring-1 focus:ring-success",
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
            className="block text-sm font-medium text-text-head mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hint">
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
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hint">
              {rightIcon}
            </div>
          )}
        </div>

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

Input.displayName = "Input";

export { Input };

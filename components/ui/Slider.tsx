import React from "react";
import { cn } from "../../lib/utils/cn";

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  helperText?: string;
  className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      label,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label className="block text-sm font-medium text-text-head mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-section rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                ((value - min) / (max - min)) * 100
              }%, #e5e7eb ${
                ((value - min) / (max - min)) * 100
              }%, #e5e7eb 100%)`,
            }}
            {...props}
          />
        </div>

        {helperText && <p className="mt-2 text-sm text-hint">{helperText}</p>}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

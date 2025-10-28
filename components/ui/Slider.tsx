import React, { useRef, useEffect } from "react";
import { cn } from "../../lib/utils/cn";

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  onChangeComplete?: (value: number) => void; // Called when user stops dragging
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
      onChangeComplete,
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
    const isDraggingRef = useRef(false);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
      };
    }, []);

    const handleMouseDown = () => {
      isDraggingRef.current = true;
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
      if (isDraggingRef.current && onChangeComplete) {
        isDraggingRef.current = false;

        // Capture the value before the timeout (React events are pooled/nullified)
        const finalValue = parseInt(e.currentTarget.value);

        // Clear any existing timeout to prevent multiple saves
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }

        // Debounce the save to prevent multiple calls
        saveTimeoutRef.current = setTimeout(() => {
          onChangeComplete(finalValue);
          saveTimeoutRef.current = null;
        }, 300);
      }
    };

    const handleTouchStart = () => {
      isDraggingRef.current = true;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
      if (isDraggingRef.current && onChangeComplete) {
        isDraggingRef.current = false;

        // Capture the value before the timeout (React events are pooled/nullified)
        const finalValue = parseInt(e.currentTarget.value);

        // Clear any existing timeout to prevent multiple saves
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }

        // Debounce the save to prevent multiple calls
        saveTimeoutRef.current = setTimeout(() => {
          onChangeComplete(finalValue);
          saveTimeoutRef.current = null;
        }, 300);
      }
    };

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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full h-2 bg-section rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 slider-thumb"
            style={{
              background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${
                ((value - min) / (max - min)) * 100
              }%, var(--color-border) ${
                ((value - min) / (max - min)) * 100
              }%, var(--color-border) 100%)`,
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

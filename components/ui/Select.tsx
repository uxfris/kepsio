"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../lib/utils/cn";

// Select Context
interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select");
  }
  return context;
};

// Select Root
interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, children, disabled = false }, ref) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLElement>(null);

    const contextValue: SelectContextValue = {
      value,
      onValueChange,
      open,
      setOpen: disabled ? () => {} : setOpen,
      triggerRef,
    };

    return (
      <SelectContext.Provider value={contextValue}>
        <div ref={ref} className="relative">
          {children}
        </div>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = "Select";

// Select Trigger
interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  placeholder?: string;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, placeholder, ...props }, ref) => {
    const { open, setOpen, value, triggerRef } = useSelectContext();

    return (
      <button
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          triggerRef.current = node;
        }}
        type="button"
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border border-border bg-surface px-3 py-4 text-sm font-medium text-text-head transition-colors",
          "hover:bg-section-light focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface",
          "data-[state=open]:border-accent data-[state=open]:ring-2 data-[state=open]:ring-accent/20",
          className
        )}
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <span className={cn("truncate", !value && "text-hint")}>
          {value ? children : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-secondary transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

// Select Value
interface SelectValueProps {
  placeholder?: string;
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder }, ref) => {
    const { value } = useSelectContext();

    return (
      <span ref={ref} className={cn("truncate", !value && "text-hint")}>
        {value || placeholder}
      </span>
    );
  }
);

SelectValue.displayName = "SelectValue";

// Select Content
interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  position?: "item-aligned" | "popper";
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => {
    const { open, setOpen, triggerRef } = useSelectContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [positionStyle, setPositionStyle] =
      React.useState<React.CSSProperties>({});

    // Calculate position for portal
    React.useEffect(() => {
      if (open && triggerRef.current && contentRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();

        setPositionStyle({
          position: "fixed",
          top: triggerRect.bottom + window.scrollY + 4,
          left: triggerRect.left + window.scrollX,
          width: triggerRect.width,
          zIndex: 50,
        });
      }
    }, [open, triggerRef]);

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [open, setOpen]);

    // Close on escape key
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener("keydown", handleEscape);
        return () => {
          document.removeEventListener("keydown", handleEscape);
        };
      }
    }, [open, setOpen]);

    if (!open) return null;

    const content = (
      <div
        ref={contentRef}
        style={positionStyle}
        className={cn(
          "min-w-32 overflow-hidden rounded-xl border border-border bg-surface shadow-lg",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        <div className="p-1">{children}</div>
      </div>
    );

    // Use portal to render outside of clipped containers
    return typeof window !== "undefined"
      ? createPortal(content, document.body)
      : null;
  }
);

SelectContent.displayName = "SelectContent";

// Select Item
interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled = false, ...props }, ref) => {
    const { value: selectedValue, onValueChange, setOpen } = useSelectContext();
    const isSelected = selectedValue === value;

    const handleClick = () => {
      if (!disabled) {
        onValueChange(value);
        setOpen(false);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-colors",
          "hover:bg-section-light focus:bg-section-light focus:outline-none",
          "data-disabled:pointer-events-none data-disabled:opacity-50",
          isSelected && "bg-section text-text-head",
          !isSelected && "text-text-body",
          disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
          className
        )}
        data-disabled={disabled ? "" : undefined}
        data-state={isSelected ? "checked" : "unchecked"}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="option"
        aria-selected={isSelected}
        {...props}
      >
        <span className="flex-1 truncate">{children}</span>
        {isSelected && <Check className="ml-2 h-4 w-4 text-accent" />}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";

// Select Group
interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-1", className)} role="group" {...props}>
        {children}
      </div>
    );
  }
);

SelectGroup.displayName = "SelectGroup";

// Select Label
interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-3 py-2 text-xs font-semibold text-hint uppercase tracking-wider",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectLabel.displayName = "SelectLabel";

// Select Separator
interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-1 my-1 h-px bg-border", className)}
        {...props}
      />
    );
  }
);

SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
};

export type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
};

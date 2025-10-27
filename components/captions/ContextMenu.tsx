import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { CONTEXT_OPTIONS } from "../../lib/utils/constants";

interface ContextMenuProps {
  isOpen: boolean;
  selectedItems: string[];
  onItemToggle: (itemId: string) => void;
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
  plusButtonRef: React.RefObject<HTMLButtonElement>;
}

interface Position {
  top: number;
  left: number;
}

export const ContextMenu = ({
  isOpen,
  selectedItems,
  onItemToggle,
  onClose,
  menuRef,
  plusButtonRef,
}: ContextMenuProps) => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  // Calculate position relative to the plus button
  const calculatePosition = () => {
    if (!plusButtonRef.current) return;

    const buttonRect = plusButtonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Menu dimensions (approximate)
    const menuWidth = 256; // w-64 = 16rem = 256px
    const menuHeight = 200; // Approximate height

    let left = buttonRect.left;
    let top = buttonRect.bottom + 8; // 8px gap below button

    // Adjust horizontal position if menu would overflow viewport
    if (left + menuWidth > viewportWidth) {
      left = buttonRect.right - menuWidth;
    }

    // Adjust vertical position if menu would overflow viewport
    if (top + menuHeight > viewportHeight) {
      top = buttonRect.top - menuHeight - 8; // Show above button instead
    }

    // Ensure menu doesn't go off-screen on the left
    if (left < 8) {
      left = 8;
    }

    setPosition({ top, left });
  };

  // Handle click outside to close menu
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        plusButtonRef.current &&
        !plusButtonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Recalculate position when menu opens, window resizes, or layout changes
  useEffect(() => {
    if (isOpen) {
      calculatePosition();

      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      // Use ResizeObserver to detect layout changes (like sidebar toggle)
      const resizeObserver = new ResizeObserver(() => {
        calculatePosition();
      });

      // Observe the document body for layout changes
      resizeObserver.observe(document.body);

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      // Also recalculate after a short delay to catch any delayed layout changes
      const timeoutId = setTimeout(calculatePosition, 100);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
        resizeObserver.disconnect();
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-9999 w-64 space-y-1 bg-white border border-gray-200 rounded-xl shadow-xl p-1"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {CONTEXT_OPTIONS.map((option) => {
        const IconComponent = option.icon;
        const isSelected = selectedItems.includes(option.id);

        return (
          <button
            key={option.id}
            onClick={() => onItemToggle(option.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
              isSelected
                ? "bg-section text-text-head"
                : "text-text-head hover:bg-section"
            }`}
          >
            <div className="bg-section-light rounded-sm p-1">
              <IconComponent
                className={`w-[14px] h-[14px] ${
                  isSelected ? "text-primary" : "text-text-body"
                }`}
              />
            </div>
            <span
              className={`flex-1 text-left font-medium text-sm ${
                isSelected ? "text-text-head" : "text-text-body"
              }`}
            >
              {option.label}
            </span>
            {isSelected && (
              <div className="p-1 bg-section rounded-full">
                <Check className="w-3 h-3 text-text-head" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

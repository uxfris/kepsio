import React from "react";
import { Check } from "lucide-react";
import { CONTEXT_OPTIONS } from "../../lib/utils/constants";

interface ContextMenuProps {
  isOpen: boolean;
  selectedItems: string[];
  onItemToggle: (itemId: string) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export const ContextMenu = ({
  isOpen,
  selectedItems,
  onItemToggle,
  menuRef,
}: ContextMenuProps) => {
  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute z-9999 mb-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-1"
      style={{
        top: "9%",
        left: "32px",
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
            <span className="flex-1 text-left font-medium text-sm">
              {option.label}
            </span>
            {isSelected && (
              <div className="p-1 bg-section rounded-full">
                <Check className="w-3 h-3 text-primary" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

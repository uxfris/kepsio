import React from "react";
import { X } from "lucide-react";
import { CONTEXT_OPTIONS } from "../../lib/utils/constants";

interface SelectedContextItemsProps {
  selectedContextItems: string[];
  onRemoveItem: (itemId: string) => void;
}

export const SelectedContextItems = ({
  selectedContextItems,
  onRemoveItem,
}: SelectedContextItemsProps) => {
  if (selectedContextItems.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 py-4 px-2 bg-section">
      {selectedContextItems.map((itemId) => {
        const option = CONTEXT_OPTIONS.find((opt) => opt.id === itemId);
        if (!option) return null;
        const IconComponent = option.icon;

        return (
          <div
            key={itemId}
            className="inline-flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-xl text-sm"
          >
            <div className="p-1 bg-section-light rounded">
              <IconComponent className="w-[14px] h-[14px] text-text-body" />
            </div>
            <span className="text-text-head font-medium text-sm">
              {option.label}
            </span>
            <button
              onClick={() => onRemoveItem(itemId)}
              className="p-1 hover:bg-section-light rounded transition-colors"
            >
              <X className="w-[14px] h-[14px] text-text-body" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

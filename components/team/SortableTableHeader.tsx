"use client";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export type SortDirection = "asc" | "desc" | null;

interface SortableTableHeaderProps {
  label: string;
  sortKey: string;
  currentSortKey: string | null;
  currentSortDirection: SortDirection;
  onSort: (key: string) => void;
  align?: "left" | "right";
}

export function SortableTableHeader({
  label,
  sortKey,
  currentSortKey,
  currentSortDirection,
  onSort,
  align = "left",
}: SortableTableHeaderProps) {
  const isActive = currentSortKey === sortKey;
  const alignClass = align === "right" ? "text-right" : "text-left";

  return (
    <th
      className={`px-6 py-3 ${alignClass} text-xs font-medium text-text-body uppercase tracking-wider cursor-pointer hover:bg-section-light transition-colors group`}
      onClick={() => onSort(sortKey)}
    >
      <div
        className={`flex items-center gap-2 ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        <span>{label}</span>
        <div className="w-4 h-4">
          {isActive ? (
            currentSortDirection === "asc" ? (
              <ArrowUp className="w-4 h-4 text-accent" />
            ) : (
              <ArrowDown className="w-4 h-4 text-accent" />
            )
          ) : (
            <ArrowUpDown className="w-4 h-4 text-text-body opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </th>
  );
}

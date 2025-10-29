"use client";

import { cn } from "@/lib/utils/cn";

export type TabType = "members" | "shared" | "pending";

interface Tab {
  id: TabType;
  label: string;
  count: number;
}

interface TeamTabsProps {
  activeTab: TabType;
  tabs: Tab[];
  onTabChange: (tab: TabType) => void;
}

export function TeamTabs({ activeTab, tabs, onTabChange }: TeamTabsProps) {
  return (
    <div className="flex gap-1 border-b border-border px-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2.5 font-medium text-sm transition-colors relative",
            activeTab === tab.id
              ? "text-accent"
              : "text-text-body hover:text-primary"
          )}
        >
          {tab.label}
          {tab.count > 0 && (
            <span
              className={cn(
                "ml-2 px-2 py-0.5 rounded-full text-xs",
                activeTab === tab.id
                  ? "bg-accent/10 text-accent"
                  : "bg-section text-text-body"
              )}
            >
              {tab.count}
            </span>
          )}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></div>
          )}
        </button>
      ))}
    </div>
  );
}

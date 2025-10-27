import React from "react";

interface VoiceStatCardProps {
  icon: string;
  title: string;
  value: string;
  subtitle?: string;
  variant?: "accent" | "primary" | "info" | "success";
}

export const VoiceStatCard: React.FC<VoiceStatCardProps> = React.memo(
  ({ icon, title, value, subtitle, variant = "accent" }) => {
    const bgColorMap = {
      accent: "bg-accent/10",
      primary: "bg-primary/10",
      info: "bg-info/10",
      success: "bg-success/10",
    };

    return (
      <div className="p-6 bg-section rounded-xl border border-border">
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`w-6 h-6 ${bgColorMap[variant]} rounded-lg flex items-center justify-center`}
          >
            <span className="text-xs">{icon}</span>
          </div>
          <p className="text-sm font-medium text-text-head">{title}</p>
        </div>
        <p className="text-2xl font-bold text-text-head mb-1">{value}</p>
        {subtitle && <p className="text-xs text-text-body">{subtitle}</p>}
      </div>
    );
  }
);

VoiceStatCard.displayName = "VoiceStatCard";

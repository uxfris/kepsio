import React from "react";
import { cn } from "../../lib/utils/cn";
import { SocialIcon } from "react-social-icons";

export interface BadgeProps {
  variant?: "platform" | "style" | "status" | "default";
  platform?: "instagram" | "linkedin" | "x" | "facebook" | "tiktok";
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  platform,
  children,
  className,
  size = "md",
}) => {
  const baseStyles =
    "inline-flex items-center gap-1.5 font-semibold rounded-lg border transition-all";

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  const variantStyles = {
    default: "bg-surface text-text-body border-border",
    style: "bg-surface text-text-body border-border",
    status: "bg-green-50 text-green-600 border-green-200",
    platform: getPlatformStyles(platform),
  };

  const iconSize = size === "sm" ? 14 : size === "md" ? 16 : 18;

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {variant === "platform" && platform && (
        <SocialIcon
          network={platform}
          style={{ width: iconSize, height: iconSize }}
        />
      )}
      {children || (platform && <span className="capitalize">{platform}</span>)}
    </span>
  );
};

function getPlatformStyles(platform?: string): string {
  const styles: Record<string, string> = {
    instagram: "bg-pink-50 text-pink-600 border-pink-200",
    linkedin: "bg-blue-50 text-blue-600 border-blue-200",
    x: "bg-gray-100 text-gray-600 border-gray-200",
    facebook: "bg-blue-50 text-blue-600 border-blue-200",
    tiktok: "bg-gray-100 text-gray-900 border-gray-200",
  };
  return styles[platform || ""] || "bg-gray-100 text-gray-600 border-gray-200";
}

export default Badge;

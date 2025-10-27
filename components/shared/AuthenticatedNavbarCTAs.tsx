"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, LayoutDashboard, User } from "lucide-react";
import { signOut } from "../../lib/supabase/auth-utils";

interface AuthenticatedNavbarCTAsProps {
  user: {
    email?: string;
    user_metadata?: {
      avatar_url?: string;
      full_name?: string;
    };
  };
}

export default function AuthenticatedNavbarCTAs({
  user,
}: AuthenticatedNavbarCTAsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdown when clicking outside on mobile
  useEffect(() => {
    if (!isMobile || !isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isDropdownOpen]);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Don't use mouse leave on mobile

    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
    setDropdownTimeout(timeout);
  };

  const handleMouseEnter = () => {
    if (isMobile) return; // Don't use mouse enter on mobile

    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  // Handle button click (for mobile tap or desktop click)
  const handleButtonClick = () => {
    if (isMobile) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const getInitials = (email?: string) => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  const avatarUrl = user.user_metadata?.avatar_url;
  const initials = getInitials(user.email);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-section hover:bg-section-light transition-colors focus:outline-none "
        aria-expanded={isDropdownOpen}
        aria-label="User menu"
      >
        {/* Label */}
        <span className="text-sm font-medium text-text-head">Dashboard</span>
        {/* Avatar */}
        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-surface overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user.email || "User avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-surface border border-border z-1000">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-text-head truncate">
              {user.user_metadata?.full_name || "User"}
            </p>
            <p className="text-xs text-text-body truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <Link
            href="/dashboard"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-text-body hover:bg-section-light hover:text-text-head transition-colors group"
          >
            <LayoutDashboard className="w-4 h-4 group-hover:text-primary" />
            <span>Go to Dashboard</span>
          </Link>

          <Link
            href="/settings/account"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-text-body hover:bg-section-light hover:text-text-head transition-colors group"
          >
            <User className="w-4 h-4 group-hover:text-primary" />
            <span>Account Settings</span>
          </Link>

          {/* Divider */}
          <div className="border-t border-border"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-text-body hover:bg-section-light hover:text-text-head transition-colors group"
          >
            <LogOut className="w-4 h-4 group-hover:text-red-500" />
            <span className="group-hover:text-red-500">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

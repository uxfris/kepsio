"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavItem[];
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  variant?: "default" | "transparent" | "elevated";
  position?: "static" | "sticky" | "fixed";
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      brand,
      items = [],
      actions,
      variant = "default",
      position = "sticky",
      ...props
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const baseStyles = "w-full border-b border-border bg-surface";

    const variants = {
      default: "",
      transparent: "bg-transparent border-transparent",
      elevated: "shadow-sm",
    };

    const positions = {
      static: "static",
      sticky: "sticky top-0 z-50",
      fixed: "fixed top-0 z-50",
    };

    return (
      <nav
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          positions[position],
          className
        )}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <div className="flex items-center">{brand}</div>

            {/* Desktop Navigation */}
            {items.length > 0 && (
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {items.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        item.active
                          ? "bg-bg-highlight text-text-head"
                          : "text-text-body hover:bg-bg-highlight hover:text-text-head"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="hidden md:block">{actions}</div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-text-body hover:bg-bg-highlight hover:text-text-head focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && items.length > 0 && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
                {items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                      item.active
                        ? "bg-bg-highlight text-text-head"
                        : "text-text-body hover:bg-bg-highlight hover:text-text-head"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                {actions && (
                  <div className="pt-4 pb-3 border-t border-border">
                    {actions}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

export { Navbar };

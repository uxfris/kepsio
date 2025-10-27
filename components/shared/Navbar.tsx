"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils/cn";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavItem[];
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: React.ReactNode;
  items?: readonly NavItem[];
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      const updateMobileMenu = () => {
        if (window.innerWidth > 768) {
          setIsMobileMenuOpen(false);
        }
      };

      window.addEventListener("resize", updateMobileMenu);
      return () => window.removeEventListener("resize", updateMobileMenu);
    }, []);

    const baseStyles = "transition-all duration-300 ease-in-out";

    const flatStyles = "w-full border-b border-border bg-section";
    const floatingStyles =
      "max-w-2xl mx-auto px-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg";

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
          positions[position],
          isScrolled ? floatingStyles : flatStyles,
          isScrolled && "top-4 left-4 right-4",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-between",
            isScrolled
              ? "px-6 py-3"
              : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16"
          )}
        >
          {/* Brand */}
          <div className="flex items-center">{brand}</div>

          {/* Desktop Navigation */}
          {items.length > 0 && (
            <div className="hidden md:block">
              <div
                className={cn(
                  "flex items-baseline space-x-4",
                  isScrolled && "space-x-2"
                )}
              >
                {items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isScrolled && "px-2 py-1 text-xs",
                      item.active
                        ? "bg-section-light text-text-head"
                        : "text-text-body hover:bg-section-light hover:text-text-head"
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
              className="inline-flex items-center justify-center rounded-md p-2 text-text-body hover:bg-section-light hover:text-text-head focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
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
                      ? "bg-section-light text-text-head"
                      : "text-text-body hover:bg-section-light hover:text-text-head"
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
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

export { Navbar };

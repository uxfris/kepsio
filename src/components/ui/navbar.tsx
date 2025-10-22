"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { NavbarProps } from "@/lib/types";
import { Button } from "./Button";

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      brand,
      items = [],
      actions,
      mobileMenuOpen = false,
      onMobileMenuToggle,
      ...props
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(mobileMenuOpen);

    const handleMobileMenuToggle = () => {
      const newState = !isMobileMenuOpen;
      setIsMobileMenuOpen(newState);
      onMobileMenuToggle?.();
    };

    return (
      <nav
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <div className="flex items-center">
              {brand && (
                <div className="flex-shrink-0">
                  {brand}
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                      {
                        "bg-background-highlight text-text-head": item.active,
                        "text-text-body hover:text-text-head hover:bg-background-highlight": !item.active,
                        "opacity-50 cursor-not-allowed": item.disabled,
                      }
                    )}
                    aria-current={item.active ? "page" : undefined}
                    tabIndex={item.disabled ? -1 : undefined}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                {actions}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-text-body hover:bg-background-highlight hover:text-text-head focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={handleMobileMenuToggle}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 border-t border-border bg-surface px-2 pt-2 pb-3 sm:px-3">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200",
                    {
                      "bg-background-highlight text-text-head": item.active,
                      "text-text-body hover:text-text-head hover:bg-background-highlight": !item.active,
                      "opacity-50 cursor-not-allowed": item.disabled,
                    }
                  )}
                  aria-current={item.active ? "page" : undefined}
                  tabIndex={item.disabled ? -1 : undefined}
                >
                  {item.label}
                </a>
              ))}
              {actions && (
                <div className="pt-4 pb-3 border-t border-border">
                  <div className="flex items-center px-3">
                    {actions}
                  </div>
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

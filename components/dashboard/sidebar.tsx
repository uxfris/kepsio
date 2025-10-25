"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Plus,
  BookOpen,
  BarChart3,
  Mic,
  Users,
  Zap,
  Settings,
  PanelLeft,
  ArrowLeftToLine,
  Crown,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import ProBadge from "./ProBadge";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "New Caption", href: "/generate", icon: Plus },
  { name: "Saved Library", href: "/library", icon: BookOpen },
  { name: "Analytics", href: "/analytics", icon: BarChart3, isPro: true },
  { name: "Brand Voice", href: "/brand-voice", icon: Mic },
  { name: "Team", href: "/team", icon: Users, isPro: true },
  { name: "Integrations", href: "/integrations", icon: Zap, isPro: true },
  { name: "Settings", href: "/settings", icon: Settings, isDivider: true },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isOpen]);

  // Keyboard shortcut for toggling sidebar (Cmd + .)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === ".") {
        event.preventDefault();
        onToggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onToggle]);

  const MenuItem = ({
    item,
    isCollapsed,
  }: {
    item: any;
    isCollapsed: boolean;
  }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        className={`group relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-accent text-white shadow-sm"
            : "text-text-body hover:bg-section-light hover:text-primary"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        <Icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"} shrink-0`} />
        {!isCollapsed && <span className="truncate">{item.name}</span>}
        {item.isPro && !isCollapsed && (
          <Crown className="h-3 w-3 ml-auto text-accent" />
        )}
        {item.isPro && isCollapsed && (
          <div className="absolute -top-1 -right-1">
            <Crown className="h-3 w-3 text-accent" />
          </div>
        )}
        {!isCollapsed && (
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-200 ${
              isActive ? "bg-white" : "bg-transparent"
            }`}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isMobile ? 280 : isOpen ? 280 : 80,
          x: isMobile ? (isOpen ? 0 : -280) : 0, // Slide out completely on mobile when closed
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={`min-h-screen fixed left-0 top-0 h-full bg-section border-r border-border z-50 flex flex-col group lg:relative lg:translate-x-0 overflow-hidden ${
          isOpen ? "lg:relative" : "lg:relative"
        }`}
      >
        {/* Header */}
        <div className="flex items-center py-3 px-5 bg-section">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center w-full"
              >
                <button
                  onClick={onToggle}
                  className="p-2 rounded-lg hover:bg-section-light transition-colors duration-200 border border-border group/button mr-3"
                >
                  <PanelLeft className="h-4 w-4 text-text-body group-hover/button:hidden" />
                  <ArrowLeftToLine className="h-4 w-4 text-text-body hidden group-hover/button:block" />
                </button>
                <h2 className="text-lg font-semibold text-primary tracking-tight">
                  Kepsio
                </h2>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full"
              >
                <div className="relative group/button">
                  <button
                    onClick={onToggle}
                    className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center transition-all duration-200 border border-border group-hover:bg-section-light"
                  >
                    <span className="text-white font-bold text-sm group-hover:hidden">
                      K
                    </span>
                    <PanelLeft className="h-4 w-4 text-text-body hidden group-hover:block" />
                  </button>

                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover/button:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    Toggle sidebar{" "}
                    <span className="text-gray-400 ml-1">⌘.</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => (
            <div key={item.name}>
              {item.isDivider && index > 0 && (
                <div className="my-4">
                  <div className="h-px bg-border" />
                </div>
              )}
              <MenuItem item={item} isCollapsed={isMobile ? false : !isOpen} />
            </div>
          ))}
        </nav>

        {/* Pro Badge */}
        <ProBadge isCollapsed={isMobile ? false : !isOpen} />
      </motion.aside>
    </>
  );
}

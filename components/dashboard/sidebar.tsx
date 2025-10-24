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
  ChevronLeft,
  ChevronRight,
  Crown,
} from "lucide-react";
import { useState } from "react";

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
];

const settingsNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

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
          width: isOpen ? 280 : 80,
          x: 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={`min-h-screen fixed left-0 top-0 h-full bg-section border-r border-border z-50 flex flex-col ${
          isOpen ? "lg:relative" : "lg:relative"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-section">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
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
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-section-light transition-colors duration-200 border border-border group"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4 text-text-body" />
            ) : (
              <ChevronRight className="h-4 w-4 text-text-body" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-6 space-y-2">
          {navigation.map((item) => (
            <MenuItem key={item.name} item={item} isCollapsed={!isOpen} />
          ))}
        </nav>

        {/* Divider */}
        <div className="px-6">
          <div className="h-px bg-border" />
        </div>

        {/* Settings */}
        <div className="px-6 py-4 space-y-2">
          {settingsNavigation.map((item) => (
            <MenuItem key={item.name} item={item} isCollapsed={!isOpen} />
          ))}
        </div>

        {/* Pro Badge */}
        <div className="px-6 py-4 border-t border-border">
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-surface rounded-xl border border-border p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      Upgrade to Pro
                    </p>
                    <p className="text-xs text-text-body">
                      Unlock all features
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center border border-border">
                  <Crown className="h-5 w-5 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}

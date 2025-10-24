"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Bell,
  CreditCard,
  Shield,
  Palette,
  ChevronRight,
} from "lucide-react";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const settingsTabs = [
    { id: "account", label: "Account", icon: User, href: "/settings/account" },
    {
      id: "voice",
      label: "Brand Voice",
      icon: Palette,
      href: "/settings/voice",
    },
    {
      id: "notification",
      label: "Notifications",
      icon: Bell,
      href: "/settings/notification",
    },
    {
      id: "billing",
      label: "Billing & Plan",
      icon: CreditCard,
      href: "/settings/billing",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      href: "/settings/security",
    },
  ];

  return (
    <div className="min-h-screen bg-section flex">
      {/* Settings Sidebar */}
      <div className="w-72 bg-surface border-r border-border">
        <div className="px-6 py-6 border-b border-border">
          <h1 className="text-2xl font-display font-bold text-primary">
            Settings
          </h1>
          <p className="text-sm text-hint mt-1">
            Manage your account and preferences
          </p>
        </div>

        <nav className="px-4 py-4">
          <div className="space-y-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-text-body hover:bg-section-light"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span
                      className={`font-medium ${
                        isActive ? "font-semibold" : ""
                      }`}
                    >
                      {tab.label}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isActive ? "text-accent" : "text-hint"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto bg-section">
        <div className="max-w-3xl mx-auto px-8 py-8">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;

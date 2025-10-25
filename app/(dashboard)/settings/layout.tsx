"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Bell,
  CreditCard,
  Shield,
  ChevronRight,
  Settings as SettingsIcon,
} from "lucide-react";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const settingsTabs = [
    {
      id: "account",
      label: "Account",
      icon: User,
      href: "/settings/account",
      description: "Personal information and profile",
    },
    {
      id: "notification",
      label: "Notifications",
      icon: Bell,
      href: "/settings/notification",
      description: "Email and alert preferences",
    },
    {
      id: "billing",
      label: "Billing & Plan",
      icon: CreditCard,
      href: "/settings/billing",
      description: "Subscription and payments",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      href: "/settings/security",
      description: "Password and privacy",
    },
  ];

  return (
    <div className="min-h-screen bg-section">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-primary tracking-tight">
                Settings
              </h1>
              <p className="text-sm font-medium text-text-body mt-1">
                Manage your account preferences and security settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-6">
              <div className="space-y-2">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = pathname === tab.href;
                  return (
                    <Link
                      key={tab.id}
                      href={tab.href}
                      className={`group block p-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-accent text-white shadow-lg shadow-accent/25"
                          : "bg-surface border border-border hover:border-accent/30 hover:shadow-md hover:bg-section-light"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            isActive
                              ? "bg-white/20"
                              : "bg-accent/10 group-hover:bg-accent/20"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isActive ? "text-white" : "text-accent"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-semibold text-sm ${
                              isActive ? "text-white" : "text-primary"
                            }`}
                          >
                            {tab.label}
                          </div>
                          <div
                            className={`text-xs mt-0.5 ${
                              isActive ? "text-white/80" : "text-hint"
                            }`}
                          >
                            {tab.description}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? "text-white" : "text-hint"
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="animate-fade-in">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;

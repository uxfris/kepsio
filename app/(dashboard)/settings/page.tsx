"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  Bell,
  CreditCard,
  Shield,
  ArrowRight,
  Settings as SettingsIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";

export default function SettingsPage() {
  const settingsSections = [
    {
      id: "account",
      title: "Account",
      description: "Manage your personal information and profile settings",
      icon: User,
      href: "/settings/account",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Control how and when you receive updates",
      icon: Bell,
      href: "/settings/notification",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "billing",
      title: "Billing & Plan",
      description: "View your subscription and payment information",
      icon: CreditCard,
      href: "/settings/billing",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "security",
      title: "Security",
      description: "Protect your account with security settings",
      icon: Shield,
      href: "/settings/security",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-accent" />
          Settings Overview
        </h2>
        <p className="text-sm font-medium text-text-body">
          Manage your account preferences and security settings
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.id} href={section.href}>
              <Card
                variant="outlined"
                className="group hover:shadow-md transition-all duration-200 hover:border-accent/30"
              >
                <CardContent padding="lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${section.bgColor} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${section.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary text-sm mb-1 group-hover:text-accent transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-xs text-hint">{section.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-hint group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card variant="outlined" className="bg-section-light/50">
        <CardHeader padding="lg" className="border-b border-border">
          <CardTitle className="text-base font-semibold text-primary">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/settings/account" className="block">
              <div className="p-4 bg-surface rounded-lg border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-primary text-sm">
                      Update Profile
                    </p>
                    <p className="text-xs text-hint">
                      Change your personal info
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/settings/billing" className="block">
              <div className="p-4 bg-surface rounded-lg border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-primary text-sm">
                      View Billing
                    </p>
                    <p className="text-xs text-hint">Check your plan status</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/settings/security" className="block">
              <div className="p-4 bg-surface rounded-lg border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-primary text-sm">
                      Security Check
                    </p>
                    <p className="text-xs text-hint">
                      Review security settings
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Bell, Mail, Calendar, Lightbulb, Zap, Save } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import { Switch } from "../../../../components/ui/Switch";
import { Button } from "../../../../components/ui/Button";

const NotificationSettingsContent = () => {
  // Notification Settings
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [tipsAndTricks, setTipsAndTricks] = useState(false);
  const [productUpdates, setProductUpdates] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSwitchChange =
    (setter: (value: boolean) => void) => (value: boolean) => {
      setter(value);
      setHasChanges(true);
    };

  const handleSave = () => {
    // TODO: Implement save logic
    setHasChanges(false);
  };

  const notificationSettings = [
    {
      icon: Mail,
      title: "Email Notifications",
      description: "Receive notifications about your account activity",
      checked: emailNotifs,
      onChange: handleSwitchChange(setEmailNotifs),
    },
    {
      icon: Calendar,
      title: "Weekly Digest",
      description: "Get a summary of your caption performance each week",
      checked: weeklyDigest,
      onChange: handleSwitchChange(setWeeklyDigest),
    },
    {
      icon: Lightbulb,
      title: "Tips & Tricks",
      description: "Learn how to get the most out of Caption Studio",
      checked: tipsAndTricks,
      onChange: handleSwitchChange(setTipsAndTricks),
    },
    {
      icon: Zap,
      title: "Product Updates",
      description: "Be the first to know about new features",
      checked: productUpdates,
      onChange: handleSwitchChange(setProductUpdates),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent" />
          Notification Preferences
        </h2>
        <p className="text-sm font-medium text-text-body">
          Choose how you want to stay updated
        </p>
      </div>

      {/* Notification Settings */}
      <Card variant="outlined" className="overflow-hidden">
        <CardHeader padding="lg" className="border-b border-border">
          <CardTitle className="text-base font-semibold text-primary">
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent padding="none">
          {notificationSettings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div
                key={index}
                className={`p-6 flex items-center justify-between transition-colors ${
                  index !== notificationSettings.length - 1
                    ? "border-b border-border"
                    : ""
                } hover:bg-section-light/50`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary text-sm mb-1">
                      {setting.title}
                    </h3>
                    <p className="text-xs text-hint">{setting.description}</p>
                  </div>
                </div>
                <Switch checked={setting.checked} onChange={setting.onChange} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card variant="outlined" className="bg-info/5 border-info/20">
        <CardContent padding="lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-4 h-4 text-info" />
            </div>
            <div>
              <h3 className="font-medium text-primary text-sm mb-1">
                Notification Frequency
              </h3>
              <p className="text-xs text-hint">
                You can always change these settings later. We'll respect your
                preferences and only send you the notifications you want.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      {hasChanges && (
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => setHasChanges(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
            className="min-w-[120px]"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default function NotificationSettingsPage() {
  return <NotificationSettingsContent />;
}

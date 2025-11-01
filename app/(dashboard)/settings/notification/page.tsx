"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  Calendar,
  Lightbulb,
  Zap,
  Save,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import { Switch } from "../../../../components/ui/Switch";
import { Button } from "../../../../components/ui/Button";
import { useToast } from "../../../../components/ui/Toast";

interface NotificationPreferences {
  emailNotifications: boolean;
  weeklyDigest: boolean;
  tipsAndTricks: boolean;
  productUpdates: boolean;
}

const NotificationSettingsContent = () => {
  // Notification Settings
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [tipsAndTricks, setTipsAndTricks] = useState(false);
  const [productUpdates, setProductUpdates] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { showToast } = useToast();

  // Fetch preferences on mount
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch("/api/user/notification-preferences");
        if (response.ok) {
          const data = await response.json();
          const prefs = data.preferences;
          setEmailNotifs(prefs.emailNotifications);
          setWeeklyDigest(prefs.weeklyDigest);
          setTipsAndTricks(prefs.tipsAndTricks);
          setProductUpdates(prefs.productUpdates);
        } else {
          showToast("Failed to load notification preferences", "error");
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
        showToast("Failed to load notification preferences", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, [showToast]);

  const handleSwitchChange =
    (setter: (value: boolean) => void, key: keyof NotificationPreferences) =>
    async (value: boolean) => {
      // Update local state immediately for instant feedback
      setter(value);

      // Save to database immediately
      try {
        const preferences: NotificationPreferences = {
          emailNotifications:
            key === "emailNotifications" ? value : emailNotifs,
          weeklyDigest: key === "weeklyDigest" ? value : weeklyDigest,
          tipsAndTricks: key === "tipsAndTricks" ? value : tipsAndTricks,
          productUpdates: key === "productUpdates" ? value : productUpdates,
        };

        const response = await fetch("/api/user/notification-preferences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ preferences }),
        });

        if (response.ok) {
          showToast("Preference updated", "success", 1500);
        } else {
          // Revert on error
          setter(!value);
          showToast("Failed to update preference", "error");
        }
      } catch (error) {
        // Revert on error
        setter(!value);
        console.error("Error updating preference:", error);
        showToast("Failed to update preference", "error");
      }
    };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const preferences: NotificationPreferences = {
        emailNotifications: emailNotifs,
        weeklyDigest: weeklyDigest,
        tipsAndTricks: tipsAndTricks,
        productUpdates: productUpdates,
      };

      const response = await fetch("/api/user/notification-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences }),
      });

      if (response.ok) {
        showToast("Notification preferences saved successfully", "success");
        setHasChanges(false);
      } else {
        showToast("Failed to save preferences", "error");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      showToast("Failed to save preferences", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const notificationSettings = [
    {
      icon: Mail,
      title: "Email Notifications",
      description: "Receive notifications about your account activity",
      checked: emailNotifs,
      onChange: handleSwitchChange(setEmailNotifs, "emailNotifications"),
    },
    {
      icon: Calendar,
      title: "Weekly Digest",
      description: "Get a summary of your caption performance each week",
      checked: weeklyDigest,
      onChange: handleSwitchChange(setWeeklyDigest, "weeklyDigest"),
    },
    {
      icon: Lightbulb,
      title: "Tips & Tricks",
      description: "Learn how to get the most out of Caption Studio",
      checked: tipsAndTricks,
      onChange: handleSwitchChange(setTipsAndTricks, "tipsAndTricks"),
    },
    {
      icon: Zap,
      title: "Product Updates",
      description: "Be the first to know about new features",
      checked: productUpdates,
      onChange: handleSwitchChange(setProductUpdates, "productUpdates"),
    },
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Notification Preferences
          </h2>
          <p className="text-sm font-medium text-text-body">
            Choose how you want to stay updated
          </p>
        </div>
        <Card variant="outlined" className="overflow-hidden mb-0 pb-0">
          <CardContent padding="none">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
      <Card variant="outlined" className="overflow-hidden mb-0 pb-0">
        <CardHeader padding="none" className="border-b border-border pb-4">
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
                className={`py-6 flex items-center justify-between transition-colors ${
                  index !== notificationSettings.length - 1
                    ? "border-b border-border"
                    : ""
                } `}
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

      {/* Save Button */}
      {hasChanges && (
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setHasChanges(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            leftIcon={
              isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )
            }
            className="min-w-[120px]"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default function NotificationSettingsPage() {
  return <NotificationSettingsContent />;
}

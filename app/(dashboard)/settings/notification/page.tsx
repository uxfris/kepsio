"use client";

import React, { useState } from "react";

import { Card, CardContent } from "../../../../components/ui/Card";
import { Switch } from "../../../../components/ui/Switch";

const NotificationSettingsContent = () => {
  // Notification Settings
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [tipsAndTricks, setTipsAndTricks] = useState(false);
  const [productUpdates, setProductUpdates] = useState(true);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-display font-bold text-primary mb-1">
          Notification Preferences
        </h2>
        <p className="text-sm text-hint">Choose how you want to stay updated</p>
      </div>

      <Card variant="outlined" className="divide-y divide-border">
        <CardContent padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-primary mb-1">
                Email Notifications
              </h3>
              <p className="text-sm text-hint">
                Receive notifications about your account activity
              </p>
            </div>
            <Switch checked={emailNotifs} onChange={setEmailNotifs} />
          </div>
        </CardContent>

        <CardContent padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-primary mb-1">Weekly Digest</h3>
              <p className="text-sm text-hint">
                Get a summary of your caption performance each week
              </p>
            </div>
            <Switch checked={weeklyDigest} onChange={setWeeklyDigest} />
          </div>
        </CardContent>

        <CardContent padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-primary mb-1">Tips & Tricks</h3>
              <p className="text-sm text-hint">
                Learn how to get the most out of Caption Studio
              </p>
            </div>
            <Switch checked={tipsAndTricks} onChange={setTipsAndTricks} />
          </div>
        </CardContent>

        <CardContent padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-primary mb-1">Product Updates</h3>
              <p className="text-sm text-hint">
                Be the first to know about new features
              </p>
            </div>
            <Switch checked={productUpdates} onChange={setProductUpdates} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function NotificationSettingsPage() {
  return <NotificationSettingsContent />;
}

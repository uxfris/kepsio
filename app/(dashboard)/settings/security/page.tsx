"use client";

import React from "react";
import { Monitor, Smartphone, Download } from "lucide-react";

import { Button } from "../../../../components/ui/Button";
import { Card, CardContent } from "../../../../components/ui/Card";

const SecuritySettingsContent = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-display font-bold text-primary mb-1">
          Security Settings
        </h2>
        <p className="text-sm text-hint">Keep your account secure</p>
      </div>

      <Card variant="outlined" className="divide-y divide-border">
        <CardContent padding="lg">
          <h3 className="font-medium text-primary mb-1">Change Password</h3>
          <p className="text-sm text-hint mb-4">
            Update your password regularly to keep your account secure
          </p>
          <Button variant="outline">Change Password</Button>
        </CardContent>

        <CardContent padding="lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium text-primary mb-1">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-hint">
                Add an extra layer of security to your account
              </p>
            </div>
            <span className="px-3 py-1 bg-warning/20 text-warning rounded-full text-xs font-medium">
              Not Enabled
            </span>
          </div>
          <Button variant="outline">Enable 2FA</Button>
        </CardContent>

        <CardContent padding="lg">
          <h3 className="font-medium text-primary mb-3">Active Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-section-light rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">
                    MacBook Pro
                  </p>
                  <p className="text-xs text-hint">
                    Bandung, Indonesia • Current session
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 bg-success/20 text-success rounded text-xs font-medium">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-section-light rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">iPhone 14</p>
                  <p className="text-xs text-hint">
                    Bandung, Indonesia • 2 hours ago
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>

        <CardContent padding="lg">
          <h3 className="font-medium text-primary mb-1">Data Export</h3>
          <p className="text-sm text-hint mb-4">
            Download a copy of all your data
          </p>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Request Data Export
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default function SecuritySettingsPage() {
  return <SecuritySettingsContent />;
}


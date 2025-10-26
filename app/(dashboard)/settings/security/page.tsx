"use client";

import React, { useState } from "react";
import {
  Shield,
  Key,
  Smartphone,
  Monitor,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

import { Button } from "../../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";

const SecuritySettingsContent = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);

  const handleChangePassword = () => {
    setIsChangingPassword(true);
    // TODO: Implement password change logic
    setTimeout(() => setIsChangingPassword(false), 2000);
  };

  const handleEnable2FA = () => {
    setIsEnabling2FA(true);
    // TODO: Implement 2FA setup logic
    setTimeout(() => setIsEnabling2FA(false), 2000);
  };

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      location: "Bandung, Indonesia",
      time: "Current session",
      status: "active",
      icon: Monitor,
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
    },
    {
      id: 2,
      device: "iPhone 14",
      location: "Bandung, Indonesia",
      time: "2 hours ago",
      status: "inactive",
      icon: Smartphone,
      iconColor: "text-info",
      iconBg: "bg-info/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          Security Settings
        </h2>
        <p className="text-sm font-medium text-text-body">
          Keep your account secure
        </p>
      </div>

      {/* Password Security */}
      <Card variant="outlined" className="overflow-hidden pb-0">
        <CardHeader padding="none" className="border-b border-border mb-4 pb-4">
          <CardTitle className="text-base font-semibold text-primary flex items-center gap-2">
            <Key className="w-5 h-5 text-accent" />
            Password Security
          </CardTitle>
        </CardHeader>
        <CardContent padding="lg">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-primary text-sm mb-1">
                Change Password
              </h3>
              <p className="text-xs text-hint mb-4">
                Update your password regularly to keep your account secure
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleChangePassword}
                loading={isChangingPassword}
              >
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card variant="outlined" className="overflow-hidden pb-0">
        <CardHeader padding="none" className="border-b border-border mb-4 pb-4">
          <CardTitle className="text-base font-semibold text-primary flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-accent" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent padding="lg" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-medium text-primary text-sm mb-1">
                Two-Factor Authentication
              </h3>
              <p className="text-xs text-hint">
                Add an extra layer of security to your account
              </p>
            </div>
            <span className="px-3 py-1 bg-warning/20 text-warning rounded-full text-xs font-medium">
              Not Enabled
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEnable2FA}
            loading={isEnabling2FA}
          >
            Enable 2FA
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card variant="outlined" className="overflow-hidden">
        <CardHeader padding="none" className="border-b border-border mb-4 pb-4">
          <CardTitle className="text-base font-semibold text-primary flex items-center gap-2">
            <Monitor className="w-5 h-5 text-accent" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent padding="none" className="mt-4">
          <div className="space-y-3">
            {activeSessions.map((session) => {
              const Icon = session.icon;
              return (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-section-light rounded-xl border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${session.iconBg} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${session.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-medium text-primary text-sm">
                        {session.device}
                      </p>
                      <p className="text-xs text-hint">
                        {session.location} • {session.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.status === "active" ? (
                      <span className="px-2 py-1 bg-success/20 text-success rounded text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-hint/20 text-hint rounded text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                    {session.status !== "active" && (
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card variant="outlined" className="overflow-hidden">
        <CardHeader padding="none" className="border-b border-border mb-4 pb-4">
          <CardTitle className="text-base font-semibold text-primary flex items-center gap-2">
            <Download className="w-5 h-5 text-accent" />
            Data Export
          </CardTitle>
        </CardHeader>
        <CardContent padding="none" className="mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-primary text-sm mb-1">
                Data Export
              </h3>
              <p className="text-xs text-hint mb-4">
                Download a copy of all your data including captions, settings,
                and account information
              </p>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
              >
                Request Data Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card
        padding="none"
        variant="outlined"
        className="bg-info/5 border-info/20"
      >
        <CardContent padding="lg" className="mt-4 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-4 h-4 text-info" />
            </div>
            <div>
              <h3 className="font-medium text-primary text-sm mb-1">
                Security Best Practices
              </h3>
              <p className="text-xs text-hint">
                Use a strong, unique password and enable two-factor
                authentication for maximum security. Regularly review your
                active sessions and revoke access from devices you no longer
                use.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function SecuritySettingsPage() {
  return <SecuritySettingsContent />;
}

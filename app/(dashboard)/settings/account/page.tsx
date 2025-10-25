"use client";

import React, { useState } from "react";
import {
  Upload,
  Trash2,
  Save,
  User,
  Mail,
  AtSign,
  AlertTriangle,
} from "lucide-react";

import { Button } from "../../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import { Input } from "../../../../components/ui/Input";
import { ToastProvider, useToast } from "../../../../components/ui/Toast";

const AccountSettingsContent = () => {
  const { addToast } = useToast();

  // Account Settings State
  const [fullName, setFullName] = useState("Sarah Mitchell");
  const [email, setEmail] = useState("sarah.mitchell@email.com");
  const [username, setUsername] = useState("@sarahcreates");
  const [hasChanges, setHasChanges] = useState(false);

  const showSuccessToast = (message: string) => {
    addToast({
      title: "Success",
      description: message,
      type: "success",
    });
  };

  const handleSaveAccount = () => {
    showSuccessToast("Account settings saved successfully");
    setHasChanges(false);
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setHasChanges(true);
    };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
          <User className="w-5 h-5 text-accent" />
          Account Settings
        </h2>
        <p className="text-sm font-medium text-text-body">
          Update your personal information and account details
        </p>
      </div>

      {/* Profile Picture Section */}
      <Card variant="outlined" className="overflow-hidden">
        <CardHeader padding="lg" className="border-b border-border">
          <CardTitle className="text-base font-semibold text-primary">
            Profile Picture
          </CardTitle>
        </CardHeader>
        <CardContent padding="lg">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-linear-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center text-primary text-2xl font-bold shadow-lg">
                SM
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md">
                <Upload className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex gap-3 mb-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
              <p className="text-xs text-hint">
                JPG, PNG or GIF. Max size 5MB. Recommended: 400x400px
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card variant="outlined" className="overflow-hidden">
        <CardHeader padding="lg" className="border-b border-border">
          <CardTitle className="text-base font-semibold text-primary">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent padding="lg" className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Full Name
            </label>
            <Input
              type="text"
              value={fullName}
              onChange={handleInputChange(setFullName)}
              placeholder="Enter your full name"
              className="text-sm"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Email Address
            </label>
            <Input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              placeholder="Enter your email address"
              className="text-sm"
            />
            <p className="text-xs text-hint">
              We'll send account updates and notifications to this email
            </p>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-primary">
              Username
            </label>
            <Input
              type="text"
              value={username}
              onChange={handleInputChange(setUsername)}
              placeholder="Enter your username"
              className="text-sm"
            />
            <p className="text-xs text-hint">
              Your unique identifier across the platform
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card variant="outlined" className="border-error/20 bg-error/5">
        <CardHeader padding="lg" className="border-b border-error/20">
          <CardTitle className="text-base font-semibold text-error flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent padding="lg">
          <div className="space-y-4">
            <p className="text-sm text-error/80">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-error/30 text-error hover:bg-error/10"
            >
              Delete Account
            </Button>
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
            onClick={handleSaveAccount}
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

export default function AccountSettingsPage() {
  return (
    <ToastProvider>
      <AccountSettingsContent />
    </ToastProvider>
  );
}

"use client";

import React, { useState } from "react";
import { Upload, Trash2, Save } from "lucide-react";

import { Button } from "../../../../components/ui/Button";
import { Card, CardContent } from "../../../../components/ui/Card";
import { Input } from "../../../../components/ui/Input";
import { ToastProvider, useToast } from "../../../../components/ui/Toast";

const AccountSettingsContent = () => {
  const { addToast } = useToast();

  // Account Settings State
  const [fullName, setFullName] = useState("Sarah Mitchell");
  const [email, setEmail] = useState("sarah.mitchell@email.com");
  const [username, setUsername] = useState("@sarahcreates");

  const showSuccessToast = (message: string) => {
    addToast({
      title: "Success",
      description: message,
      type: "success",
    });
  };

  const handleSaveAccount = () => {
    showSuccessToast("Account settings saved successfully");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-display font-bold text-primary mb-1">
          Account Settings
        </h2>
        <p className="text-sm text-hint">
          Update your personal information and account details
        </p>
      </div>

      <Card variant="outlined" className="divide-y divide-border">
        {/* Profile Picture */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-3">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-linear-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
              SM
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-1" />
                Upload New
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
          <p className="text-xs text-hint mt-2">
            JPG, PNG or GIF. Max size 5MB.
          </p>
        </CardContent>

        {/* Full Name */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-2">
            Full Name
          </label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </CardContent>

        {/* Email */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-2">
            Email Address
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
          <p className="text-xs text-hint mt-2">
            We'll send account updates and notifications to this email
          </p>
        </CardContent>

        {/* Username */}
        <CardContent padding="lg">
          <label className="block text-sm font-medium text-primary mb-2">
            Username
          </label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <p className="text-xs text-hint mt-2">
            Your unique identifier across the platform
          </p>
        </CardContent>

        {/* Danger Zone */}
        <CardContent padding="lg" className="bg-error/5">
          <h3 className="text-sm font-semibold text-error mb-2">Danger Zone</h3>
          <p className="text-sm text-error/80 mb-3">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button
            variant="accent"
            size="sm"
            className="bg-error hover:bg-error/90 text-white"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleSaveAccount}
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </div>
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


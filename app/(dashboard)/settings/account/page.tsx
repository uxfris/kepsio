"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  Trash2,
  Save,
  User,
  AlertTriangle,
  LogOut,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "../../../../lib/supabase/auth-utils";

import { Button } from "../../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import { Input } from "../../../../components/ui/Input";
import { ToastProvider, useToast } from "../../../../components/ui/Toast";
import { ConfirmDialog } from "../../../../components/shared/ConfirmDialog";

interface UserData {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: string;
}

const AccountSettingsContent = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Account Settings State
  const [userData, setUserData] = useState<UserData | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isRemovingImage, setIsRemovingImage] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user/profile");
      const data = await response.json();

      if (response.ok && data.user) {
        setUserData(data.user);
        setFullName(data.user.name || "");
        setEmail(data.user.email || "");
      } else {
        showToast(data.error || "Failed to load user data", "error");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showToast("Failed to load user data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAccount = async () => {
    if (!userData) return;

    try {
      setIsSaving(true);

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data.user);
        setHasChanges(false);
        showToast(
          data.message || "Account settings saved successfully ✅",
          "success"
        );
      } else {
        showToast(data.error || "Failed to save account settings", "error");
      }
    } catch (error) {
      console.error("Error saving account:", error);
      showToast("Failed to save account settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setHasChanges(true);
    };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/user/profile/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data.user);
        showToast("Profile picture updated successfully ✅", "success");
      } else {
        showToast(data.error || "Failed to upload image", "error");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("Failed to upload image", "error");
    } finally {
      setIsUploadingImage(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = async () => {
    try {
      setIsRemovingImage(true);

      const response = await fetch("/api/user/profile/image", {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data.user);
        showToast("Profile picture removed successfully ✅", "success");
      } else {
        showToast(data.error || "Failed to remove image", "error");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      showToast("Failed to remove image", "error");
    } finally {
      setIsRemovingImage(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);

      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Account deleted successfully ✅", "success");
        router.push("/");
      } else {
        showToast(data.error || "Failed to delete account", "error");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      showToast("Failed to delete account", "error");
    } finally {
      setIsDeletingAccount(false);
      setShowDeleteDialog(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      showToast("You have been successfully logged out ✅");
      router.push("/");
    } catch (error) {
      showToast("Failed to log out. Please try again.", "error");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = () => {
    if (!userData?.name) return "U";
    return userData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <p className="text-sm text-hint">Loading account settings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
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
          <CardHeader
            padding="none"
            className="border-b border-border mb-4 pb-4"
          >
            <CardTitle className="text-base font-semibold text-primary">
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent padding="none">
            <div className="flex items-center gap-6">
              <div className="relative">
                {userData?.image ? (
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-linear-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center text-primary text-2xl font-bold shadow-lg">
                    {getInitials()}
                  </div>
                )}
                {isUploadingImage && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md">
                  <Upload className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex gap-3 mb-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage || isRemovingImage}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploadingImage ? "Uploading..." : "Upload New"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleRemoveImage}
                    disabled={
                      !userData?.image || isUploadingImage || isRemovingImage
                    }
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isRemovingImage ? "Removing..." : "Remove"}
                  </Button>
                </div>
                <p className="text-xs text-hint">
                  JPG, PNG, GIF, or WebP. Max size 5MB. Recommended: 400x400px
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card variant="outlined" className="overflow-hidden">
          <CardHeader padding="none" className="border-b border-border mb-4">
            <CardTitle className="text-base font-semibold text-primary pb-4">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent padding="none" className="space-y-6 mt-4">
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
                disabled={isSaving}
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
                disabled={isSaving}
              />
              <p className="text-xs text-hint">
                We'll send account updates and notifications to this email.
                Changing your email will require verification.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Logout Section */}
        <Card variant="outlined" className="overflow-hidden">
          <CardHeader padding="none" className="border-b border-border pb-4">
            <CardTitle className="text-base font-semibold text-primary flex items-center gap-2">
              <LogOut className="w-5 h-5 text-accent" />
              Session
            </CardTitle>
          </CardHeader>
          <CardContent padding="none" className="mt-4">
            <div className="space-y-3">
              <p className="text-sm text-text-body">
                End your current session and return to the login page.
              </p>
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="outline"
                size="sm"
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card variant="outlined" className="border-error/20 bg-error/5">
          <CardHeader padding="none" className="border-b border-error/20 pb-4">
            <CardTitle className="text-base font-semibold text-error flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent padding="none" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-error/80">
                Once you delete your account, there is no going back. All your
                data, including captions, voice profiles, and subscriptions will
                be permanently deleted.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-error/30 text-error hover:bg-error/10"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeletingAccount}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        {hasChanges && (
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setFullName(userData?.name || "");
                setEmail(userData?.email || "");
                setHasChanges(false);
              }}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAccount}
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

      {/* Delete Account Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        description="Are you absolutely sure you want to delete your account? This action cannot be undone. All your data, including captions, voice profiles, and subscriptions will be permanently deleted."
        confirmText="Delete Account"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeletingAccount}
      />
    </>
  );
};

export default function AccountSettingsPage() {
  return (
    <ToastProvider>
      <AccountSettingsContent />
    </ToastProvider>
  );
}

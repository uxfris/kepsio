"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Key,
  Smartphone,
  Monitor,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "../../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/Card";
import { useToast } from "../../../../components/ui/Toast";
import { createClient } from "../../../../lib/supabase/client";

interface Session {
  id: string;
  device: string;
  location: string;
  time: string;
  status: "active" | "inactive";
  ip?: string;
  userAgent?: string;
}

interface MFAFactor {
  id: string;
  status: string;
  friendlyName?: string;
}

const SecuritySettingsContent = () => {
  const { showToast } = useToast();
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [mfaFactors, setMfaFactors] = useState<MFAFactor[]>([]);
  const [isLoading2FA, setIsLoading2FA] = useState(true);

  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // 2FA modal state
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [factorId, setFactorId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);

  // Fetch sessions on mount
  useEffect(() => {
    fetchSessions();
    fetch2FAStatus();
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoadingSessions(true);
      const response = await fetch("/api/user/sessions");
      const data = await response.json();

      if (response.ok) {
        setActiveSessions(data.sessions || []);
      } else {
        showToast(data.error || "Failed to fetch sessions", "error");
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      showToast("Failed to fetch sessions", "error");
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const fetch2FAStatus = async () => {
    try {
      setIsLoading2FA(true);
      const response = await fetch("/api/user/2fa");
      const data = await response.json();

      if (response.ok) {
        setIs2FAEnabled(data.enabled);
        setMfaFactors(data.factors || []);
      } else {
        showToast(data.error || "Failed to fetch 2FA status", "error");
      }
    } catch (error) {
      console.error("Error fetching 2FA status:", error);
      showToast("Failed to fetch 2FA status", "error");
    } finally {
      setIsLoading2FA(false);
    }
  };

  const handleChangePassword = async () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match", "error");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      showToast("Password must be at least 8 characters long", "error");
      return;
    }

    try {
      setIsChangingPassword(true);
      const response = await fetch("/api/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Password updated successfully", "success");
        setShowPasswordModal(false);
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        showToast(data.error || "Failed to update password", "error");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      showToast("Failed to update password", "error");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleEnable2FA = async () => {
    try {
      setIsEnabling2FA(true);
      const response = await fetch("/api/user/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "enroll" }),
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
        setSecret(data.secret);
        setFactorId(data.factorId);
        setShow2FAModal(true);
      } else {
        showToast(data.error || "Failed to initiate 2FA setup", "error");
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      showToast("Failed to initiate 2FA setup", "error");
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      showToast("Please enter a valid 6-digit code", "error");
      return;
    }

    try {
      setIsVerifying2FA(true);
      const response = await fetch("/api/user/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          factorId,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("2FA enabled successfully", "success");
        setShow2FAModal(false);
        setVerificationCode("");
        setQrCode("");
        setSecret("");
        setFactorId("");
        fetch2FAStatus();
      } else {
        showToast(data.error || "Invalid verification code", "error");
      }
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      showToast("Failed to verify code", "error");
    } finally {
      setIsVerifying2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    if (
      !window.confirm(
        "Are you sure you want to disable 2FA? This will make your account less secure."
      )
    ) {
      return;
    }

    const verifiedFactor = mfaFactors.find((f) => f.status === "verified");
    if (!verifiedFactor) {
      showToast("No active 2FA found", "error");
      return;
    }

    try {
      const response = await fetch("/api/user/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "unenroll",
          factorId: verifiedFactor.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("2FA disabled successfully", "success");
        fetch2FAStatus();
      } else {
        showToast(data.error || "Failed to disable 2FA", "error");
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      showToast("Failed to disable 2FA", "error");
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    if (!window.confirm("Are you sure you want to revoke this session?")) {
      return;
    }

    try {
      const response = await fetch("/api/user/sessions/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Session revoked successfully", "success");
        fetchSessions();
      } else {
        showToast(data.error || "Failed to revoke session", "error");
      }
    } catch (error) {
      console.error("Error revoking session:", error);
      showToast("Failed to revoke session", "error");
    }
  };

  const handleExportData = async () => {
    try {
      showToast("Preparing your data export...", "info");

      const response = await fetch("/api/user/export");

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `kepsio-data-export-${
          new Date().toISOString().split("T")[0]
        }.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showToast("Data exported successfully", "success");
      } else {
        const data = await response.json();
        showToast(data.error || "Failed to export data", "error");
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      showToast("Failed to export data", "error");
    }
  };

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
                onClick={() => setShowPasswordModal(true)}
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
            {isLoading2FA ? (
              <span className="px-3 py-1 bg-hint/20 text-hint rounded-full text-xs font-medium">
                Loading...
              </span>
            ) : (
              <span
                className={`px-3 py-1 ${
                  is2FAEnabled
                    ? "bg-success/20 text-success"
                    : "bg-warning/20 text-warning"
                } rounded-full text-xs font-medium`}
              >
                {is2FAEnabled ? "Enabled" : "Not Enabled"}
              </span>
            )}
          </div>
          {is2FAEnabled ? (
            <Button variant="outline" size="sm" onClick={handleDisable2FA}>
              Disable 2FA
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEnable2FA}
              loading={isEnabling2FA}
            >
              Enable 2FA
            </Button>
          )}
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
          {isLoadingSessions ? (
            <div className="p-4 text-center text-hint">Loading sessions...</div>
          ) : activeSessions.length === 0 ? (
            <div className="p-4 text-center text-hint">
              No active sessions found
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-section-light rounded-xl border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${
                          session.status === "active"
                            ? "bg-accent/10"
                            : "bg-info/10"
                        } rounded-lg flex items-center justify-center`}
                      >
                        <Monitor
                          className={`w-5 h-5 ${
                            session.status === "active"
                              ? "text-accent"
                              : "text-info"
                          }`}
                        />
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
                      <span className="px-2 py-1 bg-success/20 text-success rounded text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-info/5 rounded-lg border border-info/20">
                <p className="text-xs text-hint">
                  <strong className="text-info">Note:</strong> Currently showing
                  your active session. Full session management across multiple
                  devices requires additional configuration.
                </p>
              </div>
            </>
          )}
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
                onClick={handleExportData}
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

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-hint hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-accent pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        current: !showPasswords.current,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-hint hover:text-primary"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-accent pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        new: !showPasswords.new,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-hint hover:text-primary"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-hint mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-accent pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        confirm: !showPasswords.confirm,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-hint hover:text-primary"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleChangePassword}
                  loading={isChangingPassword}
                  className="flex-1"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">
                Enable Two-Factor Authentication
              </h3>
              <button
                onClick={() => {
                  setShow2FAModal(false);
                  setVerificationCode("");
                  setQrCode("");
                  setSecret("");
                  setFactorId("");
                }}
                className="text-hint hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-text-body">
                Scan the QR code below with your authenticator app (Google
                Authenticator, Authy, etc.)
              </p>

              {qrCode && (
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                </div>
              )}

              {secret && (
                <div className="p-3 bg-section-light rounded-lg">
                  <p className="text-xs text-hint mb-1">
                    Or enter this code manually:
                  </p>
                  <p className="text-sm font-mono text-primary break-all">
                    {secret}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) =>
                    setVerificationCode(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-accent text-center text-lg tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                />
                <p className="text-xs text-hint mt-1 text-center">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShow2FAModal(false);
                    setVerificationCode("");
                    setQrCode("");
                    setSecret("");
                    setFactorId("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleVerify2FA}
                  loading={isVerifying2FA}
                  className="flex-1"
                  disabled={verificationCode.length !== 6}
                >
                  Verify & Enable
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SecuritySettingsPage() {
  return <SecuritySettingsContent />;
}

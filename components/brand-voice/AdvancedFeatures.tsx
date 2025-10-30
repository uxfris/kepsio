import React, { useState } from "react";
import { Download, Upload as UploadIcon, Crown, Lock } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { useToast } from "../ui/Toast";
import { FeatureLock } from "../shared/FeatureLock";

interface AdvancedFeaturesProps {
  onExport?: () => void;
  onImport?: () => void;
}

export function AdvancedFeatures({
  onExport,
  onImport,
}: AdvancedFeaturesProps) {
  const { isPro, isEnterprise, isLoading } = useSubscription();
  const { showToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const hasAdvancedAccess = isPro || isEnterprise;

  const handleExport = async () => {
    if (!hasAdvancedAccess) {
      showToast("Voice export requires Pro plan. Upgrade to unlock!", "error");
      return;
    }

    setIsExporting(true);
    try {
      const response = await fetch("/api/brand-voice/export");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to export voice profile");
      }

      const data = await response.json();
      const exportData = data.data;

      // Create a download link
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `voice-profile-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast("Voice profile exported successfully! ✅", "success");
    } catch (error) {
      console.error("Error exporting voice profile:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Failed to export voice profile",
        "error"
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (file: File) => {
    if (!hasAdvancedAccess) {
      showToast("Voice import requires Pro plan. Upgrade to unlock!", "error");
      return;
    }

    setIsImporting(true);
    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      const response = await fetch("/api/brand-voice/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ importData }),
      });

      if (!response.ok) {
        const error = await response.json();

        if (error.requiredPlan === "pro") {
          showToast(
            error.message || "Upgrade to Pro for voice import",
            "error"
          );
          return;
        }

        throw new Error(error.message || "Failed to import voice profile");
      }

      showToast("Voice profile imported successfully! ✅", "success");

      // Refresh page to show imported profile
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error importing voice profile:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Failed to import voice profile",
        "error"
      );
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImport(file);
    }
  };

  if (isLoading) {
    return (
      <Card padding="none">
        <CardContent padding="lg">
          <div className="text-center py-8">
            <div className="text-text-body">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasAdvancedAccess) {
    return (
      <FeatureLock
        icon={Crown}
        title="Unlock Advanced Voice Cloning"
        description="Upgrade to Pro to access advanced voice cloning features including export, import, and A/B testing"
        features={[
          {
            title: "Export Voice Profiles",
            description:
              "Download your voice profile as JSON for backup or transfer",
          },
          {
            title: "Import Voice Profiles",
            description: "Import voice profiles from other accounts or backups",
          },
          {
            title: "A/B Testing Mode",
            description:
              "Test different voice variations and compare performance",
          },
          {
            title: "AI Preview",
            description:
              "Generate authentic previews using your training samples",
          },
        ]}
        requiredPlan="pro"
        fullPage={false}
        className="mt-6"
      />
    );
  }

  return (
    <Card padding="none" className="border-2 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          <CardTitle className="text-base sm:text-lg">
            Advanced Features
          </CardTitle>
        </div>
        <p className="text-xs sm:text-sm text-text-body mt-1.5 sm:mt-2">
          Export, import, and manage your voice profiles
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Button
            variant="outline"
            size="md"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExport}
            loading={isExporting}
            className="w-full"
          >
            {isExporting ? "Exporting..." : "Export Voice"}
          </Button>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="outline"
              size="md"
              leftIcon={<UploadIcon className="w-4 h-4" />}
              onClick={() => fileInputRef.current?.click()}
              loading={isImporting}
              className="w-full"
            >
              {isImporting ? "Importing..." : "Import Voice"}
            </Button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-info/5 border border-info/20 rounded-lg">
          <p className="text-xs text-text-body leading-relaxed">
            💡 <span className="font-medium">Pro Tip:</span> Export your voice
            profile regularly to keep backups. You can import them later or
            share with team members.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

import { useCallback } from "react";
import { useToast } from "../components/ui/Toast";
import type { StylePreferences } from "../types/brand-voice";

interface SaveOnboardingDataParams {
  platformId?: string;
  toneId?: string;
  contentTypeIds?: string[];
  voiceStrength?: number;
  stylePreferences?: StylePreferences;
}

interface UseBrandVoiceActionsProps {
  selectedPlatformId: string;
  selectedToneId: string;
  selectedContentTypes: string[];
  voiceStrength: number;
  refreshVoiceInsights: () => Promise<void>;
}

export function useBrandVoiceActions({
  selectedPlatformId,
  selectedToneId,
  selectedContentTypes,
  voiceStrength,
  refreshVoiceInsights,
}: UseBrandVoiceActionsProps) {
  const { showToast } = useToast();

  const saveOnboardingData = useCallback(
    async ({
      platformId,
      toneId,
      contentTypeIds,
      voiceStrength: newVoiceStrength,
      stylePreferences,
    }: SaveOnboardingDataParams = {}) => {
      try {
        // Only send fields that are explicitly provided to avoid overwriting other fields
        const onboardingData: {
          platformId?: string;
          toneId?: string;
          contentTypeIds?: string[];
          voiceStrength?: number;
          stylePreferences?: StylePreferences;
        } = {};

        if (platformId !== undefined) {
          onboardingData.platformId = platformId;
        }
        if (toneId !== undefined) {
          onboardingData.toneId = toneId;
        }
        if (contentTypeIds !== undefined) {
          onboardingData.contentTypeIds = contentTypeIds;
        }
        if (newVoiceStrength !== undefined) {
          onboardingData.voiceStrength = newVoiceStrength;
        }
        if (stylePreferences !== undefined) {
          onboardingData.stylePreferences = stylePreferences;
        }

        const response = await fetch("/api/user/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            onboardingData,
            onboardingCompleted: true,
          }),
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Failed to save settings" }));

          // Handle voice profile limit errors
          if (errorData.voiceProfileLimitReached) {
            const error = new Error(
              errorData.message || "Voice profile limit exceeded"
            ) as any;
            error.voiceProfileLimitReached = true;
            error.voiceProfiles = errorData.voiceProfiles;
            error.requiredPlan = errorData.requiredPlan;
            throw error;
          }

          throw new Error(errorData.error || "Failed to save settings");
        }
      } catch (error: any) {
        console.error("Error saving onboarding data:", error);

        // Handle voice profile limit errors with upgrade message
        if (error?.voiceProfileLimitReached) {
          showToast(
            `${error.message} Upgrade to ${
              error.requiredPlan === "pro" ? "Pro" : "Enterprise"
            } for more voice profiles.`,
            "error"
          );
        }
      }
    },
    []
  );

  const handleAnalyze = useCallback(async () => {
    try {
      const response = await fetch("/api/brand-voice/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze voice");
      }

      // Refresh voice insights to get the latest analysis
      await refreshVoiceInsights();

      showToast("Voice Updated Successfully! 🎉");
    } catch (error) {
      console.error("Error analyzing voice:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error analyzing your voice. Please try again.";

      showToast(errorMessage, "error");
    }
  }, [showToast, refreshVoiceInsights]);

  const handleAddCaptions = useCallback(
    async (captions: string) => {
      if (!captions.trim()) {
        return false;
      }

      try {
        const response = await fetch("/api/brand-voice/training", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ captions }),
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Failed to add captions" }));

          // Handle voice profile limit errors
          if (errorData.voiceProfileLimitReached) {
            const error = new Error(
              errorData.message || "Voice profile limit exceeded"
            ) as any;
            error.voiceProfileLimitReached = true;
            error.voiceProfiles = errorData.voiceProfiles;
            error.requiredPlan = errorData.requiredPlan;
            throw error;
          }

          throw new Error(errorData.error || "Failed to add captions");
        }

        const data = await response.json();

        showToast(
          `${data.count} caption${
            data.count > 1 ? "s" : ""
          } added to your training data ✅`
        );
        return true;
      } catch (error: any) {
        console.error("Error adding captions:", error);

        // Handle voice profile limit errors with upgrade message
        if (error?.voiceProfileLimitReached) {
          showToast(
            `${error.message} Upgrade to ${
              error.requiredPlan === "pro" ? "Pro" : "Enterprise"
            } for more voice profiles.`,
            "error"
          );
        } else {
          showToast(
            "Could not add captions to training data. Please try again.",
            "error"
          );
        }
        return false;
      }
    },
    [showToast]
  );

  const handleRemoveSample = useCallback(
    async (index: number) => {
      try {
        const response = await fetch(
          `/api/brand-voice/training?index=${index}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to remove sample");
        }

        showToast("Caption sample removed ✅");
        return true;
      } catch (error) {
        console.error("Error removing sample:", error);
        showToast("Could not remove the sample. Please try again.", "error");
        return false;
      }
    },
    [showToast]
  );

  const handleEditSample = useCallback(
    async (index: number, text: string) => {
      try {
        const response = await fetch("/api/brand-voice/training", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ index, text }),
        });

        if (!response.ok) {
          throw new Error("Failed to update sample");
        }

        showToast("Caption sample updated ✅");
        return true;
      } catch (error) {
        console.error("Error updating sample:", error);
        showToast("Could not update the sample. Please try again.", "error");
        return false;
      }
    },
    [showToast]
  );

  return {
    saveOnboardingData,
    handleAnalyze,
    handleAddCaptions,
    handleRemoveSample,
    handleEditSample,
  };
}

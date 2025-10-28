import { useCallback } from "react";
import { useToast } from "../components/ui/Toast";

interface SaveOnboardingDataParams {
  platformId?: string;
  toneId?: string;
  contentTypeIds?: string[];
}

interface UseBrandVoiceActionsProps {
  selectedPlatformId: string;
  selectedToneId: string;
  selectedContentTypes: string[];
  refreshVoiceInsights: () => Promise<void>;
}

export function useBrandVoiceActions({
  selectedPlatformId,
  selectedToneId,
  selectedContentTypes,
  refreshVoiceInsights,
}: UseBrandVoiceActionsProps) {
  const { addToast } = useToast();

  const saveOnboardingData = useCallback(
    async ({
      platformId,
      toneId,
      contentTypeIds,
    }: SaveOnboardingDataParams = {}) => {
      try {
        const response = await fetch("/api/user/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            onboardingData: {
              platformId: platformId ?? selectedPlatformId,
              toneId: toneId ?? selectedToneId,
              contentTypeIds: contentTypeIds ?? selectedContentTypes,
            },
            onboardingCompleted: true,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save settings");
        }

        addToast({
          type: "success",
          title: "Settings Saved",
          description: "Your brand voice settings have been updated.",
        });
      } catch (error) {
        console.error("Error saving onboarding data:", error);
        addToast({
          type: "error",
          title: "Save Failed",
          description: "Could not save your settings. Please try again.",
        });
      }
    },
    [selectedPlatformId, selectedToneId, selectedContentTypes, addToast]
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

      addToast({
        type: "success",
        title: "Voice Updated Successfully! 🎉",
        description: "Your brand voice has been analyzed and updated.",
      });
    } catch (error) {
      console.error("Error analyzing voice:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error analyzing your voice. Please try again.";

      addToast({
        type: "error",
        title: "Analysis Failed",
        description: errorMessage,
      });
    }
  }, [addToast, refreshVoiceInsights]);

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
          throw new Error("Failed to add captions");
        }

        const data = await response.json();

        addToast({
          type: "success",
          title: "Captions Added",
          description: `${data.count} caption${
            data.count > 1 ? "s" : ""
          } added to your training data.`,
        });
        return true;
      } catch (error) {
        console.error("Error adding captions:", error);
        addToast({
          type: "error",
          title: "Failed to Add Captions",
          description:
            "Could not add captions to training data. Please try again.",
        });
        return false;
      }
    },
    [addToast]
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

        addToast({
          type: "success",
          title: "Sample Removed",
          description: "The caption sample has been removed.",
        });
        return true;
      } catch (error) {
        console.error("Error removing sample:", error);
        addToast({
          type: "error",
          title: "Failed to Remove Sample",
          description: "Could not remove the sample. Please try again.",
        });
        return false;
      }
    },
    [addToast]
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

        addToast({
          type: "success",
          title: "Sample Updated",
          description: "The caption sample has been updated.",
        });
        return true;
      } catch (error) {
        console.error("Error updating sample:", error);
        addToast({
          type: "error",
          title: "Failed to Update Sample",
          description: "Could not update the sample. Please try again.",
        });
        return false;
      }
    },
    [addToast]
  );

  return {
    saveOnboardingData,
    handleAnalyze,
    handleAddCaptions,
    handleRemoveSample,
    handleEditSample,
  };
}

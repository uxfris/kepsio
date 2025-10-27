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
}

export function useBrandVoiceActions({
  selectedPlatformId,
  selectedToneId,
  selectedContentTypes,
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500));
      addToast({
        type: "success",
        title: "Voice Updated Successfully! 🎉",
        description: "Your brand voice has been analyzed and updated.",
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Analysis Failed",
        description:
          "There was an error analyzing your voice. Please try again.",
      });
    }
  }, [addToast]);

  const handleAddCaptions = useCallback(
    (captions: string) => {
      if (captions.trim()) {
        addToast({
          type: "success",
          title: "Captions Added",
          description: "Your captions have been added to the training data.",
        });
        return true;
      }
      return false;
    },
    [addToast]
  );

  const handleRemoveSample = useCallback(() => {
    addToast({
      type: "success",
      title: "Sample Removed",
      description: "The caption sample has been removed.",
    });
  }, [addToast]);

  return {
    saveOnboardingData,
    handleAnalyze,
    handleAddCaptions,
    handleRemoveSample,
  };
}

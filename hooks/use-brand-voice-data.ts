import { useState, useEffect } from "react";
import type { OnboardingOptions, VoiceInsights } from "../types/brand-voice";

interface UseBrandVoiceDataReturn {
  onboardingOptions: OnboardingOptions;
  selectedPlatformId: string;
  selectedToneId: string;
  selectedContentTypes: string[];
  voiceInsights: VoiceInsights | null;
  isLoading: boolean;
  error: Error | null;
  setSelectedPlatformId: (id: string) => void;
  setSelectedToneId: (id: string) => void;
  setSelectedContentTypes: (types: string[]) => void;
}

export function useBrandVoiceData(): UseBrandVoiceDataReturn {
  const [onboardingOptions, setOnboardingOptions] = useState<OnboardingOptions>(
    {
      platforms: [],
      brandTones: [],
      contentTypes: [],
    }
  );
  const [selectedPlatformId, setSelectedPlatformId] = useState("");
  const [selectedToneId, setSelectedToneId] = useState("");
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(
    []
  );
  const [voiceInsights, setVoiceInsights] = useState<VoiceInsights | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [optionsResponse, userDataResponse] = await Promise.all([
          fetch("/api/onboarding/options"),
          fetch("/api/user/onboarding"),
        ]);

        if (!optionsResponse.ok) {
          throw new Error("Failed to fetch onboarding options");
        }

        const optionsData = await optionsResponse.json();
        setOnboardingOptions(optionsData);

        // Set defaults from options
        let platformId = optionsData.platforms[0]?.id || "";
        let toneId = optionsData.brandTones[0]?.id || "";
        let contentTypeIds: string[] = [];

        // Override with user data if available
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          platformId = userData.platformId || platformId;
          toneId = userData.toneId || toneId;
          contentTypeIds = userData.contentTypeIds || [];

          // Parse voice insights if available
          if (userData.voiceInsights) {
            try {
              const parsedInsights =
                typeof userData.voiceInsights === "string"
                  ? JSON.parse(userData.voiceInsights)
                  : userData.voiceInsights;
              setVoiceInsights(parsedInsights);
            } catch (e) {
              console.error("Failed to parse voice insights:", e);
            }
          }
        }

        setSelectedPlatformId(platformId);
        setSelectedToneId(toneId);
        setSelectedContentTypes(contentTypeIds);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error("Error fetching brand voice data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    onboardingOptions,
    selectedPlatformId,
    selectedToneId,
    selectedContentTypes,
    voiceInsights,
    isLoading,
    error,
    setSelectedPlatformId,
    setSelectedToneId,
    setSelectedContentTypes,
  };
}

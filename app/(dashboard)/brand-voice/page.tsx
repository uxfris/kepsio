"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Sparkles, FileText, Target } from "lucide-react";

import { UnderlineTabs } from "../../../components/ui/UnderlineTabs";
import { ToastProvider } from "../../../components/ui/Toast";
import {
  OnboardingModal,
  TrainingTab,
  ToneTab,
  InsightsTab,
} from "../../../components/brand-voice";

import { useBrandVoiceData } from "../../../hooks/use-brand-voice-data";
import { useBrandVoiceActions } from "../../../hooks/use-brand-voice-actions";
import { useTrainingSamples } from "../../../hooks/use-training-samples";
import {
  TAB_OPTIONS,
  MOCK_VOICE_INSIGHTS,
} from "../../../lib/constants/brand-voice";
import type { StylePreferences } from "../../../types/brand-voice";

type TabValue = (typeof TAB_OPTIONS)[number]["value"];

const BrandVoiceContent: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState<TabValue>("training");
  const [voiceStrength, setVoiceStrength] = useState(75);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [stylePreferences, setStylePreferences] = useState<StylePreferences>({
    useQuestions: true,
    includeEmojis: true,
    includeCTA: true,
  });

  // Custom hooks
  const {
    onboardingOptions,
    selectedPlatformId,
    selectedToneId,
    selectedContentTypes,
    isLoading,
    setSelectedPlatformId,
    setSelectedToneId,
    setSelectedContentTypes,
  } = useBrandVoiceData();

  const {
    samples: trainingSamples,
    count: uploadedCaptions,
    refreshSamples,
  } = useTrainingSamples();

  const {
    saveOnboardingData,
    handleAnalyze,
    handleAddCaptions,
    handleRemoveSample,
  } = useBrandVoiceActions({
    selectedPlatformId,
    selectedToneId,
    selectedContentTypes,
  });

  // Memoized values
  const selectedTone = useMemo(
    () => onboardingOptions.brandTones.find((t) => t.id === selectedToneId),
    [onboardingOptions.brandTones, selectedToneId]
  );

  // Onboarding handlers
  const handleOnboardingNext = useCallback(() => {
    if (onboardingStep < 3) {
      setOnboardingStep((prev) => prev + 1);
    } else {
      setShowOnboarding(false);
    }
  }, [onboardingStep]);

  const handleOnboardingSkip = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  // Platform/Tone/Content handlers with DB persistence
  const handlePlatformChange = useCallback(
    (platformId: string) => {
      setSelectedPlatformId(platformId);
      saveOnboardingData({ platformId });
    },
    [setSelectedPlatformId, saveOnboardingData]
  );

  const handleToneChange = useCallback(
    (toneId: string) => {
      setSelectedToneId(toneId);
      saveOnboardingData({ toneId });
    },
    [setSelectedToneId, saveOnboardingData]
  );

  const handleContentTypeToggle = useCallback(
    (typeId: string) => {
      const updatedTypes = selectedContentTypes.includes(typeId)
        ? selectedContentTypes.filter((t) => t !== typeId)
        : [...selectedContentTypes, typeId];
      setSelectedContentTypes(updatedTypes);
      saveOnboardingData({ contentTypeIds: updatedTypes });
    },
    [selectedContentTypes, setSelectedContentTypes, saveOnboardingData]
  );

  // Training handlers
  const handleAddCaptionsWithState = useCallback(
    async (captions: string) => {
      const success = await handleAddCaptions(captions);
      if (success) {
        await refreshSamples(); // Refresh the samples list after adding
        return true;
      }
      return false;
    },
    [handleAddCaptions, refreshSamples]
  );

  const handleRemoveSampleWithState = useCallback(
    async (index: number) => {
      const success = await handleRemoveSample(index);
      if (success) {
        await refreshSamples(); // Refresh the samples list after removing
      }
    },
    [handleRemoveSample, refreshSamples]
  );

  return (
    <div className="min-h-screen bg-section">
      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          currentStep={onboardingStep}
          onNext={handleOnboardingNext}
          onSkip={handleOnboardingSkip}
        />
      )}

      {/* Header */}
      <div className="bg-linear-to-r from-surface to-section border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-text-head">
                    Brand Voice
                  </h1>
                  <p className="text-text-body text-base sm:text-lg">
                    Train the AI to write in your unique style
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-text-body">
                    Voice Active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-hint" />
                  <span className="text-sm text-text-body">
                    {uploadedCaptions} training samples
                  </span>
                </div>
                {selectedTone && (
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-hint" />
                    <span className="text-sm text-text-body capitalize">
                      {selectedTone.name} tone
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface border-b border-border px-4 sm:px-6 lg:px-8">
        <UnderlineTabs
          options={TAB_OPTIONS}
          value={activeTab}
          onChange={(value) => setActiveTab(value as TabValue)}
          className="mb-0"
        />
      </div>

      {/* Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "training" && (
          <TrainingTab
            uploadedCaptions={uploadedCaptions}
            trainingSamples={trainingSamples}
            onAddCaptions={handleAddCaptionsWithState}
            onRemoveSample={handleRemoveSampleWithState}
            onAnalyze={handleAnalyze}
            onShowOnboarding={() => setShowOnboarding(true)}
          />
        )}

        {activeTab === "tone" && (
          <ToneTab
            onboardingOptions={onboardingOptions}
            selectedPlatformId={selectedPlatformId}
            selectedToneId={selectedToneId}
            selectedContentTypes={selectedContentTypes}
            voiceStrength={voiceStrength}
            stylePreferences={stylePreferences}
            isLoading={isLoading}
            onPlatformChange={handlePlatformChange}
            onToneChange={handleToneChange}
            onContentTypeToggle={handleContentTypeToggle}
            onVoiceStrengthChange={setVoiceStrength}
            onStylePreferencesChange={setStylePreferences}
          />
        )}

        {activeTab === "insights" && (
          <InsightsTab
            uploadedCaptions={uploadedCaptions}
            voiceInsights={MOCK_VOICE_INSIGHTS}
          />
        )}
      </div>
    </div>
  );
};

const BrandVoicePage: React.FC = () => {
  return (
    <ToastProvider>
      <BrandVoiceContent />
    </ToastProvider>
  );
};

export default BrandVoicePage;

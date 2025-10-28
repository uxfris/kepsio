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
import { TAB_OPTIONS } from "../../../lib/constants/brand-voice";
import type { StylePreferences } from "../../../types/brand-voice";

type TabValue = (typeof TAB_OPTIONS)[number]["value"];

const BrandVoiceContent: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState<TabValue>("training");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Custom hooks
  const {
    onboardingOptions,
    selectedPlatformId,
    selectedToneId,
    selectedContentTypes,
    voiceInsights,
    voiceStrength,
    stylePreferences,
    isLoading,
    setSelectedPlatformId,
    setSelectedToneId,
    setSelectedContentTypes,
    setVoiceStrength,
    setStylePreferences,
    refreshVoiceInsights,
  } = useBrandVoiceData();

  const {
    samples: trainingSamples,
    count: uploadedCaptions,
    isLoading: isLoadingSamples,
    refreshSamples,
  } = useTrainingSamples();

  const {
    saveOnboardingData,
    handleAnalyze,
    handleAddCaptions,
    handleRemoveSample,
    handleEditSample,
  } = useBrandVoiceActions({
    selectedPlatformId,
    selectedToneId,
    selectedContentTypes,
    voiceStrength,
    refreshVoiceInsights,
  });

  // Memoized values
  const selectedTone = useMemo(
    () => onboardingOptions.brandTones.find((t) => t.id === selectedToneId),
    [onboardingOptions.brandTones, selectedToneId]
  );

  // Get contextual voice status
  const voiceStatus = useMemo(() => {
    const isAnalyzed =
      voiceInsights &&
      (voiceInsights.tone || voiceInsights.topPhrases?.length > 0);

    if (uploadedCaptions === 0) {
      return {
        color: "bg-hint",
        text: "Not Started",
        description: "No training samples yet",
      };
    }

    if (!isAnalyzed) {
      if (uploadedCaptions < 3) {
        return {
          color: "bg-warning",
          text: "Training Started",
          description: "Add more samples",
        };
      } else if (uploadedCaptions < 7) {
        return {
          color: "bg-info",
          text: "In Progress",
          description: "Ready to analyze",
        };
      } else {
        return {
          color: "bg-primary",
          text: "Ready",
          description: "Click Analyze Voice",
        };
      }
    }

    // Voice is analyzed
    return {
      color: "bg-success",
      text: "Voice Active",
      description: "AI trained",
    };
  }, [uploadedCaptions, voiceInsights]);

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

  // Platform/Tone/Content handlers with DB persistence (silent saves)
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

  // Voice strength handlers - onChange for UI, onChangeComplete for saving
  const handleVoiceStrengthChange = useCallback(
    (strength: number) => {
      // Update UI immediately while dragging
      setVoiceStrength(strength);
    },
    [setVoiceStrength]
  );

  const handleVoiceStrengthChangeComplete = useCallback(
    (strength: number) => {
      // Save to database when user finishes dragging
      saveOnboardingData({ voiceStrength: strength });
    },
    [saveOnboardingData]
  );

  // Style preferences handler
  const handleStylePreferencesChange = useCallback(
    (preferences: StylePreferences) => {
      setStylePreferences(preferences);
      saveOnboardingData({ stylePreferences: preferences });
    },
    [setStylePreferences, saveOnboardingData]
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

  const handleEditSampleWithState = useCallback(
    async (index: number, text: string) => {
      const success = await handleEditSample(index, text);
      if (success) {
        await refreshSamples(); // Refresh the samples list after editing
      }
    },
    [handleEditSample, refreshSamples]
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
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            {/* Title Section */}
            <div className="flex-1">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-head">
                    Brand Voice
                  </h1>
                  <p className="text-text-body text-sm sm:text-base lg:text-lg">
                    Train the AI to write in your unique style
                  </p>
                </div>
              </div>

              {/* Quick Stats - Visible on mobile below title */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 mt-3 sm:mt-4 lg:hidden">
                {/* Voice Status */}
                {isLoading || isLoadingSamples ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-hint/20 rounded-full animate-pulse"></div>
                    <div className="h-4 w-24 bg-hint/20 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-1.5 sm:gap-2 group cursor-help"
                    title={voiceStatus.description}
                  >
                    <div
                      className={`w-2 h-2 ${voiceStatus.color} rounded-full transition-colors shrink-0`}
                    ></div>
                    <span className="text-xs sm:text-sm font-medium text-text-body">
                      {voiceStatus.text}
                    </span>
                  </div>
                )}

                {/* Training Samples Count */}
                {isLoadingSamples ? (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-hint/20 rounded animate-pulse"></div>
                    <div className="h-3.5 sm:h-4 w-28 sm:w-32 bg-hint/20 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-hint shrink-0" />
                    <span className="text-xs sm:text-sm text-text-body">
                      {uploadedCaptions} training samples
                    </span>
                  </div>
                )}

                {/* Selected Tone */}
                {isLoading ? (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-hint/20 rounded animate-pulse"></div>
                    <div className="h-3.5 sm:h-4 w-24 sm:w-28 bg-hint/20 rounded animate-pulse"></div>
                  </div>
                ) : (
                  selectedTone && (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-hint shrink-0" />
                      <span className="text-xs sm:text-sm text-text-body capitalize">
                        {selectedTone.name} tone
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Quick Stats - Visible on desktop top right */}
            <div className="hidden lg:flex flex-wrap gap-3">
              {/* Voice Status */}
              {isLoading || isLoadingSamples ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-hint/20 rounded-full animate-pulse"></div>
                  <div className="h-4 w-24 bg-hint/20 rounded animate-pulse"></div>
                </div>
              ) : (
                <div
                  className="flex items-center gap-2 group cursor-help"
                  title={voiceStatus.description}
                >
                  <div
                    className={`w-2 h-2 ${voiceStatus.color} rounded-full transition-colors`}
                  ></div>
                  <span className="text-sm font-medium text-text-body">
                    {voiceStatus.text}
                  </span>
                </div>
              )}

              {/* Training Samples Count */}
              {isLoadingSamples ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-hint/20 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-hint/20 rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-hint" />
                  <span className="text-sm text-text-body">
                    {uploadedCaptions} training samples
                  </span>
                </div>
              )}

              {/* Selected Tone */}
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-hint/20 rounded animate-pulse"></div>
                  <div className="h-4 w-28 bg-hint/20 rounded animate-pulse"></div>
                </div>
              ) : (
                selectedTone && (
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-hint" />
                    <span className="text-sm text-text-body capitalize">
                      {selectedTone.name} tone
                    </span>
                  </div>
                )
              )}
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
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {activeTab === "training" && (
          <TrainingTab
            uploadedCaptions={uploadedCaptions}
            trainingSamples={trainingSamples}
            isLoadingSamples={isLoadingSamples}
            onAddCaptions={handleAddCaptionsWithState}
            onRemoveSample={handleRemoveSampleWithState}
            onEditSample={handleEditSampleWithState}
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
            onVoiceStrengthChange={handleVoiceStrengthChange}
            onVoiceStrengthChangeComplete={handleVoiceStrengthChangeComplete}
            onStylePreferencesChange={handleStylePreferencesChange}
          />
        )}

        {activeTab === "insights" && (
          <InsightsTab
            uploadedCaptions={uploadedCaptions}
            voiceInsights={voiceInsights}
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

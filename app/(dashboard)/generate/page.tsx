"use client";

import React from "react";
import { Sparkles, Plus, Wand, Wand2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/Textarea";
import { Card, CardHeader, CardTitle } from "../../../components/ui/Card";
import { ToastProvider } from "../../../components/ui/Toast";

// Custom hooks
import {
  useCaptionInput,
  useCaptionGeneration,
  usePaywall,
  useSubscription,
} from "../../../hooks";

// Context
import { useUsage } from "../../../contexts/UsageContext";

// Components
import {
  ContextMenu,
  ContextInputs,
  SelectedContextItems,
  AdvancedOptions,
  EmptyState,
  CaptionResults,
  ImmersiveLoading,
  PaywallModal,
} from "../../../components/captions";

// Utils
import {
  CREDITS,
  handleImageUpload,
  removeImage,
  handleContextItemToggle,
  handleRemoveContextItem,
} from "../../../lib/utils";

export default function CaptionInputPage() {
  // Custom hooks
  const {
    state,
    contextData,
    options,
    contextMenuRef,
    plusButtonRef,
    updateState,
    updateContextData,
    updateOptions,
  } = useCaptionInput();

  const { generateCaptions, copyToClipboard } = useCaptionGeneration();
  const {
    isPaywallOpen,
    currentUsage,
    hidePaywall,
    handleUpgrade,
    checkUsageLimit,
    showPaywall,
  } = usePaywall();

  // Fetch subscription and usage data
  const { subscription, isLoading: subLoading } = useSubscription();
  const {
    usage,
    isLoading: usageLoading,
    refetch: refetchUsage,
    incrementUsage,
  } = useUsage();

  // Track caption IDs and saved states
  const [captionIds, setCaptionIds] = React.useState<string[]>([]);
  const [savedStates, setSavedStates] = React.useState<boolean[]>([]);

  // Event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateState({ contentInput: e.target.value });
    if (state.showError) updateState({ showError: false });
  };

  const handleGenerate = async () => {
    if (state.contentInput.trim() === "") {
      updateState({ showError: true });
      setTimeout(() => updateState({ showError: false }), 2000);
      return;
    }

    // Check usage limits before generating
    if (usage && usage.captionsLimit !== -1) {
      // -1 means unlimited
      if (usage.captionsUsed >= usage.captionsLimit) {
        showPaywall({
          used: usage.captionsUsed,
          limit: usage.captionsLimit,
        });
        return;
      }
    }

    // IMMEDIATE FEEDBACK: Optimistically update usage counter right away
    incrementUsage();

    // Start immersive loading
    updateState({
      isGenerating: true,
      showImmersiveLoading: true,
      loadingPhase: "analyzing",
      isLongGeneration: false,
    });

    try {
      const result = await generateCaptions(
        state.contentInput,
        contextData,
        state.selectedContextItems,
        options,
        (phase) => updateState({ loadingPhase: phase })
      );

      // Update state with captions and their IDs
      setCaptionIds(result.captionIds);
      setSavedStates(result.savedStates);

      // Refetch usage data to sync with server (in case of any discrepancies)
      refetchUsage();

      // Complete loading
      updateState({
        generatedCaptions: result.captions,
        isGenerating: false,
        showImmersiveLoading: false,
        loadingPhase: "complete",
      });
    } catch (error: any) {
      // Check if it's a usage limit error
      if (error?.limitReached) {
        showPaywall({
          used: error.usage?.used || 0,
          limit: error.usage?.limit || 10,
        });
        // Refetch to get the actual server state
        refetchUsage();
      } else {
        // For other errors, refetch to ensure we're in sync
        refetchUsage();
      }

      // Handle error
      updateState({
        isGenerating: false,
        showImmersiveLoading: false,
        showError: true,
      });
      setTimeout(() => updateState({ showError: false }), 2000);
    }
  };

  const handleCopyCaption = async (caption: string, index: number) => {
    const success = await copyToClipboard(caption);
    if (success) {
      updateState({ copiedIndex: index });
      setTimeout(() => updateState({ copiedIndex: null }), 2000);
    }
  };

  const handleCaptionUpdate = (index: number, newCaption: string) => {
    const updatedCaptions = [...state.generatedCaptions];
    updatedCaptions[index] = newCaption;
    updateState({ generatedCaptions: updatedCaptions });
  };

  const handleImageUploadEvent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleImageUpload(
      event,
      (file) => updateContextData({ uploadedImage: file }),
      (preview) => updateContextData({ imagePreview: preview })
    );
  };

  const handleRemoveImage = () => {
    removeImage(
      () => updateContextData({ uploadedImage: null }),
      () => updateContextData({ imagePreview: null })
    );
  };

  const handleContextItemToggleEvent = (itemId: string) => {
    handleContextItemToggle(
      itemId,
      state.selectedContextItems,
      (items: string[]) => updateState({ selectedContextItems: items }),
      () => updateState({ showContextMenu: false })
    );
  };

  const handleRemoveContextItemEvent = (itemId: string) => {
    handleRemoveContextItem(
      itemId,
      state.selectedContextItems,
      (items: string[]) => updateState({ selectedContextItems: items }),
      updateContextData
    );
  };

  const handleLoadingComplete = () => {
    updateState({ showImmersiveLoading: false });
  };

  const handleSaveCaption = async (captionId: string, index: number) => {
    try {
      // Optimistic update - update UI immediately
      setSavedStates((prev) => {
        const newStates = [...prev];
        newStates[index] = !newStates[index];
        return newStates;
      });

      // Then sync with server
      const response = await fetch("/api/captions/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captionId }),
      });

      if (!response.ok) {
        // If server update fails, revert the optimistic update
        setSavedStates((prev) => {
          const newStates = [...prev];
          newStates[index] = !newStates[index];
          return newStates;
        });
        throw new Error("Failed to save caption");
      }
    } catch (error) {
      console.error("Failed to save caption:", error);
    }
  };

  const handleGenerateVariation = async (variation: string) => {
    // Store current input and context
    const currentInput = state.contentInput;
    const currentContext = contextData;
    const currentSelectedItems = state.selectedContextItems;
    const currentOptions = { ...options };

    // Modify the input or options based on variation type
    let modifiedInput = currentInput;
    let modifiedOptions = { ...currentOptions };

    switch (variation) {
      case "playful":
        modifiedInput = `${currentInput}\n\nMake this more playful, fun, and lighthearted with a friendly tone.`;
        modifiedOptions.emojiStyle = "expressive";
        break;
      case "urgent":
        modifiedInput = `${currentInput}\n\nAdd a sense of urgency and FOMO (fear of missing out). Make it time-sensitive.`;
        break;
      case "shorter":
        modifiedOptions.captionLength = "short";
        modifiedInput = `${currentInput}\n\nKeep it concise and punchy.`;
        break;
      case "professional":
        modifiedInput = `${currentInput}\n\nMake this more professional, polished, and business-appropriate.`;
        modifiedOptions.emojiStyle = "minimal";
        break;
      case "casual":
        modifiedInput = `${currentInput}\n\nMake this more casual, conversational, and relatable.`;
        break;
      case "emotional":
        modifiedInput = `${currentInput}\n\nMake this more emotional, heartfelt, and inspiring.`;
        break;
    }

    // IMMEDIATE FEEDBACK: Optimistically update usage counter right away
    incrementUsage();

    // Start generation
    updateState({
      isGenerating: true,
      showImmersiveLoading: true,
      loadingPhase: "analyzing",
    });

    try {
      const result = await generateCaptions(
        modifiedInput,
        currentContext,
        currentSelectedItems,
        modifiedOptions,
        (phase) => updateState({ loadingPhase: phase })
      );

      // Update state with captions and their IDs
      setCaptionIds(result.captionIds);
      setSavedStates(result.savedStates);

      // Refetch usage data to sync with server (in case of any discrepancies)
      refetchUsage();

      updateState({
        generatedCaptions: result.captions,
        isGenerating: false,
        showImmersiveLoading: false,
        loadingPhase: "complete",
      });
    } catch (error: any) {
      // Check if it's a usage limit error
      if (error?.limitReached) {
        showPaywall({
          used: error.usage?.used || 0,
          limit: error.usage?.limit || 10,
        });
        // Refetch to get the actual server state
        refetchUsage();
      } else {
        // For other errors, refetch to ensure we're in sync
        refetchUsage();
      }

      updateState({
        isGenerating: false,
        showImmersiveLoading: false,
        showError: true,
      });
      setTimeout(() => updateState({ showError: false }), 2000);
    }
  };

  return (
    <ToastProvider>
      <div className="h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Input Section */}
        <div className="w-full lg:w-1/3 bg-section border-r border-border flex flex-col">
          {/* Header */}
          <Card
            variant="outlined"
            padding="none"
            className="border-0 border-b border-border rounded-none bg-section"
          >
            <CardHeader padding="lg">
              <div className="space-y-1 mb-2">
                <h2 className="text-lg font-semibold text-primary tracking-tight flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-accent" />
                  New Caption
                </h2>
                <p className="text-sm font-medium text-text-body">
                  Describe your content and we'll craft the perfect caption
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Primary Input with Context */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                What's your content about?
              </label>

              {/* Input Container */}
              <div className="relative bg-surface rounded-xl overflow-clip border border-border">
                <Textarea
                  value={state.contentInput}
                  onChange={handleInputChange}
                  placeholder="Launching a new product... Sharing a client win... Behind-the-scenes of my process..."
                  error={
                    state.showError
                      ? "Tell us what your content is about first"
                      : undefined
                  }
                  autoExpand={true}
                  className="min-h-10 text-sm border-none rounded-xl text-text-head"
                  maxLength={500}
                />
                <div className="flex items-end justify-between mt-2">
                  {/* Plus Button */}
                  <button
                    ref={plusButtonRef}
                    onClick={() =>
                      updateState({ showContextMenu: !state.showContextMenu })
                    }
                    className="m-2 p-2 rounded-lg transition-all duration-200 border border-border group bg-surface hover:bg-section-light text-text-body"
                    title="Add context"
                  >
                    <Plus
                      className={`w-4 h-4 transition-transform duration-200 ${
                        state.showContextMenu ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div className="flex items-center justify-between mr-2 mb-2">
                    <span className="text-xs text-hint">
                      {state.contentInput.length}/500
                    </span>
                    {state.contentInput.length > 400 && (
                      <span className="ml-2 text-xs text-warning">
                        Getting close to limit
                      </span>
                    )}
                  </div>
                </div>

                {state.selectedContextItems.length > 0 && (
                  <div className="border-t border-border" />
                )}

                {/* Selected Context Items */}
                <SelectedContextItems
                  selectedContextItems={state.selectedContextItems}
                  onRemoveItem={handleRemoveContextItemEvent}
                />

                {/* Context Input Fields */}
                <ContextInputs
                  selectedContextItems={state.selectedContextItems}
                  contextData={contextData}
                  onContextDataUpdate={updateContextData}
                  onImageUpload={handleImageUploadEvent}
                  onRemoveImage={handleRemoveImage}
                />
              </div>
            </div>

            {/* Floating Context Menu */}
            <ContextMenu
              isOpen={state.showContextMenu}
              selectedItems={state.selectedContextItems}
              onItemToggle={handleContextItemToggleEvent}
              onClose={() => updateState({ showContextMenu: false })}
              menuRef={contextMenuRef}
              plusButtonRef={plusButtonRef}
            />

            {/* Advanced Options Accordion */}
            <AdvancedOptions
              isOpen={state.isAdvancedOpen}
              options={options}
              onToggle={() =>
                updateState({ isAdvancedOpen: !state.isAdvancedOpen })
              }
              onOptionsUpdate={updateOptions}
            />
          </div>

          {/* Fixed Bottom - Generate Button */}
          <div className="px-6 py-4 border-t border-border">
            <Button
              onClick={handleGenerate}
              variant="primary"
              size="lg"
              loading={state.isGenerating}
              leftIcon={<Sparkles className="w-5 h-5" />}
              className="w-full text-base font-semibold"
              disabled={!state.contentInput.trim()}
            >
              {state.isGenerating ? "Generating..." : "Generate Captions"}
            </Button>
            <div className="mt-3 text-center">
              {usageLoading ? (
                <span className="text-sm text-secondary">Loading usage...</span>
              ) : usage ? (
                <>
                  <span className="text-sm text-secondary">
                    <span className="font-semibold text-accent">
                      {usage.captionsLimit === -1
                        ? "∞"
                        : `${Math.max(
                            0,
                            usage.captionsLimit - usage.captionsUsed
                          )}/${usage.captionsLimit}`}
                    </span>{" "}
                    {subscription?.plan === "free"
                      ? "free generations left"
                      : "generations left this month"}
                  </span>
                  {usage.captionsUsed >= usage.captionsLimit &&
                    usage.captionsLimit !== -1 && (
                      <div className="mt-2">
                        <span className="text-xs text-warning">
                          You've reached your limit for this period
                        </span>
                      </div>
                    )}
                </>
              ) : (
                <span className="text-sm text-secondary">
                  <span className="font-semibold text-accent">10/10</span> free
                  generations left
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Results Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {state.showImmersiveLoading ? (
            <ImmersiveLoading
              isVisible={state.showImmersiveLoading}
              onComplete={handleLoadingComplete}
              onError={() =>
                updateState({ showImmersiveLoading: false, showError: true })
              }
            />
          ) : state.generatedCaptions.length === 0 ? (
            <EmptyState type={state.showError ? "error" : "default"} />
          ) : (
            <CaptionResults
              captions={state.generatedCaptions}
              copiedIndex={state.copiedIndex}
              onCopyCaption={handleCopyCaption}
              onGenerateNew={() => updateState({ generatedCaptions: [] })}
              onCaptionUpdate={handleCaptionUpdate}
              onGenerateVariation={handleGenerateVariation}
              platform="Instagram"
              isGenerating={state.isGenerating}
              captionIds={captionIds}
              savedStates={savedStates}
              onSaveCaption={handleSaveCaption}
            />
          )}
        </div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={hidePaywall}
        currentUsage={currentUsage}
      />
    </ToastProvider>
  );
}

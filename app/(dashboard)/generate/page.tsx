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
} from "../../../hooks";

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

    /* 
    ========================================
    PAYWALL INTEGRATION OPTIONS
    ========================================
    
    Option 1: Trigger paywall when user hits usage limit (recommended for production)
    Uncomment the lines below:
    */
    // const hasHitLimit = checkUsageLimit(CREDITS.remaining, CREDITS.total);
    // if (hasHitLimit) {
    //   return; // Paywall modal will be shown
    // }

    /*
    Option 2: Always show paywall on button click (for testing)
    Uncomment the line below:
    */
    showPaywall({ used: 10, limit: 10 });
    return;

    /*
    Option 3: Show paywall when credits are 0 (alternative logic)
    Uncomment the lines below:
    */
    // if (CREDITS.remaining === 0) {
    //   showPaywall({ used: CREDITS.total, limit: CREDITS.total });
    //   return;
    // }
    // */

    // Start immersive loading
    updateState({
      isGenerating: true,
      showImmersiveLoading: true,
      loadingPhase: "analyzing",
      isLongGeneration: false,
    });

    try {
      const captions = await generateCaptions(
        state.contentInput,
        contextData,
        state.selectedContextItems,
        options,
        (phase) => updateState({ loadingPhase: phase })
      );

      // Complete loading
      updateState({
        generatedCaptions: captions,
        isGenerating: false,
        showImmersiveLoading: false,
        loadingPhase: "complete",
      });
    } catch (error) {
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
            <CardHeader padding="sm">
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
              <span className="text-sm text-secondary">
                <span className="font-semibold text-accent">
                  {CREDITS.remaining}/{CREDITS.total}
                </span>{" "}
                free captions left
              </span>
              {CREDITS.remaining === 0 && (
                <div className="mt-2">
                  <span className="text-xs text-warning">
                    You've reached your free limit
                  </span>
                </div>
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
              platform="Instagram"
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

"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ToastProvider, useToast } from "../../../components/ui/Toast";
import EditCaptionModal from "../../../components/captions/EditCaptionModal";
import {
  LibraryHeader,
  LibraryStats,
  LibraryFilters,
  LibraryCaptionList,
} from "../../../components/library";
import { useSavedCaptions } from "../../../hooks/use-saved-captions";
import { useLibraryFilters } from "../../../hooks/use-library-filters";
import {
  calculateLibraryStats,
  exportCaptionsToCSV,
  downloadBlob,
  type LibraryCaption,
} from "../../../lib/utils/library";

/**
 * Main Library Page Content Component
 */
const LibraryPageContent: React.FC = () => {
  const { showToast } = useToast();

  // Caption data management
  const {
    captions,
    isLoading,
    savingCaptionId,
    refetch,
    updateCaption,
    toggleSave,
  } = useSavedCaptions();

  // Filter and search management
  const {
    searchQuery,
    selectedPlatforms,
    selectedStyles,
    sortBy,
    filterOpen,
    filteredCaptions,
    availablePlatforms,
    availableStyles,
    hasActiveFilters,
    setSearchQuery,
    togglePlatformFilter,
    toggleStyleFilter,
    setSortBy,
    setFilterOpen,
    clearAllFilters,
  } = useLibraryFilters({ captions });

  // Local UI state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copiedCaptionId, setCopiedCaptionId] = useState<string | null>(null);
  const [editingCaption, setEditingCaption] = useState<LibraryCaption | null>(
    null
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Calculate statistics
  const stats = useMemo(() => calculateLibraryStats(captions), [captions]);

  /**
   * Handle caption copy
   */
  const handleCopy = useCallback(
    async (caption: LibraryCaption) => {
      try {
        await navigator.clipboard.writeText(caption.content);
        showToast("Caption copied! 📋");
        setCopiedCaptionId(caption.id);
        setTimeout(() => setCopiedCaptionId(null), 2000);
      } catch (error) {
        showToast("Failed to copy caption", "error");
      }
    },
    [showToast]
  );

  /**
   * Handle caption edit
   */
  const handleEdit = useCallback((caption: LibraryCaption) => {
    setEditingCaption(caption);
  }, []);

  /**
   * Save edited caption
   */
  const handleSaveEdit = useCallback(
    async (newContent: string) => {
      if (!editingCaption) return;

      updateCaption(editingCaption.id, newContent);
      setEditingCaption(null);
      showToast("Caption updated successfully! ✏️");
    },
    [editingCaption, updateCaption, showToast]
  );

  /**
   * Handle toggle save/unsave
   */
  const handleToggleSave = useCallback(
    async (captionId: string) => {
      try {
        await toggleSave(captionId);
        showToast("Caption removed from library");
      } catch (error) {
        showToast("Failed to remove caption. Please try again.", "error");
      }
    },
    [toggleSave, showToast]
  );

  /**
   * Handle caption export
   */
  const handleExport = useCallback(() => {
    if (captions.length === 0) {
      showToast("No captions to export", "warning");
      return;
    }

    try {
      const blob = exportCaptionsToCSV(captions);
      const filename = `captions-library-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      downloadBlob(blob, filename);
      showToast(`Exported ${captions.length} captions! 📥`);
    } catch (error) {
      console.error("Failed to export captions:", error);
      showToast("Failed to export captions", "error");
    }
  }, [captions, showToast]);

  /**
   * Handle refresh
   */
  const handleRefresh = useCallback(() => {
    refetch(true);
  }, [refetch]);

  return (
    <div className="min-h-screen bg-section">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="px-6 py-6">
          <LibraryHeader
            onRefresh={handleRefresh}
            onExport={handleExport}
            isExportDisabled={captions.length === 0}
          />

          {/* Search and Filters Bar */}
          <LibraryFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterOpen={filterOpen}
            onFilterOpenChange={setFilterOpen}
            selectedPlatforms={selectedPlatforms}
            selectedStyles={selectedStyles}
            availablePlatforms={availablePlatforms}
            availableStyles={availableStyles}
            onTogglePlatform={togglePlatformFilter}
            onToggleStyle={toggleStyleFilter}
            onClearFilters={clearAllFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            activeFilterCount={selectedPlatforms.length + selectedStyles.length}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <LibraryStats stats={stats} isLoading={isLoading} />
        </div>

        {/* Caption Grid/List */}
        <LibraryCaptionList
          captions={filteredCaptions}
          isLoading={isLoading}
          viewMode={viewMode}
          copiedCaptionId={copiedCaptionId}
          hoveredCard={hoveredCard}
          savingCaptionId={savingCaptionId}
          onCopy={handleCopy}
          onEdit={handleEdit}
          onToggleSave={handleToggleSave}
          onHoverChange={(id) =>
            setHoveredCard(typeof id === "number" ? String(id) : id)
          }
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearAllFilters}
        />
      </div>

      {/* Edit Caption Modal */}
      {editingCaption && (
        <EditCaptionModal
          isOpen={true}
          originalCaption={editingCaption.content}
          onClose={() => setEditingCaption(null)}
          onSave={handleSaveEdit}
          onCopy={() => handleCopy(editingCaption)}
          captionId={editingCaption.id}
          platform={editingCaption.platform}
          saveToDatabase={true}
        />
      )}
    </div>
  );
};

/**
 * Library Page with Toast Provider
 */
export default function LibraryPage() {
  return (
    <ToastProvider>
      <LibraryPageContent />
    </ToastProvider>
  );
}

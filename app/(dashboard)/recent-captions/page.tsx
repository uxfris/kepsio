"use client";

import { ToastProvider } from "../../../components/ui/Toast";
import {
  CaptionHeader,
  SearchPanel,
  FilterPanel,
  BulkActions,
  CaptionCard,
  CaptionListItem,
  CaptionPagination,
  EmptyState,
} from "../../../components/captions";
import { useCaptionsFilters } from "../../../hooks/use-captions-filters";
import { useCaptionsSelection } from "../../../hooks/use-captions-selection";
import { useCaptionsActions } from "../../../hooks/use-captions-actions";
import { MOCK_CAPTIONS } from "../../../lib/data/mock-captions";

function RecentCaptionsContent() {
  // Custom hooks for state management
  const {
    filters,
    viewMode,
    currentPage,
    itemsPerPage,
    showSearchPanel,
    showFilterPanel,
    filteredAndSortedCaptions,
    pagination,
    updateFilter,
    resetFilters,
    setViewMode,
    toggleSearchPanel,
    toggleFilterPanel,
    updatePagination,
    updateItemsPerPage,
  } = useCaptionsFilters({ captions: MOCK_CAPTIONS });

  const {
    selectedCaptions,
    hoveredCard,
    isAllSelected,
    selectedCount,
    selectCaption,
    selectAll,
    isSelected,
    setHoveredCard,
  } = useCaptionsSelection({ captions: filteredAndSortedCaptions });

  const { copyCaption, handleBulkAction, regenerateCaption, saveToLibrary } =
    useCaptionsActions();

  // Event handlers
  const handleBulkActionClick = (action: string) => {
    handleBulkAction(action, selectedCount);
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  return (
    <div className="min-h-screen bg-section">
      {/* Header */}
      <CaptionHeader
        totalCaptions={filteredAndSortedCaptions.length}
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        filters={filters}
        viewMode={viewMode}
        showSearchPanel={showSearchPanel}
        showFilterPanel={showFilterPanel}
        onToggleSearchPanel={toggleSearchPanel}
        onToggleFilterPanel={toggleFilterPanel}
        onViewModeChange={setViewMode}
      />

      {/* Search Panel */}
      {showSearchPanel && (
        <SearchPanel filters={filters} onFilterChange={updateFilter} />
      )}

      {/* Filter Panel */}
      {showFilterPanel && (
        <FilterPanel
          filters={filters}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
        />
      )}

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedCount}
        totalCount={filteredAndSortedCaptions.length}
        isAllSelected={isAllSelected}
        onSelectAll={selectAll}
        onBulkAction={handleBulkActionClick}
      />

      {/* Captions Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {pagination.paginatedCaptions.map((caption) => (
            <CaptionCard
              key={caption.id}
              caption={caption}
              isSelected={isSelected(caption.id)}
              isHovered={hoveredCard === caption.id}
              onSelect={selectCaption}
              onCopy={copyCaption}
              onRegenerate={regenerateCaption}
              onSave={saveToLibrary}
              onHover={setHoveredCard}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {pagination.paginatedCaptions.map((caption) => (
            <CaptionListItem
              key={caption.id}
              caption={caption}
              isSelected={isSelected(caption.id)}
              onSelect={selectCaption}
              onCopy={copyCaption}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <CaptionPagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredAndSortedCaptions.length}
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        onPageChange={updatePagination}
        onItemsPerPageChange={updateItemsPerPage}
      />

      {/* Empty State */}
      {filteredAndSortedCaptions.length === 0 && (
        <EmptyState onClearFilters={handleClearFilters} />
      )}
    </div>
  );
}

export default function RecentCaptionsPage() {
  return (
    <ToastProvider>
      <RecentCaptionsContent />
    </ToastProvider>
  );
}

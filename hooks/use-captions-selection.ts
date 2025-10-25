import { useState, useMemo } from "react";
import { CaptionItem } from "@/types/captions";

interface UseCaptionsSelectionProps {
  captions: CaptionItem[];
}

export function useCaptionsSelection({ captions }: UseCaptionsSelectionProps) {
  const [selectedCaptions, setSelectedCaptions] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const isAllSelected = useMemo(() => {
    return selectedCaptions.length === captions.length && captions.length > 0;
  }, [selectedCaptions.length, captions.length]);

  const isPartiallySelected = useMemo(() => {
    return (
      selectedCaptions.length > 0 && selectedCaptions.length < captions.length
    );
  }, [selectedCaptions.length, captions.length]);

  const selectCaption = (captionId: number) => {
    setSelectedCaptions((prev) =>
      prev.includes(captionId)
        ? prev.filter((id) => id !== captionId)
        : [...prev, captionId]
    );
  };

  const selectAll = () => {
    if (isAllSelected) {
      setSelectedCaptions([]);
    } else {
      setSelectedCaptions(captions.map((caption) => caption.id));
    }
  };

  const clearSelection = () => {
    setSelectedCaptions([]);
  };

  const isSelected = (captionId: number) => {
    return selectedCaptions.includes(captionId);
  };

  return {
    // State
    selectedCaptions,
    hoveredCard,

    // Computed values
    isAllSelected,
    isPartiallySelected,
    selectedCount: selectedCaptions.length,

    // Actions
    selectCaption,
    selectAll,
    clearSelection,
    isSelected,
    setHoveredCard,
  };
}

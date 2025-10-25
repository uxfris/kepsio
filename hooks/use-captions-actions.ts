import { useCallback } from "react";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils/captions";
import { TOAST_MESSAGES } from "@/lib/constants/captions";

export function useCaptionsActions() {
  const { addToast } = useToast();

  const copyCaption = useCallback(
    async (captionText: string) => {
      const success = await copyToClipboard(captionText);

      if (success) {
        addToast(TOAST_MESSAGES.COPY_SUCCESS);
      } else {
        addToast(TOAST_MESSAGES.COPY_ERROR);
      }
    },
    [addToast]
  );

  const handleBulkAction = useCallback(
    (action: string, selectedCount: number) => {
      if (selectedCount === 0) {
        addToast(TOAST_MESSAGES.NO_SELECTION);
        return;
      }

      addToast(TOAST_MESSAGES.BULK_ACTION_SUCCESS(action, selectedCount));
    },
    [addToast]
  );

  const regenerateCaption = useCallback(
    (captionId: number) => {
      // TODO: Implement regenerate functionality
      console.log("Regenerate caption:", captionId);
      addToast({
        type: "info",
        title: "Regenerate feature",
        description: "This feature will be implemented soon",
      });
    },
    [addToast]
  );

  const saveToLibrary = useCallback(
    (captionId: number) => {
      // TODO: Implement save to library functionality
      console.log("Save to library:", captionId);
      addToast({
        type: "info",
        title: "Save to library",
        description: "This feature will be implemented soon",
      });
    },
    [addToast]
  );

  const deleteCaption = useCallback(
    (captionId: number) => {
      // TODO: Implement delete functionality
      console.log("Delete caption:", captionId);
      addToast({
        type: "info",
        title: "Delete caption",
        description: "This feature will be implemented soon",
      });
    },
    [addToast]
  );

  return {
    copyCaption,
    handleBulkAction,
    regenerateCaption,
    saveToLibrary,
    deleteCaption,
  };
}

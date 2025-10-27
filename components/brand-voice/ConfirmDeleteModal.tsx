import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "../ui/Button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  sampleText: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  sampleText,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface rounded-xl shadow-xl max-w-md w-full border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-error" />
            </div>
            <h2 className="text-xl font-semibold text-text-head">
              Delete Sample
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="text-hint hover:text-text-head transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-text-body mb-4">
            Are you sure you want to delete this training sample? This action
            cannot be undone.
          </p>
          <div className="p-4 bg-section rounded-lg border border-border">
            <p className="text-sm text-text-body line-clamp-3">{sampleText}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-section">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={onConfirm}
            disabled={isDeleting}
            loading={isDeleting}
            className="bg-error/10 hover:bg-error/20 text-error border-error/20"
          >
            {isDeleting ? "Deleting..." : "Delete Sample"}
          </Button>
        </div>
      </div>
    </div>
  );
};

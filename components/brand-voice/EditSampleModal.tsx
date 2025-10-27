import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";

interface EditSampleModalProps {
  isOpen: boolean;
  initialText: string;
  onClose: () => void;
  onSave: (text: string) => Promise<void>;
}

export const EditSampleModal: React.FC<EditSampleModalProps> = ({
  isOpen,
  initialText,
  onClose,
  onSave,
}) => {
  const [text, setText] = useState(initialText);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!text.trim()) return;

    setIsSaving(true);
    try {
      await onSave(text);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-surface rounded-xl shadow-xl max-w-2xl w-full border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-head">
            Edit Training Sample
          </h2>
          <button
            onClick={onClose}
            className="text-hint hover:text-text-head transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-head mb-2">
              Caption Text
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter caption text..."
              rows={6}
              className="w-full"
              autoFocus
            />
            <div className="mt-2 text-xs text-hint">
              {text.length} characters
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-section">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            variant="accent"
            onClick={handleSave}
            disabled={!text.trim() || isSaving}
            loading={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

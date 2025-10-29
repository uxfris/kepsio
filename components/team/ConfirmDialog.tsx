"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "../ui/Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "default";
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "text-red-600",
    warning: "text-yellow-600",
    default: "text-accent",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg ${
                variant === "danger"
                  ? "bg-red-100"
                  : variant === "warning"
                  ? "bg-yellow-100"
                  : "bg-accent/10"
              }`}
            >
              <AlertTriangle className={`w-5 h-5 ${variantStyles[variant]}`} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary mb-1">{title}</h2>
              <p className="text-sm text-text-body">{description}</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-2 hover:bg-section-light rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-text-body" />
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={variant === "danger" ? "accent" : "accent"}
            className={`flex-1 ${
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : variant === "warning"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : ""
            }`}
            loading={isLoading}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

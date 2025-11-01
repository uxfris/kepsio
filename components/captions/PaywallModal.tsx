"use client";

import React from "react";
import { X, Zap, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui";
import { Modal } from "../ui";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsage?: {
    used: number;
    limit: number;
  };
}

export default function PaywallModal({
  isOpen,
  onClose,
  currentUsage = { used: 10, limit: 10 },
}: PaywallModalProps) {
  const router = useRouter();

  const handleViewPricing = () => {
    router.push("/upgrade");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      closeOnOverlayClick={false}
      showCloseButton={false}
    >
      <div className="relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg text-hint hover:text-text-body hover:bg-section-light transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="relative px-8 pt-8 pb-6 bg-linear-to-br from-section to-section-light border-b border-border">
          <div className="text-center max-w-2xl mx-auto">
            {/* Celebration Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-accent to-accent-hover rounded-2xl mb-4 shadow-lg animate-bounce-in">
              <Zap className="w-8 h-8 text-surface" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-display font-bold text-text-head mb-2">
              You're on fire! 🔥
            </h1>
            <p className="text-lg text-text-body">
              You've created{" "}
              <span className="font-semibold text-accent">
                {currentUsage.used} amazing captions
              </span>{" "}
              this month. Unlock unlimited to keep the momentum going.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-8 py-8">
          <div className="text-center">
            <p className="text-text-body mb-6">
              Ready to upgrade? View our pricing plans and choose the perfect
              option for your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleViewPricing}
                variant="primary"
                size="lg"
                leftIcon={<Sparkles className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                View Pricing Plans
              </Button>

              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

import React from "react";
import { Sparkles, Upload, Target, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { ONBOARDING_STEPS } from "../../lib/constants/brand-voice";

interface OnboardingModalProps {
  currentStep: number;
  onNext: () => void;
  onSkip: () => void;
}

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "sparkles":
      return <Sparkles className="w-8 h-8 text-accent" />;
    case "upload":
      return <Upload className="w-8 h-8 text-accent" />;
    case "target":
      return <Target className="w-8 h-8 text-accent" />;
    case "check":
      return <Check className="w-8 h-8 text-success" />;
    default:
      return <Sparkles className="w-8 h-8 text-accent" />;
  }
};

export const OnboardingModal: React.FC<OnboardingModalProps> = React.memo(
  ({ currentStep, onNext, onSkip }) => {
    const step = ONBOARDING_STEPS[currentStep];
    const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-surface rounded-2xl max-w-md w-full p-6 animate-scale-in">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {getIcon(step.iconType)}
            </div>
            <h2 className="text-xl font-bold text-text-head mb-2">
              {step.title}
            </h2>
            <p className="text-text-body mb-6">{step.description}</p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {ONBOARDING_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? "bg-accent"
                      : index < currentStep
                      ? "bg-accent/50"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={onSkip} className="flex-1">
                Skip
              </Button>
              <Button variant="accent" onClick={onNext} className="flex-1">
                {isLastStep ? "Get Started" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

OnboardingModal.displayName = "OnboardingModal";

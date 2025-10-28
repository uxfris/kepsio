import React, { memo } from "react";
import { Check } from "lucide-react";
import { Button } from "../ui";
import { Card, CardHeader, CardTitle, CardContent } from "../ui";

export interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    icon: React.ComponentType<{ className?: string }>;
    buttonText: string;
    buttonVariant: "primary" | "outline";
    isPopular?: boolean;
  };
  billingCycle: "monthly" | "annual";
  onUpgrade: (planId: string) => void;
  formatPrice: (price: number) => number;
  getAnnualSavings?: (monthlyPrice: number) => number;
  isProcessing?: boolean;
  currentPlan?: string;
}

const PricingCard = memo<PricingCardProps>(
  ({
    plan,
    billingCycle,
    onUpgrade,
    formatPrice,
    getAnnualSavings,
    isProcessing = false,
    currentPlan,
  }) => {
    const Icon = plan.icon;
    const isCurrentPlan = currentPlan === plan.id;

    return (
      <Card
        variant="outlined"
        className={`border-border hover:border-border-alt transition-all rounded-3xl flex flex-col`}
      >
        <CardHeader padding="md">
          <div className="flex flex-col items-start gap-8 mb-2">
            <Icon className="h-16 w-16 text-text-body" />
            <CardTitle className="text-text-head text-2xl">
              {plan.name}
            </CardTitle>
          </div>
          <p className="text-md text-text-head mb-4">{plan.description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-head">
              {plan.id === "enterprise" ? "From $" : "$"}
              {plan.id === "enterprise" ? plan.price : formatPrice(plan.price)}
            </span>
            <span className="text-text-body">
              {plan.id === "enterprise" ? "" : "/month"}
            </span>
          </div>
          {billingCycle === "annual" &&
            getAnnualSavings &&
            plan.price > 0 &&
            plan.id !== "enterprise" && (
              <p className="text-text-body text-sm mt-2">
                Billed ${formatPrice(plan.price) * 12}/year · Save $
                {getAnnualSavings(plan.price)}/year
              </p>
            )}
          {billingCycle === "monthly" &&
            plan.price > 0 &&
            plan.id !== "enterprise" && (
              <p className="text-text-body text-sm mt-2">
                Billed monthly · Cancel anytime
              </p>
            )}
          {plan.id === "enterprise" && (
            <p className="text-text-body text-sm mt-2">
              Per person billed monthly
            </p>
          )}
          {plan.price === 0 && (
            <p className="text-text-body text-sm mt-2">Free for everyone</p>
          )}
        </CardHeader>
        <CardContent padding="md" className="flex flex-col flex-1">
          <Button
            onClick={() => onUpgrade(plan.id)}
            variant={plan.buttonVariant}
            size="md"
            className="w-full mb-8"
            disabled={isProcessing || isCurrentPlan}
          >
            {isCurrentPlan
              ? "Current Plan"
              : isProcessing
              ? "Processing..."
              : plan.buttonText}
          </Button>

          {/* Divider */}
          <div className="border-t border-border mb-8"></div>

          <ul className="space-y-4 flex-1">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-text-body">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }
);

PricingCard.displayName = "PricingCard";

export default PricingCard;

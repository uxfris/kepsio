import { Zap, Crown, Users } from "lucide-react";

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  buttonText: string;
  buttonVariant: "primary" | "outline";
  isPopular?: boolean;
  limits: {
    captionsPerMonth: number;
    variationsPerGeneration: number;
    voiceProfiles: number;
    teamSeats?: number;
  };
}

export const subscriptionPlans: Record<string, SubscriptionPlan> = {
  free: {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    price: 0,
    features: [
      "10 captions per month",
      "5 variations per generation",
      "Basic voice training",
      "All platform presets",
    ],
    icon: Zap,
    buttonText: "Get Started",
    buttonVariant: "outline",
    limits: {
      captionsPerMonth: 10,
      variationsPerGeneration: 5,
      voiceProfiles: 1,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "For serious creators & agencies",
    price: 19,
    features: [
      "Unlimited captions",
      "10 variations per generation",
      "Advanced voice cloning",
      "Analytics & insights",
      "Team collaboration (3 seats)",
      "Priority support",
      "A/B testing mode",
    ],
    icon: Crown,
    buttonText: "Upgrade to Pro",
    buttonVariant: "primary",
    isPopular: true,
    limits: {
      captionsPerMonth: -1, // unlimited
      variationsPerGeneration: 10,
      voiceProfiles: 5,
      teamSeats: 3,
    },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams & brands at scale",
    price: 100,
    features: [
      "Everything in Pro",
      "Unlimited team seats",
      "Custom brand guidelines",
      "API access",
      "Dedicated account manager",
      "SSO & advanced security",
      "Custom integrations",
    ],
    icon: Users,
    buttonText: "Contact Sales",
    buttonVariant: "primary",
    limits: {
      captionsPerMonth: -1, // unlimited
      variationsPerGeneration: -1, // unlimited
      voiceProfiles: -1, // unlimited
      teamSeats: -1, // unlimited
    },
  },
} as const;

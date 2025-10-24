export const subscriptionPlans = {
  free: {
    name: "Free",
    price: 0,
    features: ["10 captions per day", "Basic templates", "Standard support"],
    limits: {
      captionsPerDay: 10,
      voiceProfiles: 1,
    },
  },
  pro: {
    name: "Pro",
    price: 19,
    features: [
      "100 captions per day",
      "Advanced templates",
      "Custom voice profiles",
      "Priority support",
    ],
    limits: {
      captionsPerDay: 100,
      voiceProfiles: 5,
    },
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    features: [
      "Unlimited captions",
      "Custom templates",
      "Unlimited voice profiles",
      "Dedicated support",
      "API access",
    ],
    limits: {
      captionsPerDay: 1000,
      voiceProfiles: -1, // unlimited
    },
  },
} as const;

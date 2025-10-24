// App-wide constants

export const APP_NAME = "Kepsio";
export const APP_DESCRIPTION = "AI-powered caption generation";

// API endpoints
export const API_ENDPOINTS = {
  CAPTIONS: "/api/captions",
  AUTH: "/api/auth",
  USER: "/api/user",
  BILLING: "/api/billing",
} as const;

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  FREE: "free",
  PRO: "pro",
  ENTERPRISE: "enterprise",
} as const;

// Rate limits
export const RATE_LIMITS = {
  FREE: 10, // captions per day
  PRO: 100, // captions per day
  ENTERPRISE: 1000, // captions per day
} as const;

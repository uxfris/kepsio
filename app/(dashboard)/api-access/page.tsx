"use client";

import React from "react";
import { Code, Key, BookOpen, Shield, Zap, Sparkles } from "lucide-react";
import { FeatureLock } from "../../../components/shared/FeatureLock";

export default function APIAccessPage() {
  return (
    <div className="min-h-screen bg-section">
      <FeatureLock
        icon={Code}
        title="Unlock API Access"
        description="Access Kepsio's powerful API to integrate caption generation directly into your workflows, tools, and automation scripts"
        features={[
          {
            title: "RESTful API",
            description: "Generate captions programmatically via HTTP requests",
          },
          {
            title: "Webhook Support",
            description:
              "Receive real-time notifications for generation events",
          },
          {
            title: "Custom Integrations",
            description: "Connect with your existing tools and platforms",
          },
          {
            title: "Bulk Operations",
            description: "Generate multiple captions in a single API call",
          },
          {
            title: "Rate Limiting",
            description: "Enterprise-grade rate limits for high-volume usage",
          },
          {
            title: "API Documentation",
            description: "Comprehensive docs with examples and SDKs",
          },
        ]}
        requiredPlan="enterprise"
        fullPage={true}
      />
    </div>
  );
}

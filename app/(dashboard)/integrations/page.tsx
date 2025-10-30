"use client";

import React from "react";
import {
  Zap,
  Plug,
  Plus,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { FeatureLock } from "../../../components/shared/FeatureLock";
import { ProLabel } from "../../../components/shared/ProBadge";
import { useSubscription } from "../../../contexts/SubscriptionContext";

// Placeholder integrations
const availableIntegrations = [
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate caption generation with 5,000+ apps",
    icon: "🔌",
    category: "Automation",
    status: "coming-soon",
  },
  {
    id: "hootsuite",
    name: "Hootsuite",
    description: "Generate and schedule captions directly in Hootsuite",
    icon: "📱",
    category: "Social Media",
    status: "coming-soon",
  },
  {
    id: "buffer",
    name: "Buffer",
    description: "Seamlessly create captions in your Buffer workflow",
    icon: "📊",
    category: "Social Media",
    status: "coming-soon",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Generate captions directly in your Notion pages",
    icon: "📝",
    category: "Productivity",
    status: "coming-soon",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Generate captions via Slack commands",
    icon: "💬",
    category: "Communication",
    status: "coming-soon",
  },
  {
    id: "wordpress",
    name: "WordPress",
    description: "Generate captions for blog posts and social shares",
    icon: "🌐",
    category: "CMS",
    status: "coming-soon",
  },
];

const categories = [
  "All",
  "Automation",
  "Social Media",
  "Productivity",
  "Communication",
  "CMS",
];

export default function IntegrationsPage() {
  const { isEnterprise, isLoading } = useSubscription();
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-section flex items-center justify-center">
        <div className="text-text-body">Loading...</div>
      </div>
    );
  }

  // Show FeatureLock for non-Enterprise users
  if (!isEnterprise) {
    return (
      <div className="min-h-screen bg-section">
        <FeatureLock
          icon={Zap}
          title="Unlock Custom Integrations"
          description="Connect Kepsio with your favorite tools and automate your caption generation workflow"
          features={[
            {
              title: "Zapier Integration",
              description: "Connect with 5,000+ apps and automate workflows",
            },
            {
              title: "Social Media Platforms",
              description:
                "Direct integrations with Hootsuite, Buffer, and more",
            },
            {
              title: "Productivity Tools",
              description:
                "Generate captions in Notion, Slack, and other tools",
            },
            {
              title: "Custom Webhooks",
              description: "Build your own integrations with webhook support",
            },
            {
              title: "API Access",
              description: "Full API access for custom integrations",
            },
            {
              title: "Dedicated Support",
              description:
                "Priority support for integration setup and troubleshooting",
            },
          ]}
          requiredPlan="enterprise"
          fullPage={true}
        />
      </div>
    );
  }

  // Enterprise users see the integrations page
  const filteredIntegrations =
    selectedCategory === "All"
      ? availableIntegrations
      : availableIntegrations.filter(
          (integration) => integration.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-section">
      {/* Header */}
      <div className="bg-linear-to-r from-surface to-section border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-head">
                Integrations
              </h1>
              <p className="text-sm sm:text-base text-text-body mt-1">
                Connect Kepsio with your favorite tools and automate your
                workflow
              </p>
            </div>
            <div className="ml-auto">
              <ProLabel requiredPlan="enterprise" size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Category Filter */}
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-accent text-white"
                  : "bg-surface text-text-body hover:bg-section-light border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredIntegrations.map((integration) => (
            <Card
              key={integration.id}
              padding="none"
              className="hover:shadow-lg transition-all duration-200 border-border"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                      {integration.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg">
                        {integration.name}
                      </CardTitle>
                      <span className="text-xs text-hint">
                        {integration.category}
                      </span>
                    </div>
                  </div>
                  {integration.status === "coming-soon" && (
                    <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                      Soon
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-body mb-4">
                  {integration.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={integration.status === "coming-soon"}
                  className="w-full"
                  rightIcon={
                    integration.status === "coming-soon" ? (
                      <Sparkles className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                >
                  {integration.status === "coming-soon"
                    ? "Coming Soon"
                    : "Connect"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <Card padding="none" className="mt-6 sm:mt-8 border-accent/20">
          <CardContent padding="lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-head mb-2">
                  More Integrations Coming Soon
                </h3>
                <p className="text-sm text-text-body mb-4">
                  We're actively working on adding more integrations. Have a
                  specific tool you'd like to see?{" "}
                  <a
                    href="mailto:support@kepsio.com"
                    className="text-accent hover:text-accent-hover font-medium"
                  >
                    Contact our team
                  </a>{" "}
                  to request it.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Google Calendar",
                    "Trello",
                    "Asana",
                    "HubSpot",
                    "Salesforce",
                  ].map((name) => (
                    <span
                      key={name}
                      className="px-2 py-1 bg-section rounded text-xs text-text-body border border-border"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Integration */}
        <Card padding="none" className="mt-6 sm:mt-8 border-2 border-accent/20">
          <CardContent padding="lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                <Plug className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-text-head mb-2">
                  Need a Custom Integration?
                </h3>
                <p className="text-sm text-text-body mb-4">
                  Enterprise customers can request custom integrations tailored
                  to their specific needs. Our team will work with you to build
                  a seamless connection.
                </p>
                <Button
                  variant="accent"
                  size="md"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() =>
                    (window.location.href =
                      "mailto:support@kepsio.com?subject=Custom Integration Request")
                  }
                >
                  Request Custom Integration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

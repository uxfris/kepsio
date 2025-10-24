"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  Zap,
  Users,
  TrendingUp,
  Sparkles,
  Crown,
  MessageSquare,
  Star,
} from "lucide-react";

import { Button } from "../../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/Card";
import { Modal } from "../../ui/Modal";
import { useSubscription } from "../../../hooks/use-subscription";
import { subscriptionPlans } from "../../../config/plans";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: "pro" | "enterprise") => void;
  currentUsage?: {
    used: number;
    limit: number;
  };
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah K.",
    role: "Lifestyle Creator",
    quote:
      "This tool 5x'd my posting consistency. I went from posting once a week to daily without the stress.",
    avatar: "SK",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Agency Owner",
    quote:
      "Cut caption writing time by 80%. My team can now focus on strategy instead of content creation.",
    avatar: "MT",
    rating: 5,
  },
  {
    name: "Priya L.",
    role: "E-commerce Brand",
    quote:
      "My captions finally convert. Sales increased 40% after switching to AI-generated captions.",
    avatar: "PL",
    rating: 5,
  },
];

export default function PaywallModal({
  isOpen,
  onClose,
  onUpgrade,
  currentUsage = { used: 10, limit: 10 },
}: PaywallModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { subscription, isLoading } = useSubscription();

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleUpgrade = (plan: "pro" | "enterprise") => {
    onUpgrade(plan);
    onClose();
  };

  const formatPrice = (price: number) => {
    if (billingCycle === "annual") {
      return Math.round(price * 0.8); // 20% discount
    }
    return price;
  };

  const getAnnualSavings = (monthlyPrice: number) => {
    const annualPrice = monthlyPrice * 12;
    const discountedAnnual = Math.round(monthlyPrice * 0.8 * 12);
    return annualPrice - discountedAnnual;
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
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
        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-br from-section to-section-light border-b border-border">
          <div className="text-center max-w-2xl mx-auto">
            {/* Celebration Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent-hover rounded-2xl mb-4 shadow-lg animate-bounce-in">
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

        {/* Pricing Section */}
        <div className="px-8 py-8">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span
              className={`text-sm font-medium transition-colors ${
                billingCycle === "monthly" ? "text-text-head" : "text-hint"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "annual" : "monthly"
                )
              }
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-accent transition-colors hover:bg-accent-hover"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-surface shadow-md transition-transform ${
                  billingCycle === "annual" ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                billingCycle === "annual" ? "text-text-head" : "text-hint"
              }`}
            >
              Annually
            </span>
            {billingCycle === "annual" && (
              <span className="inline-flex items-center px-2.5 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                Save 20%
              </span>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Free Plan (Current) */}
            <Card
              variant="outlined"
              className="opacity-60 border-border-alt bg-section-light"
            >
              <CardHeader padding="sm">
                <CardTitle className="text-text-body">Free</CardTitle>
                <div className="text-3xl font-bold text-text-body">$0</div>
                <p className="text-sm text-hint">Current plan</p>
              </CardHeader>
              <CardContent padding="sm">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-hint">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 flex-shrink-0">
                      <X className="w-3 h-3 text-hint" />
                    </div>
                    <span className="line-through">
                      {subscriptionPlans.free.limits.captionsPerDay}{" "}
                      captions/month
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-hint">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 flex-shrink-0">
                      <X className="w-3 h-3 text-hint" />
                    </div>
                    <span className="line-through">
                      5 variations per generation
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-hint">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 flex-shrink-0">
                      <X className="w-3 h-3 text-hint" />
                    </div>
                    <span className="line-through">Basic voice training</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pro Plan (Recommended) */}
            <Card
              variant="outlined"
              className="relative border-2 border-accent bg-gradient-to-br from-surface to-section transform scale-105 shadow-xl"
            >
              {/* Recommended Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-accent to-accent-hover text-surface text-xs font-bold rounded-full shadow-md">
                  <Crown className="w-3 h-3" />
                  RECOMMENDED
                </span>
              </div>

              <CardHeader padding="sm">
                <CardTitle className="text-text-head">Pro</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-accent">
                    ${formatPrice(subscriptionPlans.pro.price)}
                  </span>
                  <span className="text-text-body">/month</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-xs text-hint">
                    Billed annually ($
                    {formatPrice(subscriptionPlans.pro.price) * 12}/year)
                  </p>
                )}
                {billingCycle === "annual" && (
                  <p className="text-xs text-success font-medium">
                    Save ${getAnnualSavings(subscriptionPlans.pro.price)}/year
                  </p>
                )}
              </CardHeader>
              <CardContent padding="sm">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>
                      <strong>Unlimited</strong> captions
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>
                      <strong>10 variations</strong> per generation
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>
                      <strong>Advanced</strong> voice cloning
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>Analytics & insights</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>Priority support</span>
                  </li>
                </ul>

                <Button
                  onClick={() => handleUpgrade("pro")}
                  variant="primary"
                  size="lg"
                  leftIcon={<Sparkles className="w-5 h-5" />}
                  className="w-full"
                >
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card
              variant="outlined"
              className="hover:border-border transition-colors"
            >
              <CardHeader padding="sm">
                <CardTitle className="text-text-head">Enterprise</CardTitle>
                <div className="text-2xl font-bold text-text-head mb-1">
                  Custom
                </div>
                <p className="text-sm text-hint">For teams & agencies</p>
              </CardHeader>
              <CardContent padding="sm">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-text-body" />
                    </div>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-text-body" />
                    </div>
                    <span>Custom brand guidelines</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-text-body" />
                    </div>
                    <span>API access</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-text-body" />
                    </div>
                    <span>Dedicated account manager</span>
                  </li>
                </ul>

                <Button
                  onClick={() => handleUpgrade("enterprise")}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Social Proof Section */}
          <Card
            variant="outlined"
            className="bg-gradient-to-r from-section to-section-light mb-6"
          >
            <CardContent padding="md">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Testimonial Carousel */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-surface font-bold flex-shrink-0">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-text-body italic mb-2">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1">
                          {[
                            ...Array(testimonials[currentTestimonial].rating),
                          ].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-accent text-accent"
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-text-head">
                          {testimonials[currentTestimonial].name}
                        </span>
                      </div>
                      <span className="text-sm text-hint">
                        {testimonials[currentTestimonial].role}
                      </span>
                    </div>
                  </div>
                  {/* Carousel Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentTestimonial(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentTestimonial
                            ? "bg-accent w-6"
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-col items-center gap-3 md:border-l md:border-border md:pl-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-lg font-semibold text-text-head">
                      12,000+
                    </span>
                    <span className="text-sm text-text-body">creators</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="text-lg font-semibold text-text-head">
                      4.9
                    </span>
                    <span className="text-sm text-text-body">rating</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Actions */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <button className="text-accent hover:text-accent-hover font-medium hover:underline transition-colors">
              View Pricing Details
            </button>
            <span className="text-border">•</span>
            <button
              onClick={onClose}
              className="text-hint hover:text-text-body font-medium hover:underline transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Zap,
  Users,
  Star,
  Crown,
  Sparkles,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../../../components/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui";
import { useSubscription } from "../../../hooks/use-subscription";
import { subscriptionPlans } from "../../../config/plans";

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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { subscription, isLoading } = useSubscription();
  const router = useRouter();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleUpgrade = (plan: "pro" | "enterprise") => {
    // TODO: Implement upgrade logic
    console.log(`Upgrading to ${plan}`);
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

  return (
    <div className="min-h-screen bg-surface">
      {/* Header Section */}
      <div className="relative px-8 pt-16 pb-12 bg-linear-to-br from-section to-section-light border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            {/* Celebration Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-accent to-accent-hover rounded-2xl mb-6 shadow-lg animate-bounce-in">
              <Zap className="w-10 h-10 text-surface" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-head mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-text-body mb-8">
              Unlock unlimited caption generation and take your content to the
              next level.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
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
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Free Plan */}
            <Card
              variant="outlined"
              className="opacity-60 border-border-alt bg-section-light"
            >
              <CardHeader padding="md">
                <CardTitle className="text-text-body">Free</CardTitle>
                <div className="text-4xl font-bold text-text-body">$0</div>
                <p className="text-sm text-hint">Perfect for getting started</p>
              </CardHeader>
              <CardContent padding="md">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-sm text-hint">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-hint" />
                    </div>
                    <span>
                      {subscriptionPlans.free.limits.captionsPerDay}{" "}
                      captions/day
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-hint">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-hint" />
                    </div>
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-hint">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-hint" />
                    </div>
                    <span>Standard support</span>
                  </li>
                </ul>

                <Button variant="outline" size="lg" className="w-full" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan (Recommended) */}
            <Card
              variant="outlined"
              className="relative border-2 border-accent bg-linear-to-br from-surface to-section transform scale-105 shadow-xl"
            >
              {/* Recommended Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-linear-to-r from-accent to-accent-hover text-surface text-sm font-bold rounded-full shadow-md">
                  <Crown className="w-4 h-4" />
                  RECOMMENDED
                </span>
              </div>

              <CardHeader padding="md">
                <CardTitle className="text-text-head">Pro</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-accent">
                    ${formatPrice(subscriptionPlans.pro.price)}
                  </span>
                  <span className="text-text-body">/month</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-sm text-hint">
                    Billed annually ($
                    {formatPrice(subscriptionPlans.pro.price) * 12}/year)
                  </p>
                )}
                {billingCycle === "annual" && (
                  <p className="text-sm text-success font-medium">
                    Save ${getAnnualSavings(subscriptionPlans.pro.price)}/year
                  </p>
                )}
              </CardHeader>
              <CardContent padding="md">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>
                      <strong>Unlimited</strong> captions
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>
                      <strong>10 variations</strong> per generation
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>
                      <strong>Advanced</strong> voice cloning
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-surface" />
                    </div>
                    <span>Analytics & insights</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center mt-0.5 shrink-0">
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
              <CardHeader padding="md">
                <CardTitle className="text-text-head">Enterprise</CardTitle>
                <div className="text-3xl font-bold text-text-head mb-1">
                  Custom
                </div>
                <p className="text-sm text-hint">For teams & agencies</p>
              </CardHeader>
              <CardContent padding="md">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-text-body" />
                    </div>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-text-body" />
                    </div>
                    <span>Custom brand guidelines</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-text-body" />
                    </div>
                    <span>API access</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-text-body">
                    <div className="w-5 h-5 rounded-full bg-border flex items-center justify-center mt-0.5 shrink-0">
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
            className="bg-linear-to-r from-section to-section-light mb-12"
          >
            <CardContent padding="lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Testimonial Carousel */}
                <div className="flex-1">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-accent to-accent-hover flex items-center justify-center text-surface font-bold shrink-0">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-text-body italic mb-3">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                      <div className="flex items-center gap-2 mb-2">
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
                        <span className="text-base font-semibold text-text-head">
                          {testimonials[currentTestimonial].name}
                        </span>
                      </div>
                      <span className="text-sm text-hint">
                        {testimonials[currentTestimonial].role}
                      </span>
                    </div>
                  </div>
                  {/* Carousel Dots */}
                  <div className="flex justify-center gap-2 mt-6">
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
                <div className="flex flex-col items-center gap-4 md:border-l md:border-border md:pl-8">
                  <div className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-accent" />
                    <span className="text-2xl font-semibold text-text-head">
                      12,000+
                    </span>
                    <span className="text-base text-text-body">creators</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-6 h-6 fill-accent text-accent" />
                    <span className="text-2xl font-semibold text-text-head">
                      4.9
                    </span>
                    <span className="text-base text-text-body">rating</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-head mb-4">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card variant="outlined">
                <CardContent padding="md">
                  <h3 className="font-semibold text-text-head mb-2">
                    Can I change plans anytime?
                  </h3>
                  <p className="text-sm text-text-body">
                    Yes! You can upgrade or downgrade your plan at any time.
                    Changes take effect immediately.
                  </p>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardContent padding="md">
                  <h3 className="font-semibold text-text-head mb-2">
                    What happens to my data?
                  </h3>
                  <p className="text-sm text-text-body">
                    Your captions and voice profiles are always safe. We never
                    delete your data when you change plans.
                  </p>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardContent padding="md">
                  <h3 className="font-semibold text-text-head mb-2">
                    Do you offer refunds?
                  </h3>
                  <p className="text-sm text-text-body">
                    We offer a 30-day money-back guarantee. If you're not
                    satisfied, we'll refund your payment.
                  </p>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardContent padding="md">
                  <h3 className="font-semibold text-text-head mb-2">
                    Need help choosing?
                  </h3>
                  <p className="text-sm text-text-body">
                    Contact our support team and we'll help you find the perfect
                    plan for your needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back to Dashboard */}
          <div className="text-center">
            <Button onClick={() => router.back()} variant="outline" size="lg">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

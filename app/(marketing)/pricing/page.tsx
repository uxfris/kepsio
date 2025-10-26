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
import { SegmentedControl } from "../../../components/ui/SegmentedControl";
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
    <div className="min-h-screen bg-section">
      {/* Header Section */}
      <div className="relative px-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center gap-8 max-w-3xl mx-auto">
            {/* Headline */}
            <Zap className="w-10 h-10 text-text-body mb-4" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-head mb-4">
              Choose Your Plan
            </h1>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="relative">
              <SegmentedControl
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "annual", label: "Annual" },
                ]}
                value={billingCycle}
                onChange={(value) =>
                  setBillingCycle(value as "monthly" | "annual")
                }
                className="min-w-[200px]"
              />
              {/* Discount Badge */}
              {/* <div className="absolute -top-3 -right-3">
                <div className="bg-linear-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                  Save 20%
                </div>
              </div> */}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Free Plan */}
            <Card
              variant="outlined"
              className="border-border hover:border-border-alt transition-all rounded-3xl"
            >
              <CardHeader padding="md">
                <div className="flex flex-col items-start gap-8 mb-2">
                  <Zap className="h-16 w-16 text-text-body" />
                  <CardTitle className="text-text-head text-2xl">
                    Free
                  </CardTitle>
                </div>
                <p className="text-md text-text-head mb-4">
                  Perfect for getting started
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-text-head">$0</span>
                  <span className="text-text-body">/month</span>
                </div>
                <p className="text-text-body text-sm mt-2">Free for everyone</p>
              </CardHeader>
              <CardContent padding="md">
                <Button variant="outline" size="md" className="w-full mb-8">
                  Get Started
                </Button>

                {/* Divider */}
                <div className="border-t border-border mb-8"></div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">
                      10 captions per month
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">
                      5 variations per generation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">Basic voice training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">All platform presets</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card
              variant="outlined"
              className="border-border hover:border-border-alt transition-all rounded-3xl"
            >
              <CardHeader padding="md">
                <div className="flex flex-col items-start gap-8 mb-2">
                  <Crown className="h-16 w-16 text-text-body" />
                  <CardTitle className="text-text-head text-2xl">Pro</CardTitle>
                </div>
                <p className="text-md text-text-head mb-4">
                  For serious creators & agencies
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-text-head">
                    ${formatPrice(subscriptionPlans.pro.price)}
                  </span>
                  <span className="text-text-body">/month</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-text-body text-sm mt-2">
                    Billed ${formatPrice(subscriptionPlans.pro.price) * 12}/year
                    · Save ${getAnnualSavings(subscriptionPlans.pro.price)}/year
                  </p>
                )}
              </CardHeader>
              <CardContent padding="md">
                <Button
                  onClick={() => handleUpgrade("pro")}
                  variant="primary"
                  size="md"
                  className="w-full mb-8"
                >
                  Upgrade to Pro
                </Button>

                {/* Divider */}
                <div className="border-t border-border mb-8"></div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">Unlimited captions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">
                      10 variations per generation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">
                      Advanced voice cloning
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">Analytics & insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">
                      Team collaboration (3 seats)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">A/B testing mode</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card
              variant="outlined"
              className="border-border hover:border-border-alt transition-all rounded-3xl"
            >
              <CardHeader padding="md">
                <div className="flex flex-col items-start gap-8 mb-2">
                  <Users className="h-16 w-16 text-text-body" />
                  <CardTitle className="text-text-head text-2xl">
                    Enterprise
                  </CardTitle>
                </div>
                <p className="text-md text-text-head mb-4">
                  For teams & brands at scale
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-text-head">
                    From $100
                  </span>
                </div>
                <p className="text-text-body text-sm mt-2">
                  Per person billed monthly
                </p>
              </CardHeader>
              <CardContent padding="md">
                <Button
                  onClick={() => handleUpgrade("enterprise")}
                  variant="primary"
                  size="md"
                  className="w-full mb-8"
                >
                  Contact Sales
                </Button>

                {/* Divider */}
                <div className="border-t border-border mb-8"></div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">Unlimited team seats</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">
                      Custom brand guidelines
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">API access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">
                      Dedicated account manager
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">
                      SSO & advanced security
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5  shrink-0 mt-0.5" />
                    <span className="text-text-body">Custom integrations</span>
                  </li>
                </ul>
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
            <h2 className="text-3xl font-bold text-text-head mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: "Can I cancel anytime?",
                  a: "Yes! Cancel anytime from your account settings. No questions asked, no hidden fees.",
                },
                {
                  q: "What happens when I hit the free plan limit?",
                  a: "You'll see a prompt to upgrade. Your saved captions remain accessible, you just can't generate new ones until next month or you upgrade.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "Absolutely. If you're not satisfied within 30 days, we'll refund you in full.",
                },
                {
                  q: "Can I change plans later?",
                  a: "Yes! Upgrade or downgrade anytime. Changes take effect on your next billing cycle.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-surface rounded-lg border border-border p-6 cursor-pointer hover:border-accent/20 transition-all"
                >
                  <summary className="font-semibold text-text-head cursor-pointer">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-text-body leading-relaxed">{faq.a}</p>
                </details>
              ))}
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

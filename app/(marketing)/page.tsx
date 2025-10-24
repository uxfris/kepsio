"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Play,
  Check,
  ArrowRight,
  Zap,
  MessageSquare,
  TrendingUp,
  Instagram,
  Twitter,
  Linkedin,
  Star,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Navbar } from "../../components/shared/Navbar";
import SignupModal from "../../components/shared/SignupModal";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const testimonials = [
    {
      text: "This tool 5x'd my posting consistency. I used to dread writing captions—now I actually look forward to it.",
      author: "Sarah Chen",
      role: "Lifestyle Creator, 47K followers",
      avatar: "SC",
    },
    {
      text: "Managing 8 client accounts was burning me out. AI Caption Studio cut my caption writing time by 70%.",
      author: "Marcus Johnson",
      role: "Social Media Manager",
      avatar: "MJ",
    },
    {
      text: "The voice cloning is scary good. My captions sound exactly like me, not some generic AI bot.",
      author: "Priya Patel",
      role: "E-commerce Brand Owner",
      avatar: "PP",
    },
  ];

  const platformExamples: Record<string, { generic: string; ours: string }> = {
    instagram: {
      generic:
        "Check out our new product! Link in bio. #newproduct #excited #launch",
      ours: "You know that feeling when something just clicks? 🌟\n\nThat's exactly what happened when we created this. Months of late nights, endless iterations, and about 47 cups of coffee later... it's finally here.\n\nWant the full story? 👆 Link in bio\n\n#authenticbranding #behindthescenes",
    },
    linkedin: {
      generic:
        "Excited to share our latest achievement. Great team effort. #business #success",
      ours: "3 years ago, we pitched this idea to 47 investors.\n\n46 said no.\n\nToday, we're announcing $5M in revenue. Here's what we learned about resilience:\n\n→ Rejection isn't failure—it's data\n→ Your timeline isn't their timeline\n→ One yes can change everything\n\nTo everyone building in the shadows: keep going.",
    },
    twitter: {
      generic: "New blog post is live! Check it out. #content #blog",
      ours: "spent 40 hours writing about why most AI tools feel soulless\n\ntl;dr: they optimize for clicks, not connection\n\nfull breakdown (actually worth reading): [link]",
    },
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Examples", href: "#examples" },
  ];

  const brand = (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-surface" />
      </div>
      <span className="text-xl font-bold text-primary">Kepsio</span>
    </div>
  );

  const navActions = (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm">
        Sign In
      </Button>
      <Button
        variant="accent"
        size="sm"
        onClick={() => setShowSignupModal(true)}
      >
        Start Free
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-section">
      {/* Navigation */}
      <Navbar
        brand={brand}
        items={navItems}
        actions={navActions}
        variant="elevated"
        position="sticky"
      />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full mb-8 shadow-sm">
            <div className="flex -space-x-2">
              {["#c96442", "#d17a5a", "#d99072", "#e1a68a"].map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-surface"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <span className="text-sm text-primary font-medium">
              Trusted by 12,000+ creators
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            Your content. Your voice.
            <span className="block text-accent">Zero blank screens.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-text-body mb-10 leading-relaxed max-w-3xl mx-auto">
            Generate scroll-stopping captions in seconds. Try free—no card
            required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg px-8 py-4"
              onClick={() => setShowSignupModal(true)}
            >
              Generate Your First Caption
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Play className="w-5 h-5" />}
              onClick={() => setShowVideo(true)}
              className="text-lg px-8 py-4"
            >
              See How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-hint">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>10 captions/month free</span>
            </div>
          </div>
        </div>

        {/* Live Comparison Demo */}
        <div id="examples" className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-3">
              See the difference instantly
            </h3>
            <p className="text-text-body">
              Toggle between generic AI and captions that actually sound like
              you
            </p>
          </div>

          {/* Platform Selector */}
          <div className="flex justify-center gap-3 mb-6">
            {[
              { id: "instagram", icon: Instagram, label: "Instagram" },
              { id: "linkedin", icon: Linkedin, label: "LinkedIn" },
              { id: "twitter", icon: Twitter, label: "Twitter/X" },
            ].map((platform) => (
              <Button
                key={platform.id}
                variant={
                  selectedPlatform === platform.id ? "accent" : "outline"
                }
                size="sm"
                onClick={() => setSelectedPlatform(platform.id)}
                leftIcon={<platform.icon className="w-4 h-4" />}
              >
                {platform.label}
              </Button>
            ))}
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Generic AI */}
            <Card className="p-6 border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-hint uppercase tracking-wide">
                  Generic AI
                </span>
                <span className="px-3 py-1 bg-section-light text-text-body text-xs font-medium rounded-full">
                  Robotic
                </span>
              </div>
              <p className="text-text-body leading-relaxed whitespace-pre-line">
                {platformExamples[selectedPlatform].generic}
              </p>
            </Card>

            {/* Our AI */}
            <Card className="p-6 border-accent bg-linear-to-br from-accent/5 to-accent/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full filter blur-3xl opacity-20"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Kepsio
                </span>
                <span className="px-3 py-1 bg-accent text-surface text-xs font-medium rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Authentic
                </span>
              </div>
              <p className="text-primary leading-relaxed whitespace-pre-line relative z-10">
                {platformExamples[selectedPlatform].ours}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Built for creators who refuse to sound generic
            </h2>
            <p className="text-xl text-text-body max-w-2xl mx-auto">
              Every feature designed to save time while keeping your unique
              voice intact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Generate in Seconds
              </h3>
              <p className="text-text-body leading-relaxed mb-4">
                Describe your content, hit generate, get 5 caption variations
                instantly. No prompting gymnastics required.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Platform-specific formatting</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Hashtag suggestions included</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>CTA optimization built-in</span>
                </li>
              </ul>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Your Voice, Not Ours
              </h3>
              <p className="text-text-body leading-relaxed mb-4">
                Train the AI on your style. It learns your tone, vocabulary, and
                emoji preferences automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Voice cloning from past captions</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Multi-brand profiles for agencies</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Tone consistency guardrails</span>
                </li>
              </ul>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Built to Perform
              </h3>
              <p className="text-text-body leading-relaxed mb-4">
                Not just words—captions optimized for engagement. Every
                suggestion follows proven best practices.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Hook formulas that stop scrolling</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Engagement prediction scores</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-text-body">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>A/B testing recommendations</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 bg-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Loved by creators who actually create
            </h2>
            <div className="flex items-center justify-center gap-2 text-warning">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-current" />
              ))}
              <span className="text-text-body ml-2">
                4.9/5 from 1,200+ reviews
              </span>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 bg-linear-to-br from-accent/5 to-accent/10 border-accent/20 relative">
              <div className="absolute top-8 left-8 text-accent/30 text-6xl font-serif">
                "
              </div>

              <div className="relative z-10 text-center">
                <p className="text-2xl text-primary mb-8 leading-relaxed">
                  {testimonials[testimonialIndex].text}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-surface font-bold">
                    {testimonials[testimonialIndex].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-primary">
                      {testimonials[testimonialIndex].author}
                    </div>
                    <div className="text-sm text-text-body">
                      {testimonials[testimonialIndex].role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button variant="outline" size="icon" onClick={prevTestimonial}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTestimonialIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === testimonialIndex
                          ? "bg-accent w-8"
                          : "bg-border w-2"
                      }`}
                    />
                  ))}
                </div>

                <Button variant="outline" size="icon" onClick={nextTestimonial}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Stats Bar */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">12K+</div>
              <div className="text-text-body">Active creators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">2M+</div>
              <div className="text-text-body">Captions generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">5x</div>
              <div className="text-text-body">Avg. posting increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Start free, upgrade when you're ready
            </h2>
            <p className="text-xl text-text-body">
              No credit card. No tricks. Just value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 border-border">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Free</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-primary">$0</span>
                  <span className="text-text-body">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">10 captions per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">
                    5 variations per generation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">Basic voice training</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">All platforms</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowSignupModal(true)}
              >
                Start Free
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="p-8 border-accent bg-linear-to-br from-accent to-accent/90 relative overflow-hidden shadow-xl scale-105">
              <div className="absolute top-0 right-0 bg-surface text-accent px-4 py-1 text-xs font-bold rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-surface mb-2">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-surface">$19</span>
                  <span className="text-accent/80">/month</span>
                </div>
                <p className="text-accent/80 text-sm mt-2">
                  or $15/mo billed annually
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-surface mt-0.5 shrink-0" />
                  <span className="text-surface font-medium">
                    Unlimited captions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-surface mt-0.5 shrink-0" />
                  <span className="text-surface font-medium">
                    10 variations per generation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-surface mt-0.5 shrink-0" />
                  <span className="text-surface font-medium">
                    Advanced voice cloning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-surface mt-0.5 shrink-0" />
                  <span className="text-surface font-medium">
                    Analytics & insights
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-surface mt-0.5 shrink-0" />
                  <span className="text-surface font-medium">
                    Team collaboration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-surface mt-0.5 shrink-0" />
                  <span className="text-surface font-medium">
                    Priority support
                  </span>
                </li>
              </ul>
              <Button
                variant="primary"
                className="w-full bg-surface text-accent hover:bg-section-light"
                onClick={() => setShowSignupModal(true)}
              >
                Start Pro Trial
              </Button>
            </Card>

            {/* Enterprise Plan */}
            <Card className="p-8 border-border">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Enterprise
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    Let's talk
                  </span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">
                    Custom brand guidelines
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">API access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">
                    Dedicated account manager
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-body">Custom integrations</span>
                </li>
              </ul>
              <Button variant="primary" className="w-full">
                Contact Sales
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-linear-to-br from-accent to-accent/90">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-surface mb-6">
            Stop staring at blank screens
          </h2>
          <p className="text-xl text-white/50 mb-10 leading-relaxed">
            Join 12,000+ creators who post consistently without burning out.
            Start free today.
          </p>
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="bg-surface text-accent hover:bg-section-light text-lg px-10 py-5"
            onClick={() => setShowSignupModal(true)}
          >
            Generate Your First Caption Free
          </Button>
          <p className="text-white/50 text-sm mt-6">
            No credit card required • 10 free captions/month forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-text-body py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-surface" />
                </div>
                <span className="text-lg font-bold text-surface">Kepsio</span>
              </div>
              <p className="text-sm text-hint mb-4">
                The AI caption tool that actually sounds like you.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 bg-primary/50 hover:bg-primary/70 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-primary/50 hover:bg-primary/70 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-primary/50 hover:bg-primary/70 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-surface font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#examples"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-surface font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Caption Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-surface font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-surface transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-hint">
              © 2025 Kepsio. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-hint">
              <a href="#" className="hover:text-surface transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-surface transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-surface transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideo && (
        <div
          onClick={() => setShowVideo(false)}
          className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl max-w-4xl w-full overflow-hidden"
          >
            <div className="aspect-video bg-primary flex items-center justify-center relative">
              <Play className="w-20 h-20 text-surface opacity-50" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 bg-surface/10 hover:bg-surface/20 text-surface"
              >
                <X className="w-5 h-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-primary/60 to-transparent">
                <p className="text-surface text-sm">
                  Demo video: See Kepsio in action (2:30)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={(email) => {
          console.log("Signup successful for:", email);
          // Here you would typically redirect to the dashboard or show a success message
        }}
      />
    </div>
  );
}

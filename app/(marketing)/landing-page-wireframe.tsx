import React, { useState } from "react";
import {
  Sparkles,
  Play,
  Check,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Instagram,
  Twitter,
  Linkedin,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [showAIComparison, setShowAIComparison] = useState("ours");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

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

  const platformExamples = {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              AI Caption Studio
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#examples"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Examples
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md">
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full mb-8">
            <div className="flex -space-x-2">
              {["#9333EA", "#DB2777", "#EC4899", "#F472B6"].map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <span className="text-sm text-purple-900 font-medium">
              Trusted by 12,000+ creators
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your content. Your voice.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Zero blank screens.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Generate scroll-stopping captions in seconds. Try free—no card
            required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-lg">
              Generate Your First Caption
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all text-lg"
            >
              <Play className="w-5 h-5" />
              See How It Works
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>10 captions/month free</span>
            </div>
          </div>
        </div>

        {/* Live Comparison Demo */}
        <div id="examples" className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              See the difference instantly
            </h3>
            <p className="text-gray-600">
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
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedPlatform === platform.id
                    ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
                    : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
                }`}
              >
                <platform.icon className="w-4 h-4" />
                {platform.label}
              </button>
            ))}
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Generic AI */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Generic AI
                </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                  Robotic
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {platformExamples[selectedPlatform].generic}
              </p>
            </div>

            {/* Our AI */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-sm font-semibold text-purple-900 uppercase tracking-wide">
                  AI Caption Studio
                </span>
                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Authentic
                </span>
              </div>
              <p className="text-gray-900 leading-relaxed whitespace-pre-line relative z-10">
                {platformExamples[selectedPlatform].ours}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for creators who refuse to sound generic
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature designed to save time while keeping your unique
              voice intact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Generate in Seconds
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Describe your content, hit generate, get 5 caption variations
                instantly. No prompting gymnastics required.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Platform-specific formatting</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Hashtag suggestions included</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>CTA optimization built-in</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Your Voice, Not Ours
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Train the AI on your style. It learns your tone, vocabulary, and
                emoji preferences automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Voice cloning from past captions</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Multi-brand profiles for agencies</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Tone consistency guardrails</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Built to Perform
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Not just words—captions optimized for engagement. Every
                suggestion follows proven best practices.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Hook formulas that stop scrolling</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Engagement prediction scores</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>A/B testing recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by creators who actually create
            </h2>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">
                4.9/5 from 1,200+ reviews
              </span>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 relative">
              <div className="absolute top-8 left-8 text-purple-200 text-6xl font-serif">
                "
              </div>

              <div className="relative z-10 text-center">
                <p className="text-2xl text-gray-900 mb-8 leading-relaxed">
                  {testimonials[testimonialIndex].text}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[testimonialIndex].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {testimonials[testimonialIndex].author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonials[testimonialIndex].role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTestimonialIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === testimonialIndex
                          ? "bg-purple-600 w-8"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                12K+
              </div>
              <div className="text-gray-600">Active creators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2M+</div>
              <div className="text-gray-600">Captions generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">5x</div>
              <div className="text-gray-600">Avg. posting increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Start free, upgrade when you're ready
            </h2>
            <p className="text-xl text-gray-600">
              No credit card. No tricks. Just value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">10 captions per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    5 variations per generation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Basic voice training</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">All platforms</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors">
                Start Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 relative overflow-hidden shadow-xl scale-105">
              <div className="absolute top-0 right-0 bg-white text-purple-600 px-4 py-1 text-xs font-bold rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$19</span>
                  <span className="text-purple-100">/month</span>
                </div>
                <p className="text-purple-100 text-sm mt-2">
                  or $15/mo billed annually
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">
                    Unlimited captions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">
                    10 variations per generation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">
                    Advanced voice cloning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">
                    Analytics & insights
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">
                    Team collaboration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white font-medium">
                    Priority support
                  </span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 bg-white hover:bg-gray-100 text-purple-600 font-semibold rounded-lg transition-colors">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    Let's talk
                  </span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Custom brand guidelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">API access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    Dedicated account manager
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Custom integrations</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stop staring at blank screens
          </h2>
          <p className="text-xl text-purple-100 mb-10 leading-relaxed">
            Join 12,000+ creators who post consistently without burning out.
            Start free today.
          </p>
          <button className="bg-white hover:bg-gray-100 text-purple-600 font-bold text-lg px-10 py-5 rounded-xl transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-2">
            Generate Your First Caption Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-purple-100 text-sm mt-6">
            No credit card required • 10 free captions/month forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">
                  AI Caption Studio
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                The AI caption tool that actually sounds like you.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#examples"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Caption Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2025 AI Caption Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden"
          >
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              <Play className="w-20 h-20 text-white opacity-50" />
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm">
                  Demo video: See AI Caption Studio in action (2:30)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

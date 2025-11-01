"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Sparkles,
  Zap,
  BarChart3,
  Copy,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent } from "../../../components/ui/Card";
import { useSubscription } from "../../../hooks/use-subscription";

// Confetti Animation Component
const ConfettiAnimation = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      color: string;
      size: number;
      rotation: number;
      velocity: { x: number; y: number };
    }>
  >([]);

  useEffect(() => {
    const colors = [
      "#3B82F6", // blue
      "#10B981", // green
      "#F59E0B", // yellow
      "#EF4444", // red
      "#8B5CF6", // purple
      "#06B6D4", // cyan
    ];

    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 3 + 2,
      },
    }));

    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            rotation: particle.rotation + 5,
          }))
          .filter((particle) => particle.y < window.innerHeight + 50)
      );
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: "50%",
            transform: `rotate(${particle.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default function PostUpgradeSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { subscription, refetch } = useSubscription();
  const [countdown, setCountdown] = useState(5);
  const [showConfetti, setShowConfetti] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [paymentVerified, setPaymentVerified] = useState(false);

  const sessionId = searchParams.get("session_id");

  // Verify the checkout session and wait for subscription update
  useEffect(() => {
    if (!sessionId) {
      setVerifying(false);
      setPaymentVerified(true);
      return;
    }

    let pollCount = 0;
    const maxPolls = 10;

    const verifySession = async () => {
      try {
        const response = await fetch(
          `/api/billing/verify-session?session_id=${sessionId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify session");
        }

        // Check if payment was successful
        if (data.success) {
          // Check if subscription has been updated in database
          if (
            data.subscription &&
            (data.subscription.plan === "pro" ||
              data.subscription.plan === "enterprise")
          ) {
            setPaymentVerified(true);
            setVerifying(false);
            refetch();
            return true;
          }

          // Payment succeeded but subscription not yet updated, keep polling
          pollCount++;
          if (pollCount < maxPolls) {
            setTimeout(verifySession, 1500);
          } else {
            // Max polls reached, force refetch and show success anyway
            setPaymentVerified(true);
            setVerifying(false);
            refetch();
            return true;
          }
        } else {
          throw new Error("Payment not completed");
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setVerificationError(
          error instanceof Error
            ? error.message
            : "Failed to verify payment status"
        );
        setVerifying(false);
      }
      return false;
    };

    verifySession();
  }, [sessionId, refetch]);

  // Auto-redirect countdown - only start after verification completes
  useEffect(() => {
    if (!paymentVerified || verifying) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentVerified, verifying]);

  // Handle auto-redirect when countdown reaches 0
  useEffect(() => {
    if (countdown === 0 && paymentVerified) {
      const redirectTimer = setTimeout(() => {
        try {
          router.push("/generate");
        } catch (error) {
          console.error("Navigation error:", error);
          // Fallback to window.location if router fails
          window.location.href = "/dashboard";
        }
      }, 100);

      return () => clearTimeout(redirectTimer);
    }
  }, [countdown, router, paymentVerified]);

  // Hide confetti after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateCaptions = () => {
    router.push("/generate");
  };

  const handleExploreFeatures = () => {
    router.push("/dashboard");
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // Show loading state while verifying payment
  if (verifying) {
    return (
      <div className="min-h-screen bg-linear-to-br from-accent/5 via-surface to-accent/10 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Verifying Your Payment...
          </h1>
          <p className="text-lg text-text-body">
            Please wait while we confirm your subscription. This usually takes
            just a few seconds.
          </p>
        </div>
      </div>
    );
  }

  // Show error state if verification failed
  if (verificationError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-accent/5 via-surface to-accent/10 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Verification Issue
          </h1>
          <p className="text-lg text-text-body mb-6">{verificationError}</p>
          <p className="text-sm text-text-body mb-8">
            Don't worry! Your payment was processed successfully. You can
            refresh this page or check your subscription in your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleRetry} variant="primary" size="lg">
              Retry Verification
            </Button>
            <Button onClick={handleExploreFeatures} variant="outline" size="lg">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-accent/5 via-surface to-accent/10 flex items-center justify-center p-6">
      {/* Confetti Animation */}
      {showConfetti && paymentVerified && <ConfettiAnimation />}

      <div className="max-w-4xl w-full">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Welcome to{" "}
            {subscription?.plan === "enterprise" ? "Enterprise" : "Pro"}! 🚀
          </h1>

          <p className="text-xl text-text-body max-w-2xl mx-auto">
            You now have unlimited caption generation + exclusive features
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="group hover:shadow-lg transition-all duration-300 border-accent/20 hover:border-accent/40">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                <Copy className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Generate up to 10 variations at once
              </h3>
              <p className="text-sm text-text-body">
                Create multiple caption options in a single generation
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-accent/20 hover:border-accent/40">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Clone your voice with advanced AI training
              </h3>
              <p className="text-sm text-text-body">
                Train AI to write in your unique style and tone
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-accent/20 hover:border-accent/40">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 group-hover:bg-accent/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Track what's working with analytics
              </h3>
              <p className="text-sm text-text-body">
                Monitor performance and optimize your content strategy
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleCreateCaptions}
            variant="primary"
            size="lg"
            leftIcon={<Sparkles className="w-5 h-5" />}
            className="text-base font-semibold px-8 py-4"
          >
            Create Unlimited Captions Now
          </Button>

          <Button
            onClick={handleExploreFeatures}
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="text-base font-semibold px-8 py-4"
          >
            Explore Pro Features
          </Button>
        </div>

        {/* Auto-redirect notice */}
        {paymentVerified && countdown > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-text-body">
              Auto-redirecting to dashboard in{" "}
              <span className="font-semibold text-accent">{countdown}</span>{" "}
              seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

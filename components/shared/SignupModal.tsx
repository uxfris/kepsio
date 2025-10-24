"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (email: string) => void;
}

export default function SignupModal({
  isOpen,
  onClose,
  onSuccess,
}: SignupModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setError("");
      setSuccess(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      onSuccess?.(email);

      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSOSignup = async (provider: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate SSO flow
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`Signing up with ${provider}`);
      onSuccess?.(`${provider} user`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center z-modal p-4 animate-fade-in"
        onClick={onClose}
      >
        {/* Modal Container */}
        <Card
          className="max-w-md w-full animate-scale-in shadow-2xl border-border-alt"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-section-light rounded-lg transition-colors group z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-hint group-hover:text-text-body" />
          </button>

          {/* Modal Content */}
          <div className="p-8">
            {success ? (
              /* Success State */
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-6">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-head mb-3">
                  Welcome to Kepsio!
                </h2>
                <p className="text-text-body mb-6">
                  Check your email for next steps. We're excited to help you
                  create amazing captions.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-success">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Account created successfully</span>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-2xl mb-4">
                    <Sparkles className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-text-head mb-2">
                    Start creating in 5 seconds
                  </h2>
                  <p className="text-text-body text-sm">
                    Join 12,000+ creators crafting better captions
                  </p>
                </div>

                {/* Social SSO Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-center gap-3"
                    onClick={() => handleSSOSignup("Google")}
                    disabled={isLoading}
                    leftIcon={
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    }
                  >
                    Continue with Google
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-center gap-3"
                    onClick={() => handleSSOSignup("Twitter")}
                    disabled={isLoading}
                    leftIcon={
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    }
                  >
                    Continue with X
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-surface text-hint">
                      or continue with email
                    </span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-hint" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your email"
                        disabled={isLoading}
                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-surface ${
                          error
                            ? "border-error focus:border-error focus:ring-error/20"
                            : "border-border focus:border-accent focus:ring-accent/20"
                        }`}
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-error flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-error rounded-full"></span>
                        {error}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    loading={isLoading}
                    disabled={isLoading}
                    rightIcon={
                      !isLoading ? (
                        <ArrowRight className="w-5 h-5" />
                      ) : undefined
                    }
                  >
                    {isLoading ? "Creating your studio..." : "Start Creating"}
                  </Button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-6 text-sm text-hint">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>Free forever</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>No card needed</span>
                    </div>
                  </div>

                  {/* Legal Micro-copy */}
                  <p className="text-xs text-hint text-center leading-relaxed">
                    By continuing, you agree to our{" "}
                    <button className="text-text-body hover:text-text-head underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-text-body hover:text-text-head underline">
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

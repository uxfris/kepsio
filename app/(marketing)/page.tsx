"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  HeroSection,
  PlatformComparison,
  FeaturesSection,
  FinalCTASection,
  VideoModal,
  PricingSection,
} from "../../components/marketing";
import SignupModal from "../../components/shared/SignupModal";
import SigninModal from "../../components/shared/SigninModal";
import {
  PLATFORM_EXAMPLES,
  FEATURES,
  TESTIMONIALS,
} from "../../lib/constants/marketing";
import { createClient } from "../../lib/supabase/client";
import dynamic from "next/dynamic";

// Lazy load heavy components
const TestimonialsSection = dynamic(
  () =>
    import("../../components/marketing").then(
      (module) => module.TestimonialsSection
    ),
  {
    loading: () => <SectionLoader />,
    ssr: false,
  }
);

// Loading component for Suspense fallback
const SectionLoader = () => (
  <div className="flex items-center justify-center py-24">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  </div>
);

export default function HomePage() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleVideoClick = useCallback(() => {
    setShowVideo(true);
  }, []);

  const handleVideoClose = useCallback(() => {
    setShowVideo(false);
  }, []);

  const handleSignupClick = useCallback(() => {
    if (user) {
      router.push("/generate");
    } else {
      setShowSignupModal(true);
    }
  }, [user, router]);

  const handleSignupClose = useCallback(() => {
    setShowSignupModal(false);
  }, []);

  const handleSignupSuccess = useCallback((email: string) => {
    console.log("Signup successful for:", email);

    //For the SSO sign up, do:

    //Redirect to onboarding page (if it's a new user)
    // router.push("/onboarding");

    //Redirect to dashboard page (if it's an existing user)
    // router.push("/dashboard");

    //For the email sign up, do:
    //will be redirected by the magic link
  }, []);

  const handleUpgrade = useCallback(
    (planId: string) => {
      if (user) {
        router.push("/generate");
      } else {
        console.log(`Upgrading to ${planId}`);
        setShowSignupModal(true);
      }
    },
    [user, router]
  );

  const handleSigninClose = useCallback(() => {
    setShowSigninModal(false);
  }, []);

  const handleSigninSuccess = useCallback((email: string) => {
    console.log("Signin successful for:", email);
    //For SSO signin: Here you would typically redirect to the dashboard
    //For Email signin: will be redirected by the magic link
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        onSignupClick={handleSignupClick}
        onVideoClick={handleVideoClick}
      />

      {/* Live Comparison Demo */}
      <PlatformComparison examples={PLATFORM_EXAMPLES} />

      {/* Features Section */}
      <FeaturesSection features={FEATURES as any} />

      {/* Social Proof / Testimonials */}
      <TestimonialsSection testimonials={TESTIMONIALS as any} />

      {/* Pricing Section */}
      <PricingSection onUpgrade={handleUpgrade} />

      {/* Final CTA */}
      <FinalCTASection onSignupClick={handleSignupClick} />

      {/* Video Modal */}
      <VideoModal isOpen={showVideo} onClose={handleVideoClose} />

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={handleSignupClose}
        onSuccess={handleSignupSuccess}
        onSwitchToSignin={() => setShowSigninModal(true)}
      />

      {/* Signin Modal */}
      <SigninModal
        isOpen={showSigninModal}
        onClose={handleSigninClose}
        onSuccess={handleSigninSuccess}
        onSwitchToSignup={() => setShowSignupModal(true)}
      />
    </>
  );
}

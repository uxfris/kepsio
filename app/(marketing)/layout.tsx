"use client";

import { ReactNode, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Navbar } from "../../components/shared/Navbar";
import { MarketingFooter } from "../../components/marketing";
import SignupModal from "../../components/shared/SignupModal";
import SigninModal from "../../components/shared/SigninModal";
import AuthenticatedNavbarCTAs from "../../components/shared/AuthenticatedNavbarCTAs";
import { NAV_ITEMS, FOOTER_COLUMNS } from "../../lib/constants/marketing";
import { createClient } from "../../lib/supabase/client";

interface MarketingLayoutProps {
  children: ReactNode;
}

// Responsive Actions Component for Unauthenticated Users
function UnauthenticatedNavActions({
  isScrolled,
  onSigninClick,
  onSignupClick,
}: {
  isScrolled: boolean;
  onSigninClick: () => void;
  onSignupClick: () => void;
}) {
  return (
    <div
      className={`flex items-center ${
        isScrolled ? "gap-2" : "gap-3"
      } transition-all duration-300`}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onSigninClick}
        className={isScrolled ? "text-xs px-2 h-7" : ""}
      >
        Sign In
      </Button>
      <Button
        variant="accent"
        size="sm"
        onClick={onSignupClick}
        className={isScrolled ? "text-xs px-2 h-7" : ""}
      >
        Start Free
      </Button>
    </div>
  );
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Track scroll state for responsive actions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brand = (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-surface" />
      </div>
      <span className="text-xl font-bold text-primary">Kepsio</span>
    </div>
  );

  const navActions = isLoading ? null : user ? (
    <AuthenticatedNavbarCTAs user={user} />
  ) : (
    <UnauthenticatedNavActions
      isScrolled={isScrolled}
      onSigninClick={() => setShowSigninModal(true)}
      onSignupClick={() => setShowSignupModal(true)}
    />
  );

  return (
    <div className="min-h-screen bg-section">
      <Navbar
        brand={brand}
        items={NAV_ITEMS as any}
        actions={navActions}
        variant="elevated"
        position="sticky"
      />
      <main>{children}</main>
      <MarketingFooter columns={FOOTER_COLUMNS as any} />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={(email) => {
          console.log("Signup successful for:", email);
          // Here you would typically redirect to the dashboard or show a success message
        }}
        onSwitchToSignin={() => setShowSigninModal(true)}
      />

      <SigninModal
        isOpen={showSigninModal}
        onClose={() => setShowSigninModal(false)}
        onSuccess={(email) => {
          console.log("Signin successful for:", email);
          // Here you would typically redirect to the dashboard
        }}
        onSwitchToSignup={() => setShowSignupModal(true)}
      />
    </div>
  );
}

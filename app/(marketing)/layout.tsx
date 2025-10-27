"use client";

import { ReactNode, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Navbar } from "../../components/shared/Navbar";
import { MarketingFooter } from "../../components/marketing";
import SignupModal from "../../components/shared/SignupModal";
import SigninModal from "../../components/shared/SigninModal";
import { NAV_ITEMS, FOOTER_COLUMNS } from "../../lib/constants/marketing";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

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
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSigninModal(true)}
      >
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

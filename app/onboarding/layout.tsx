import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-section">{children}</div>;
}

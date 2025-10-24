import { ReactNode } from "react";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Header component will be added here */}
      <main>{children}</main>
      {/* Footer component will be added here */}
    </div>
  );
}

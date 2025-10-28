"use client";

import { ReactNode } from "react";
import { ToastProvider } from "../components/ui/Toast";
import { SubscriptionProvider } from "../contexts/SubscriptionContext";
import { UsageProvider } from "../contexts/UsageContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ToastProvider>
      <SubscriptionProvider>
        <UsageProvider>{children}</UsageProvider>
      </SubscriptionProvider>
    </ToastProvider>
  );
}

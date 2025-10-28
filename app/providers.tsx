"use client";

import { ReactNode } from "react";
import { ToastProvider } from "../components/ui/Toast";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ToastProvider>{children}</ToastProvider>;
}

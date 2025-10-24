"use client";

import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* Add your context providers here */}
      {children}
    </>
  );
}

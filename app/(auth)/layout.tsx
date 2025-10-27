import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full">{children}</div>
    </div>
  );
}

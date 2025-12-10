import { Navbar } from "@/components/shared/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Kepsio",
  description: "Your Kepsio workspace for generating and managing captions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">
    <Navbar />
    {children}
  </div>
}
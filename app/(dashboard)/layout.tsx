"use client";

import { ReactNode, useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../../components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex lg:relative">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <main
        className={`flex-1 transition-all duration-300 bg-surface ${
          sidebarOpen ? "lg:ml-[280px]" : "lg:ml-[80px]"
        }`}
      >
        {/* Mobile hamburger menu - only show when sidebar is closed */}
        {!sidebarOpen && (
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-section border border-border hover:bg-section-light transition-colors duration-200 shadow-sm"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5 text-text-body" />
            </button>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}

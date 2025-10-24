import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar component will be added here */}
      <aside className="w-64 bg-gray-100">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

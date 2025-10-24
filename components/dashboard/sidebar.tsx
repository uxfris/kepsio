import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Generate", href: "/generate" },
  { name: "Library", href: "/library" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-100 min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-6">Kepsio</h2>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

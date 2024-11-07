// app/admin/dashboard/layout.tsx

'use client'
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md rounded-r-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Logo</h2>
        </div>
        <nav className="space-y-2">
          <Link
            href="/admin/dashboard/menu"
            className={`block font-medium ${
              pathname === "/admin/dashboard/menu" ? "text-white bg-blue-500 px-3 py-2 rounded" : "text-gray-600  px-3 py-2 rounded hover:text-blue-500"
            }`}
          >
            Menu details
          </Link>
          <Link
            href="/admin/dashboard/orders"
            className={`block font-medium ${
              pathname === "/admin/dashboard/orders" ? "text-white bg-blue-500 px-3 py-2 rounded" : "text-gray-600  px-3 py-2 rounded hover:text-blue-500"
            }`}
          >
            Order details
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}

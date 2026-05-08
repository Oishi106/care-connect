"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import BrandLogo from "../../BrandLogo";

const navItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: "📊" },
  { label: "All Bookings", href: "/dashboard/admin/bookings", icon: "📋", badge: 5 },
  { label: "Users", href: "/dashboard/admin/users", icon: "👥" },
  { label: "Caregivers", href: "/dashboard/admin/caregivers", icon: "🧑‍⚕️" },
  { label: "Services", href: "/dashboard/admin/services", icon: "❤️" },
  { label: "Payments", href: "/dashboard/admin/payments", icon: "💳" },
  { label: "Reports", href: "/dashboard/admin/reports", icon: "📈" },
  { label: "Settings", href: "/dashboard/admin/settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} flex flex-col bg-[#1a1235] min-h-screen transition-all duration-300 z-30`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <BrandLogo
            width={collapsed ? 56 : 140}
            height={collapsed ? 20 : 50}
            imageClassName="max-w-full"
          />
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-white/70 hover:text-white transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d={collapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Admin Info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-linear-to-br from-[#ff6fae] to-[#ff8fc4] flex items-center justify-center text-white text-xs font-bold">{session?.user?.name?.[0]?.toUpperCase() || "A"}</div>
            <div>
              <p className="text-xs font-semibold text-white">{session?.user?.name || "Admin User"}</p>
              <p className="text-xs text-white/70">{session?.user?.email || "No email"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {navItems.map(item => {
          const active = item.href === "/dashboard/admin" ? pathname === "/dashboard/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? "bg-[#ff6fae] text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
              title={collapsed ? item.label : ""}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && <span className="text-sm font-medium flex-1">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="h-5 w-5 rounded-full bg-white/20 text-xs font-bold flex items-center justify-center">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button type="button" onClick={() => signOut({ callbackUrl: "/login" })} className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition">
          <span className="text-base">🚪</span>
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

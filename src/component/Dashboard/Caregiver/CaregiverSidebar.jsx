"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import BrandLogo from "../../BrandLogo";

const navItems = [
  { label: "Dashboard", href: "/dashboard/caregiver", icon: "🏠" },
  { label: "Applications", href: "/dashboard/caregiver/applications", icon: "📄" },
  { label: "Schedule", href: "/dashboard/caregiver/schedule", icon: "📅" },
  { label: "Earnings", href: "/dashboard/caregiver/earnings", icon: "💰" },
  { label: "Messages", href: "/dashboard/caregiver/messages", icon: "💬" },
  { label: "Profile", href: "/dashboard/caregiver/profile", icon: "🪪" },
  { label: "Settings", href: "/dashboard/caregiver/settings", icon: "⚙️" },
];

export default function CaregiverSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);      
  const { data: session } = useSession();
  const user = session?.user;

  const isActiveRoute = (href) => pathname === href || pathname.startsWith(`${href}/`);
  const displayName = user?.name || "Caregiver";
  const avatarFallback = displayName?.[0]?.toUpperCase() || "C";        
      
  return (
    <aside className={`${collapsed ? "w-20" : "w-64"} relative flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300 min-h-screen z-30`}>
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-5">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <BrandLogo width={collapsed ? 56 : 140} height={collapsed ? 20 : 50} imageClassName="max-w-full" />
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto shrink-0 rounded-lg p-1 transition hover:bg-gray-100" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d={collapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {!collapsed && (
        <div className="border-b border-gray-100 px-4 py-4">
          <div className="flex items-center gap-3">                    
            {user?.image ? (
              <div
                className="h-10 w-10 rounded-full bg-center bg-cover ring-2 ring-pink-100"
                style={{ backgroundImage: `url(${user.image})` }}
                aria-label={displayName}
                role="img"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#ff6fae] to-[#ff8fc4] text-sm font-bold text-white">
                {avatarFallback}
              </div>
            )}
            <div className="min-w-0">       
              <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
              <p className="truncate text-xs text-gray-500">{user?.email || "caregiver@careconnect.com"}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500">Profile under review</span>
            <span className="ml-auto rounded-full bg-pink-50 px-2 py-0.5 text-xs font-semibold text-[#ff6fae]">Caregiver</span>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {navItems.map((item) => {
          const active = isActiveRoute(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${active ? "bg-[#ff6fae] text-white shadow-sm" : "text-gray-600 hover:bg-pink-50 hover:text-[#ff6fae]"}`}
              title={collapsed ? item.label : ""}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-3">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-red-500 transition hover:bg-red-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "../BrandLogo";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 md:gap-1.5">
          <BrandLogo
            width={119}
            height={42}
          />
          <div className="hidden md:flex flex-col leading-tight -ml-1">
            <span className="text-base font-extrabold tracking-tight text-[#ff6fae] lg:text-[1.15rem]">Care Connect</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-gray-500">Trusted Care Platform</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-gray-800 md:flex lg:gap-10 lg:text-base">
          <Link
            className={`transition ${isActive("/") ? "text-[#ff6fae]" : "hover:text-[#ff6fae]"}`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`transition ${isActive("/service") ? "text-[#ff6fae]" : "hover:text-[#ff6fae]"}`}
            href="/service"
          >
            Service
          </Link>
          <Link
            className={`transition ${isActive("/about") ? "text-[#ff6fae]" : "hover:text-[#ff6fae]"}`}
            href="/about"
          >
            About Us
          </Link>
          <Link
            className={`transition ${isActive("/contact") ? "text-[#ff6fae]" : "hover:text-[#ff6fae]"}`}
            href="/contact"
          >
            Contact Us
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#ff6fae] transition">
              Dashboard
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link href="/dashboard/user" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#ff6fae]">
                <span>👤</span> User Dashboard
              </Link>
              <Link href="/dashboard/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#ff6fae]">
                <span>🛡️</span> Admin Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          <Link
            href="/login"
            className="hidden sm:flex items-center gap-2 rounded-full bg-[#ff6fae] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(255,111,174,0.25)] transition hover:brightness-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-4 py-4 space-y-3 bg-white border-t border-gray-100">
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 px-4 rounded-lg transition ${isActive("/") ? "bg-pink-50 text-[#ff6fae] font-semibold" : "text-gray-800 hover:bg-gray-50"}`}
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 px-4 rounded-lg transition ${isActive("/service") ? "bg-pink-50 text-[#ff6fae] font-semibold" : "text-gray-800 hover:bg-gray-50"}`}
            href="/service"
          >
            Service
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 px-4 rounded-lg transition ${isActive("/about") ? "bg-pink-50 text-[#ff6fae] font-semibold" : "text-gray-800 hover:bg-gray-50"}`}
            href="/about"
          >
            About Us
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 px-4 rounded-lg transition ${isActive("/contact") ? "bg-pink-50 text-[#ff6fae] font-semibold" : "text-gray-800 hover:bg-gray-50"}`}
            href="/contact"
          >
            Contact Us
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#ff6fae] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(255,111,174,0.25)] transition hover:brightness-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
"use client";

import React, { useState } from "react";
import Link from "next/link";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup submitted:", { fullName, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Side - Image Section */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center p-8 bg-gradient-to-br from-[#7aa7d9]/10 via-[#ff8fc4]/10 to-[#ff6fae]/10">
          <div className="relative w-full max-w-lg">
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#7aa7d9]/20 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#ff6fae]/20 blur-2xl"></div>
            
            {/* Main Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#7aa7d9] to-[#ff8fc4] p-1 shadow-2xl shadow-blue-200">
              <div className="rounded-3xl bg-white p-6 sm:p-8">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://media.istockphoto.com/id/1490280970/photo/home-nurse-caregiver.jpg?s=612x612&w=0&k=20&c=qEO397wSWQuN1eoV9KWXoqOsDpLYhnqFywfiWQTRzeI="
                    alt="Care Connect Signup"
                    className="h-80 w-full object-cover"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900">Join Care Connect</h3>
                  <p className="mt-2 text-gray-600">Start your journey with quality caregiving services today.</p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="flex -space-x-2">
                      <img src="https://plus.unsplash.com/premium_photo-1683134308025-ec5478c4aa6d?w=600&auto=format&fit=crop&q=60" alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                      <img src="https://plus.unsplash.com/premium_photo-1666299880508-bffece864e96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFieSUyMGNhcmV8ZW58MHx8MHx8fDA%3D" alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                      <img src="https://plus.unsplash.com/premium_photo-1665203568927-bf0e58ee3d20?w=600&auto=format&fit=crop&q=60" alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">Join 10,000+</p>
                      <p className="text-xs text-gray-500">Happy Families</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -left-4 top-1/4 rounded-2xl bg-white px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#ff6fae]">
                    <path d="M12 20.5s-7.5-4.6-9.4-8.5C1.6 9.5 3.2 6 6.7 6c2 0 3.4 1 4.3 2.4C11.9 7 13.3 6 15.3 6 18.8 6 20.4 9.5 21.4 12c-1.9 3.9-9.4 8.5-9.4 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Trusted</p>
                  <p className="text-xs text-gray-500">Care Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
   

            {/* Signup Card */}
            <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-10">
              <h1 className="mb-2 text-3xl font-bold text-[#ab126b] sm:text-4xl">SIGN UP</h1>
              <p className="mb-8 text-gray-600">Create your account to get started.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name Input */}
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showConfirmPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded border-gray-300 text-[#ff6fae] focus:ring-[#ff6fae]" required />
                  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                    I agree to the <Link href="/terms" className="text-[#ff6fae] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#ff6fae] hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                {/* Signup Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#ff6fae] to-[#ff8fc4] py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:shadow-xl hover:brightness-105"
                >
                  Create Account
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200"></div>
                
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              

              {/* Login Link */}
              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#ff6fae] hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

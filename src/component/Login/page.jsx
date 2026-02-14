"use client";

import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Side - Login Form */}
        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Logo */}
           

            {/* Login Card */}
            <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-10">
              <h1 className="mb-2 text-3xl font-bold text-[#ab126b] sm:text-4xl">LOGIN</h1>
              <p className="mb-8 text-gray-600">Welcome back! Please enter your details.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="Enter your password"
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

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#ff6fae] focus:ring-[#ff6fae]" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm font-medium text-[#ff6fae] hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#ff6fae] to-[#ff8fc4] py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:shadow-xl hover:brightness-105"
                >
                  Login
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-sm text-gray-500">Login with Others</span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                {/* Google Login */}
                <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Facebook Login */}
                <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-[#ff6fae] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center p-8 bg-gradient-to-br from-[#ff6fae]/10 via-[#ff8fc4]/10 to-[#7aa7d9]/10">
          <div className="relative w-full max-w-lg">
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-[#ff6fae]/20 blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[#7aa7d9]/20 blur-2xl"></div>
            
            {/* Main Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#ff6fae] to-[#ff8fc4] p-1 shadow-2xl shadow-pink-200">
              <div className="rounded-3xl bg-white p-6 sm:p-8">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1682089680688-d463fe6d45ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWxkJTIwY2FyZSUyMHNlcnZpY2luZyUyMHdvbWFufGVufDB8fDB8fHww"
                    alt="Care Connect"
                    className="h-80 w-full object-cover"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900">Welcome to Care Connect</h3>
                  <p className="mt-2 text-gray-600">Your trusted partner in caregiving services for loved ones.</p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="flex -space-x-2">
                      <img src="https://plus.unsplash.com/premium_photo-1683134308025-ec5478c4aa6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxkZXIlMjBjYXJlfGVufDB8fDB8fHww" alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                      <img src="https://media.istockphoto.com/id/1211138472/photo/mother-and-child-in-white-clothes-stand-at-window.webp?a=1&b=1&s=612x612&w=0&k=20&c=4mjp4kdkbJz2DJx498BH1GV7SfvJcFkKxHsAo5vxsKc=" alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                      <img src="https://plus.unsplash.com/premium_photo-1665203568927-bf0e58ee3d20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVsZGVyJTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D" alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">10,000+</p>
                      <p className="text-xs text-gray-500">Happy Families</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-4 top-1/4 rounded-2xl bg-white px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Verified</p>
                  <p className="text-xs text-gray-500">Caregivers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

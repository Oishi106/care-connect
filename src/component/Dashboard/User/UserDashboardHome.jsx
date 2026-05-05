"use client";

import React, { useState } from "react";
import Link from "next/link";

const stats = [
  {
    label: "Total Bookings",
    value: "12",
    change: "+2 this month",
    up: true,
    color: "from-[#ff6fae] to-[#ff8fc4]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Active Care",
    value: "2",
    change: "In progress",
    up: true,
    color: "from-[#7aa7d9] to-[#5b8fc4]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 4L12 14.01l-3-3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Total Spent",
    value: "$480",
    change: "$60 this month",
    up: false,
    color: "from-[#a78bfa] to-[#8b5cf6]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="4" width="22" height="16" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M1 10h22" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    label: "Avg. Rating Given",
    value: "4.8",
    change: "Excellent",
    up: true,
    color: "from-[#f59e0b] to-[#d97706]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
];

const upcomingBookings = [
  {
    id: "BK001",
    caregiver: "Tanvir Hossain",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=60",
    service: "Elderly Care",
    date: "May 10, 2026",
    time: "9:00 AM - 5:00 PM",
    status: "Confirmed",
    price: "$60",
  },
  {
    id: "BK002",
    caregiver: "Maya Islam",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60",
    service: "Baby Sitting",
    date: "May 12, 2026",
    time: "10:00 AM - 2:00 PM",
    status: "Pending",
    price: "$40",
  },
  {
    id: "BK003",
    caregiver: "Sophie Rahman",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop&q=60",
    service: "Patient Care",
    date: "May 15, 2026",
    time: "8:00 AM - 6:00 PM",
    status: "Confirmed",
    price: "$80",
  },
];

const recommendedCaregivers = [
  {
    name: "Tanvir Hossain",
    role: "Elderly Care Specialist",
    rating: 4.9,
    reviews: 45,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=60",
    price: "$15/hr",
    badge: "Top Rated",
  },
  {
    name: "Maya Islam",
    role: "Childcare Expert",
    rating: 4.8,
    reviews: 38,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60",
    price: "$12/hr",
    badge: "Verified",
  },
  {
    name: "Farhana Akter",
    role: "Home Care Supervisor",
    rating: 4.7,
    reviews: 29,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60",
    price: "$14/hr",
    badge: "Popular",
  },
];

const activities = [
  { icon: "✅", text: "Booking BK001 confirmed", time: "2 hours ago", color: "text-green-600 bg-green-50" },
  { icon: "💬", text: "New message from Tanvir Hossain", time: "5 hours ago", color: "text-blue-600 bg-blue-50" },
  { icon: "⭐", text: "You rated Maya Islam 5 stars", time: "Yesterday", color: "text-yellow-600 bg-yellow-50" },
  { icon: "💳", text: "Payment of $60 processed", time: "2 days ago", color: "text-purple-600 bg-purple-50" },
];

const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function UserDashboardHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-[#ff6fae]">Fatima!</span> 👋
          </h1>
          <p className="mt-1 text-gray-500">Here's what's happening with your care services today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            🏠 Home
          </Link>
          <Link
            href="/dashboard/user/book"
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff6fae] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:brightness-95 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Book New Service
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${stat.color} mb-4`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
            <p className={`text-xs mt-1 ${stat.up ? "text-green-600" : "text-gray-500"}`}>
              {stat.up ? "↑ " : ""}{stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Bookings</h2>
            <Link href="/dashboard/user/bookings" className="text-sm text-[#ff6fae] font-semibold hover:underline">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-pink-50 transition group">
                <img
                  src={booking.avatar}
                  alt={booking.caregiver}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#ff6fae]/20"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{booking.caregiver}</p>
                  <p className="text-xs text-[#ff6fae] font-medium">{booking.service}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{booking.date} · {booking.time}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${statusColors[booking.status]}`}>
                    {booking.status}
                  </span>
                  <p className="text-sm font-bold text-gray-800 mt-1">{booking.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${act.color}`}>
                  {act.icon}
                </span>
                <div>
                  <p className="text-sm text-gray-700 font-medium leading-snug">{act.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Care Plan Widget */}
          <div className="mt-6 rounded-xl bg-linear-to-br from-[#ff6fae] to-[#ff8fc4] p-4 text-white">
            <p className="text-xs font-semibold opacity-80 uppercase tracking-wide mb-1">Current Plan</p>
            <p className="text-lg font-bold">Standard Care</p>
            <div className="mt-2 h-2 bg-white/30 rounded-full">
              <div className="h-2 w-3/5 bg-white rounded-full"></div>
            </div>
            <p className="mt-1 text-xs opacity-80">24 of 40 hours used this month</p>
            <Link href="/dashboard/user/payments" className="mt-3 inline-block text-xs font-semibold underline underline-offset-2">
              Upgrade Plan →
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Caregivers */}
      <div className="mt-6 rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recommended Caregivers</h2>
          <Link href="/dashboard/user/caregivers" className="text-sm text-[#ff6fae] font-semibold hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCaregivers.map((cg, i) => (
            <div key={i} className="rounded-xl border border-gray-100 p-4 hover:shadow-md transition hover:border-[#ff6fae]/30">
              <div className="flex items-center gap-3 mb-3">
                <img src={cg.avatar} alt={cg.name} className="h-12 w-12 rounded-full object-cover"/>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{cg.name}</p>
                  <p className="text-xs text-gray-500">{cg.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-sm font-bold text-gray-800">{cg.rating}</span>
                  <span className="text-xs text-gray-400">({cg.reviews})</span>
                </div>
                <span className="text-sm font-bold text-[#ff6fae]">{cg.price}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium bg-pink-50 text-[#ff6fae] px-2 py-0.5 rounded-full">{cg.badge}</span>
                <Link href="/dashboard/user/book" className="text-xs font-semibold text-white bg-[#ff6fae] px-3 py-1 rounded-full hover:brightness-95 transition">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

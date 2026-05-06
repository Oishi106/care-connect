"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

const recommendedCaregivers = [
  { name: "Tanvir Hossain", role: "Elderly Care Specialist", rating: 4.9, reviews: 45, avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=60", price: "$15/hr", badge: "Top Rated" },
  { name: "Maya Islam", role: "Childcare Expert", rating: 4.8, reviews: 38, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60", price: "$12/hr", badge: "Verified" },
  { name: "Farhana Akter", role: "Home Care Supervisor", rating: 4.7, reviews: 29, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60", price: "$14/hr", badge: "Popular" },
];

export default function UserDashboardHome() {
  const { data: session } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || "there";

  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch bookings
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${user.email}`)
      .then(r => r.json())
      .then(data => { setBookings(Array.isArray(data) ? data : []); setLoadingBookings(false); })
      .catch(() => setLoadingBookings(false));

    // Fetch payments
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments?email=${user.email}`)
      .then(r => r.json())
      .then(data => { setPayments(Array.isArray(data) ? data : []); setLoadingPayments(false); })
      .catch(() => setLoadingPayments(false));
  }, [user?.email]);

  const totalSpent = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + (p.amount || 0), 0);
  const activeBookings = bookings.filter(b => b.status === "Confirmed").length;
  const upcomingBookings = bookings.filter(b => b.status === "Confirmed" || b.status === "Pending").slice(0, 3);

  const stats = [
    { label: "Total Bookings", value: loadingBookings ? "..." : bookings.length, change: "All time", up: true, color: "from-[#ff6fae] to-[#ff8fc4]", icon: "📋" },
    { label: "Active Care", value: loadingBookings ? "..." : activeBookings, change: "In progress", up: true, color: "from-[#7aa7d9] to-[#5b8fc4]", icon: "✅" },
    { label: "Total Spent", value: loadingPayments ? "..." : `$${totalSpent.toFixed(0)}`, change: "Via Stripe", up: false, color: "from-[#a78bfa] to-[#8b5cf6]", icon: "💳" },
    { label: "Avg. Rating", value: "4.8", change: "Excellent", up: true, color: "from-[#f59e0b] to-[#d97706]", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-[#ff6fae]">{firstName}!</span> 👋
          </h1>
          <p className="mt-1 text-gray-500 text-sm">Here's what's happening with your care services today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            🏠 Home
          </Link>
          <Link href="/dashboard/user/book" className="inline-flex items-center gap-2 rounded-xl bg-[#ff6fae] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:brightness-95 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            Book New Service
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-xl mb-4`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
            <p className={`text-xs mt-1 ${stat.up ? "text-green-600" : "text-gray-500"}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Bookings</h2>
            <Link href="/dashboard/user/bookings" className="text-sm text-[#ff6fae] font-semibold hover:underline">View All →</Link>
          </div>

          {loadingBookings ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse"/>)}
            </div>
          ) : upcomingBookings.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm font-medium">No upcoming bookings</p>
              <Link href="/dashboard/user/book" className="mt-3 inline-block text-xs font-semibold text-[#ff6fae] hover:underline">Book a service →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((booking, i) => (
                <div key={booking._id || i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-pink-50 transition">
                  <div className="h-12 w-12 rounded-full bg-[#ff6fae]/20 flex items-center justify-center text-[#ff6fae] font-bold text-lg flex-shrink-0">
                    {booking.serviceTitle?.[0] || "C"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{booking.serviceTitle}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{booking.date} · {booking.time}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${statusColors[booking.status]}`}>{booking.status}</span>
                    <p className="text-sm font-bold text-gray-800 mt-1">${booking.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Account Info</h2>

          {/* User card */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-4">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="h-12 w-12 rounded-full object-cover"/>
            ) : (
              <div className="h-12 w-12 rounded-full bg-[#ff6fae] flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Recent payments */}
          <h3 className="font-semibold text-gray-700 text-sm mb-3">Recent Payments</h3>
          {loadingPayments ? (
            <div className="space-y-2">{[1,2].map(i => <div key={i} className="h-10 rounded-lg bg-gray-100 animate-pulse"/>)}</div>
          ) : payments.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">No payments yet</p>
          ) : (
            <div className="space-y-2">
              {payments.slice(0, 3).map((p, i) => (
                <div key={p._id || i} className="flex items-center justify-between text-xs py-2 border-b border-gray-50">
                  <span className="text-gray-600 truncate mr-2">{p.serviceTitle || "Care Service"}</span>
                  <span className="font-bold text-green-600 flex-shrink-0">${p.amount}</span>
                </div>
              ))}
            </div>
          )}

          {/* Care Plan Widget */}
          <div className="mt-4 rounded-xl bg-gradient-to-br from-[#ff6fae] to-[#ff8fc4] p-4 text-white">
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
          <Link href="/dashboard/user/caregivers" className="text-sm text-[#ff6fae] font-semibold hover:underline">View All →</Link>
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
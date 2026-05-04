"use client";
import React, { useState } from "react";
import Link from "next/link";

const stats = [
  { label: "Total Users", value: "1,284", change: "+24 this week", up: true, color: "from-[#ff6fae] to-[#e0508f]", icon: "👥" },
  { label: "Active Caregivers", value: "86", change: "+3 this month", up: true, color: "from-blue-500 to-blue-600", icon: "🧑‍⚕️" },
  { label: "Total Bookings", value: "3,492", change: "+128 this week", up: true, color: "from-purple-500 to-purple-600", icon: "📋" },
  { label: "Revenue (May)", value: "$18,640", change: "+12.5% vs Apr", up: true, color: "from-green-500 to-green-600", icon: "💰" },
  { label: "Pending Bookings", value: "47", change: "Needs review", up: false, color: "from-yellow-500 to-yellow-600", icon: "⏳" },
  { label: "Avg Rating", value: "4.82", change: "Out of 5.0", up: true, color: "from-orange-400 to-orange-500", icon: "⭐" },
];

const recentBookings = [
  { id: "BK892", user: "Fatima Ahmed", caregiver: "Tanvir Hossain", service: "Elderly Care", date: "May 10, 2026", status: "Confirmed", amount: "$120" },
  { id: "BK893", user: "Karim Reza", caregiver: "Maya Islam", service: "Baby Sitting", date: "May 11, 2026", status: "Pending", amount: "$48" },
  { id: "BK894", user: "Nadia Islam", caregiver: "Sophie Rahman", service: "Patient Care", date: "May 12, 2026", status: "Confirmed", amount: "$180" },
  { id: "BK895", user: "Arman Haque", caregiver: "Ethan Karim", service: "Special Needs", date: "May 13, 2026", status: "Cancelled", amount: "$0" },
  { id: "BK896", user: "Sumaiya Begum", caregiver: "Farhana Akter", service: "Elderly Care", date: "May 14, 2026", status: "Confirmed", amount: "$140" },
];

const topCaregivers = [
  { name: "Sophie Rahman", service: "Patient Care", bookings: 52, rating: 4.9, revenue: "$3,200", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop&q=60" },
  { name: "Tanvir Hossain", service: "Elderly Care", bookings: 45, rating: 4.9, revenue: "$2,700", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=60" },
  { name: "Maya Islam", service: "Baby Sitting", bookings: 38, rating: 4.8, revenue: "$1,900", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60" },
];

const alerts = [
  { type: "warning", msg: "5 bookings pending review for over 24 hours", icon: "⚠️" },
  { type: "info", msg: "3 new caregiver applications received", icon: "📥" },
  { type: "success", msg: "Monthly revenue target 93% achieved", icon: "🎯" },
];

const statusColors = { Confirmed: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Cancelled: "bg-red-100 text-red-700", Completed: "bg-blue-100 text-blue-700" };
const alertColors = { warning: "bg-yellow-50 border-yellow-200 text-yellow-800", info: "bg-blue-50 border-blue-200 text-blue-800", success: "bg-green-50 border-green-200 text-green-800" };

export default function AdminDashboardHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Monday, May 4, 2026 · Welcome back, Admin</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/admin/reports" className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            📊 Reports
          </Link>
          <Link href="/dashboard/admin/caregivers" className="rounded-xl bg-[#ff6fae] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 transition">
            + Add Caregiver
          </Link>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-2 mb-6">
        {alerts.map((a, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${alertColors[a.type]}`}>
            <span>{a.icon}</span>
            <span className="font-medium">{a.msg}</span>
            <button className="ml-auto text-lg leading-none opacity-50 hover:opacity-100">×</button>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 hover:shadow-md transition">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-lg mb-3`}>{s.icon}</div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs font-medium text-gray-600 mt-0.5">{s.label}</p>
            <p className={`text-xs mt-1 ${s.up ? "text-green-600" : "text-yellow-600"}`}>{s.change}</p>
          </div>
        ))}
      </div>

      {/* Revenue Bar Chart (visual) */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900">Monthly Revenue</h2>
          <span className="text-sm text-[#ff6fae] font-semibold">2026</span>
        </div>
        <div className="flex items-end gap-2 h-32">
          {[
            { month: "Jan", val: 72 }, { month: "Feb", val: 85 }, { month: "Mar", val: 68 },
            { month: "Apr", val: 90 }, { month: "May", val: 93, active: true }, { month: "Jun", val: 40 },
            { month: "Jul", val: 30 }, { month: "Aug", val: 25 }, { month: "Sep", val: 20 },
            { month: "Oct", val: 15 }, { month: "Nov", val: 12 }, { month: "Dec", val: 10 }
          ].map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                style={{ height: `${m.val}%` }}
                className={`w-full rounded-t-lg transition ${m.active ? "bg-[#ff6fae]" : i < 5 ? "bg-[#ff6fae]/30" : "bg-gray-100"}`}
              ></div>
              <span className="text-xs text-gray-400">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Bookings</h2>
            <Link href="/dashboard/admin/bookings" className="text-sm text-[#ff6fae] font-semibold hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="pb-3 text-gray-400 font-medium">ID</th>
                  <th className="pb-3 text-gray-400 font-medium">User</th>
                  <th className="pb-3 text-gray-400 font-medium hidden md:table-cell">Service</th>
                  <th className="pb-3 text-gray-400 font-medium">Status</th>
                  <th className="pb-3 text-gray-400 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 font-mono text-xs text-gray-400">{b.id}</td>
                    <td className="py-3">
                      <p className="font-medium text-gray-900 text-xs">{b.user}</p>
                      <p className="text-xs text-gray-400">{b.caregiver}</p>
                    </td>
                    <td className="py-3 text-gray-600 hidden md:table-cell text-xs">{b.service}</td>
                    <td className="py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[b.status]}`}>{b.status}</span></td>
                    <td className="py-3 text-right font-bold text-gray-900">{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Caregivers */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Top Caregivers</h2>
            <Link href="/dashboard/admin/caregivers" className="text-sm text-[#ff6fae] font-semibold hover:underline">All →</Link>
          </div>
          <div className="space-y-4">
            {topCaregivers.map((cg, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex-shrink-0 text-sm font-bold text-gray-400 w-4">{i+1}</span>
                <img src={cg.avatar} alt={cg.name} className="h-10 w-10 rounded-full object-cover"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{cg.name}</p>
                  <p className="text-xs text-gray-400">{cg.bookings} bookings · ⭐{cg.rating}</p>
                </div>
                <p className="text-sm font-bold text-green-600">{cg.revenue}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Add User", href: "/dashboard/admin/users", icon: "👤" },
                { label: "New Booking", href: "/dashboard/admin/bookings", icon: "📋" },
                { label: "View Reports", href: "/dashboard/admin/reports", icon: "📈" },
                { label: "Payments", href: "/dashboard/admin/payments", icon: "💳" },
              ].map((a, i) => (
                <Link key={i} href={a.href} className="flex items-center gap-2 rounded-xl border border-gray-200 p-2.5 text-xs font-medium text-gray-700 hover:border-[#ff6fae] hover:text-[#ff6fae] transition">
                  <span>{a.icon}</span>{a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

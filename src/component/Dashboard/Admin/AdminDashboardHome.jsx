"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function AdminDashboardHome() {
  const [stats, setStats]             = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [pendingApps, setPendingApps] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/admin/stats`).then(r=>r.json()).catch(()=>null),
      fetch(`${API}/admin/bookings?limit=5`).then(r=>r.json()).catch(()=>[]),
      fetch(`${API}/caregiver-applications?status=pending`).then(r=>r.json()).catch(()=>[]),
    ]).then(([s, b, apps]) => {
      setStats(s);
      setRecentBookings(Array.isArray(b) ? b : []);
      setPendingApps(Array.isArray(apps) ? apps : []);
      setLoading(false);
    });
  }, []);

  // Build monthly bar data (12 months)
  const monthlyData = MONTHS.map((m, idx) => {
    const found = stats?.monthlyRevenue?.find(r => r._id === idx + 1);
    return { month: m, revenue: found?.revenue || 0, count: found?.count || 0 };
  });
  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue), 1);

  const statCards = [
    { label: "Total Users",    value: stats?.totalUsers,        icon: "👥", color: "from-[#ff6fae] to-[#e0508f]" },
    { label: "Caregivers",     value: stats?.activeCaregivers,  icon: "🧑‍⚕️", color: "from-blue-500 to-blue-600" },
    { label: "Total Bookings", value: stats?.totalBookings,     icon: "📋", color: "from-purple-500 to-purple-600" },
    { label: "Total Revenue",  value: stats?.totalRevenue ? `$${stats.totalRevenue}` : "—", icon: "💰", color: "from-green-500 to-green-600" },
    { label: "Pending",        value: stats?.pendingBookings,   icon: "⏳", color: "from-yellow-500 to-yellow-600" },
    { label: "Applications",   value: pendingApps.length,       icon: "📝", color: "from-orange-400 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/admin/reports" className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            📊 Reports
          </Link>
          <Link href="/dashboard/admin/caregivers" className="rounded-xl bg-[#ff6fae] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 transition">
            {pendingApps.length > 0 ? `📝 ${pendingApps.length} Applications` : "+ Add Caregiver"}
          </Link>
        </div>
      </div>

      {/* Alert for pending applications */}
      {pendingApps.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm mb-4">
          <span>📥</span>
          <span className="font-medium text-blue-800">{pendingApps.length} new caregiver application{pendingApps.length > 1 ? "s" : ""} waiting for review</span>
          <Link href="/dashboard/admin/caregivers" className="ml-auto text-xs font-bold text-blue-700 underline">Review →</Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 hover:shadow-md transition">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-lg mb-3`}>{s.icon}</div>
            {loading ? (
              <div className="h-6 w-12 bg-gray-200 rounded animate-pulse mb-1"/>
            ) : (
              <p className="text-xl font-bold text-gray-900">{s.value ?? "0"}</p>
            )}
            <p className="text-xs font-medium text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900">Monthly Revenue</h2>
          <span className="text-sm text-[#ff6fae] font-semibold">{new Date().getFullYear()}</span>
        </div>
        {loading ? (
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse"/>
        ) : (
          <div className="flex items-end gap-1.5 h-36">
            {monthlyData.map((m, i) => {
              const height = maxRevenue > 0 ? Math.max((m.revenue / maxRevenue) * 100, m.revenue > 0 ? 8 : 3) : 3;
              const isCurrentMonth = i === new Date().getMonth();
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip */}
                  {m.revenue > 0 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none">
                      ${m.revenue.toFixed(0)}
                    </div>
                  )}
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isCurrentMonth ? "bg-[#ff6fae]" :
                      m.revenue > 0 ? "bg-[#ff6fae]/40" : "bg-gray-100"
                    }`}
                  />
                  <span className={`text-xs ${isCurrentMonth ? "text-[#ff6fae] font-bold" : "text-gray-400"}`}>{m.month}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Bookings</h2>
            <Link href="/dashboard/admin/bookings" className="text-sm text-[#ff6fae] font-semibold hover:underline">View All →</Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3,4].map(i=><div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse"/>)}</div>
          ) : recentBookings.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm">No bookings yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="pb-3 text-gray-400 font-medium text-xs">User</th>
                    <th className="pb-3 text-gray-400 font-medium text-xs hidden sm:table-cell">Service</th>
                    <th className="pb-3 text-gray-400 font-medium text-xs">Status</th>
                    <th className="pb-3 text-gray-400 font-medium text-xs text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b, i) => (
                    <tr key={b._id||i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-3">
                        <p className="font-medium text-gray-900 text-xs">{b.userName || "User"}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[120px]">{b.userEmail}</p>
                      </td>
                      <td className="py-3 text-gray-600 text-xs hidden sm:table-cell">{b.serviceTitle}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[b.status]}`}>{b.status}</span>
                      </td>
                      <td className="py-3 text-right font-bold text-gray-900">${b.totalPrice||0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Pending Applications */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 text-sm">Pending Applications</h2>
              <Link href="/dashboard/admin/caregivers" className="text-xs text-[#ff6fae] font-semibold hover:underline">All →</Link>
            </div>
            {loading ? (
              <div className="space-y-2">{[1,2].map(i=><div key={i} className="h-10 rounded-lg bg-gray-100 animate-pulse"/>)}</div>
            ) : pendingApps.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No pending applications</p>
            ) : (
              <div className="space-y-2">
                {pendingApps.slice(0,4).map((app,i) => (
                  <div key={app._id||i} className="flex items-center gap-2 p-2.5 rounded-xl bg-yellow-50 border border-yellow-100">
                    <div className="h-8 w-8 rounded-full bg-[#ff6fae] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {app.name?.[0]?.toUpperCase()||"C"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-900 truncate">{app.name}</p>
                      <p className="text-xs text-gray-500 truncate">{app.specialty}</p>
                    </div>
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-medium flex-shrink-0">New</span>
                  </div>
                ))}
                {pendingApps.length > 4 && (
                  <Link href="/dashboard/admin/caregivers" className="block text-center text-xs text-[#ff6fae] font-semibold py-1 hover:underline">
                    +{pendingApps.length - 4} more →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <p className="text-sm font-bold text-gray-900 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "All Bookings",  href: "/dashboard/admin/bookings",  icon: "📋" },
                { label: "Users",         href: "/dashboard/admin/users",     icon: "👥" },
                { label: "Payments",      href: "/dashboard/admin/payments",  icon: "💳" },
                { label: "Reports",       href: "/dashboard/admin/reports",   icon: "📈" },
              ].map((a,i) => (
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
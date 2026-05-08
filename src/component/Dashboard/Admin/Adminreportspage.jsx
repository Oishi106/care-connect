"use client";
import React, { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function AdminReportsPage() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/admin/reports`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const monthlyData = MONTHS.map((m, idx) => {
    const found = data?.monthlyRevenue?.find(r => r._id === idx + 1);
    return { month: m, revenue: found?.revenue || 0, count: found?.count || 0 };
  });
  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue), 1);

  const totalBookings = data?.bookingsByStatus?.reduce((s, b) => s + b.count, 0) || 0;

  const serviceColors = ["#ff6fae","#3b82f6","#10b981","#8b5cf6","#f59e0b","#f43f5e","#14b8a6","#6366f1"];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Platform performance overview</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label:"Total Revenue",  value: data?.totalRevenue ? `$${Number(data.totalRevenue).toFixed(0)}` : "—" },
          { label:"Total Bookings", value: totalBookings || "—" },
          { label:"Paid Sessions",  value: data?.monthlyRevenue?.reduce((s,m)=>s+m.count,0) || "—" },
          { label:"Top Service",    value: data?.bookingsByService?.[0]?._id || "—" },
        ].map((k,i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : k.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Bar Chart */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-6">Revenue by Month ({new Date().getFullYear()})</h2>
        {loading ? (
          <div className="h-40 bg-gray-100 rounded-xl animate-pulse"/>
        ) : (
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((m, i) => {
              const height = Math.max((m.revenue / maxRevenue) * 100, m.revenue > 0 ? 6 : 2);
              const isNow  = i === new Date().getMonth();
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {m.revenue > 0 && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
                      ${m.revenue.toFixed(0)} · {m.count} booking{m.count!==1?"s":""}
                    </div>
                  )}
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full rounded-t-lg transition-all ${isNow ? "bg-[#ff6fae]" : m.revenue > 0 ? "bg-[#ff6fae]/40" : "bg-gray-100"}`}
                  />
                  <span className={`text-xs ${isNow ? "text-[#ff6fae] font-bold" : "text-gray-400"}`}>{m.month}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bookings by Service */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Bookings by Service</h2>
          {loading ? (
            <div className="space-y-3">{[1,2,3,4].map(i=><div key={i} className="h-8 bg-gray-100 rounded animate-pulse"/>)}</div>
          ) : (data?.bookingsByService||[]).length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {(data?.bookingsByService||[]).map((s, i) => {
                const pct = totalBookings > 0 ? Math.round((s.count / totalBookings) * 100) : 0;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-28 text-xs text-gray-700 font-medium truncate flex-shrink-0">{s._id}</span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width:`${pct}%`, background: serviceColors[i%serviceColors.length] }}/>
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-8 text-right">{pct}%</span>
                    <span className="text-xs text-gray-400 w-12 text-right">{s.count} jobs</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bookings by Status */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Bookings by Status</h2>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i=><div key={i} className="h-8 bg-gray-100 rounded animate-pulse"/>)}</div>
          ) : (data?.bookingsByStatus||[]).length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {(data?.bookingsByStatus||[]).map((s,i) => {
                const pct = totalBookings > 0 ? Math.round((s.count / totalBookings) * 100) : 0;
                const colors = { Confirmed:"#10b981", Pending:"#f59e0b", Cancelled:"#ef4444", Completed:"#3b82f6" };
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-24 text-xs text-gray-700 font-medium flex-shrink-0">{s._id}</span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${pct}%`, background: colors[s._id]||"#9ca3af" }}/>
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-8 text-right">{s.count}</span>
                    <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
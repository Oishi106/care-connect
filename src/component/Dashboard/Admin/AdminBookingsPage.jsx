"use client";
import React, { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetch(`${API}/admin/bookings`)
      .then(r => r.json())
      .then(data => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await fetch(`${API}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
    } catch (e) {}
    setUpdating(null);
  };

  const tabs = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];
  const filtered = bookings
    .filter(b => filter === "All" || b.status === filter)
    .filter(b =>
      b.userName?.toLowerCase().includes(search.toLowerCase()) ||
      b.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
      b._id?.includes(search)
    );

  const totalRevenue = bookings.filter(b => b.paymentStatus === "paid").reduce((s, b) => s + (b.totalPrice || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">{loading ? "Loading..." : `${bookings.length} total · $${totalRevenue} earned`}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: bookings.length, color: "text-gray-900" },
          { label: "Confirmed", value: bookings.filter(b => b.status === "Confirmed").length, color: "text-green-600" },
          { label: "Pending", value: bookings.filter(b => b.status === "Pending").length, color: "text-yellow-600" },
          { label: "Revenue", value: `$${totalRevenue}`, color: "text-[#ff6fae]" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{loading ? "..." : s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by user, email, or ID..."
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#ff6fae]"/>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === t ? "bg-[#ff6fae] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6fae]"}`}>
            {t}
            {t !== "All" && <span className="ml-1 text-xs opacity-70">({bookings.filter(b => b.status === t).length})</span>}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["User", "Service", "Date", "Status", "Payment", "Amount", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-gray-500 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}><td colSpan={7} className="px-5 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse"/></td></tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No bookings found</td></tr>
              ) : (
                filtered.map(b => (
                  <tr key={b._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900 text-xs">{b.userName || "—"}</p>
                      <p className="text-xs text-gray-400">{b.userEmail}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-600 text-xs">{b.serviceTitle}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{b.date || "—"}</td>
                    <td className="px-5 py-3">
                      <select
                        value={b.status}
                        onChange={e => updateStatus(b._id, e.target.value)}
                        disabled={updating === b._id}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer outline-none ${statusColors[b.status]}`}
                      >
                        {["Pending","Confirmed","Completed","Cancelled"].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {b.paymentStatus || "unpaid"}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-bold text-gray-900">${b.totalPrice || 0}</td>
                    <td className="px-5 py-3">
                      <button className="text-xs text-[#ff6fae] font-medium hover:underline">Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
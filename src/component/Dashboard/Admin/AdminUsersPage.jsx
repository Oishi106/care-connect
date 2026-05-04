"use client";
import React, { useState } from "react";

const initUsers = [
  { id: 1, name: "Fatima Ahmed", email: "fatima@example.com", plan: "Standard", bookings: 12, joined: "Jan 2025", status: "Active", spent: "$480", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
  { id: 2, name: "Karim Reza", email: "karim@example.com", plan: "Basic", bookings: 4, joined: "Mar 2025", status: "Active", spent: "$196", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
  { id: 3, name: "Nadia Islam", email: "nadia@example.com", plan: "Premium", bookings: 27, joined: "Nov 2024", status: "Active", spent: "$2,592", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60" },
  { id: 4, name: "Arman Haque", email: "arman@example.com", plan: "Basic", bookings: 1, joined: "Apr 2026", status: "Suspended", spent: "$0", avatar: null },
  { id: 5, name: "Sumaiya Begum", email: "sumaiya@example.com", plan: "Standard", bookings: 8, joined: "Feb 2025", status: "Active", spent: "$320", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60" },
];

const planColors = { Basic: "bg-gray-100 text-gray-700", Standard: "bg-blue-100 text-blue-700", Premium: "bg-purple-100 text-purple-700" };

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initUsers);
  const [search, setSearch] = useState("");

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = id => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 text-sm mt-1">{users.length} registered users</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Export CSV</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: "1,284", color: "text-[#ff6fae]" },
          { label: "Active", value: "1,201", color: "text-green-600" },
          { label: "Premium", value: "287", color: "text-purple-600" },
          { label: "Suspended", value: "83", color: "text-red-500" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users by name or email..." className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:border-[#ff6fae]"/>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">User</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden sm:table-cell">Plan</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Bookings</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden lg:table-cell">Total Spent</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} className="h-10 w-10 rounded-full object-cover"/>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">{u.name[0]}</div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${planColors[u.plan]}`}>{u.plan}</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-900 hidden md:table-cell">{u.bookings}</td>
                  <td className="px-5 py-4 font-bold text-green-600 hidden lg:table-cell">{u.spent}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{u.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => toggleStatus(u.id)} className={`text-xs font-medium px-3 py-1 rounded-full transition ${u.status === "Active" ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}>
                        {u.status === "Active" ? "Suspend" : "Restore"}
                      </button>
                      <button className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

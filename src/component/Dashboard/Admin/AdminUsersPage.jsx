"use client";
import React, { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminUsersPage() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetch(`${API}/admin/users`)
      .then(r => r.json())
      .then(data => { setUsers(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateUser = async (email, data) => {
    setUpdating(email);
    try {
      await fetch(`${API}/admin/users/${encodeURIComponent(email)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setUsers(prev => prev.map(u => u.email === email ? { ...u, ...data } : u));
    } catch(e) {}
    setUpdating(null);
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const planColors = { admin:"bg-purple-100 text-purple-700", user:"bg-blue-100 text-blue-700" };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 text-sm mt-1">{loading ? "Loading..." : `${users.length} registered users`}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users",  value: users.length,                                   color: "text-[#ff6fae]" },
          { label: "Admins",       value: users.filter(u=>u.role==="admin").length,        color: "text-purple-600" },
          { label: "Regular",      value: users.filter(u=>u.role==="user").length,         color: "text-blue-600" },
          { label: "With Google",  value: users.filter(u=>u.image?.includes("google") || u.accounts?.length > 0).length, color: "text-green-600" },
        ].map((s,i) => (
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
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email..."
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#ff6fae]"/>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["User","Email","Role","Joined","Actions"].map(h=>(
                  <th key={h} className="text-left px-5 py-3 text-gray-500 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_,i) => (
                  <tr key={i}><td colSpan={5} className="px-5 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse"/></td></tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-gray-400">No users found</td></tr>
              ) : (
                filtered.map(u => (
                  <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {u.image ? (
                          <img src={u.image} alt={u.name} className="h-9 w-9 rounded-full object-cover"/>
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-[#ff6fae]/20 flex items-center justify-center text-[#ff6fae] font-bold text-sm">
                            {u.name?.[0]?.toUpperCase()||"U"}
                          </div>
                        )}
                        <p className="font-semibold text-gray-900 text-sm">{u.name||"—"}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${planColors[u.role]||"bg-gray-100 text-gray-600"}`}>
                        {u.role||"user"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        {u.role !== "admin" ? (
                          <button
                            onClick={() => updateUser(u.email, { role: "admin" })}
                            disabled={updating === u.email}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition disabled:opacity-50"
                          >
                            {updating===u.email ? "..." : "Make Admin"}
                          </button>
                        ) : (
                          <button
                            onClick={() => updateUser(u.email, { role: "user" })}
                            disabled={updating === u.email}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
                          >
                            {updating===u.email ? "..." : "Remove Admin"}
                          </button>
                        )}
                      </div>
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
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const statusColors = {
  pending:  "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminCaregiversPage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState("applications"); // applications | active
  const [applications, setApplications] = useState([]);
  const [activeCaregivers, setActiveCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    loadApplications();
  }, [filter]);

  const loadApplications = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/caregiver-applications?status=${filter}`)
      .then(r => r.json())
      .then(data => { setApplications(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/caregiver-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setApplications(prev => prev.filter(a => a._id !== id));
    } catch (e) {}
    setUpdating(null);
  };

  const filtered = applications.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = applications.filter(a => a.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Caregivers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage applications and active caregivers</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTab("applications")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${tab === "applications" ? "bg-[#ff6fae] text-white shadow-lg shadow-pink-200" : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6fae]"}`}
        >
          Applications
          {filter === "pending" && applications.length > 0 && (
            <span className={`ml-2 h-5 w-5 inline-flex items-center justify-center rounded-full text-xs font-bold ${tab === "applications" ? "bg-white text-[#ff6fae]" : "bg-[#ff6fae] text-white"}`}>
              {applications.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("active")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${tab === "active" ? "bg-[#ff6fae] text-white shadow-lg shadow-pink-200" : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6fae]"}`}
        >
          Active Caregivers
        </button>
      </div>

      {/* Applications Tab */}
      {tab === "applications" && (
        <>
          {/* Status filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["pending", "approved", "rejected"].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition ${filter === s ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#ff6fae]"
            />
          </div>

          {/* Applications List */}
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-white animate-pulse border border-gray-100"/>)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">No {filter} applications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(app => (
                <div key={app._id} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Avatar */}
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#ff6fae] to-[#e0508f] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {app.name?.[0]?.toUpperCase() || "C"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{app.name}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${statusColors[app.status]}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{app.email} · {app.phone}</p>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <span className="text-xs bg-pink-50 text-[#ff6fae] px-2 py-0.5 rounded-full font-medium">{app.specialty}</span>
                        {app.experience && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{app.experience} exp</span>
                        )}
                        <span className="text-xs text-gray-400">
                          Applied {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {app.about && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2 italic">"{app.about}"</p>
                      )}
                    </div>

                    {/* Actions */}
                    {app.status === "pending" && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => updateStatus(app._id, "approved")}
                          disabled={updating === app._id}
                          className="px-4 py-2 rounded-xl bg-green-500 text-white text-xs font-bold hover:brightness-95 transition disabled:opacity-60"
                        >
                          {updating === app._id ? "..." : "✓ Approve"}
                        </button>
                        <button
                          onClick={() => updateStatus(app._id, "rejected")}
                          disabled={updating === app._id}
                          className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold hover:brightness-95 transition disabled:opacity-60"
                        >
                          {updating === app._id ? "..." : "✕ Reject"}
                        </button>
                      </div>
                    )}

                    {app.status === "approved" && (
                      <span className="text-green-600 text-sm font-semibold flex-shrink-0">✓ Approved</span>
                    )}
                    {app.status === "rejected" && (
                      <span className="text-red-500 text-sm font-semibold flex-shrink-0">✕ Rejected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Active Caregivers Tab */}
      {tab === "active" && (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <p className="text-gray-500 text-sm text-center py-8">
            Approved caregivers will appear here after approval.
          </p>
        </div>
      )}
    </div>
  );
}
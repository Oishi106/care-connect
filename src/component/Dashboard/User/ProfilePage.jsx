"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const user = session?.user;

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stats, setStats] = useState({ bookings: 0, reviews: 0 });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    emergency: "",
    careFor: "",
    notes: "",
  });

  useEffect(() => {
    if (!user) return;

    // Fetch extra profile data
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile?email=${user.email}`)
      .then(r => r.json())
      .then(data => {
        if (data) {
          setForm(prev => ({
            ...prev,
            phone: data.phone || "",
            address: data.address || "",
            dob: data.dob || "",
            emergency: data.emergency || "",
            careFor: data.careFor || "",
            notes: data.notes || "",
          }));
        }
      })
      .catch(() => {});

    // Fetch stats
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${user.email}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStats(prev => ({ ...prev, bookings: data.length }));
        }
      })
      .catch(() => {});
  }, [user]);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!user?.email) return;
    setSaving(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: form.name || user.name || "",
          ...form,
        }),
      });
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {}
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
        </div>
        <button
          onClick={() => { if (editing) handleSave(); else setEditing(true); }}
          disabled={saving}
          className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${editing ? "bg-green-500 text-white hover:brightness-95" : "bg-[#ff6fae] text-white hover:brightness-95"}`}
        >
          {saving ? "Saving..." : editing ? "✓ Save Changes" : "✏️ Edit Profile"}
        </button>
      </div>

      {saved && (
        <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700 font-medium">✓ Profile updated successfully!</div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center">
          <div className="relative inline-block mb-4">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="h-28 w-28 rounded-full object-cover ring-4 ring-[#ff6fae]/20 mx-auto"/>
            ) : (
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-[#ff6fae] to-[#e0508f] flex items-center justify-center text-white text-4xl font-bold mx-auto ring-4 ring-[#ff6fae]/20">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <h2 className="font-bold text-gray-900 text-lg">{user?.name || "..."}</h2>
          <p className="text-sm text-[#ff6fae] mt-1">Standard Care Member</p>
          <p className="text-xs text-gray-400 mt-1">{user?.email}</p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-pink-50 p-3">
              <p className="text-xl font-bold text-[#ff6fae]">{stats.bookings}</p>
              <p className="text-xs text-gray-500">Bookings</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3">
              <p className="text-xl font-bold text-blue-500">{stats.reviews}</p>
              <p className="text-xs text-gray-500">Reviews Given</p>
            </div>
          </div>

          {/* Login method badge */}
          <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500 flex items-center justify-center gap-2">
            {user?.image?.includes("google") ? (
              <><span>🔐</span> Signed in via Google</>
            ) : (
              <><span>📧</span> Signed in via Email</>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email Address", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "tel" },
                { label: "Date of Birth", name: "dob", type: "date" },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
                  {editing && f.name !== "email" ? (
                    <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6fae]"/>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{(f.name === "name" ? (form.name || user?.name) : f.name === "email" ? (form.email || user?.email) : form[f.name]) || <span className="text-gray-300">Not set</span>}</p>
                  )}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                {editing ? (
                  <input name="address" value={form.address} onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6fae]"/>
                ) : (
                  <p className="text-sm font-medium text-gray-900">{form.address || <span className="text-gray-300">Not set</span>}</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Care Preferences</h3>
            <div className="space-y-4">
              {[
                { label: "Emergency Contact", name: "emergency" },
                { label: "Who needs care?", name: "careFor" },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
                  {editing ? (
                    <input name={f.name} value={form[f.name]} onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6fae]"/>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{form[f.name] || <span className="text-gray-300">Not set</span>}</p>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Special Notes for Caregivers</label>
                {editing ? (
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#ff6fae]"/>
                ) : (
                  <p className="text-sm font-medium text-gray-900">{form.notes || <span className="text-gray-300">Not set</span>}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
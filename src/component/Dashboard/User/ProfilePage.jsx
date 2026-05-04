"use client";
import React, { useState } from "react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Fatima Ahmed",
    email: "fatima@example.com",
    phone: "+880 1712-345678",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    dob: "1985-06-15",
    emergency: "Rahim Ahmed (+880 1812-345678)",
    careFor: "Elderly parent & 2 children",
    notes: "My father has diabetes. Children are 3 and 6 years old.",
  });

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${editing ? "bg-green-500 text-white hover:brightness-95" : "bg-[#ff6fae] text-white hover:brightness-95"}`}
        >
          {editing ? "✓ Save Changes" : "✏️ Edit Profile"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center">
          <div className="relative inline-block mb-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60"
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover ring-4 ring-[#ff6fae]/20 mx-auto"
            />
            {editing && (
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#ff6fae] text-white flex items-center justify-center shadow-md">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            )}
          </div>
          <h2 className="font-bold text-gray-900 text-lg">{form.name}</h2>
          <p className="text-sm text-[#ff6fae] mt-1">Standard Care Member</p>
          <div className="mt-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
            <span className="text-sm text-gray-500 ml-1">5.0 as client</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-pink-50 p-3">
              <p className="text-xl font-bold text-[#ff6fae]">12</p>
              <p className="text-xs text-gray-500">Bookings</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3">
              <p className="text-xl font-bold text-blue-500">4</p>
              <p className="text-xs text-gray-500">Reviews Given</p>
            </div>
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
                  {editing ? (
                    <input
                      type={f.type}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6fae]"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{form[f.name]}</p>
                  )}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                {editing ? (
                  <input name="address" value={form.address} onChange={handleChange} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6fae]"/>
                ) : (
                  <p className="text-sm font-medium text-gray-900">{form.address}</p>
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
                    <input name={f.name} value={form[f.name]} onChange={handleChange} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:border-[#ff6fae]"/>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{form[f.name]}</p>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Special Notes for Caregivers</label>
                {editing ? (
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#ff6fae]"/>
                ) : (
                  <p className="text-sm font-medium text-gray-900">{form.notes}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

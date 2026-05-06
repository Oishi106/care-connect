"use client";
import React, { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, sms: true, push: false, booking: true, payment: true, promo: false });
  const [privacy, setPrivacy] = useState({ profileVisible: true, shareHistory: false });
  const [saved, setSaved] = useState(false);

  const toggle = (group, key) => {
    if (group === "notifications") setNotifications(p => ({ ...p, [key]: !p[key] }));
    else setPrivacy(p => ({ ...p, [key]: !p[key] }));
  };

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const Toggle = ({ checked, onChange }) => (
    <button onClick={onChange} className={`relative w-10 h-5 rounded-full transition ${checked ? "bg-[#ff6fae]" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${checked ? "left-5" : "left-0.5"}`}></span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account preferences</p>
      </div>

      {saved && (
        <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700 font-medium flex items-center gap-2">
          <span>✓</span> Settings saved successfully!
        </div>
      )}

      <div className="space-y-4">
        {/* Notifications */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "sms", label: "SMS Notifications", desc: "Receive SMS alerts" },
              { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
              { key: "booking", label: "Booking Alerts", desc: "Confirmations and reminders" },
              { key: "payment", label: "Payment Alerts", desc: "Transaction notifications" },
              { key: "promo", label: "Promotions", desc: "Deals and special offers" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <Toggle checked={notifications[item.key]} onChange={() => toggle("notifications", item.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            {[
              { key: "profileVisible", label: "Profile Visible to Caregivers", desc: "Caregivers can view your profile" },
              { key: "shareHistory", label: "Share Care History", desc: "Share booking history with new caregivers" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <Toggle checked={privacy[item.key]} onChange={() => toggle("privacy", item.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Password */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-3">
            <input type="password" placeholder="Current Password" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 caret-[#ff6fae] focus:outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"/>
            <input type="password" placeholder="New Password" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 caret-[#ff6fae] focus:outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"/>
            <input type="password" placeholder="Confirm New Password" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 caret-[#ff6fae] focus:outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"/>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl bg-red-50 border border-red-200 p-6">
          <h3 className="font-bold text-red-700 mb-2">Danger Zone</h3>
          <p className="text-sm text-red-600 mb-4">Deleting your account is permanent and cannot be undone.</p>
          <button className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition">Delete My Account</button>
        </div>

        <button onClick={save} className="w-full rounded-xl bg-[#ff6fae] py-3 text-white font-semibold hover:brightness-95 transition shadow-lg shadow-pink-200">
          Save Settings
        </button>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";

export function AdminServicesPage() {
  const [services, setServices] = useState([
    { id: 1, name: "Elderly Care", price: 15, active: true, bookings: 420, icon: "👴" },
    { id: 2, name: "Baby Sitting", price: 12, active: true, bookings: 310, icon: "👶" },
    { id: 3, name: "Patient Care", price: 18, active: true, bookings: 280, icon: "🏥" },
    { id: 4, name: "Special Needs", price: 20, active: false, bookings: 95, icon: "💝" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newSvc, setNewSvc] = useState({ name: "", price: "", icon: "❤️" });

  const toggle = id => setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  const add = () => {
    if (!newSvc.name || !newSvc.price) return;
    setServices(prev => [...prev, { id: Date.now(), ...newSvc, price: Number(newSvc.price), active: true, bookings: 0 }]);
    setShowAdd(false); setNewSvc({ name: "", price: "", icon: "❤️" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-950">Services</h1><p className="mt-1 text-sm text-gray-600">Manage care service offerings</p></div>
        <button onClick={() => setShowAdd(true)} className="rounded-xl bg-[#ff6fae] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95">+ Add Service</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {services.map(s => (
          <div key={s.id} className={`rounded-2xl bg-white border-2 shadow-sm p-5 transition ${s.active ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{s.icon}</span>
              <button onClick={() => toggle(s.id)} className={`relative w-10 h-5 rounded-full transition ${s.active ? "bg-[#ff6fae]" : "bg-gray-200"}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${s.active ? "left-5" : "left-0.5"}`}></span>
              </button>
            </div>
            <h3 className="font-bold text-gray-900">{s.name}</h3>
            <p className="mt-1 text-2xl font-bold text-[#ff6fae]">${s.price}<span className="text-sm font-normal text-gray-600">/hr</span></p>
            <p className="mt-2 text-xs text-gray-600">{s.bookings} total bookings</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 text-xs rounded-lg border border-gray-200 py-1.5 text-gray-600 hover:bg-gray-50">Edit</button>
              <button className="flex-1 text-xs rounded-lg border border-red-200 py-1.5 text-red-500 hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="font-bold text-gray-900 mb-4">Add New Service</h3>
            <div className="space-y-3">
              <input placeholder="Service Name" value={newSvc.name} onChange={e => setNewSvc(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"/>
              <input type="number" placeholder="Price per hour ($)" value={newSvc.price} onChange={e => setNewSvc(p => ({ ...p, price: e.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"/>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={add} className="flex-1 rounded-xl bg-[#ff6fae] py-2.5 text-sm font-semibold text-white hover:brightness-95">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminPaymentsPage() {
  const transactions = [
    { id: "TXN101", user: "Fatima Ahmed", caregiver: "Tanvir Hossain", amount: "$120", date: "May 10, 2026", method: "Visa Card", status: "Completed" },
    { id: "TXN102", user: "Karim Reza", caregiver: "Maya Islam", amount: "$48", date: "May 11, 2026", method: "bKash", status: "Pending" },
    { id: "TXN103", user: "Nadia Islam", caregiver: "Sophie Rahman", amount: "$180", date: "May 12, 2026", method: "Visa Card", status: "Completed" },
    { id: "TXN104", user: "Sumaiya Begum", caregiver: "Farhana Akter", amount: "$140", date: "May 14, 2026", method: "Nagad", status: "Completed" },
    { id: "TXN105", user: "Rahim Khan", caregiver: "Arif Chowdhury", amount: "$160", date: "May 8, 2026", method: "Visa Card", status: "Refunded" },
  ];
  const statusColors = { Completed: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Refunded: "bg-blue-100 text-blue-700", Failed: "bg-red-100 text-red-700" };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-950">Payments</h1><p className="mt-1 text-sm text-gray-600">All platform transactions</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: "$18,640", color: "text-[#ff6fae]" },
          { label: "This Month", value: "$3,248", color: "text-green-600" },
          { label: "Pending", value: "$482", color: "text-yellow-600" },
          { label: "Refunded", value: "$320", color: "text-blue-600" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-xs text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["ID", "User", "Caregiver", "Method", "Date", "Status", "Amount"].map(h => <th key={h} className="px-5 py-3 text-left font-medium text-gray-600">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-mono text-xs text-gray-600">{tx.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{tx.user}</td>
                  <td className="px-5 py-3 text-gray-600">{tx.caregiver}</td>
                  <td className="px-5 py-3 text-gray-700">{tx.method}</td>
                  <td className="px-5 py-3 text-xs text-gray-700">{tx.date}</td>
                  <td className="px-5 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[tx.status]}`}>{tx.status}</span></td>
                  <td className="px-5 py-3 font-bold text-gray-900">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AdminReportsPage() {
  const monthlyData = [
    { month: "Jan", revenue: 12400, bookings: 248 },
    { month: "Feb", revenue: 14800, bookings: 296 },
    { month: "Mar", revenue: 11900, bookings: 238 },
    { month: "Apr", revenue: 16500, bookings: 330 },
    { month: "May", revenue: 18640, bookings: 373 },
  ];
  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-950">Reports & Analytics</h1><p className="mt-1 text-sm text-gray-600">Platform performance overview</p></div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: "$74,240", change: "+18% YoY", up: true },
          { label: "Total Bookings", value: "3,492", change: "+24% YoY", up: true },
          { label: "User Retention", value: "82%", change: "+5% vs Q1", up: true },
          { label: "Avg. Booking Value", value: "$128", change: "+$12 vs Q1", up: true },
        ].map((k, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className="text-2xl font-bold text-gray-900">{k.value}</p>
            <p className="mt-0.5 text-xs text-gray-600">{k.label}</p>
            <p className="text-xs text-green-600 mt-1">↑ {k.change}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Revenue by Month (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-2 text-left font-medium text-gray-600">Month</th>
                <th className="py-2 text-left font-medium text-gray-600">Revenue</th>
                <th className="py-2 text-left font-medium text-gray-600">Bookings</th>
                <th className="w-48 py-2 text-left font-medium text-gray-600">Progress</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map(m => (
                <tr key={m.month} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-gray-900">{m.month}</td>
                  <td className="py-3 font-bold text-green-600">${m.revenue.toLocaleString()}</td>
                  <td className="py-3 text-gray-600">{m.bookings}</td>
                  <td className="py-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff6fae] rounded-full" style={{ width: `${(m.revenue / maxRevenue) * 100}%` }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-4">Bookings by Service</h2>
        <div className="space-y-4">
          {[
            { service: "Elderly Care", pct: 42, bookings: 1467, color: "bg-blue-400" },
            { service: "Baby Sitting", pct: 30, bookings: 1048, color: "bg-[#ff6fae]" },
            { service: "Patient Care", pct: 18, bookings: 629, color: "bg-purple-400" },
            { service: "Special Needs", pct: 10, bookings: 348, color: "bg-green-400" },
          ].map(s => (
            <div key={s.service} className="flex items-center gap-4">
              <span className="w-28 text-sm text-gray-700 font-medium">{s.service}</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }}></div>
              </div>
              <span className="text-sm font-bold text-gray-900 w-8 text-right">{s.pct}%</span>
              <span className="w-16 text-right text-xs text-gray-600">{s.bookings} bookings</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Care Connect",
    email: "admin@careconnect.com",
    phone: "+880 1700-000000",
    address: "23 Care Street, Dhaka, Bangladesh",
    commissionRate: "10",
    autoApprove: false,
    maintenanceMode: false,
    emailVerification: true,
  });

  const toggle = key => setSettings(p => ({ ...p, [key]: !p[key] }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const Toggle = ({ checked, onChange }) => (
    <button onClick={onChange} className={`relative w-10 h-5 rounded-full transition ${checked ? "bg-[#ff6fae]" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${checked ? "left-5" : "left-0.5"}`}></span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-950">Admin Settings</h1>
        <p className="text-sm mt-1 text-gray-600">Configure platform settings</p>
      </div>

      {saved && <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm font-medium text-green-800">✓ Settings saved!</div>}

      <div className="space-y-4">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h3 className="mb-4 font-bold text-gray-950">General Settings</h3>
          <div className="space-y-3">
            {[
              { label: "Platform Name", key: "siteName" },
              { label: "Admin Email", key: "email" },
              { label: "Contact Phone", key: "phone" },
              { label: "Address", key: "address" },
              { label: "Commission Rate (%)", key: "commissionRate" },
            ].map(f => (
              <div key={f.key}>
                <label className="mb-1 block text-xs font-medium text-gray-700">{f.label}</label>
                <input
                  value={settings[f.key]}
                  onChange={e => setSettings(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h3 className="mb-4 font-bold text-gray-950">Platform Controls</h3>
          <div className="space-y-4">
            {[
              { key: "autoApprove", label: "Auto-approve Bookings", desc: "Skip manual review for new bookings" },
              { key: "emailVerification", label: "Require Email Verification", desc: "Users must verify email on signup" },
              { key: "maintenanceMode", label: "Maintenance Mode", desc: "Take the platform offline temporarily" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
                <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={save} className="w-full rounded-xl bg-[#ff6fae] py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:brightness-95">Save Settings</button>
      </div>
    </div>
  );
}

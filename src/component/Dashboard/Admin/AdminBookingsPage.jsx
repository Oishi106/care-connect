"use client";
import React, { useState } from "react";

const initBookings = [
  { id: "BK892", user: "Fatima Ahmed", caregiver: "Tanvir Hossain", service: "Elderly Care", date: "May 10, 2026", time: "9AM-5PM", status: "Confirmed", amount: "$120" },
  { id: "BK893", user: "Karim Reza", caregiver: "Maya Islam", service: "Baby Sitting", date: "May 11, 2026", time: "10AM-2PM", status: "Pending", amount: "$48" },
  { id: "BK894", user: "Nadia Islam", caregiver: "Sophie Rahman", service: "Patient Care", date: "May 12, 2026", time: "8AM-6PM", status: "Confirmed", amount: "$180" },
  { id: "BK895", user: "Arman Haque", caregiver: "Ethan Karim", service: "Special Needs", date: "May 13, 2026", time: "9AM-3PM", status: "Cancelled", amount: "$0" },
  { id: "BK896", user: "Sumaiya Begum", caregiver: "Farhana Akter", service: "Elderly Care", date: "May 14, 2026", time: "10AM-4PM", status: "Confirmed", amount: "$140" },
  { id: "BK897", user: "Rahim Khan", caregiver: "Arif Chowdhury", service: "Patient Care", date: "May 8, 2026", time: "9AM-5PM", status: "Completed", amount: "$160" },
  { id: "BK898", user: "Lena Sultana", caregiver: "Tanvir Hossain", service: "Elderly Care", date: "May 6, 2026", time: "8AM-4PM", status: "Completed", amount: "$120" },
];

const statusColors = { Confirmed: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Cancelled: "bg-red-100 text-red-700", Completed: "bg-blue-100 text-blue-700" };

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(initBookings);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const tabs = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];
  const filtered = bookings
    .filter(b => filter === "All" || b.status === filter)
    .filter(b => b.user.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()));

  const changeStatus = (id, newStatus) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
          <p className="mt-1 text-sm text-gray-600">{bookings.length} total bookings</p>
        </div>
        <button className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Export</button>
      </div>

      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by user or booking ID..." className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"/>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === t ? "bg-[#ff6fae] text-white" : "bg-white text-gray-600 border border-gray-200"}`}>{t}</button>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Booking ID</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">User</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden sm:table-cell">Caregiver</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden md:table-cell">Service</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">Date</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 text-right font-medium text-gray-600">Amount</th>
                <th className="px-5 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-mono text-xs text-gray-600">{b.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{b.user}</td>
                  <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{b.caregiver}</td>
                  <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{b.service}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-xs text-gray-700">{b.date}</td>
                  <td className="px-5 py-3">
                    <select
                      value={b.status}
                      onChange={e => changeStatus(b.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border-0 cursor-pointer ${statusColors[b.status]}`}
                    >
                      {["Confirmed", "Pending", "Completed", "Cancelled"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-gray-900">{b.amount}</td>
                  <td className="px-5 py-3">
                    <button className="text-xs text-[#ff6fae] font-medium hover:underline">View</button>
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

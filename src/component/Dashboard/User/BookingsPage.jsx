"use client";
import React, { useState } from "react";
import Link from "next/link";

const allBookings = [
  { id: "BK001", caregiver: "Tanvir Hossain", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=60", service: "Elderly Care", date: "May 10, 2026", time: "9:00 AM - 5:00 PM", status: "Confirmed", price: "$120", rating: null },
  { id: "BK002", caregiver: "Maya Islam", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60", service: "Baby Sitting", date: "May 12, 2026", time: "10:00 AM - 2:00 PM", status: "Pending", price: "$48", rating: null },
  { id: "BK003", caregiver: "Sophie Rahman", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop&q=60", service: "Patient Care", date: "Apr 28, 2026", time: "8:00 AM - 6:00 PM", status: "Completed", price: "$180", rating: 5 },
  { id: "BK004", caregiver: "Ethan Karim", avatar: "https://images.unsplash.com/photo-1592334873219-42ca023e48ce?w=100&auto=format&fit=crop&q=60", service: "Special Needs", date: "Apr 20, 2026", time: "9:00 AM - 3:00 PM", status: "Completed", price: "$120", rating: 4 },
  { id: "BK005", caregiver: "Farhana Akter", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60", service: "Elderly Care", date: "Apr 15, 2026", time: "10:00 AM - 4:00 PM", status: "Cancelled", price: "$90", rating: null },
];

const statusColors = { Confirmed: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Cancelled: "bg-red-100 text-red-700", Completed: "bg-blue-100 text-blue-700" };

export default function BookingsPage() {
  const [filter, setFilter] = useState("All");
  const tabs = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];
  const filtered = filter === "All" ? allBookings : allBookings.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Track all your care service bookings</p>
        </div>
        <Link href="/dashboard/user/book" className="inline-flex items-center gap-2 rounded-xl bg-[#ff6fae] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 transition">
          + New Booking
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === tab ? "bg-[#ff6fae] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6fae] hover:text-[#ff6fae]"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.map(booking => (
          <div key={booking.id} className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img src={booking.avatar} alt={booking.caregiver} className="h-14 w-14 rounded-full object-cover ring-2 ring-pink-100"/>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 font-mono">{booking.id}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[booking.status]}`}>{booking.status}</span>
                </div>
                <h3 className="font-bold text-gray-900">{booking.caregiver}</h3>
                <p className="text-sm text-[#ff6fae] font-medium">{booking.service}</p>
                <p className="text-xs text-gray-500 mt-1">{booking.date} · {booking.time}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xl font-bold text-gray-900">{booking.price}</p>
                {booking.rating && (
                  <div className="flex items-center gap-1 sm:justify-end mt-1">
                    {[...Array(5)].map((_, i) => <span key={i} className={`text-sm ${i < booking.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>)}
                  </div>
                )}
                <div className="flex gap-2 mt-2 sm:justify-end">
                  {booking.status === "Pending" && (
                    <button className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition">Cancel</button>
                  )}
                  {booking.status === "Completed" && !booking.rating && (
                    <button className="text-xs text-[#ff6fae] border border-pink-200 px-3 py-1 rounded-full hover:bg-pink-50 transition">Rate</button>
                  )}
                  <button className="text-xs text-gray-600 border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50 transition">Details</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}

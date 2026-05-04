"use client";
import React, { useState } from "react";

const initCaregivers = [
  { id: 1, name: "Tanvir Hossain", specialty: "Elderly Care", status: "Active", bookings: 45, rating: 4.9, joined: "Jan 2025", phone: "+880 1712-111111", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=60", verified: true },
  { id: 2, name: "Maya Islam", specialty: "Baby Sitting", status: "Active", bookings: 38, rating: 4.8, joined: "Feb 2025", phone: "+880 1712-222222", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60", verified: true },
  { id: 3, name: "Sophie Rahman", specialty: "Patient Care", status: "Active", bookings: 52, rating: 4.9, joined: "Mar 2024", phone: "+880 1712-333333", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop&q=60", verified: true },
  { id: 4, name: "Ethan Karim", specialty: "Special Needs", status: "Inactive", bookings: 29, rating: 4.7, joined: "Jun 2025", phone: "+880 1712-444444", avatar: "https://images.unsplash.com/photo-1592334873219-42ca023e48ce?w=100&auto=format&fit=crop&q=60", verified: false },
  { id: 5, name: "Farhana Akter", specialty: "Elderly Care", status: "Active", bookings: 41, rating: 4.8, joined: "Apr 2024", phone: "+880 1712-555555", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60", verified: true },
];

export default function AdminCaregiversPage() {
  const [caregivers, setCaregivers] = useState(initCaregivers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCg, setNewCg] = useState({ name: "", specialty: "Elderly Care", phone: "" });

  const filtered = caregivers.filter(cg => cg.name.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = (id) => {
    setCaregivers(prev => prev.map(cg => cg.id === id ? { ...cg, status: cg.status === "Active" ? "Inactive" : "Active" } : cg));
  };

  const addCg = () => {
    if (!newCg.name) return;
    setCaregivers(prev => [...prev, { id: Date.now(), ...newCg, bookings: 0, rating: 0, joined: "May 2026", avatar: null, verified: false, status: "Active" }]);
    setShowModal(false);
    setNewCg({ name: "", specialty: "Elderly Care", phone: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Caregivers</h1>
          <p className="text-gray-500 text-sm mt-1">{caregivers.length} total caregivers registered</p>
        </div>
        <button onClick={() => setShowModal(true)} className="rounded-xl bg-[#ff6fae] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 transition">
          + Add Caregiver
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search caregivers..." className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:border-[#ff6fae]"/>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Caregiver</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden sm:table-cell">Specialty</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Bookings</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium hidden lg:table-cell">Rating</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-5 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(cg => (
                <tr key={cg.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {cg.avatar ? (
                        <img src={cg.avatar} alt={cg.name} className="h-10 w-10 rounded-full object-cover"/>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#ff6fae]/20 flex items-center justify-center text-[#ff6fae] font-bold">{cg.name[0]}</div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 flex items-center gap-1">
                          {cg.name}
                          {cg.verified && <span title="Verified" className="text-blue-500 text-xs">✓</span>}
                        </p>
                        <p className="text-xs text-gray-400">Joined {cg.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">{cg.specialty}</td>
                  <td className="px-5 py-4 font-bold text-gray-900 hidden md:table-cell">{cg.bookings}</td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold text-gray-900">{cg.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cg.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {cg.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStatus(cg.id)}
                        className={`text-xs font-medium px-3 py-1 rounded-full transition ${cg.status === "Active" ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                      >
                        {cg.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                      <button className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Add New Caregiver</h3>
            <div className="space-y-3">
              <input placeholder="Full Name" value={newCg.name} onChange={e => setNewCg(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"/>
              <select value={newCg.specialty} onChange={e => setNewCg(p => ({ ...p, specialty: e.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]">
                <option>Elderly Care</option>
                <option>Baby Sitting</option>
                <option>Patient Care</option>
                <option>Special Needs</option>
              </select>
              <input placeholder="Phone Number" value={newCg.phone} onChange={e => setNewCg(p => ({ ...p, phone: e.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"/>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowModal(false)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={addCg} className="flex-1 rounded-xl bg-[#ff6fae] py-2.5 text-sm font-semibold text-white hover:brightness-95 transition">Add Caregiver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

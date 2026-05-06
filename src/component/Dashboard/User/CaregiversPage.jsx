"use client";
import React, { useState } from "react";
import Link from "next/link";

const caregivers = [
  { id: 1, name: "Tanvir Hossain", specialty: "Elderly Care", rating: 4.9, reviews: 45, price: "$15/hr", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww", available: true, badge: "Top Rated", exp: "5 years", languages: ["Bengali", "English"] },
  { id: 2, name: "Maya Islam", specialty: "Baby Sitting", rating: 4.8, reviews: 38, price: "$12/hr", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9jdG9yfGVufDB8fDB8fHww", available: true, badge: "Verified", exp: "3 years", languages: ["Bengali", "English"] },
  { id: 3, name: "Sophie Rahman", specialty: "Patient Care", rating: 4.9, reviews: 52, price: "$18/hr", image: "https://plus.unsplash.com/premium_photo-1681966907271-1e350ec3bb95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D", available: false, badge: "Senior", exp: "7 years", languages: ["Bengali", "English", "Hindi"] },
  { id: 4, name: "Ethan Karim", specialty: "Special Needs", rating: 4.7, reviews: 29, price: "$20/hr", image: "https://plus.unsplash.com/premium_photo-1681996356237-db488ab30eb6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzAyfHxkb2N0b3J8ZW58MHx8MHx8fDA%3D", available: true, badge: "Expert", exp: "4 years", languages: ["Bengali", "English"] },
  { id: 5, name: "Farhana Akter", specialty: "Elderly Care", rating: 4.8, reviews: 41, price: "$14/hr", image: "https://plus.unsplash.com/premium_photo-1681996428751-93e0294fe98d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D", available: true, badge: "Popular", exp: "6 years", languages: ["Bengali"] },
  { id: 6, name: "Arif Chowdhury", specialty: "Patient Care", rating: 4.6, reviews: 22, price: "$16/hr", image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww", available: true, badge: "Verified", exp: "2 years", languages: ["Bengali", "English"] },
];

const serviceFilters = ["All", "Elderly Care", "Baby Sitting", "Patient Care", "Special Needs"];

export default function CaregiversPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = caregivers.filter(cg => {
    const matchService = filter === "All" || cg.specialty === filter;
    const matchSearch = cg.name.toLowerCase().includes(search.toLowerCase());
    const matchAvail = !availableOnly || cg.available;
    return matchService && matchSearch && matchAvail;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Caregivers</h1>
        <p className="text-gray-500 text-sm mt-1">Browse our verified and experienced care professionals</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search caregivers..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`relative w-10 h-5 rounded-full transition ${availableOnly ? "bg-[#ff6fae]" : "bg-gray-200"}`}
          >
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${availableOnly ? "left-5" : "left-0.5"}`}></span>
          </div>
          <span className="text-sm text-gray-600">Available only</span>
        </label>
      </div>

      {/* Service Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {serviceFilters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === f ? "bg-[#ff6fae] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6fae]"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(cg => (
          <div key={cg.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="relative h-48">
              <img src={cg.image} alt={cg.name} className="h-full w-full object-cover"/>
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold bg-white/90 text-[#ff6fae] px-2 py-1 rounded-full">{cg.badge}</span>
              </div>
              <div className={`absolute top-3 right-3 h-3 w-3 rounded-full border-2 border-white ${cg.available ? "bg-green-500" : "bg-gray-400"}`}></div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{cg.name}</h3>
                  <p className="text-sm text-[#ff6fae]">{cg.specialty}</p>
                </div>
                <p className="font-bold text-gray-900 text-sm">{cg.price}</p>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(cg.rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                ))}
                <span className="text-xs text-gray-500 ml-1">{cg.rating} ({cg.reviews} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{cg.exp} exp.</span>
                {cg.languages.map(l => <span key={l} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{l}</span>)}
              </div>
              <Link
                href="/dashboard/user/book"
                className={`block w-full text-center rounded-xl py-2 text-sm font-semibold transition ${cg.available ? "bg-[#ff6fae] text-white hover:brightness-95" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              >
                {cg.available ? "Book Now" : "Not Available"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

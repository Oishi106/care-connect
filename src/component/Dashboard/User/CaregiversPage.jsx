"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const serviceFilters = ["All", "Elderly Care", "Baby Sitting", "Patient Care", "Special Needs"];

export default function CaregiversPage() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await fetch("/api/caregivers");
        const data = response.ok ? await response.json() : [];
        setCaregivers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching caregivers:", error);
        setCaregivers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, []);

  const filtered = caregivers.filter((cg) => {
    const name = (cg.name || "").toLowerCase();
    const specialty = cg.specialty || "";
    const matchService = filter === "All" || specialty === filter;
    const matchSearch = name.includes(search.toLowerCase());
    const matchAvail = !availableOnly || cg.available;
    return matchService && matchSearch && matchAvail;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Caregivers</h1>
        <p className="mt-1 text-sm text-gray-500">Browse our verified and experienced care professionals</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search caregivers..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm focus:border-[#ff6fae] focus:outline-none focus:ring-2 focus:ring-[#ff6fae]/20"
          />
        </div>

        <button
          type="button"
          onClick={() => setAvailableOnly(!availableOnly)}
          className="flex items-center gap-2 self-start rounded-full px-1 py-1"
        >
          <span className={`relative h-5 w-10 rounded-full transition ${availableOnly ? "bg-[#ff6fae]" : "bg-gray-200"}`}>
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${availableOnly ? "left-5" : "left-0.5"}`} />
          </span>
          <span className="text-sm text-gray-600">Available only</span>
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {serviceFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filter === item ? "bg-[#ff6fae] text-white" : "border border-gray-200 bg-white text-gray-600 hover:border-[#ff6fae]"}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <p className="text-gray-500">Loading caregivers...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500">No caregivers found. Try adjusting your filters.</p>
          </div>
        ) : (
          filtered.map((cg) => (
            <div key={cg.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative h-48">
                <img src={cg.image} alt={cg.name} className="h-full w-full object-cover" />
                <div className="absolute left-3 top-3">
                  <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-[#ff6fae]">{cg.badge}</span>
                </div>
                <div className={`absolute right-3 top-3 h-3 w-3 rounded-full border-2 border-white ${cg.available ? "bg-green-500" : "bg-gray-400"}`} />
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{cg.name}</h3>
                    <p className="text-sm text-[#ff6fae]">{cg.specialty}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{cg.price}</p>
                </div>

                <div className="mb-3 flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={`text-sm ${index < Math.floor(cg.rating) ? "text-yellow-400" : "text-gray-200"}`}>
                      ★
                    </span>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">
                    {cg.rating} ({cg.reviews} reviews)
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap gap-1">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{cg.exp} exp.</span>
                  {(cg.languages || []).map((language) => (
                    <span key={language} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                      {language}
                    </span>
                  ))}
                </div>

                <Link
                  href="/dashboard/user/book"
                  className={`block w-full rounded-xl py-2 text-center text-sm font-semibold transition ${cg.available ? "bg-[#ff6fae] text-white hover:brightness-95" : "cursor-not-allowed bg-gray-100 text-gray-400"}`}
                >
                  {cg.available ? "Book Now" : "Not Available"}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

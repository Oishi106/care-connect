"use client";
import React from "react";

const stats = [
  { value: "1,200+", label: "Families Served", icon: "🏠", color: "text-[#ff6fae]" },
  { value: "280+", label: "Verified Caregivers", icon: "🧑‍⚕️", color: "text-blue-500" },
  { value: "8,500+", label: "Care Hours Delivered", icon: "⏱️", color: "text-emerald-500" },
  { value: "4.9★", label: "Average Rating", icon: "⭐", color: "text-amber-500" },
  { value: "98%", label: "Client Satisfaction", icon: "💯", color: "text-purple-500" },
  { value: "24/7", label: "Support Available", icon: "🛡️", color: "text-indigo-500" },
];

export default function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1a1235] via-[#2a1a50] to-[#1a1235] py-16">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#ff6fae]/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6fae]">Our Numbers</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
            Trusted by Thousands of Families
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-2 text-2xl">{s.icon}</div>
              <p className={`text-2xl font-black ${s.color} md:text-3xl`}>{s.value}</p>
              <p className="mt-1 text-xs font-medium text-white/60">{s.label}</p>

              {/* Glow effect on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,111,174,0.08) 0%, transparent 70%)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

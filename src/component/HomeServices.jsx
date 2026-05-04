"use client";
import React, { useState } from "react";
import Link from "next/link";

const services = [
  {
    title: "Elderly Care",
    desc: "Daily living assistance, health monitoring, and compassionate companionship for seniors.",
    icon: "👴",
    gradient: "from-blue-50 via-blue-100 to-sky-100",
    accent: "#3b82f6",
    accentBg: "bg-blue-500",
    tag: "Most Popular",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Baby Sitting",
    desc: "Trusted, trained babysitters for infants and toddlers with a safety-first approach.",
    icon: "👶",
    gradient: "from-pink-50 via-rose-100 to-pink-100",
    accent: "#ff6fae",
    accentBg: "bg-[#ff6fae]",
    tag: "Top Rated",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Patient Care",
    desc: "Specialized home nursing and post-surgery recovery assistance by certified caregivers.",
    icon: "🏥",
    gradient: "from-green-50 via-emerald-100 to-teal-50",
    accent: "#10b981",
    accentBg: "bg-emerald-500",
    tag: "Certified",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Special Needs",
    desc: "Compassionate, tailored support for individuals with physical or developmental needs.",
    icon: "💝",
    gradient: "from-purple-50 via-violet-100 to-purple-100",
    accent: "#8b5cf6",
    accentBg: "bg-violet-500",
    tag: "Expert Care",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Child Care",
    desc: "After-school programs, activity supervision and learning support for growing children.",
    icon: "🧒",
    gradient: "from-orange-50 via-amber-100 to-yellow-50",
    accent: "#f59e0b",
    accentBg: "bg-amber-500",
    tag: "New",
    img: "https://images.unsplash.com/photo-1484820540052-0182ef970858?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Night Care",
    desc: "Overnight supervision and care ensuring safety and comfort during nighttime hours.",
    icon: "🌙",
    gradient: "from-indigo-50 via-indigo-100 to-blue-100",
    accent: "#6366f1",
    accentBg: "bg-indigo-500",
    tag: "24/7",
    img: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Therapy Support",
    desc: "In-home physical and occupational therapy assistance coordinated with your care team.",
    icon: "🧘",
    gradient: "from-teal-50 via-cyan-100 to-teal-100",
    accent: "#14b8a6",
    accentBg: "bg-teal-500",
    tag: "Professional",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Respite Care",
    desc: "Temporary relief care for family caregivers — fully managed, trusted, and reliable.",
    icon: "🤝",
    gradient: "from-rose-50 via-red-100 to-rose-100",
    accent: "#f43f5e",
    accentBg: "bg-rose-500",
    tag: "Flexible",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80",
  },
];

export default function HomeServices() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 md:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-pink-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6fae]">
            ✦ What We Offer
          </span>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Care Services
            <span className="block text-[#ff6fae]">Built Around You</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500">
            From newborns to seniors — every stage of life deserves dedicated, professional care. Choose from our range of specialized services.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${svc.gradient} border border-white/80 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
              style={{ boxShadow: hovered === i ? `0 20px 60px ${svc.accent}30` : undefined }}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`${svc.accentBg} rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm`}>
                  {svc.tag}
                </span>
              </div>

              {/* Icon */}
              <div className="px-6 pt-6 pb-2">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${svc.accentBg} text-2xl shadow-lg`}>
                  {svc.icon}
                </div>
              </div>

              {/* Text */}
              <div className="px-6 pb-4">
                <h3 className="text-lg font-bold text-gray-900">{svc.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{svc.desc}</p>
              </div>

              {/* Image */}
              <div className="mx-5 mb-5 overflow-hidden rounded-2xl">
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Bottom Link */}
              <div className="px-5 pb-5">
                <Link
                  href="/service"
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300`}
                  style={{ color: svc.accent }}
                >
                  Learn More
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </Link>
              </div>

              {/* Hover shimmer */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 70% 20%, ${svc.accent}15 0%, transparent 70%)` }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/service"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#ff6fae] bg-white px-8 py-3.5 text-sm font-bold text-[#ff6fae] shadow-lg shadow-pink-100 transition-all hover:bg-[#ff6fae] hover:text-white"
          >
            View All 20+ Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

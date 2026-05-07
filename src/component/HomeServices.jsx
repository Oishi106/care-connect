"use client";
import React, { useState } from "react";
import Link from "next/link";

const services = [
  {
    title: "Elderly Care",
    desc: "Daily living assistance, health monitoring, and companionship for senior adults.",
    icon: "👴",
    bgColor: "#eff6ff",
    bgColor2: "#e0f2fe",
    accent: "#3b82f6",
    tag: "Most Popular",
    img: "https://i.ibb.co.com/vMVR7X9/Elderly-Care.avif",
  },
  {
    title: "Baby Sitting",
    desc: "Trusted, trained babysitters for infants and toddlers with a safety-first, nurturing approach.",
    icon: "👶",
    bgColor: "#fff0f6",
    bgColor2: "#ffe4ef",
    accent: "#ff6fae",
    tag: "Top Rated",
    img: "https://i.ibb.co.com/23GywMJQ/Baby-Sitting.avif",
  },
  {
    title: "Patient Care",
    desc: "Specialized in-home nursing, post-surgery recovery assistance and chronic illness management.",
    icon: "🏥",
    bgColor: "#f0fdf4",
    bgColor2: "#dcfce7",
    accent: "#10b981",
    tag: "Certified",
    img: "https://i.ibb.co.com/5WdJgN9P/Patient-Care.avif",
  },
  {
    title: "Special Needs",
    desc: "Compassionate, tailored support for individuals with physical or developmental disabilities.",
    icon: "💝",
    bgColor: "#f5f3ff",
    bgColor2: "#ede9fe",
    accent: "#8b5cf6",
    tag: "Expert Care",
    img: "https://i.ibb.co.com/V000FLbC/Special-Needs.avif",
  },
  {
    title: "Child Care",
    desc: "After-school supervision, homework help, activity coordination and holistic child development.",
    icon: "🧒",
    bgColor: "#fffbeb",
    bgColor2: "#fef3c7",
    accent: "#f59e0b",
    tag: "New",
    img: "https://i.ibb.co.com/N6t35V4q/Child-Care.avif",
  },
  {
    title: "Night Care",
    desc: "Overnight supervision and monitoring ensuring safety and comfort throughout nighttime hours.",
    icon: "🌙",
    bgColor: "#eef2ff",
    bgColor2: "#e0e7ff",
    accent: "#6366f1",
    tag: "24/7",
    img: "https://i.ibb.co.com/20kpf4D8/Night-Care.avif",
  },
  {
    title: "Therapy Support",
    desc: "In-home physical and occupational therapy assistance coordinated with your professional care team.",
    icon: "🧘",
    bgColor: "#f0fdfa",
    bgColor2: "#ccfbf1",
    accent: "#14b8a6",
    tag: "Professional",
    img: "https://i.ibb.co.com/PzJN6zfx/Therapy-Support.avif",
  },
  {
    title: "Respite Care",
    desc: "Temporary relief care giving family caregivers essential rest breaks — fully managed.",
    icon: "🤝",
    bgColor: "#fff1f2",
    bgColor2: "#ffe4e6",
    accent: "#f43f5e",
    tag: "Flexible",
    img: "https://i.ibb.co.com/xqv1GJfv/Respite-Care.avif",
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
            From newborns to seniors — every stage of life deserves dedicated, professional care.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative overflow-hidden rounded-3xl border border-white/80 shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${svc.bgColor} 0%, ${svc.bgColor2} 100%)`,
                boxShadow: hovered === i ? `0 20px 60px ${svc.accent}30` : undefined,
              }}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm"
                  style={{ background: svc.accent }}
                >
                  {svc.tag}
                </span>
              </div>

              {/* Icon */}
              <div className="px-6 pt-6 pb-2">
                <div
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-lg"
                  style={{ background: svc.accent }}
                >
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
                  className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300"
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
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
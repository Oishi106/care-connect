"use client";
import React, { useState } from "react";
import Link from "next/link";

const allServices = [
  {
    title: "Elderly Care",
    desc: "Daily living assistance, health monitoring, companionship and emotional support for senior adults.",
    icon: "👴",
    gradient: "from-blue-50 to-sky-100",
    accent: "#3b82f6",
    accentBg: "bg-blue-500",
    tag: "Most Popular",
    tagBg: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80",
    cat: "Senior",
    price: "$15/hr",
  },
  {
    title: "Baby Sitting",
    desc: "Trusted, trained babysitters for infants and toddlers with a safety-first, nurturing approach.",
    icon: "👶",
    gradient: "from-pink-50 to-rose-100",
    accent: "#ff6fae",
    accentBg: "bg-[#ff6fae]",
    tag: "Top Rated",
    tagBg: "bg-[#ff6fae]",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80",
    cat: "Child",
    price: "$12/hr",
  },
  {
    title: "Patient Care",
    desc: "Specialized in-home nursing, post-surgery recovery assistance and chronic illness management.",
    icon: "🏥",
    gradient: "from-green-50 to-emerald-100",
    accent: "#10b981",
    accentBg: "bg-emerald-500",
    tag: "Certified",
    tagBg: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
    cat: "Medical",
    price: "$18/hr",
  },
  {
    title: "Special Needs",
    desc: "Compassionate, tailored support for individuals with physical or developmental disabilities.",
    icon: "💝",
    gradient: "from-purple-50 to-violet-100",
    accent: "#8b5cf6",
    accentBg: "bg-violet-500",
    tag: "Expert Care",
    tagBg: "bg-violet-500",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80",
    cat: "Special",
    price: "$20/hr",
  },
  {
    title: "Child Care",
    desc: "After-school supervision, homework help, activity coordination and holistic child development.",
    icon: "🧒",
    gradient: "from-amber-50 to-yellow-100",
    accent: "#f59e0b",
    accentBg: "bg-amber-500",
    tag: "New",
    tagBg: "bg-amber-500",
    img: "https://images.unsplash.com/photo-1484820540052-0182ef970858?w=600&auto=format&fit=crop&q=80",
    cat: "Child",
    price: "$11/hr",
  },
  {
    title: "Night Care",
    desc: "Overnight supervision and monitoring ensuring safety and comfort throughout nighttime hours.",
    icon: "🌙",
    gradient: "from-indigo-50 to-blue-100",
    accent: "#6366f1",
    accentBg: "bg-indigo-500",
    tag: "24/7",
    tagBg: "bg-indigo-500",
    img: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&auto=format&fit=crop&q=80",
    cat: "Senior",
    price: "$20/hr",
  },
  {
    title: "Therapy Support",
    desc: "In-home physical and occupational therapy assistance coordinated with your professional care team.",
    icon: "🧘",
    gradient: "from-teal-50 to-cyan-100",
    accent: "#14b8a6",
    accentBg: "bg-teal-500",
    tag: "Professional",
    tagBg: "bg-teal-500",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80",
    cat: "Medical",
    price: "$22/hr",
  },
  {
    title: "Respite Care",
    desc: "Temporary relief care giving family caregivers essential rest breaks — fully managed and trustworthy.",
    icon: "🤝",
    gradient: "from-rose-50 to-red-100",
    accent: "#f43f5e",
    accentBg: "bg-rose-500",
    tag: "Flexible",
    tagBg: "bg-rose-500",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80",
    cat: "Senior",
    price: "$16/hr",
  },
  {
    title: "Dementia Care",
    desc: "Specialized memory care with structured routines, cognitive engagement and gentle, patient support.",
    icon: "🧠",
    gradient: "from-sky-50 to-blue-100",
    accent: "#0ea5e9",
    accentBg: "bg-sky-500",
    tag: "Specialist",
    tagBg: "bg-sky-500",
    img: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=600&auto=format&fit=crop&q=80",
    cat: "Senior",
    price: "$20/hr",
  },
  {
    title: "Post-Op Care",
    desc: "Attentive recovery care after surgery including wound monitoring, mobility help and medication reminders.",
    icon: "🩹",
    gradient: "from-orange-50 to-amber-100",
    accent: "#f97316",
    accentBg: "bg-orange-500",
    tag: "Medical",
    tagBg: "bg-orange-500",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80",
    cat: "Medical",
    price: "$19/hr",
  },
  {
    title: "Newborn Care",
    desc: "Expert care for newborns in the critical first weeks — feeding schedules, sleep training, and hygiene.",
    icon: "🍼",
    gradient: "from-pink-50 to-fuchsia-100",
    accent: "#d946ef",
    accentBg: "bg-fuchsia-500",
    tag: "Specialist",
    tagBg: "bg-fuchsia-500",
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80",
    cat: "Child",
    price: "$15/hr",
  },
  {
    title: "Disability Care",
    desc: "Comprehensive home assistance for adults with physical disabilities, promoting independence and dignity.",
    icon: "♿",
    gradient: "from-lime-50 to-green-100",
    accent: "#84cc16",
    accentBg: "bg-lime-500",
    tag: "Accessible",
    tagBg: "bg-lime-500",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop&q=80",
    cat: "Special",
    price: "$17/hr",
  },
  {
    title: "Palliative Care",
    desc: "Compassionate comfort-focused care for terminal illness, prioritizing dignity, pain relief and family support.",
    icon: "🕊️",
    gradient: "from-slate-50 to-gray-100",
    accent: "#64748b",
    accentBg: "bg-slate-500",
    tag: "Compassionate",
    tagBg: "bg-slate-500",
    img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80",
    cat: "Medical",
    price: "$22/hr",
  },
  {
    title: "Live-In Care",
    desc: "Full-time resident caregiver providing round-the-clock support, household help and constant companionship.",
    icon: "🏡",
    gradient: "from-yellow-50 to-orange-100",
    accent: "#fb923c",
    accentBg: "bg-orange-400",
    tag: "Premium",
    tagBg: "bg-orange-400",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
    cat: "Senior",
    price: "$120/day",
  },
  {
    title: "Nutrition Care",
    desc: "Planned meal preparation and dietary management for specific health conditions — diabetic, cardiac and more.",
    icon: "🥗",
    gradient: "from-green-50 to-lime-100",
    accent: "#22c55e",
    accentBg: "bg-green-500",
    tag: "Healthy",
    tagBg: "bg-green-500",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80",
    cat: "Wellness",
    price: "$13/hr",
  },
  {
    title: "Autism Support",
    desc: "Structured daily routines, behavioral support and social skills development for children with ASD.",
    icon: "🌈",
    gradient: "from-violet-50 to-purple-100",
    accent: "#a855f7",
    accentBg: "bg-purple-500",
    tag: "ASD Certified",
    tagBg: "bg-purple-500",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80",
    cat: "Special",
    price: "$18/hr",
  },
  {
    title: "Companion Care",
    desc: "Social visits, conversation, outdoor walks and emotional support to reduce loneliness and isolation.",
    icon: "💬",
    gradient: "from-cyan-50 to-teal-100",
    accent: "#06b6d4",
    accentBg: "bg-cyan-500",
    tag: "Social",
    tagBg: "bg-cyan-500",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    cat: "Senior",
    price: "$10/hr",
  },
  {
    title: "Stroke Recovery",
    desc: "Intensive support for stroke survivors including speech exercises, physical therapy and daily routine aid.",
    icon: "❤️‍🩹",
    gradient: "from-red-50 to-rose-100",
    accent: "#ef4444",
    accentBg: "bg-red-500",
    tag: "Rehab",
    tagBg: "bg-red-500",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop&q=80",
    cat: "Medical",
    price: "$21/hr",
  },
  {
    title: "School Support",
    desc: "Help with homework, exam preparation, school project assistance and learning disability accommodations.",
    icon: "📚",
    gradient: "from-sky-50 to-indigo-100",
    accent: "#4f46e5",
    accentBg: "bg-indigo-600",
    tag: "Academic",
    tagBg: "bg-indigo-600",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80",
    cat: "Child",
    price: "$12/hr",
  },
  {
    title: "Mental Wellness",
    desc: "Emotional support, mindfulness sessions and mood monitoring for individuals with anxiety or depression.",
    icon: "🌿",
    gradient: "from-emerald-50 to-green-100",
    accent: "#059669",
    accentBg: "bg-emerald-600",
    tag: "Wellness",
    tagBg: "bg-emerald-600",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80",
    cat: "Wellness",
    price: "$16/hr",
  },
];

const categories = ["All", "Child", "Senior", "Medical", "Special", "Wellness"];

export default function ServicePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filtered = activeCategory === "All"
    ? allServices
    : allServices.filter(s => s.cat === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-56 sm:h-64 md:h-80 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160550-112667149917?w=1400&auto=format&fit=crop&q=80"
          alt="Our services"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1235]/90 via-[#2a1a50]/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-20">
          <div className="flex items-center gap-2 text-xs text-pink-300 mb-3">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>›</span>
            <span className="text-white">Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Our Care
            <span className="block text-[#ff6fae]">Services</span>
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/70">
            20+ professional care services for every stage of life — verified, affordable, and available near you.
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#ff6fae] text-white shadow-lg shadow-pink-200"
                    : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-[#ff6fae]"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-white/70" : "text-gray-400"}`}>
                    ({allServices.filter(s => s.cat === cat).length})
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto flex-shrink-0 text-xs text-gray-400 pr-2">
              {filtered.length} services
            </span>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        {/* Section heading */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6fae]">
              ✦ {activeCategory === "All" ? "All Services" : activeCategory + " Care"}
            </span>
            <h2 className="text-3xl font-black text-gray-900">
              {activeCategory === "All"
                ? "Complete Care Solutions"
                : `${activeCategory} Care Services`}
            </h2>
          </div>
          <Link
            href="/dashboard/user/book"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#ff6fae] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 hover:brightness-95 transition"
          >
            Book a Service
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>

        {/* Cards Grid — 4 per row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((svc, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/80 shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${svc.gradient.includes("from-") ? "var(--tw-gradient-from, #fff)" : "#fff"})`,
                boxShadow: hoveredCard === i ? `0 24px 60px ${svc.accent}28` : undefined,
              }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${svc.gradient}`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Top: icon + tag */}
                <div className="flex items-start justify-between p-5 pb-2">
                  <div className={`flex h-13 w-13 items-center justify-center rounded-2xl ${svc.accentBg} text-2xl shadow-lg h-12 w-12`}>
                    {svc.icon}
                  </div>
                  <span className={`${svc.tagBg} rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm`}>
                    {svc.tag}
                  </span>
                </div>

                {/* Title + Desc */}
                <div className="px-5 pb-3">
                  <h3 className="text-base font-black text-gray-900 leading-snug">{svc.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600 line-clamp-3">{svc.desc}</p>
                </div>

                {/* Image */}
                <div className="mx-4 overflow-hidden rounded-2xl flex-shrink-0">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Price + CTA */}
                <div className="mt-auto p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Starting from</p>
                    <p className="text-base font-black" style={{ color: svc.accent }}>{svc.price}</p>
                  </div>
                  <Link
                    href="/dashboard/user/book"
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:shadow-lg"
                    style={{ background: svc.accent }}
                  >
                    Book
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Hover shimmer */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 80% 10%, ${svc.accent}18 0%, transparent 65%)` }}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-24 text-center text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-semibold text-lg">No services found</p>
          </div>
        )}
      </div>

      {/* Bottom CTA Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ff6fae] via-[#e0508f] to-[#c73e7a] py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Can't Find What You Need?
          </h2>
          <p className="mt-3 text-base text-white/80">
            Our care coordinators are standing by to create a custom care plan perfectly tailored to your family's unique needs.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#ff6fae] shadow-xl hover:scale-105 transition-transform">
              Contact Us
            </Link>
            <Link href="/dashboard/user/book" className="rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition">
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

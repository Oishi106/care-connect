import React from "react";
import Link from "next/link";

const caregivers = [
  {
    name: "Tanvir Hossain",
    role: "Elderly Care Specialist",
    rating: 4.9, reviews: 45, exp: "5 yrs",
    price: "$15/hr",
    badge: "Top Rated",
    badgeColor: "bg-amber-500",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
    skills: ["Dementia Care", "Medication", "Mobility Aid"],
  },
  {
    name: "Maya Islam",
    role: "Certified Babysitter",
    rating: 4.8, reviews: 38, exp: "3 yrs",
    price: "$12/hr",
    badge: "Verified Pro",
    badgeColor: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    skills: ["Infant Care", "Activities", "Nutrition"],
  },
  {
    name: "Sophie Rahman",
    role: "Home Care Nurse",
    rating: 4.9, reviews: 52, exp: "7 yrs",
    price: "$18/hr",
    badge: "Senior Expert",
    badgeColor: "bg-[#ff6fae]",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=80",
    skills: ["Post-Surgery", "Wound Care", "Physiotherapy"],
  },
  {
    name: "Farhana Akter",
    role: "Special Needs Carer",
    rating: 4.8, reviews: 41, exp: "6 yrs",
    price: "$14/hr",
    badge: "Popular",
    badgeColor: "bg-violet-500",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    skills: ["ASD Support", "Therapy Assist", "Communication"],
  },
];

export default function CaregiverSpotlight() {
  return (
    <section className="w-full bg-gradient-to-br from-[#1a1235] via-[#2a1a50] to-[#1a1235] py-20 md:py-28 overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#ff6fae]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6fae]">
              ✦ Meet Our Best
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Featured
              <span className="block text-[#ff6fae]">Caregivers</span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/50">
              Handpicked professionals with outstanding ratings, verified credentials, and exceptional client feedback.
            </p>
          </div>
          <Link href="/dashboard/user/caregivers" className="flex-shrink-0 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Browse All Caregivers →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {caregivers.map((cg, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:-translate-y-2">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={cg.img}
                  alt={cg.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 right-3 ${cg.badgeColor} rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-lg`}>
                  {cg.badge}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-sm shadow-green-400/50"></span>
                  <span className="text-xs font-medium text-white">Available</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white">{cg.name}</h3>
                    <p className="text-xs text-white/60">{cg.role}</p>
                  </div>
                  <p className="font-black text-[#ff6fae]">{cg.price}</p>
                </div>

                {/* Stats */}
                <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-bold text-white">{cg.rating}</span>
                    ({cg.reviews})
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/20"></span>
                  <span>{cg.exp} exp.</span>
                </div>

                {/* Skills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cg.skills.map((sk, j) => (
                    <span key={j} className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-xs text-white/70">
                      {sk}
                    </span>
                  ))}
                </div>

                {/* Book button */}
                <Link
                  href="/dashboard/user/book"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6fae] py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-900/30 transition hover:brightness-95"
                >
                  Book Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

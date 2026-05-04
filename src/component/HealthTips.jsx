import React from "react";
import Link from "next/link";

const tips = [
  {
    category: "Elderly Care",
    color: "bg-blue-100 text-blue-700",
    title: "10 Signs Your Parent Needs Professional Home Care",
    excerpt: "Recognizing early signs of decline can help families act before a crisis. Learn what behavioral and physical changes to watch for.",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80",
    read: "5 min read",
  },
  {
    category: "Child Safety",
    color: "bg-pink-100 text-pink-600",
    title: "How to Choose a Safe and Loving Babysitter",
    excerpt: "Background checks, trial sessions, emergency protocols — here's everything parents must verify before hiring childcare help.",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80",
    read: "4 min read",
  },
  {
    category: "Wellness",
    color: "bg-emerald-100 text-emerald-700",
    title: "Daily Routines That Improve Patient Recovery at Home",
    excerpt: "Consistency in routine dramatically improves outcomes. Discover the science-backed habits that professional carers use every day.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80",
    read: "6 min read",
  },
];

export default function HealthTips() {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6fae]">
              ✦ Expert Insights
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Care Tips &
              <span className="block text-[#ff6fae]">Health Guides</span>
            </h2>
          </div>
          <Link href="/blog" className="flex-shrink-0 rounded-full border-2 border-[#ff6fae] px-6 py-3 text-sm font-bold text-[#ff6fae] hover:bg-[#ff6fae] hover:text-white transition">
            View All Articles →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, i) => (
            <Link key={i} href="/blog" className="group overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 block">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tip.img}
                  alt={tip.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${tip.color}`}>
                    {tip.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[#ff6fae] transition-colors">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{tip.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{tip.read}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#ff6fae]">
                    Read More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

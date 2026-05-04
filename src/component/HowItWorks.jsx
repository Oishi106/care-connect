import React from "react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    desc: "Sign up in under 2 minutes. Tell us who needs care — a child, an elder, or a patient — and we'll tailor options for you.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
        <path d="M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "from-[#ff6fae] to-[#e0508f]",
    bg: "bg-pink-50",
  },
  {
    step: "02",
    title: "Browse & Choose",
    desc: "Explore verified caregiver profiles with real reviews, certifications, availability, and hourly rates that fit your budget.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
        <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
  },
  {
    step: "03",
    title: "Book Your Session",
    desc: "Select a date, time, and duration. Use our secure payment system — bKash, Nagad, or card — to confirm your booking instantly.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    step: "04",
    title: "Receive Quality Care",
    desc: "Your caregiver arrives on time. Track progress, message in real time, and leave a review after every session.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 20.5s-7.5-4.6-9.4-8.5C1.6 9.5 3.2 6 6.7 6c2 0 3.4 1 4.3 2.4C11.9 7 13.3 6 15.3 6 18.8 6 20.4 9.5 21.4 12c-1.9 3.9-9.4 8.5-9.4 8.5Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "from-violet-500 to-purple-700",
    bg: "bg-violet-50",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50 py-20 md:py-28">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 grid lg:grid-cols-2 gap-8 items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6fae]">
              ✦ Simple Process
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Care in
              <span className="text-[#ff6fae]"> 4 Easy</span>
              <br />Steps
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-gray-500">
              Getting professional care for your loved ones has never been simpler. Our streamlined process gets you from signup to care in minutes — with full transparency every step of the way.
            </p>
            <Link href="/signup" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff6fae] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition hover:brightness-95">
              Get Started Free →
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-full z-10 hidden h-0.5 w-6 bg-gradient-to-r from-gray-300 to-gray-200 lg:block" />
              )}

              <div className={`h-full rounded-3xl ${step.bg} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white`}>
                {/* Step number */}
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-gray-100 select-none">{step.step}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.desc}</p>

                {/* Bottom accent */}
                <div className={`mt-5 h-1 w-10 rounded-full bg-gradient-to-r ${step.color} transition-all duration-300 group-hover:w-16`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

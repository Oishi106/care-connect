import React from "react";

const features = [
  {
    icon: "🛡️",
    title: "Background Verified",
    desc: "Every caregiver undergoes criminal background checks, identity verification, and reference validation before joining.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: "🎓",
    title: "Certified Professionals",
    desc: "Our caregivers hold recognized certifications in elderly care, childcare, nursing assistance, and special needs support.",
    color: "from-[#ff6fae] to-[#e0508f]",
  },
  {
    icon: "⚡",
    title: "Quick Booking",
    desc: "Find and confirm a caregiver in under 5 minutes. Emergency same-day bookings available 24/7.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: "💬",
    title: "Real-Time Updates",
    desc: "Stay connected with in-app messaging, live session updates, and instant notifications at every step.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: "💳",
    title: "Flexible Payments",
    desc: "Pay your way — bKash, Nagad, credit/debit card, or bank transfer. Fully secure and encrypted.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: "⭐",
    title: "Rated & Reviewed",
    desc: "Transparent rating system with real reviews from verified clients. Know exactly who is coming to your home.",
    color: "from-rose-500 to-pink-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-pink-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <div className="relative hidden lg:block">
            <div className="relative h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80"
                alt="Caregiver"
                className="absolute top-0 left-0 h-64 w-64 rounded-3xl object-cover shadow-2xl"
              />
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80"
                alt="Childcare"
                className="absolute top-16 right-0 h-72 w-52 rounded-3xl object-cover shadow-2xl"
              />
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80"
                alt="Elder care"
                className="absolute bottom-0 left-12 h-56 w-72 rounded-3xl object-cover shadow-2xl"
              />

              {/* Floating badge */}
              <div className="absolute top-48 left-44 z-10 rounded-2xl bg-white px-4 py-3 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50","https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50"].map((src,i) => (
                      <img key={i} src={src} className="h-7 w-7 rounded-full border-2 border-white object-cover" alt=""/>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">1,200+ Families</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_,i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 z-10 rounded-2xl bg-[#ff6fae] px-4 py-3 text-white shadow-xl">
                <p className="text-2xl font-black">98%</p>
                <p className="text-xs font-medium opacity-80">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6fae]">
              ✦ Why CareConnect
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl">
              The Standard of
              <span className="block text-[#ff6fae]">Premium Care</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              We don't just connect caregivers — we ensure every interaction is safe, professional, and deeply caring.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="group flex gap-4 rounded-2xl bg-gray-50 p-4 hover:bg-pink-50 transition-colors duration-300 border border-transparent hover:border-pink-100">
                  <div className={`flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-xl shadow-md`}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{f.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

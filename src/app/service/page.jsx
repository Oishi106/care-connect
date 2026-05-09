"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchServices } from "@/lib/services";

const categories = ["All", "Child", "Senior", "Medical", "Special", "Wellness"];

export default function ServicePage() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loadingService, setLoadingService] = useState("");
  const [services, setServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const remoteServices = await fetchServices();
        if (isMounted) {
          setServices(remoteServices);
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage("Unable to load services. Please try again later.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadServices();
    const intervalId = setInterval(loadServices, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const startCheckout = async (service) => {
    if (!session?.user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      setLoadingService(service.title);

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: service.title,
          priceLabel: service.price,
          hours: 1,
          successPath: "/payment/success",
          cancelPath: "/payment/cancel",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start payment.");
      }

      window.location.href = data.url;
    } catch (error) {
      alert(error.message || "Unable to start payment.");
    } finally {
      setLoadingService("");
    }
  };

  const filtered = activeCategory === "All"
    ? services
    : services.filter(s => s.cat === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-56 sm:h-64 md:h-80 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160550-112667149917?w=1400&auto=format&fit=crop&q=80"
          alt="Our services"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#1a1235]/90 via-[#2a1a50]/70 to-transparent" />
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
            Professional care services for every stage of life — verified, affordable, and available near you.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {errorMessage}
          </div>
        </div>
      )}

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-20 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#ff6fae] text-white shadow-lg shadow-pink-200"
                    : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-[#ff6fae]"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-white/70" : "text-gray-400"}`}>
                    ({services.filter(s => s.cat === cat).length})
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-xs text-gray-400 pr-2">
              {filtered.length} services
            </span>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff6fae]">
              ✦ {activeCategory === "All" ? "All Services" : activeCategory + " Care"}
            </span>
            <h2 className="text-3xl font-black text-gray-900">
              {activeCategory === "All" ? "Complete Care Solutions" : `${activeCategory} Care Services`}
            </h2>
          </div>
          <Link
            href="/dashboard/user/book"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#ff6fae] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 hover:brightness-95 transition"
          >
            Book a Service
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="py-24 text-center text-gray-400">
            <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-pink-200 border-t-[#ff6fae] animate-spin" />
            <p className="text-sm">Loading services...</p>
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((svc, i) => {
              const cardGradient = svc.color || svc.gradient || "from-white to-white";
              const uniqueKey = svc._id || `service-${i}`;

              return (
                <div
                  key={uniqueKey}
                  onMouseEnter={() => setHoveredCard(uniqueKey)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/80 shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  style={{
                    boxShadow: hoveredCard === uniqueKey ? `0 24px 60px ${svc.accent}28` : undefined,
                  }}
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${cardGradient}`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between p-5 pb-2">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${svc.accentBg} text-2xl shadow-lg`}>
                        {svc.icon || "✨"}
                      </div>
                      <span className={`${svc.tagBg} rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm`}>
                        {svc.tag}
                      </span>
                    </div>
                    <div className="px-5 pb-3">
                      <h3 className="text-base font-black text-gray-900 leading-snug">{svc.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-gray-600 line-clamp-3">{svc.description || svc.desc}</p>
                    </div>
                    <div className="mx-4 overflow-hidden rounded-2xl shrink-0">
                      <img
                        src={svc.image || svc.img}
                        alt={svc.title}
                        className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-auto flex items-center justify-between p-4">
                      <div>
                        <p className="text-xs font-medium text-gray-400">Starting from</p>
                        <p className="text-base font-black" style={{ color: svc.accent }}>{svc.price}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => startCheckout(svc)}
                        disabled={loadingService === svc.title}
                        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                        style={{ background: svc.accent }}
                      >
                        {loadingService === svc.title ? "Opening..." : session?.user ? "Book" : "Login to Book"}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 80% 10%, ${svc.accent}18 0%, transparent 65%)` }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div className="py-24 text-center text-gray-400">
            <p className="mb-4 text-5xl">🔍</p>
            <p className="text-lg font-semibold">No services found</p>
          </div>
        )}
      </div>

      {/* Bottom CTA Banner */}
      <div className="relative overflow-hidden bg-linear-to-r from-[#ff6fae] via-[#e0508f] to-[#c73e7a] py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Can&apos;t Find What You Need?
          </h2>
          <p className="mt-3 text-base text-white/80">
            Our care coordinators are standing by to create a custom care plan perfectly tailored to your family&apos;s unique needs.
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
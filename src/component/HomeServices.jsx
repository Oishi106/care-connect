"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchServices, fallbackServices } from "@/lib/services";

export default function HomeServices() {
  const [hovered, setHovered] = useState(null);
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const remoteServices = await fetchServices();

        if (isMounted && remoteServices.length > 0) {
          setServices(remoteServices.slice(0, 8));
          return;
        }
      } catch (error) {
        // Keep the fallback list when the API is unavailable.
      }

      if (isMounted) {
        setServices(fallbackServices.slice(0, 8));
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

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
              key={svc.id || i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative overflow-hidden rounded-3xl bg-linear-to-br ${svc.color} border border-white/80 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
              style={{ boxShadow: hovered === i ? `0 20px 60px ${svc.accent}30` : undefined }}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`${svc.tagBg || svc.iconBg} rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm`}>
                  {svc.tag}
                </span>
              </div>

              {/* Icon */}
              <div className="px-6 pt-6 pb-2">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${svc.iconBg} text-2xl shadow-lg`}>
                  {svc.icon}
                </div>
              </div>

              {/* Text */}
              <div className="px-6 pb-4">
                <h3 className="text-lg font-bold text-gray-900">{svc.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{svc.description}</p>
              </div>

              {/* Image */}
              <div className="mx-5 mb-5 overflow-hidden rounded-2xl">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  width={600}
                  height={360}
                  unoptimized
                  className="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Bottom Link */}
              <div className="px-5 pb-5">
                <Link
                  href="/service"
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300`}
                  style={{ color: svc.accent || "#ff6fae" }}
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
                style={{ background: `radial-gradient(circle at 70% 20%, ${(svc.accent || "#ff6fae")}15 0%, transparent 70%)` }}
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

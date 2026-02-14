"use client";

import React, { useState, useEffect } from "react";

const Services = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    // Generate dummy logos - in production, replace with real logo data
    setLogos(Array(6).fill(0).map((_, i) => i));
  }, []);

  const services = [
    {
      title: "Elderly Care",
      description: "Compassionate care for seniors with professional support and attention to health needs",
      image: "https://plus.unsplash.com/premium_photo-1661340986594-afd7deb5882e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEVsZGVybHklMjBDYXJlfGVufDB8fDB8fHww",
      color: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-300"
    },
    {
      title: "Baby Sitting",
      description: "Trusted childcare services with trained professionals ensuring safety and development",
      image: "https://plus.unsplash.com/premium_photo-1711311021816-efcac4a6806d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEJhYnklMjBTaXR0aW5nfGVufDB8fDB8fHww",
      color: "from-pink-50 to-pink-100",
      iconBg: "bg-[#ff6fae]"
    },
    {
      title: "Patient Care",
      description: "Professional medical care assistance for patients with specialized health management",
      image: "https://images.pexels.com/photos/7447003/pexels-photo-7447003.jpeg",
      color: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-300"
    },
    {
      title: "Special Needs Care",
      description: "Expert care for individuals with special requirements and personalized attention",
      image: "https://images.pexels.com/photos/6981096/pexels-photo-6981096.jpeg",
      color: "from-pink-50 to-pink-100",
      iconBg: "bg-[#ff6fae]"
    },
  ];

  return (
    <section className="w-full bg-white">
      {/* Logo Marquee */}
      <div className="w-full bg-[#ff6fae] py-8 sm:py-10 md:py-12 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {["CARE PLUS", "HEALTH HUB", "FAMILY CARE", "TRUST US", "LOVE CARE", "PREMIUM CARE"].map((text, idx) => (
              <span key={idx} className="marquee-item">
                {text}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {["CARE PLUS", "HEALTH HUB", "FAMILY CARE", "TRUST US", "LOVE CARE", "PREMIUM CARE"].map((text, idx) => (
              <span key={idx} className="marquee-item">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mx-auto max-w-6xl  px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold text-[#ff6fae] sm:text-sm">
            <span className="text-pink-400">✨</span>
            Service We Provide
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:mb-4 md:text-4xl">
            Quality <span className="text-[#ff6fae]">Care For</span>
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Your Loved Ones</h3>
        </div>

        {/* Service Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`rounded-3xl bg-gradient-to-br ${service.color} overflow-hidden shadow-md transition duration-300 hover:shadow-lg hover:scale-102`}
            >
              {/* Title & Icon Header */}
              <div className="relative px-5 pt-5 sm:px-6 sm:pt-6">
                <h4 className="text-xl font-bold text-[#ff6fae] sm:text-2xl">{service.title}</h4>
              </div>

              {/* Icon Circle - Top Right */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <div className={`${service.iconBg} flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16`}>
                  {index === 0 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 5.23 11.08 5 12 5c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l.98 1.48C23.15 17.51 24 15.96 24 14c0-2.64-2.05-4.78-4.65-4.96z"/>
                    </svg>
                  )}
                  {index === 3 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="px-5 pb-4 sm:px-6">
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{service.description}</p>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-3xl mx-5 mb-5 sm:h-52 sm:mx-6 sm:mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full rounded-3xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: flex;
          gap: 3rem;
          animation: marquee 20s linear infinite;
          padding-right: 3rem;
        }
        .marquee-item {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;

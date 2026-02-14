"use client";

import React from "react";
import Link from "next/link";

const CTABanner = () => {
  return (
    <section className="w-full bg-[#d6478d] relative overflow-hidden">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=60')"
        }}
      />
      
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white leading-tight max-w-lg">
              Give Your Loved Ones Quality Care You Can Trust
            </h2>
          </div>
          
          {/* CTA Button */}
          <Link href="/contact" className="rounded-lg bg-[#8b0955] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white hover:bg-[#790a4b] transition whitespace-nowrap inline-flex items-center justify-center">
            Contact Us Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;

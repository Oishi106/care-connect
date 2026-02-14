"use client";

import React from "react";

const AdoptionProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Service",
      description: "Select the care service you need - elderly care, baby sitting, patient care, or special needs support."
    },
    {
      number: "02",
      title: "Book A Caregiver",
      description: "Fill out a simple form with your requirements, schedule, and preferences. We'll match you with the perfect caregiver."
    },
    {
      number: "03",
      title: "Meet & Verify",
      description: "Meet your assigned caregiver, review their credentials, and ensure they're the right fit for your loved ones."
    },
    {
      number: "04",
      title: "Start Care Service",
      description: "Begin receiving quality care services with ongoing support, regular updates, and 24/7 assistance when needed."
    }
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div>
            <p className="text-[#7aa7d9] font-semibold mb-3 text-sm sm:text-base">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Simple Steps To <span className="text-[#ff6fae]">Quality Care</span>
            </h2>
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#ff6fae] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg hover:brightness-95 transition">
            Learn More
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 12h10M13 7l4 5-4 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6fae] via-[#7aa7d9] to-[#7aa7d9]"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Container */}
                <div className={`rounded-3xl p-6 sm:p-7 text-center transition-all duration-300 hover:shadow-lg ${
                  index === 0
                    ? "border-4 border-dashed border-[#ff6fae] bg-pink-50"
                    : "bg-blue-50 border border-blue-100"
                }`}>
                  {/* Number Circle */}
                  <div className="flex justify-center mb-4">
                    <div className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full font-bold text-white text-lg sm:text-xl ${
                      index === 0 ? "bg-[#ff6fae]" : "bg-[#7aa7d9]"
                    }`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg sm:text-xl font-bold mb-3 ${
                    index === 0 ? "text-[#ff6fae]" : "text-[#7aa7d9]"
                  }`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for desktop (hidden on mobile and tablet) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/3 transform -translate-y-1/2 z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="#7aa7d9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Learn More Button */}
        <div className="flex sm:hidden justify-center mt-8">
          <button className="inline-flex items-center gap-2 rounded-full bg-[#ff6fae] px-6 py-3 text-base font-semibold text-white shadow-lg hover:brightness-95 transition">
            Learn More
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 12h10M13 7l4 5-4 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdoptionProcess;

"use client";

import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic Care",
      price: 49,
      description: "Perfect for occasional caregiving needs with essential support services.",
      features: [
        "Up to 20 hours/month care support",
        "Certified caregiver assistance",
        "Daily activity & meal support",
        "Basic health monitoring",
        "24/7 customer support"
      ],
      highlighted: false
    },
    {
      name: "Standard Care",
      price: 60,
      description: "Ideal for families needing regular care with comprehensive coverage.",
      features: [
        "Up to 40 hours/month care support",
        "Dedicated personal caregiver",
        "Medication reminders & tracking",
        "Weekly health reports",
        "Emergency response service",
        "Transportation assistance"
      ],
      highlighted: true
    },
    {
      name: "Premium Care",
      price: 96,
      description: "Full-time professional care with premium features for complete peace of mind.",
      features: [
        "Unlimited hours care support",
        "Specialized medical care assistance",
        "Physical therapy coordination",
        "24/7 live-in caregiver option",
        "Doctor appointment coordination",
        "Priority emergency response"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#ff6fae] font-semibold mb-3 text-sm sm:text-base">Pricing Packages</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose <span className="text-[#ff6fae]">The Best Care</span>
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">For Your Loved Ones</h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Flexible caregiving plans designed for children, elderly, and special care needs. Safe, reliable, and affordable support whenever you need it.          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 relative">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? "lg:scale-105 shadow-xl border-4 border-[#ff6fae] border-dashed"
                  : "shadow-md hover:shadow-lg"
              } ${plan.highlighted ? "bg-pink-50" : "bg-blue-50"}`}
            >
              {/* Badge for highlighted plan */}
              {plan.highlighted && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#ff6fae] shadow-lg">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M12 2c-.825 0-1.5.675-1.5 1.5v1.275C7.89 5.34 5.52 7.725 5.52 10.65c0 2.55 1.695 4.71 3.945 5.415 1.02 2.34 3.285 3.93 5.535 3.93s4.515-1.59 5.535-3.93c2.25-.705 3.945-2.865 3.945-5.415 0-2.925-2.37-5.31-5.97-6.375V3.5c0-.825-.675-1.5-1.5-1.5z"/>
                    </svg>
                  </div>
                </div>
              )}

              <div className={`p-6 sm:p-8 ${plan.highlighted ? "pt-12" : ""}`}>
                <p className={`text-sm font-semibold mb-2 ${plan.highlighted ? "text-[#ff6fae]" : "text-[#7aa7d9]"}`}>
                  {plan.name}
                </p>
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/Month</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base mb-6">{plan.description}</p>

                <button className="w-full rounded-full bg-[#ff6fae] px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:brightness-95 transition mb-6 flex items-center justify-center gap-2">
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 12h10M13 7l4 5-4 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="border-t border-gray-300 pt-6">
                  <p className="font-semibold text-gray-900 mb-4 text-sm">Key Features</p>
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-1">
                          <path
                            d="M3 12l4 4 12-12"
                            stroke="#7aa7d9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

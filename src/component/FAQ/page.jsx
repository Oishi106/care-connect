"use client";

import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a caregiver?",
      answer: "Select your service, duration, and location, then confirm your booking online."
    },
    {
      question: "Are the caregivers verified and experienced?",
      answer: "Yes, all our caregivers are thoroughly vetted and experienced in pet care. We ensure they are qualified and trustworthy before joining our team."
    },
    {
      question: "Can I book care for a few hours or multiple days?",
      answer: "Absolutely! You can book care for as little as a few hours or for multiple days, depending on your needs."
    },
    {
      question: "How is the total cost calculated?",
      answer: "The total cost is calculated based on the type of service, duration, and location. You can view the pricing details during the booking process."
    },
    {
      question: "What if I need to cancel a booking?",
      answer: "You can cancel your booking up to 24 hours before the scheduled service. Cancellations made within 24 hours may be subject to a cancellation fee."
    },
    {
      question: "Is my payment safe?",
      answer: "Yes, all payments are processed securely through our encrypted payment gateway. We do not store sensitive payment information on our servers."
    }
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Section */}
          <div>
            <p className="text-[#ff6fae] font-semibold mb-3 text-sm sm:text-base">FAQ</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Everything You<br />
              <span className="text-[#ff6fae]">Need To Know</span><br />
              About Care Connect
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base">
                We’ve compiled answers to the most common questions to make your caregiving experience smooth, safe, and hassle-free.            
            </p>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#ff6fae] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg hover:brightness-95 transition">
              Learn More
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 12h10M13 7l4 5-4 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative overflow-hidden rounded-3xl border-4 border-[#ff6fae] border-dashed">
                <img
                  src="https://plus.unsplash.com/premium_photo-1663036991651-82ee96fcc8d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxFbGRlcmx5JTIwQ2FyZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Pet care"
                  className="w-full h-96 sm:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-12 sm:mt-16 w-full">
          <div className="space-y-3 w-full">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-gray-100 transition"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ff6fae] text-white text-xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-gray-200 bg-white">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

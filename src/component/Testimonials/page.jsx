"use client";

import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahim K.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
      rating: 5,
      text: "CareConnect's caregiver provided exceptional service for my father. Their professional approach and caring attitude truly made a difference in our family's life."
    },
    {
      name: "Fatima A.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      rating: 5,
      text: "Finding a reliable babysitter was so easy with CareConnect. Their caregivers are well-trained, trustworthy, and my children absolutely love them."
    }
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1.5 text-sm font-semibold text-[#ff6fae]">
              <span className="text-[#ff6fae]">�</span>
              What They're Saying
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Stories <span className="text-[#ff6fae]">From Families</span>
              <br />Who Chose CareConnect
            </h2>
            
            <p className="mt-5 text-gray-500 leading-relaxed max-w-md">
              Hear from the families who trusted us with their loved ones. Their satisfaction and trust inspire us to deliver the best care every day.
            </p>
          </div>

          {/* Right Content - Testimonial Cards */}
          <div className="flex flex-col sm:flex-row gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-1 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Heart Icon */}
                <div className="mb-4 flex justify-center">
                  <span className="text-4xl text-pink-200">💗</span>
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-500 text-sm leading-relaxed text-center mb-6">
                  {testimonial.text}
                </p>
                
                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Avatar and Name */}
                <div className="flex flex-col items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-3 border-[#ff6fae] mb-2"
                  />
                  <span className="font-semibold text-gray-800">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

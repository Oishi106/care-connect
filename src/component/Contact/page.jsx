"use client";

import React from "react";

const Contact = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-gray-400 to-gray-300 sm:h-56 md:h-80">
        <img
          src="https://plus.unsplash.com/premium_photo-1661274147223-116687829d26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEVsZGVybHklMjBDYXJlfGVufDB8fDB8fHww"
          alt="Caregiver with elderly person"
          className="h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/30 px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl font-bold text-[#8b0955] sm:text-3xl md:text-6xl">
            Contact Us
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-[#8b0955] sm:text-sm">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span>&gt;</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:py-20">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          {/* Left Column - Info */}
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae] sm:text-sm">
              <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#ff6fae]" />
              Contact
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Compassion Is At The Heart Of Our Care
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base md:mb-8">
              We're passionate about providing exceptional care services. Reach
              out to us anytime—we're here to help and answer your questions.
            </p>

            {/* Opening Hours */}
            <div className="mb-6 md:mb-8">
              <h3 className="mb-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">Opening Hours</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 sm:text-base">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 text-[#ff6fae]"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 6v6l4 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Available Everyday: 8:00 AM – 10:00 PM</span>
              </div>
            </div>

            {/* Visit Us */}
            <div className="mb-5 flex items-start gap-3 sm:gap-4 md:mb-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#ff6fae] text-white sm:h-12 sm:w-12">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M19.5 10.5c0 5-7.5 10.5-7.5 10.5S4.5 15.5 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 sm:text-base">Visit Us</h4>
                <p className="text-xs text-gray-600 sm:text-sm">123 Care Street, Dhaka 1213</p>
              </div>
            </div>

            {/* Email */}
            <div className="mb-5 flex items-start gap-3 sm:gap-4 md:mb-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#ff6fae] text-white sm:h-12 sm:w-12">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 sm:text-base">Our Email</h4>
                <p className="text-xs text-gray-600 sm:text-sm">support@careconnect.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#ff6fae] text-white sm:h-12 sm:w-12">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 sm:text-base">Our Number</h4>
                <p className="text-xs text-gray-600 sm:text-sm">+880 1XXX-XXXXXX</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-xl bg-[#bc3972] p-6 text-white sm:p-8 md:rounded-2xl md:p-10">
            <div className="mb-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide sm:text-sm">Fill The Form</p>
              <h3 className="text-2xl font-bold sm:text-3xl">Get In Touch</h3>
            </div>

            <form className="space-y-3 sm:space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name Here"
                  className="w-full rounded-lg border-none bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 sm:px-4 sm:py-3 sm:text-base"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email Here"
                  className="w-full rounded-lg border-none bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 sm:px-4 sm:py-3 sm:text-base"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your Subject"
                  className="w-full rounded-lg border-none bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 sm:px-4 sm:py-3 sm:text-base"
                />
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full rounded-lg border-none bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 sm:px-4 sm:py-3 sm:text-base"
                />
              </div>

              <button className="w-full rounded-lg bg-[#8b0955] py-2 text-sm font-semibold text-white transition duration-300 hover:bg-[#790a4b] sm:py-3 sm:text-base">
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

           
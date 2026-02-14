"use client";

import React, { useState } from "react";

const About = () => {
    const [activeTab, setActiveTab] = useState("mission");

    const teamMembers = [
        {
            name: "Sophie Rahman",
            role: "Founder & Senior Care Coordinator",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=60"
        },
        {
            name: "Tanvir Hossain",
            role: "Elderly Care Specialist",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60"
        },
        {
            name: "Maya Islam",
            role: "Childcare Coordinator",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60"
        },
        {
            name: "Ethan Karim",
            role: "Special Care Trainer",
            image: "https://images.unsplash.com/photo-1592334873219-42ca023e48ce?w=400&auto=format&fit=crop&q=60"
        },
        {
            name: "Farhana Akter",
            role: "Home Care Supervisor",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60"
        },
        {
            name: "Arif Chowdhury",
            role: "Health & Safety Officer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60"
        },
        {
            name: "Nabila Sultana",
            role: "Booking & Customer Support Manager",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60"
        },
        {
            name: "Rashed Khan",
            role: "Quality Assurance & Feedback Coordinator",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=60"
        }
    ];

    const missionContent = {
        mission: {
            title: "Our Mission",
            content: "We exist to connect families with compassionate, qualified caregivers who treat your loved ones like family. Every senior, child, or individual with special needs deserves care that honors their dignity, independence, and unique story. Our mission is to make finding trustworthy, professional care as simple and stress-free as possible."
        },
        vision: {
            title: "Our Vision",
            content: "We envision a world where no family struggles alone to find quality care. By building a community of vetted, passionate caregivers and leveraging technology for seamless connections, we aim to become the most trusted caregiving platform—where safety, compassion, and accessibility are never compromised."
        },
        story: {
            title: "Why We Started",
            content: "Care Connect was born from personal experience. Our founder, Sarah, watched her family struggle to find reliable care for her aging grandmother—navigating confusing options, feeling anxious about trust and safety. She knew countless families faced the same fear and frustration. We created Care Connect to change that: one platform where families find peace of mind and caregivers who genuinely care."
        },
        values: [
            {
                icon: "🛡️",
                title: "Safety First",
                description: "Every caregiver undergoes rigorous background checks, certification verification, and ongoing training. We never compromise on safety protocols, ensuring your loved ones are in secure, capable hands at all times."
            },
            {
                icon: "🤝",
                title: "Trust & Transparency",
                description: "Honest communication is our foundation. From transparent pricing to verified caregiver profiles with real reviews, we believe trust is earned through openness. You'll always know exactly who is caring for your family and why they're qualified."
            },
            {
                icon: "🌍",
                title: "Accessible to All",
                description: "Quality care shouldn't be a luxury. We work hard to keep our services affordable and our platform easy to use, ensuring every family—regardless of budget or tech experience—can access the support they need when they need it."
            },
            {
                icon: "❤️",
                title: "Compassion in Action",
                description: "Care is more than a service—it's a relationship built on empathy and respect. Our caregivers are trained to listen, understand, and respond with kindness. We treat your loved ones the way we'd want our own family treated: with dignity, warmth, and genuine care."
            }
        ]
    };

    return (
        <section className="w-full bg-white">
            {/* Hero Section */}
       <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-gray-400 to-gray-300 sm:h-56 md:h-80">
        <img
          src="https://plus.unsplash.com/premium_photo-1661274147223-116687829d26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEVsZGVybHklMjBDYXJlfGVufDB8fDB8fHww"
          alt="Caregiver with elderly person"
          className="h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/30 px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl font-bold text-[#8b0955] sm:text-3xl md:text-6xl">
            About Us
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-[#8b0955] sm:text-sm">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span>&gt;</span>
            <span>About Us</span>
          </div>
        </div>
      </div>

            {/* Tab Navigation */}
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                <div className="flex flex-wrap justify-center gap-4 border-b-2 border-gray-200 pb-4">
                    <button
                        onClick={() => setActiveTab("mission")}
                        className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-8 sm:py-3 sm:text-base ${activeTab === "mission"
                            ? "bg-[#ff6fae] text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Our Mission
                    </button>
                    <button
                        onClick={() => setActiveTab("team")}
                        className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-8 sm:py-3 sm:text-base ${activeTab === "team"
                            ? "bg-[#ff6fae] text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Meet Our Team
                    </button>
                </div>

                {/* Content Sections */}
                <div className="py-12 sm:py-16">
                    {/* Mission Section */}
                    {activeTab === "mission" && (
                        <div className="space-y-12 animate-fadeIn">
                            {/* Welcome Section with Image */}
                            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                                {/* Left: Image with Play Button */}
                                <div className="relative">
                                    <div className="relative overflow-hidden rounded-3xl border-4 border-[#ff6fae] border-opacity-30">
                                        <img
                                            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80"
                                            alt="Caregiver with senior"
                                            className="w-full h-[400px] sm:h-[500px] object-cover"
                                        />
                                        {/* Play Button */}
                                        <div className="absolute bottom-6 left-6">
                                            <button className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#ff6fae] rounded-2xl shadow-lg hover:bg-[#e85a96] transition">
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div>
                                    <p className="text-[#ff6fae] font-semibold mb-3 text-sm sm:text-base">Welcome To Care Connect</p>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                        See & Experience A New Perspective Of Life
                                    </h2>
                                    <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                                        We provide trusted care services for children, elderly, and family members. Our platform makes booking reliable caregivers simple, safe, and accessible. Experience peace of mind with Care Connect.                  </p>

                                    {/* Checkmark List */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#ff6fae] text-lg">✓</span>
                                            <span className="text-gray-700 text-sm sm:text-base">Trusted Caregivers</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#ff6fae] text-lg">✓</span>
                                            <span className="text-gray-700 text-sm sm:text-base">Safe & Secure</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#ff6fae] text-lg">✓</span>
                                            <span className="text-gray-700 text-sm sm:text-base">Flexible Scheduling</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#ff6fae] text-lg">✓</span>
                                            <span className="text-gray-700 text-sm sm:text-base">Affordable Pricing</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#ff6fae] text-lg">✓</span>
                                            <span className="text-gray-700 text-sm sm:text-base">Experienced Staff</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#ff6fae] text-lg">✓</span>
                                            <span className="text-gray-700 text-sm sm:text-base">Easy Booking</span>
                                        </div>
                                    </div>

                                    {/* Feature Boxes */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#ff6fae] rounded-2xl flex items-center justify-center">
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Expert Nursing Staff</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#ff6fae] rounded-2xl flex items-center justify-center">
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8.5-2h3c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5s.22.5.5.5zm0-2h3c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5s.22.5.5.5zm0-2h3c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5s.22.5.5.5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Safe Solution For Health</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics Section */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                <div className="text-center p-6 rounded-3xl border-2 border-[#ff6fae] border-opacity-20 bg-white shadow-sm hover:shadow-md transition">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ff6fae] mb-2">250+</h3>
                                    <p className="text-gray-900 font-semibold text-sm sm:text-base">Completed Cases</p>
                                </div>
                                <div className="text-center p-6 rounded-3xl border-2 border-[#ff6fae] border-opacity-20 bg-white shadow-sm hover:shadow-md transition">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ff6fae] mb-2">50+</h3>
                                    <p className="text-gray-900 font-semibold text-sm sm:text-base">Nursing Staff</p>
                                </div>
                                <div className="text-center p-6 rounded-3xl border-2 border-[#ff6fae] border-opacity-20 bg-white shadow-sm hover:shadow-md transition">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ff6fae] mb-2">20+</h3>
                                    <p className="text-gray-900 font-semibold text-sm sm:text-base">Senior Doctors</p>
                                </div>
                                <div className="text-center p-6 rounded-3xl border-2 border-[#ff6fae] border-opacity-20 bg-white shadow-sm hover:shadow-md transition">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ff6fae] mb-2">200+</h3>
                                    <p className="text-gray-900 font-semibold text-sm sm:text-base">Happy Families</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Team Section */}
                    {activeTab === "team" && (
                        <div className="animate-fadeIn">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <p className="text-[#ff6fae] font-semibold mb-3 text-sm sm:text-base">Our Team</p>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                    Meet The People <span className="text-[#ff6fae]">Behind Care Connect</span>
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                                    We are a passionate team dedicated to making caregiving safe, easy, and reliable for families. Each member brings experience, care, and trust to every service.                                </p>
                            </div>

                            {/* Team Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="team-card">
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden rounded-3xl group">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-64 sm:h-72 object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            {/* Social Icons Overlay */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#ff6fae] transition group/icon">
                                                    <svg className="w-5 h-5 text-[#ff6fae] group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#ff6fae] transition group/icon">
                                                    <svg className="w-5 h-5 text-[#ff6fae] group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#ff6fae] transition group/icon">
                                                    <svg className="w-5 h-5 text-[#ff6fae] group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20 4h-16c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#ff6fae] transition group/icon">
                                                    <svg className="w-5 h-5 text-[#ff6fae] group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Name Card */}
                                        <div className="mt-4 text-center border-2 border-dashed border-[#ff6fae] rounded-3xl py-4 px-3 bg-pink-50">
                                            <h3 className="text-lg sm:text-xl font-bold text-[#ff6fae] mb-1">{member.name}</h3>
                                            <p className="text-sm text-gray-600">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CSS for animations */}
            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
        </section>
    );
};

export default About;

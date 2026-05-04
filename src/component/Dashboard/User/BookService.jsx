"use client";

import React, { useState } from "react";

const services = [
  {
    id: "elderly",
    title: "Elderly Care",
    desc: "Professional care for seniors with daily activities, health monitoring and companionship.",
    price: "$15/hr",
    icon: "👴",
    color: "from-blue-50 to-blue-100 border-blue-200",
    activeColor: "from-blue-100 to-blue-200 border-blue-400",
  },
  {
    id: "baby",
    title: "Baby Sitting",
    desc: "Trusted, trained babysitters for infants and young children with safety-first approach.",
    price: "$12/hr",
    icon: "👶",
    color: "from-pink-50 to-pink-100 border-pink-200",
    activeColor: "from-pink-100 to-pink-200 border-[#ff6fae]",
  },
  {
    id: "patient",
    title: "Patient Care",
    desc: "Specialized assistance for patients recovering from illness or surgery at home.",
    price: "$18/hr",
    icon: "🏥",
    color: "from-green-50 to-green-100 border-green-200",
    activeColor: "from-green-100 to-green-200 border-green-500",
  },
  {
    id: "special",
    title: "Special Needs",
    desc: "Compassionate care tailored for individuals with special needs and unique requirements.",
    price: "$20/hr",
    icon: "💝",
    color: "from-purple-50 to-purple-100 border-purple-200",
    activeColor: "from-purple-100 to-purple-200 border-purple-500",
  },
];

const caregivers = [
  { id: 1, name: "Tanvir Hossain", specialty: "Elderly Care", rating: 4.9, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=60", available: true },
  { id: 2, name: "Maya Islam", specialty: "Baby Sitting", rating: 4.8, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60", available: true },
  { id: 3, name: "Sophie Rahman", specialty: "Patient Care", rating: 4.9, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&auto=format&fit=crop&q=60", available: false },
  { id: 4, name: "Ethan Karim", specialty: "Special Needs", rating: 4.7, image: "https://images.unsplash.com/photo-1592334873219-42ca023e48ce?w=200&auto=format&fit=crop&q=60", available: true },
];

export default function BookService() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({ service: null, caregiver: null, date: "", time: "", hours: 4, notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleBook = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">Your care service has been booked successfully. You'll receive a confirmation shortly.</p>
          <div className="rounded-xl bg-pink-50 border border-pink-200 p-4 text-left mb-6">
            <p className="text-sm font-semibold text-gray-700">Booking Summary</p>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Service: <span className="font-medium">{services.find(s => s.id === selected.service)?.title}</span></p>
              <p>Date: <span className="font-medium">{selected.date}</span></p>
              <p>Time: <span className="font-medium">{selected.time}</span></p>
              <p>Duration: <span className="font-medium">{selected.hours} hours</span></p>
            </div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setSelected({ service: null, caregiver: null, date: "", time: "", hours: 4, notes: "" }); }}
            className="w-full rounded-xl bg-[#ff6fae] py-3 text-white font-semibold hover:brightness-95 transition"
          >
            Book Another Service
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Book a Care Service</h1>
        <p className="text-gray-500 mt-1">Choose your service, caregiver, and schedule</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {["Choose Service", "Select Caregiver", "Schedule & Confirm"].map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-[#ff6fae] text-white" : "bg-gray-200 text-gray-500"}`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${step === i + 1 ? "text-[#ff6fae]" : "text-gray-500"}`}>{label}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-0.5 ${step > i + 1 ? "bg-[#ff6fae]" : "bg-gray-200"}`}></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Choose Service */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Select a Care Service</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setSelected(s => ({ ...s, service: svc.id }))}
                className={`text-left rounded-2xl border-2 p-5 bg-gradient-to-br transition hover:scale-[1.01] ${selected.service === svc.id ? svc.activeColor + " shadow-md" : svc.color}`}
              >
                <div className="text-3xl mb-2">{svc.icon}</div>
                <h3 className="font-bold text-gray-900">{svc.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{svc.desc}</p>
                <p className="text-sm font-bold text-[#ff6fae] mt-2">Starting from {svc.price}</p>
              </button>
            ))}
          </div>
          <button
            disabled={!selected.service}
            onClick={() => setStep(2)}
            className="w-full sm:w-auto rounded-xl bg-[#ff6fae] px-8 py-3 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-95 transition"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2: Select Caregiver */}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Choose a Caregiver</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {caregivers.map((cg) => (
              <button
                key={cg.id}
                onClick={() => cg.available && setSelected(s => ({ ...s, caregiver: cg.id }))}
                className={`text-left rounded-2xl border-2 p-4 bg-white transition ${selected.caregiver === cg.id ? "border-[#ff6fae] shadow-md" : "border-gray-100 hover:border-gray-200"} ${!cg.available ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <img src={cg.image} alt={cg.name} className="h-14 w-14 rounded-full object-cover"/>
                    <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${cg.available ? "bg-green-500" : "bg-gray-300"}`}></span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{cg.name}</p>
                    <p className="text-xs text-[#ff6fae] font-medium">{cg.specialty}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-xs font-bold text-gray-700">{cg.rating}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cg.available ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {cg.available ? "Available" : "Unavailable"}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="rounded-xl border border-gray-200 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition">
              ← Back
            </button>
            <button
              disabled={!selected.caregiver}
              onClick={() => setStep(3)}
              className="rounded-xl bg-[#ff6fae] px-8 py-3 text-white font-semibold disabled:opacity-50 hover:brightness-95 transition"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Schedule */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Schedule & Confirm</h2>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={selected.date}
                  onChange={e => setSelected(s => ({ ...s, date: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={selected.time}
                  onChange={e => setSelected(s => ({ ...s, time: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration: <span className="text-[#ff6fae] font-bold">{selected.hours} hours</span></label>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={selected.hours}
                  onChange={e => setSelected(s => ({ ...s, hours: Number(e.target.value) }))}
                  className="w-full accent-[#ff6fae]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1hr</span><span>6hr</span><span>12hr</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Notes</label>
                <textarea
                  rows={3}
                  value={selected.notes}
                  onChange={e => setSelected(s => ({ ...s, notes: e.target.value }))}
                  placeholder="Any specific instructions or requirements..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20 outline-none resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Service</span>
                  <span className="font-medium text-gray-900">{services.find(s => s.id === selected.service)?.title}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Caregiver</span>
                  <span className="font-medium text-gray-900">{caregivers.find(c => c.id === selected.caregiver)?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">{selected.date || "Not set"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900">{selected.hours} hours</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Rate</span>
                  <span className="font-medium text-gray-900">{services.find(s => s.id === selected.service)?.price}</span>
                </div>
                <div className="flex justify-between py-3 bg-pink-50 rounded-xl px-3 mt-2">
                  <span className="font-bold text-gray-900">Total Estimated</span>
                  <span className="font-bold text-[#ff6fae] text-lg">
                    ${parseInt(services.find(s => s.id === selected.service)?.price || "$0") * selected.hours}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="rounded-xl border border-gray-200 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition">
              ← Back
            </button>
            <button
              disabled={!selected.date || !selected.time}
              onClick={handleBook}
              className="rounded-xl bg-[#ff6fae] px-8 py-3 text-white font-semibold disabled:opacity-50 hover:brightness-95 transition shadow-lg shadow-pink-200"
            >
              Confirm Booking ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

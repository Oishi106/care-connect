"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandLogo from "../BrandLogo";

export default function CaregiverApplyPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [serviceType, setServiceType] = useState("Home Care");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role: "caregiver",
          phone,
          experience,
          serviceType,
          bio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Unable to submit caregiver application.");
        return;
      }

      setSuccessMessage("Application submitted successfully. Admin will review it from the caregivers dashboard.");
      router.push("/login");
    } catch {
      setErrorMessage("Unable to submit caregiver application right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-blue-50">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8">
        <div className="flex items-center justify-center lg:justify-start">
          <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center lg:justify-start">
              <BrandLogo width={190} height={66} />
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-10">
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#ab126b]">Caregiver Application</p>
                <h1 className="mt-2 text-3xl font-bold text-[#ab126b] sm:text-4xl">Apply to Join</h1>
                <p className="mt-2 text-gray-600">Submit your details here. Admin will review your application after you send it.</p>
              </div>

              {errorMessage && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="experience" className="mb-2 block text-sm font-medium text-gray-700">Experience (years)</label>
                    <input
                      id="experience"
                      type="number"
                      min="0"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceType" className="mb-2 block text-sm font-medium text-gray-700">Primary Service</label>
                  <select
                    id="serviceType"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                    required
                  >
                    <option>Home Care</option>
                    <option>Child Care</option>
                    <option>Elderly Care</option>
                    <option>Special Needs Care</option>
                    <option>Post Surgery Care</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bio" className="mb-2 block text-sm font-medium text-gray-700">Short Bio</label>
                  <textarea
                    id="bio"
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#ff6fae] focus:bg-white focus:ring-2 focus:ring-[#ff6fae]/20"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-linear-to-r from-[#ff6fae] to-[#ff8fc4] py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#ff6fae] hover:underline">
                  Back to login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] bg-linear-to-br from-[#ff6fae] to-[#ff8fc4] p-1 shadow-2xl shadow-pink-200">
            <div className="rounded-[1.9rem] bg-white p-6 sm:p-8">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1682089680688-d463fe6d45ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWxkJTIwY2FyZSUyMHNlcnZpY2luZyUyMHdvbWFufGVufDB8fDB8fHww"
                  alt="Caregiver application"
                  className="h-80 w-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Join as a Caregiver</h2>
                <p className="mt-2 text-gray-600">Share your details once. The admin team will review and approve your profile from the caregivers dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
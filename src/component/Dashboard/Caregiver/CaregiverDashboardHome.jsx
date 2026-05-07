"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const stats = [
  { label: "Pending Requests", value: "8", hint: "Awaiting your response" },
  { label: "Scheduled Visits", value: "14", hint: "This week" },
  { label: "Earnings", value: "$1,280", hint: "Current month" },
  { label: "Rating", value: "4.9", hint: "From 126 reviews" },
];

const quickActions = [
  { label: "Complete Profile", href: "/dashboard/caregiver/profile" },
  { label: "Set Availability", href: "/dashboard/caregiver/schedule" },
  { label: "View Applications", href: "/dashboard/caregiver/applications" },
  { label: "Open Messages", href: "/dashboard/caregiver/messages" },
];

export default function CaregiverDashboardHome() {
  const { data: session } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || "Caregiver";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="overflow-hidden rounded-3xl bg-linear-to-r from-[#ff6fae] to-[#ff8fc4] p-6 text-white shadow-xl shadow-pink-200/40 sm:p-8">
          <p className="text-sm font-medium text-white/85">Caregiver Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Welcome back, {firstName}</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Manage your availability, respond to families, and keep your caregiving profile ready for new bookings.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/dashboard/caregiver/profile" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#ab126b] transition hover:brightness-95">
              Complete Profile
            </Link>
            <Link href="/dashboard/caregiver/schedule" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Set Availability
            </Link>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-400">{stat.hint}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Today&apos;s Overview</h2>
                <p className="mt-1 text-sm text-gray-500">Your next steps to stay active and discoverable.</p>
              </div>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">Profile Under Review</span>
            </div>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">Complete your caregiver profile</p>
                <p className="mt-1 text-sm text-gray-600">Add certifications, service areas, and your preferred schedule so families can find you faster.</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-900">Respond to pending requests</p>
                <p className="mt-1 text-sm text-gray-600">Keep response times low to improve your visibility and booking conversion.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            <div className="mt-4 space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-[#ab126b]"
                >
                  <span>{action.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

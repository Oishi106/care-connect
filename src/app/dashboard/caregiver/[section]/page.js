import { notFound } from "next/navigation";

const sections = {
  applications: {
    title: "Applications",
    description: "Track caregiver applications and family requests in one place.",
  },
  schedule: {
    title: "Schedule",
    description: "Set your availability, working hours, and upcoming shifts.",
  },
  earnings: {
    title: "Earnings",
    description: "Monitor completed bookings, payouts, and monthly income.",
  },
  messages: {
    title: "Messages",
    description: "Chat with families and follow up on active care sessions.",
  },
  profile: {
    title: "Profile",
    description: "Update your bio, certifications, service coverage, and contact details.",
  },
  settings: {
    title: "Settings",
    description: "Manage account preferences, notifications, and privacy options.",
  },
};

export default function CaregiverSectionPage({ params }) {
  const section = sections[params.section];

  if (!section) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">
          Caregiver Dashboard
        </span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">{section.title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600">{section.description}</p>
        <div className="mt-8 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          This area is ready for your caregiver workflows. You can add forms, tables, and request management here next.
        </div>
      </div>
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const availability = [
  { day: "Mon", slots: "8:00 AM - 2:00 PM" },
  { day: "Tue", slots: "10:00 AM - 6:00 PM" },
  { day: "Wed", slots: "9:00 AM - 5:00 PM" },
  { day: "Thu", slots: "8:00 AM - 4:00 PM" },
  { day: "Fri", slots: "12:00 PM - 8:00 PM" },
  { day: "Sat", slots: "Off" },
  { day: "Sun", slots: "Off" },
];

export default async function CaregiverSchedulePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.role !== "caregiver") {
    redirect(session.user.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">Caregiver Dashboard</span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Schedule</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">Set your availability and show families when you are ready for bookings.</p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#ab126b]">Weekly availability</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">This week</h2>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Open for requests</span>
            </div>
            <div className="mt-5 space-y-3">
              {availability.map((item) => (
                <div key={item.day} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="text-sm font-semibold text-gray-900">{item.day}</span>
                  <span className="text-sm text-gray-600">{item.slots}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-[#ab126b]">Quick controls</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">Availability status</p>
                  <p className="mt-1 text-sm text-gray-600">Toggle whether you are accepting new bookings.</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">Preferred shift</p>
                  <p className="mt-1 text-sm text-gray-600">Morning, afternoon, evening, or overnight slots.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-[#ab126b]">Tip</p>
              <p className="mt-2 text-sm text-gray-600">Keep your schedule updated so families can book you faster and reduce approval delays.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

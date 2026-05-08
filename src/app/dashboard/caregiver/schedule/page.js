import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

function formatDateLabel(value) {
  if (!value) return "TBD";
  const date = new Date(value);
  return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

function formatTimeLabel(value) {
  return value || "TBD";
}

export default async function CaregiverSchedulePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.role !== "caregiver") {
    redirect(session.user.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
  }

  const client = await clientPromise;
  const db = client.db();
  const bookingsCollection = db.collection("bookings");

  const caregiverBookings = await bookingsCollection
    .find({
      $or: [
        { caregiverEmail: session.user.email.toLowerCase() },
        { caregiverName: session.user.name },
      ],
    })
    .sort({ createdAt: -1 })
    .toArray();

  const upcomingBookings = caregiverBookings.filter((booking) => {
    const bookingDate = booking.date ? new Date(booking.date) : null;
    if (!bookingDate || Number.isNaN(bookingDate.getTime())) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    const dayBookings = caregiverBookings.filter((booking) => String(booking.date || "").slice(0, 10) === key);
    return {
      day: dayNames[date.getDay()],
      label: date.toLocaleDateString([], { month: "short", day: "numeric" }),
      count: dayBookings.length,
      slots: dayBookings.length > 0 ? `${dayBookings.length} booking${dayBookings.length > 1 ? "s" : ""}` : "Open",
    };
  });

  const busyDays = week.filter((item) => item.count > 0).length;
  const totalHours = caregiverBookings.reduce((sum, booking) => sum + Number(booking.hours || 0), 0);
  const confirmedCount = caregiverBookings.filter((booking) => booking.status === "Confirmed").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">Caregiver Dashboard</span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Schedule</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">See your real booking load for the week and what is already on your calendar.</p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Upcoming bookings</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{upcomingBookings.length}</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Busy days this week</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{busyDays}</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Confirmed jobs</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{confirmedCount}</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Booked hours</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{totalHours}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#ab126b]">Weekly availability</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">This week</h2>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Live bookings</span>
            </div>
            <div className="mt-5 space-y-3">
              {week.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{item.day}</span>
                    <p className="text-xs text-gray-400">{item.label}</p>
                  </div>
                  <span className={`text-sm font-medium ${item.count > 0 ? "text-[#ff6fae]" : "text-gray-600"}`}>{item.slots}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-[#ab126b]">Upcoming sessions</p>
              <div className="mt-4 space-y-3">
                {upcomingBookings.length === 0 ? (
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-900">No upcoming sessions yet</p>
                    <p className="mt-1 text-sm text-gray-600">New bookings will appear here automatically.</p>
                  </div>
                ) : (
                  upcomingBookings.slice(0, 4).map((booking) => (
                    <div key={booking._id?.toString?.() || booking._id} className="rounded-2xl bg-gray-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{booking.userName || "Client"}</p>
                          <p className="mt-1 text-sm text-gray-600">{booking.serviceTitle || "Service"}</p>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${booking.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{booking.status || "Pending"}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span>{formatDateLabel(booking.date)}</span>
                        <span>·</span>
                        <span>{formatTimeLabel(booking.time)}</span>
                        <span>·</span>
                        <span>{Number(booking.hours || 0)} hr</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-[#ab126b]">Tip</p>
              <p className="mt-2 text-sm text-gray-600">Keep an eye on your upcoming bookings here. This view is now powered by real booking records from MongoDB.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

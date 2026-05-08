import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value) {
  return `$${toNumber(value).toFixed(0)}`;
}

export default async function CaregiverEarningsPage() {
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

  const paidBookings = caregiverBookings.filter((booking) => String(booking.paymentStatus || "").toLowerCase() === "paid" || booking.status === "Confirmed");
  const pendingBookings = caregiverBookings.filter((booking) => String(booking.paymentStatus || "").toLowerCase() !== "paid" && booking.status !== "Cancelled");

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthPaid = paidBookings.filter((booking) => {
    const date = new Date(booking.createdAt || booking.date || new Date());
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const thisMonthEarnings = thisMonthPaid.reduce((sum, booking) => sum + toNumber(booking.totalPrice), 0);
  const pendingPayouts = pendingBookings.reduce((sum, booking) => sum + toNumber(booking.totalPrice), 0);
  const completedJobs = paidBookings.length;
  const avgRate = paidBookings.length > 0
    ? paidBookings.reduce((sum, booking) => sum + (toNumber(booking.totalPrice) / Math.max(toNumber(booking.hours) || 1, 1)), 0) / paidBookings.length
    : 0;

  const recentTransactions = caregiverBookings.slice(0, 6).map((booking) => ({
    id: booking._id?.toString?.() || booking._id,
    client: booking.userName || "Client",
    service: booking.serviceTitle || "Service",
    amount: formatMoney(booking.totalPrice),
    status: String(booking.paymentStatus || "").toLowerCase() === "paid" || booking.status === "Confirmed" ? "Paid" : "Pending",
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">Caregiver Dashboard</span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Earnings</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">Track your payouts and completed jobs using real booking records from MongoDB.</p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "This Month", value: formatMoney(thisMonthEarnings) },
            { label: "Completed Jobs", value: String(completedJobs) },
            { label: "Pending Payouts", value: formatMoney(pendingPayouts) },
            { label: "Avg. Rate", value: formatMoney(avgRate) + "/hr" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#ab126b]">Recent transactions</p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">Payment activity</h2>
            </div>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">{pendingBookings.length} pending</span>
          </div>
          <div className="mt-5 space-y-3">
            {recentTransactions.length === 0 ? (
              <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-500">No transactions yet.</div>
            ) : (
              recentTransactions.map((tx) => (
                <div key={tx.id} className="flex flex-col gap-3 rounded-2xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{tx.client}</p>
                    <p className="text-sm text-gray-600">{tx.service}</p>
                    <p className="mt-1 text-xs text-gray-400">{String(tx.id).slice(-8)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{tx.amount}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tx.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

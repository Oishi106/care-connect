import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const stats = [
  { label: "This Month", value: "$1,280" },
  { label: "Completed Jobs", value: "14" },
  { label: "Pending Payouts", value: "$240" },
  { label: "Avg. Rating", value: "4.9" },
];

const transactions = [
  { id: "BK1024", client: "Rahim Karim", service: "Elderly Care", amount: "$120", status: "Paid" },
  { id: "BK1028", client: "Nadia Sultana", service: "Child Care", amount: "$80", status: "Paid" },
  { id: "BK1031", client: "Afsana Islam", service: "Night Care", amount: "$160", status: "Pending" },
];

export default async function CaregiverEarningsPage() {
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
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Earnings</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">Track your payouts, completed jobs, and monthly income in one place.</p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
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
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">1 pending payout</span>
          </div>
          <div className="mt-5 space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex flex-col gap-3 rounded-2xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{tx.id}</p>
                  <p className="text-sm text-gray-600">{tx.client} · {tx.service}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">{tx.amount}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tx.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

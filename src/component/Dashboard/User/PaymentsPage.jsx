"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const statusColors = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  refunded: "bg-blue-100 text-blue-700",
  failed: "bg-red-100 text-red-700",
};

function normalizePaymentRecord(record) {
  const amount = Number(record.amount ?? record.totalPrice ?? 0);
  const status = String(record.status || record.paymentStatus || "paid").toLowerCase();

  return {
    id: record._id || record.id || record.stripeSessionId || `${record.serviceTitle || "payment"}-${record.createdAt || amount}`,
    serviceTitle: record.serviceTitle || record.service || "Care Service",
    createdAt: record.createdAt || record.paidAt || record.updatedAt || null,
    amount,
    status,
    method: record.method || record.paymentMethod || (record.stripeSessionId ? "Stripe" : "—"),
    stripeSessionId: record.stripeSessionId || record.sessionId || "",
  };
}

export default function PaymentsPage() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user?.email) return;

    let isMounted = true;

    const loadPaymentHistory = async () => {
      try {
        const [paymentsResponse, bookingsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments?email=${session.user.email}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${session.user.email}`),
        ]);

        const paymentsData = paymentsResponse.ok ? await paymentsResponse.json() : [];
        const bookingsData = bookingsResponse.ok ? await bookingsResponse.json() : [];

        const paymentRecords = Array.isArray(paymentsData) ? paymentsData.map(normalizePaymentRecord) : [];
        const bookingRecords = Array.isArray(bookingsData)
          ? bookingsData
              .filter(booking => booking.paymentStatus === "paid")
              .map(booking => normalizePaymentRecord({
                _id: booking._id,
                serviceTitle: booking.serviceTitle,
                amount: booking.totalPrice,
                status: booking.paymentStatus || booking.status,
                createdAt: booking.createdAt || booking.updatedAt,
                method: booking.paymentMethod || "Stripe",
                stripeSessionId: booking.stripeSessionId,
              }))
          : [];

        const combined = [...paymentRecords, ...bookingRecords].sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        });

        if (isMounted) {
          setPayments(combined);
          setError("");
        }
      } catch {
        if (isMounted) {
          setPayments([]);
          setError("Unable to load payment history right now. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPaymentHistory();

    return () => {
      isMounted = false;
    };
  }, [session?.user?.email]);

  const totalSpent = payments.filter(p => p.status === "paid").reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const pending = payments.filter(p => p.status === "pending").reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const refunded = payments.filter(p => p.status === "refunded").reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const thisMonth = payments.filter(p => {
    if (!p.createdAt) return false;
    const d = new Date(p.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && p.status === "paid";
  }).reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 text-sm mt-1">Your payment history from Stripe and paid bookings</p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Spent", value: `$${totalSpent.toFixed(0)}`, icon: "💰", color: "from-[#ff6fae] to-[#ff8fc4]" },
          { label: "This Month", value: `$${thisMonth.toFixed(0)}`, icon: "📅", color: "from-blue-400 to-blue-500" },
          { label: "Pending", value: `$${pending.toFixed(0)}`, icon: "⏳", color: "from-yellow-400 to-yellow-500" },
          { label: "Refunded", value: `$${refunded.toFixed(0)}`, icon: "↩️", color: "from-purple-400 to-purple-500" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${s.color} text-lg mb-3`}>{s.icon}</div>
            <p className="text-xl font-bold text-gray-900">{loading ? "..." : s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Transaction History</h2>

        {loading ? (
          <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse"/>)}</div>
        ) : payments.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">💳</p>
            <p className="font-medium">No payments yet</p>
            <p className="text-sm mt-1">Your Stripe transactions will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-gray-500 font-medium">Service</th>
                  <th className="text-left py-3 text-gray-500 font-medium hidden sm:table-cell">Date</th>
                  <th className="text-left py-3 text-gray-500 font-medium hidden md:table-cell">Payment ID</th>
                  <th className="text-left py-3 text-gray-500 font-medium">Status</th>
                  <th className="text-right py-3 text-gray-500 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((tx, i) => (
                  <tr key={tx.id || i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 text-gray-800 font-medium">{tx.serviceTitle}</td>
                    <td className="py-3 text-gray-500 hidden sm:table-cell text-xs">
                      {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3 text-gray-400 font-mono text-xs hidden md:table-cell">
                      {tx.stripeSessionId ? tx.stripeSessionId.slice(0, 20) + "..." : "—"}
                    </td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[tx.status] || "bg-gray-100 text-gray-600"}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-bold text-gray-900">${Number(tx.amount || 0).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
        <span className="text-blue-500 text-lg shrink-0">ℹ️</span>
        <div>
          <p className="text-sm font-semibold text-blue-800">Stripe Payments</p>
          <p className="text-xs text-blue-600 mt-0.5">All payments are processed securely via Stripe. You can view your full payment history and receipts in your Stripe dashboard.</p>
        </div>
      </div>
    </div>
  );
}
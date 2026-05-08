"use client";

import React, { useEffect, useMemo, useState } from "react";

const statusColors = {
  paid: "bg-green-100 text-green-700",
  refunded: "bg-blue-100 text-blue-700",
  failed: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

function parseAmount(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const parsed = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeStatus(value) {
  const status = String(value || "paid").trim().toLowerCase();

  if (["completed", "confirmed", "success", "succeeded", "paid"].includes(status)) {
    return "paid";
  }

  if (["refund", "refunded"].includes(status)) {
    return "refunded";
  }

  if (["pending", "processing", "incomplete"].includes(status)) {
    return "pending";
  }

  if (["failed", "cancelled", "canceled", "rejected"].includes(status)) {
    return "failed";
  }

  return status || "paid";
}

function normalizePaymentRecord(record) {
  const amount = parseAmount(record.amount ?? record.totalPrice ?? record.price ?? record.totalAmount ?? 0);
  const status = normalizeStatus(record.status || record.paymentStatus || "paid");

  return {
    id: record._id || record.id || record.stripeSessionId || `${record.serviceTitle || "payment"}-${record.createdAt || amount}`,
    userEmail: record.userEmail || record.email || record.customerEmail || record.user?.email || "—",
    userName: record.userName || record.customerName || record.name || record.user?.name || "—",
    serviceTitle: record.serviceTitle || record.service || "Care Service",
    createdAt: record.createdAt || record.paidAt || record.updatedAt || null,
    amount,
    status,
    method: record.method || record.paymentMethod || (record.stripeSessionId ? "Stripe" : "—"),
    stripeSessionId: record.stripeSessionId || record.sessionId || "",
  };
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadPayments = async () => {
      try {
        const response = await fetch("/api/admin/payments", { cache: "no-store" });
        const data = response.ok ? await response.json() : [];

        if (!isMounted) {
          return;
        }

        setPayments(Array.isArray(data) ? data.map(normalizePaymentRecord) : []);
        setLastUpdated(new Date());
      } catch {
        if (isMounted) {
          setPayments([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPayments();

    const intervalId = setInterval(loadPayments, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const filteredPayments = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch = !searchValue || [payment.userEmail, payment.userName, payment.serviceTitle, payment.stripeSessionId, payment.method]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(searchValue));
      const matchesStatus = statusFilter === "all" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const sumPayments = (records) => records.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const isCurrentMonth = (payment) => {
    if (!payment.createdAt) return false;

    const date = new Date(payment.createdAt);
    const now = new Date();

    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };

  const totalRevenue = sumPayments(payments.filter((payment) => payment.status === "paid"));
  const totalRefunded = sumPayments(payments.filter((payment) => payment.status === "refunded"));
  const pendingAmount = sumPayments(payments.filter((payment) => payment.status === "pending"));
  const thisMonth = sumPayments(payments.filter(isCurrentMonth));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 text-sm mt-1">All paid user history and Stripe-linked transactions</p>
        </div>
        <p className="text-xs text-gray-400">
          {loading ? "Syncing..." : `Last updated ${lastUpdated ? lastUpdated.toLocaleTimeString() : "just now"}`}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: `$${totalRevenue.toFixed(0)}`, color: "text-[#ff6fae]" },
          { label: "This Month", value: `$${thisMonth.toFixed(0)}`, color: "text-green-600" },
          { label: "Pending", value: `$${pendingAmount.toFixed(0)}`, color: "text-yellow-600" },
          { label: "Refunded", value: `$${totalRefunded.toFixed(0)}`, color: "text-blue-600" },
        ].map((summary, index) => (
          <div key={index} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className={`text-2xl font-bold ${summary.color}`}>{loading ? "..." : summary.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{summary.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by user, service, session ID or method..."
            className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"
        >
          <option value="all">All statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="refunded">Refunded</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["User", "Service", "Session ID", "Date", "Status", "Amount"].map((header) => (
                  <th key={header} className="text-left px-5 py-3 text-gray-500 font-medium text-xs">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index}><td colSpan={6} className="px-5 py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>
                ))
              ) : filteredPayments.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">No payments found</td></tr>
              ) : (
                filteredPayments.map((payment, index) => (
                  <tr key={payment.id || payment._id || index} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-5 py-3 text-gray-700 text-xs">
                      <div className="font-medium text-gray-900">{payment.userName}</div>
                      <div className="text-[11px] text-gray-500">{payment.userEmail}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600 text-xs">{payment.serviceTitle || "—"}</td>
                    <td className="px-5 py-3 font-mono text-gray-400 text-xs">
                      {payment.stripeSessionId ? payment.stripeSessionId.slice(0, 20) + "..." : "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[payment.status] || "bg-gray-100 text-gray-600"}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-bold text-gray-900">${payment.amount || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
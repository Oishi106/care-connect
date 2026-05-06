"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const statusColors = { Confirmed: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Cancelled: "bg-red-100 text-red-700", Completed: "bg-blue-100 text-blue-700" };

function normalizeBooking(booking) {
  const hours = Number(booking.hours || 1);
  const totalPrice = Number(booking.totalPrice ?? booking.price ?? 0);

  return {
    ...booking,
    hours,
    totalPrice,
    serviceTitle: booking.serviceTitle || booking.service || "Care Service",
    caregiverName: booking.caregiverName || booking.caregiver || "",
    paymentStatus: booking.paymentStatus || booking.payment?.status || "unpaid",
  };
}

export default function BookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [filter, setFilter] = useState("All");
  const tabs = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];

  useEffect(() => {
    if (!session?.user?.email) return;

    let isMounted = true;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${session.user.email}`)
      .then(r => {
        if (!r.ok) {
          throw new Error("Unable to load bookings.");
        }

        return r.json();
      })
      .then(data => {
        if (!isMounted) return;
        const list = Array.isArray(data) ? data.map(normalizeBooking) : [];
        setBookings(list);
        setError("");
      })
      .catch(() => {
        if (!isMounted) return;
        setBookings([]);
        setError("Unable to load your bookings right now. Please try again.");
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [session?.user?.email]);

  const cancelBooking = async (id) => {
    try {
      setUpdatingId(id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!response.ok) {
        throw new Error("Unable to cancel this booking.");
      }

      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: "Cancelled" } : b));
    } catch (error) {
      setError(error.message || "Unable to cancel this booking.");
    } finally {
      setUpdatingId("");
    }
  };

  const payBooking = async (booking) => {
    try {
      setUpdatingId(booking._id);
      setError("");

      const stripeResponse = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: booking.serviceTitle,
          priceLabel: `$${booking.totalPrice || 0}`,
          hours: booking.hours || 1,
          bookingId: booking._id,
          successPath: `/payment/success?booking_id=${booking._id}`,
          cancelPath: "/payment/cancel",
        }),
      });

      const stripeData = await stripeResponse.json();

      if (!stripeResponse.ok || !stripeData.url) {
        throw new Error(stripeData.error || "Unable to start Stripe checkout.");
      }

      window.location.href = stripeData.url;
    } catch (error) {
      setError(error.message || "Unable to start Stripe checkout.");
    } finally {
      setUpdatingId("");
    }
  };

  const filtered = filter === "All" ? bookings : bookings.filter(b => b.status === filter);
  const paidBookings = bookings.filter(b => b.paymentStatus === "paid");
  const pendingBookings = bookings.filter(b => b.status === "Pending");
  const totalSpent = paidBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
  const pendingTotal = pendingBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
  const confirmedCount = bookings.filter(b => b.status === "Confirmed").length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? "Loading..." : `${bookings.length} bookings · ${pendingBookings.length} pending · $${totalSpent.toFixed(0)} paid`}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              if (!session?.user?.email) return;
              setLoading(true);
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${session.user.email}`)
                .then(r => r.json())
                .then(data => setBookings(Array.isArray(data) ? data.map(normalizeBooking) : []))
                .catch(() => setError("Unable to refresh bookings right now."))
                .finally(() => setLoading(false));
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Refresh
          </button>
          <Link href="/dashboard/user/book" className="inline-flex items-center gap-2 rounded-xl bg-[#ff6fae] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 transition">
            + New Booking
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Upcoming / Pending</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{pendingBookings.length}</p>
          <p className="text-xs text-gray-400 mt-1">${pendingTotal.toFixed(0)} awaiting payment</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{confirmedCount}</p>
          <p className="text-xs text-gray-400 mt-1">Ready for service</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Paid via Stripe</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">${totalSpent.toFixed(0)}</p>
          <p className="text-xs text-gray-400 mt-1">All confirmed checkout sessions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === tab ? "bg-[#ff6fae] text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6fae] hover:text-[#ff6fae]"}`}>
            {tab}
            {tab !== "All" && !loading && (
              <span className="ml-1.5 text-xs opacity-70">({bookings.filter(b => b.status === tab).length})</span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-white animate-pulse border border-gray-100"/>)
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-medium">No {filter !== "All" ? filter.toLowerCase() : ""} bookings found</p>
            <Link href="/dashboard/user/book" className="mt-3 inline-block text-sm font-semibold text-[#ff6fae] hover:underline">Book a service →</Link>
          </div>
        ) : (
          filtered.map(booking => (
            <div key={booking._id} className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-[#ff6fae]/10 flex items-center justify-center text-[#ff6fae] font-bold text-2xl shrink-0">
                  {booking.serviceTitle?.[0] || "C"}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400 font-mono">{booking._id?.slice(-8)}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[booking.status]}`}>{booking.status}</span>
                    {booking.paymentStatus === "paid" && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">✓ Paid</span>
                    )}
                    {booking.paymentStatus !== "paid" && booking.status === "Pending" && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">Draft</span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">{booking.serviceTitle}</h3>
                  {booking.caregiverName && <p className="text-sm text-[#ff6fae] font-medium">{booking.caregiverName}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    {booking.date && `${booking.date}`}{booking.time && ` · ${booking.time}`}{booking.hours && ` · ${booking.hours} hrs`}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xl font-bold text-gray-900">${booking.totalPrice.toFixed(0)}</p>
                  <div className="flex gap-2 mt-2 sm:justify-end">
                    {booking.status === "Pending" && (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        disabled={updatingId === booking._id}
                        className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition disabled:opacity-60"
                      >
                        {updatingId === booking._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                    {booking.paymentStatus === "paid" && (booking.status === "Completed" || booking.status === "Confirmed") && (
                      <Link href={`/dashboard/user/reviews`} className="text-xs text-[#ff6fae] border border-pink-200 px-3 py-1 rounded-full hover:bg-pink-50 transition">
                        Review
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
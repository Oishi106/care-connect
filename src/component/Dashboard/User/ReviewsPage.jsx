"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function normalizeBooking(booking) {
  return {
    id: booking._id || booking.id,
    caregiver: booking.caregiverName || booking.caregiver || "Caregiver",
    service: booking.serviceTitle || booking.service || "Care Service",
    date: booking.date || "",
    status: booking.status || "Pending",
    paymentStatus: booking.paymentStatus || "unpaid",
  };
}

function getStorageKey(email) {
  return `careconnect:reviews:${email}`;
}

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalId, setModalId] = useState(null);
  const [star, setStar] = useState(0);
  const [text, setText] = useState("");
  const [reviewsByBookingId, setReviewsByBookingId] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user?.email) {
      setLoading(false);
      setBookings([]);
      setReviewsByBookingId({});
      return;
    }

    let mounted = true;

    const loadReviews = async () => {
      try {
        const bookingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${session.user.email}`);
        const bookingData = bookingResponse.ok ? await bookingResponse.json() : [];
        const reviewable = Array.isArray(bookingData)
          ? bookingData
              .map(normalizeBooking)
              .filter(booking => booking.paymentStatus === "paid" && (booking.status === "Completed" || booking.status === "Confirmed"))
          : [];

        const stored = window.localStorage.getItem(getStorageKey(session.user.email));
        const parsedStored = stored ? JSON.parse(stored) : {};

        if (mounted) {
          setBookings(reviewable);
          setReviewsByBookingId(parsedStored);
          setError("");
        }
      } catch {
        if (mounted) {
          setBookings([]);
          setError("Unable to load reviews right now. Please try again.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      mounted = false;
    };
  }, [session?.user?.email]);

  const completedCount = bookings.length;
  const reviewedCount = useMemo(() => Object.keys(reviewsByBookingId).length, [reviewsByBookingId]);
  const averageRating = useMemo(() => {
    const ratings = Object.values(reviewsByBookingId).map(review => review.rating).filter(Boolean);
    if (!ratings.length) return 0;
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  }, [reviewsByBookingId]);

  const submitReview = () => {
    if (!session?.user?.email || !modalId || !star || !text.trim()) return;

    const nextReviews = {
      ...reviewsByBookingId,
      [modalId]: {
        rating: star,
        review: text.trim(),
        updatedAt: new Date().toISOString(),
      },
    };

    window.localStorage.setItem(getStorageKey(session.user.email), JSON.stringify(nextReviews));
    setReviewsByBookingId(nextReviews);
    setModalId(null);
    setStar(0);
    setText("");
  };

  const selectedBooking = bookings.find(booking => booking.id === modalId);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
          <p className="text-gray-500 text-sm mt-1">Rate and review completed bookings</p>
        </div>
        <Link href="/dashboard/user/bookings" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
          View Bookings
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Completed bookings</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{loading ? "..." : completedCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Reviews written</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{loading ? "..." : reviewedCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Average rating</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{loading ? "..." : (averageRating ? averageRating.toFixed(1) : "0.0")}</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-28 rounded-2xl bg-white border border-gray-100 animate-pulse" />)}
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
          <p className="text-3xl mb-2">⭐</p>
          <p className="font-medium">No completed bookings to review yet.</p>
          <Link href="/dashboard/user/book" className="mt-3 inline-block text-sm font-semibold text-[#ff6fae] hover:underline">Book a service →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const review = reviewsByBookingId[booking.id];

            return (
              <div key={booking.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-pink-50 to-rose-100 text-xl">
                    {booking.service[0] || "C"}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{booking.caregiver}</p>
                    <p className="text-sm text-[#ff6fae]">{booking.service}</p>
                    <p className="text-xs text-gray-400">{booking.date || "Date unavailable"}</p>
                  </div>
                  {review ? (
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">✓ Reviewed</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setModalId(booking.id)}
                      className="rounded-xl bg-[#ff6fae] px-4 py-2 text-sm font-semibold text-white hover:brightness-95 transition"
                    >
                      Write Review
                    </button>
                  )}
                </div>

                {review && (
                  <div className="mt-4 rounded-xl bg-pink-50 p-4">
                    <div className="mb-2 flex gap-0.5">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className={`text-lg ${index < review.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                      ))}
                    </div>
                    <p className="text-sm italic text-gray-700">"{review.review}"</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {modalId && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-1 text-lg font-bold text-gray-900">Write a Review</h3>
            <p className="mb-4 text-sm text-gray-500">{selectedBooking.caregiver} · {selectedBooking.service}</p>

            <div className="mb-4 flex gap-2">
              {[1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStar(value)}
                  className={`text-3xl transition ${value <= star ? "text-yellow-400" : "text-gray-200"}`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Share your experience..."
              className="mb-4 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#ff6fae] focus:outline-none"
            />

            <div className="flex gap-3">
              <button onClick={() => setModalId(null)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={submitReview} disabled={!star || !text.trim()} className="flex-1 rounded-xl bg-[#ff6fae] py-2.5 text-sm font-semibold text-white disabled:opacity-50 hover:brightness-95 transition">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

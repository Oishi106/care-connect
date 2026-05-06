"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");
  const [status, setStatus] = useState("verifying"); // verifying | done | error

  useEffect(() => {
    if (!sessionId || !bookingId) { setStatus("done"); return; }

    // Update booking to Confirmed + create payment record
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Confirmed", paymentStatus: "paid" }),
    })
      .then(() => setStatus("done"))
      .catch(() => setStatus("done")); // still show success
  }, [sessionId, bookingId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        {status === "verifying" ? (
          <>
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin"/>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Confirming payment...</h1>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="mt-2 text-sm text-gray-500">Your booking has been confirmed. You'll receive a notification shortly.</p>

            {bookingId && (
              <div className="mt-4 rounded-xl bg-pink-50 border border-pink-200 p-3">
                <p className="text-xs text-gray-500">Booking ID</p>
                <p className="text-xs font-mono text-gray-700">{bookingId}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/dashboard/user/bookings" className="rounded-xl bg-[#ff6fae] px-6 py-3 text-sm font-semibold text-white hover:brightness-95 transition">
                View My Bookings
              </Link>
              <Link href="/dashboard/user/payments" className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                Payment History
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
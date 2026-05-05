import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Payment successful</h1>
        <p className="mt-2 text-sm text-gray-600">Your Stripe payment has been completed successfully.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/dashboard/user/payments" className="rounded-xl bg-[#ff6fae] px-5 py-3 text-sm font-semibold text-white hover:brightness-95">
            View payments
          </Link>
          <Link href="/service" className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Back to services
          </Link>
        </div>
      </div>
    </div>
  );
}
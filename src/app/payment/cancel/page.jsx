import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
          ×
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Payment canceled</h1>
        <p className="mt-2 text-sm text-gray-600">You can try again whenever you are ready.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/service" className="rounded-xl bg-[#ff6fae] px-5 py-3 text-sm font-semibold text-white hover:brightness-95">
            Try again
          </Link>
          <Link href="/" className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CaregiverProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.role !== "caregiver") {
    redirect(session.user.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">Caregiver Dashboard</span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">Update your caregiver information, certifications, and service coverage.</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
            <input defaultValue={session.user.name || ""} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
            <input defaultValue={session.user.email || ""} disabled className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Phone</label>
            <input placeholder="Add phone number" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Service Type</label>
            <input placeholder="Home Care, Elderly Care..." className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">Bio</label>
          <textarea rows="5" placeholder="Tell families about your background and experience" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
        </div>

        <button type="button" className="mt-6 rounded-xl bg-[#ff6fae] px-5 py-3 text-sm font-semibold text-white">
          Save Profile
        </button>
      </div>
    </div>
  );
}

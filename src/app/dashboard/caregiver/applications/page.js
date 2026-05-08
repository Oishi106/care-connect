import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

const statusMeta = {
  pending: {
    label: "Pending Review",
    tone: "bg-yellow-100 text-yellow-700",
    note: "Your application is waiting for admin approval.",
  },
  approved: {
    label: "Approved",
    tone: "bg-green-100 text-green-700",
    note: "Your caregiver profile is active and visible to the team.",
  },
  rejected: {
    label: "Rejected",
    tone: "bg-red-100 text-red-700",
    note: "Your application was rejected. You can update your profile and reapply.",
  },
};

export default async function CaregiverApplicationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const client = await clientPromise;
  const user = await client
    .db()
    .collection("users")
    .findOne({ email: session.user.email, role: "caregiver" });

  if (!user) {
    redirect("/login");
  }

  const status = user.applicationStatus || "pending";
  const meta = statusMeta[status] || statusMeta.pending;
  const submittedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently";
  const approvedDate = user.approvedAt ? new Date(user.approvedAt).toLocaleDateString() : null;
  const rejectedDate = user.rejectedAt ? new Date(user.rejectedAt).toLocaleDateString() : null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">
            Caregiver Dashboard
          </span>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600">
                Track your caregiver application and see the current approval status.
              </p>
            </div>
            <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${meta.tone}`}>
              {meta.label}
            </span>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#ab126b]">Application summary</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">{user.name || "Caregiver"}</h2>
                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Submitted {submittedDate}</span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Phone</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{user.phone || "Not provided"}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Service Type</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{user.serviceType || "Not provided"}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Experience</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{user.experience || "0"} years</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Current Status</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{meta.label}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Bio</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{user.bio || "No bio submitted."}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-[#ab126b]">What this means</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{meta.note}</p>
              <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                If you need to update your profile, use the profile section after your application is approved.
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-[#ab126b]">Timeline</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-3 w-3 rounded-full bg-[#ff6fae]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Application submitted</p>
                    <p className="text-xs text-gray-500">{submittedDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-3 w-3 rounded-full bg-gray-300" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Admin review</p>
                    <p className="text-xs text-gray-500">Waiting for confirmation</p>
                  </div>
                </div>
                {approvedDate && (
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-green-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Approved</p>
                      <p className="text-xs text-gray-500">{approvedDate}</p>
                    </div>
                  </div>
                )}
                {rejectedDate && (
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-red-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Rejected</p>
                      <p className="text-xs text-gray-500">{rejectedDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

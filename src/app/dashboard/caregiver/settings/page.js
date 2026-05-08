import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const settings = [
  { label: "Email notifications", description: "Receive booking and message alerts", enabled: true },
  { label: "SMS reminders", description: "Get shift reminders by text message", enabled: false },
  { label: "Public profile", description: "Show your profile in caregiver search", enabled: true },
];

export default async function CaregiverSettingsPage() {
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
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">Manage your notification preferences and visibility options.</p>

        <div className="mt-6 space-y-4">
          {settings.map((setting) => (
            <div key={setting.label} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">{setting.label}</p>
                <p className="mt-1 text-sm text-gray-600">{setting.description}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${setting.enabled ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                {setting.enabled ? "On" : "Off"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

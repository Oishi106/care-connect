import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const conversations = [
  { name: "Nadia Islam", service: "Child Care", last: "Can you come at 5 PM?", time: "2m ago" },
  { name: "Rahim Karim", service: "Elderly Care", last: "Thank you for the update.", time: "18m ago" },
  { name: "Afsana Islam", service: "Night Care", last: "Please confirm tomorrow.", time: "1h ago" },
];

export default async function CaregiverMessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.role !== "caregiver") {
    redirect(session.user.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">Caregiver Dashboard</span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Messages</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">Review recent conversations with families and keep your responses organized.</p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="relative mb-4">
              <input
                placeholder="Search conversations..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]"
              />
            </div>
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <button
                  key={conversation.name}
                  className="w-full rounded-2xl border border-gray-100 bg-white p-4 text-left transition hover:border-pink-200 hover:bg-pink-50"
                  type="button"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{conversation.name}</p>
                      <p className="text-xs text-gray-500">{conversation.service}</p>
                    </div>
                    <span className="text-xs text-gray-400">{conversation.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{conversation.last}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <p className="font-semibold text-gray-900">Nadia Islam</p>
                <p className="text-xs text-gray-500">Child Care · Active</p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Online</span>
            </div>
            <div className="mt-5 space-y-4">
              <div className="max-w-xl rounded-2xl bg-gray-50 p-4">
                <p className="text-sm text-gray-700">Can you come at 5 PM today?</p>
              </div>
              <div className="ml-auto max-w-xl rounded-2xl bg-[#ff6fae] p-4 text-white">
                <p className="text-sm">Yes, I can confirm 5 PM. I will arrive a little early.</p>
              </div>
              <div className="max-w-xl rounded-2xl bg-gray-50 p-4">
                <p className="text-sm text-gray-700">Perfect, thank you!</p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
              <input
                placeholder="Type a reply..."
                className="min-h-11 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]"
              />
              <button className="rounded-2xl bg-[#ff6fae] px-5 py-3 text-sm font-semibold text-white" type="button">
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

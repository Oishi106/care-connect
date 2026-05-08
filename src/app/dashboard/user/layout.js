import UserSidebar from "@/component/Dashboard/User/UserSidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "User Dashboard - CareConnect",
  description: "Manage your care bookings and profile",
};

export default async function UserDashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user?.role !== "user") {
    redirect(session.user?.role === "admin" ? "/dashboard/admin" : session.user?.role === "caregiver" ? "/dashboard/caregiver" : "/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />
      <main className="dashboard-shell flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

import CaregiverSidebar from "@/component/Dashboard/Caregiver/CaregiverSidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Caregiver Dashboard - CareConnect",
  description: "Manage caregiver profile, availability, and requests",
};

export default async function CaregiverDashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user?.role !== "caregiver") {
    redirect(session.user?.role === "admin" ? "/dashboard/admin" : session.user?.role === "user" ? "/dashboard/user" : "/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CaregiverSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

import UserSidebar from "@/component/Dashboard/User/UserSidebar";

export const metadata = {
  title: "User Dashboard - CareConnect",
  description: "Manage your care bookings and profile",
};

export default function UserDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

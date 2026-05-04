import AdminSidebar from "@/component/Dashboard/Admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard - CareConnect",
  description: "Admin panel for CareConnect",
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import RealTimeAdminPaymentsPage from "./Adminpaymentspage";

export function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newSvc, setNewSvc] = useState({
    title: "",
    description: "",
    category: "Home",
    price: "",
    image: "",
    badge: "",
    icon: "✨",
  });

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const response = await fetch("/api/services?includeInactive=true", { cache: "no-store" });
        const data = response.ok ? await response.json() : [];

        if (!isMounted) return;

        setServices(Array.isArray(data) ? data : []);
        setError("");
      } catch {
        if (isMounted) {
          setServices([]);
          setError("Unable to load services right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      if (!query) return true;

      return [service.title, service.description, service.category, service.badge]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [search, services]);

  const stats = [
    { label: "Total Services", value: services.length },
    { label: "Active", value: services.filter((service) => service.active !== false).length },
    { label: "Hidden", value: services.filter((service) => service.active === false).length },
    { label: "Categories", value: new Set(services.map((service) => service.category)).size },
  ];

  const add = async () => {
    const payload = {
      title: newSvc.title,
      description: newSvc.description,
      category: newSvc.category,
      price: newSvc.price,
      image: newSvc.image,
      badge: newSvc.badge,
      icon: newSvc.icon,
      active: true,
    };

    if (!payload.title || !payload.description || !payload.image || !payload.price) {
      setError("Title, description, image and price are required.");
      return;
    }

    try {
      setSavingId("new");
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create service.");
      }

      setServices((prev) => [data, ...prev]);
      setShowAdd(false);
      setNewSvc({ title: "", description: "", category: "Home", price: "", image: "", badge: "", icon: "✨" });
      setError("");
    } catch (err) {
      setError(err.message || "Unable to create service.");
    } finally {
      setSavingId("");
    }
  };

  const toggleActive = async (service) => {
    try {
      setSavingId(service._id);
      const response = await fetch(`/api/services/${service._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: service.active === false }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to update service.");
      }

      setServices((prev) => prev.map((item) => (item._id === service._id ? data : item)));
      setError("");
    } catch (err) {
      setError(err.message || "Unable to update service.");
    } finally {
      setSavingId("");
    }
  };

  const removeService = async (service) => {
    if (!window.confirm(`Delete ${service.title}?`)) {
      return;
    }

    try {
      setSavingId(service._id);
      const response = await fetch(`/api/services/${service._id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete service.");
      }

      setServices((prev) => prev.filter((item) => item._id !== service._id));
      setError("");
    } catch (err) {
      setError(err.message || "Unable to delete service.");
    } finally {
      setSavingId("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">Services</h1>
          <p className="mt-1 text-sm text-gray-600">Manage care service offerings in real time</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="rounded-xl bg-[#ff6fae] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95">+ Add Service</button>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search services by name, category or badge..."
            className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {loading ? (
          [...Array(6)].map((_, index) => <div key={index} className="h-72 rounded-2xl bg-white border border-gray-100 shadow-sm animate-pulse" />)
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full rounded-2xl bg-white border border-gray-100 p-10 text-center text-gray-400">No services found</div>
        ) : (
          filteredServices.map((service) => (
          <div key={service._id} className={`rounded-2xl bg-white border-2 shadow-sm p-5 transition ${service.active ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{service.icon || "✨"}</span>
              <button onClick={() => toggleActive(service)} disabled={savingId === service._id} className={`relative w-10 h-5 rounded-full transition ${service.active ? "bg-[#ff6fae]" : "bg-gray-200"}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${service.active ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
            <h3 className="font-bold text-gray-900">{service.title}</h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{service.description}</p>
            <p className="mt-2 text-2xl font-bold text-[#ff6fae]">${Number(service.price || 0)}<span className="text-sm font-normal text-gray-600">/hr</span></p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">{service.category}</span>
              <span className={`rounded-full px-2.5 py-1 font-semibold ${service.active === false ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {service.active === false ? "Hidden" : "Active"}
              </span>
              {service.badge && <span className="rounded-full bg-pink-100 px-2.5 py-1 font-semibold text-[#ff6fae]">{service.badge}</span>}
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => toggleActive(service)} disabled={savingId === service._id} className="flex-1 text-xs rounded-lg border border-gray-200 py-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-60">
                {service.active === false ? "Show" : "Hide"}
              </button>
              <button onClick={() => removeService(service)} disabled={savingId === service._id} className="flex-1 text-xs rounded-lg border border-red-200 py-1.5 text-red-500 hover:bg-red-50 disabled:opacity-60">Delete</button>
            </div>
          </div>
          ))
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="font-bold text-gray-900 mb-4">Add New Service</h3>
            <div className="space-y-3">
              <input placeholder="Service Name" value={newSvc.title} onChange={(event) => setNewSvc((prev) => ({ ...prev, title: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]" />
              <textarea placeholder="Description" rows={3} value={newSvc.description} onChange={(event) => setNewSvc((prev) => ({ ...prev, description: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]" />
              <div className="grid gap-3 sm:grid-cols-2">
                <select value={newSvc.category} onChange={(event) => setNewSvc((prev) => ({ ...prev, category: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]">
                  <option>Home</option>
                  <option>Senior Care</option>
                  <option>Child Care</option>
                  <option>Medical</option>
                  <option>Support</option>
                  <option>Personal</option>
                </select>
                <input type="number" placeholder="Price per hour ($)" value={newSvc.price} onChange={(event) => setNewSvc((prev) => ({ ...prev, price: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]" />
              </div>
              <input placeholder="Image URL" value={newSvc.image} onChange={(event) => setNewSvc((prev) => ({ ...prev, image: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input placeholder="Badge (optional)" value={newSvc.badge} onChange={(event) => setNewSvc((prev) => ({ ...prev, badge: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]" />
                <input placeholder="Icon (optional)" value={newSvc.icon} onChange={(event) => setNewSvc((prev) => ({ ...prev, icon: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowAdd(false)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={add} disabled={savingId === "new"} className="flex-1 rounded-xl bg-[#ff6fae] py-2.5 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60">{savingId === "new" ? "Adding..." : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminPaymentsPage() {
  return <RealTimeAdminPaymentsPage />;
}

export function AdminReportsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadReportData = async () => {
      try {
        const response = await fetch("/api/admin/payments", { cache: "no-store" });
        const data = response.ok ? await response.json() : [];

        if (!isMounted) return;

        setRecords(Array.isArray(data) ? data : []);
        setLastUpdated(new Date());
      } catch {
        if (isMounted) setRecords([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadReportData();
    const intervalId = setInterval(loadReportData, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const paidRecords = records.filter((record) => record.status === "paid");

  const monthlyData = months.map((month, index) => {
    const monthRecords = paidRecords.filter((record) => {
      if (!record.createdAt) return false;
      const date = new Date(record.createdAt);
      return date.getMonth() === index && date.getFullYear() === currentYear;
    });

    return {
      month,
      revenue: monthRecords.reduce((sum, record) => sum + Number(record.amount || 0), 0),
      count: monthRecords.length,
    };
  });

  const maxRevenue = Math.max(...monthlyData.map((month) => month.revenue), 1);
  const totalRevenue = paidRecords.reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const totalRefunded = records.filter((record) => record.status === "refunded").reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const totalPending = records.filter((record) => record.status === "pending").reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const thisMonthRecords = records.filter((record) => {
    if (!record.createdAt) return false;
    const date = new Date(record.createdAt);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
  const thisMonthRevenue = thisMonthRecords.reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const totalBookings = records.length;

  const serviceSummaryMap = records.reduce((accumulator, record) => {
    const serviceName = record.serviceTitle || "Care Service";
    if (!accumulator[serviceName]) {
      accumulator[serviceName] = { service: serviceName, count: 0, revenue: 0 };
    }

    accumulator[serviceName].count += 1;
    accumulator[serviceName].revenue += Number(record.amount || 0);
    return accumulator;
  }, {});

  const bookingsByService = Object.values(serviceSummaryMap).sort((left, right) => right.count - left.count).slice(0, 8);

  const bookingsByStatusMap = records.reduce((accumulator, record) => {
    const status = record.status || "unknown";
    accumulator[status] = (accumulator[status] || 0) + 1;
    return accumulator;
  }, {});

  const bookingsByStatus = Object.entries(bookingsByStatusMap).map(([status, count]) => ({ status, count })).sort((left, right) => right.count - left.count);
  const topService = bookingsByService[0]?.service || "—";
  const paidSessions = paidRecords.length;
  const serviceColors = ["#ff6fae", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#f43f5e", "#14b8a6", "#6366f1"];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-950">Reports & Analytics</h1>
        <p className="mt-1 text-sm text-gray-600">Platform performance overview</p>
        <p className="mt-1 text-xs text-gray-400">{loading ? "Syncing live metrics..." : `Last updated ${lastUpdated ? lastUpdated.toLocaleTimeString() : "just now"}`}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: `$${totalRevenue.toFixed(0)}`, change: "Live cumulative revenue" },
          { label: "Total Bookings", value: String(totalBookings), change: "All payment records" },
          { label: "Paid Sessions", value: String(paidSessions), change: "Successful payments only" },
          { label: "Top Service", value: topService, change: "Most booked service" },
        ].map((kpi, index) => (
          <div key={index} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className="text-2xl font-bold text-gray-900 truncate">{loading ? "..." : kpi.value}</p>
            <p className="mt-0.5 text-xs text-gray-600">{kpi.label}</p>
            <p className="text-xs text-green-600 mt-1">↑ {kpi.change}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Revenue by Month ({currentYear})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-2 text-left font-medium text-gray-600">Month</th>
                <th className="py-2 text-left font-medium text-gray-600">Revenue</th>
                <th className="py-2 text-left font-medium text-gray-600">Bookings</th>
                <th className="w-48 py-2 text-left font-medium text-gray-600">Progress</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((month) => (
                <tr key={month.month} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-gray-900">{month.month}</td>
                  <td className="py-3 font-bold text-green-600">${month.revenue.toLocaleString()}</td>
                  <td className="py-3 text-gray-600">{month.count}</td>
                  <td className="py-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff6fae] rounded-full" style={{ width: `${(month.revenue / maxRevenue) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Bookings by Service</h2>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3, 4].map((item) => <div key={item} className="h-8 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : bookingsByService.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {bookingsByService.map((service, index) => {
                const pct = totalBookings > 0 ? Math.round((service.count / totalBookings) * 100) : 0;
                return (
                  <div key={service.service} className="flex items-center gap-3">
                    <span className="w-28 text-xs text-gray-700 font-medium truncate shrink-0">{service.service}</span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: serviceColors[index % serviceColors.length] }} />
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-8 text-right">{pct}%</span>
                    <span className="text-xs text-gray-400 w-12 text-right">{service.count} jobs</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Bookings by Status</h2>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((item) => <div key={item} className="h-8 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : bookingsByStatus.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-3">
              {bookingsByStatus.map((statusItem) => {
                const pct = totalBookings > 0 ? Math.round((statusItem.count / totalBookings) * 100) : 0;
                const colors = { paid: "#10b981", pending: "#f59e0b", refunded: "#3b82f6", failed: "#ef4444" };

                return (
                  <div key={statusItem.status} className="flex items-center gap-3">
                    <span className="w-24 text-xs text-gray-700 font-medium shrink-0 capitalize">{statusItem.status}</span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: colors[statusItem.status] || "#9ca3af" }} />
                    </div>
                    <span className="text-xs font-bold text-gray-900 w-8 text-right">{statusItem.count}</span>
                    <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "This Month Revenue", value: `$${thisMonthRevenue.toFixed(0)}` },
          { label: "Refunded", value: `$${totalRefunded.toFixed(0)}` },
          { label: "Pending", value: `$${totalPending.toFixed(0)}` },
          { label: "Live Records", value: String(records.length) },
        ].map((item, index) => (
          <div key={index} className="rounded-xl bg-white border border-gray-100 shadow-sm p-4">
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Care Connect",
    email: "admin@careconnect.com",
    phone: "+880 1700-000000",
    address: "23 Care Street, Dhaka, Bangladesh",
    commissionRate: "10",
    autoApprove: false,
    maintenanceMode: false,
    emailVerification: true,
  });

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ checked, onChange }) => (
    <button onClick={onChange} className={`relative w-10 h-5 rounded-full transition ${checked ? "bg-[#ff6fae]" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${checked ? "left-5" : "left-0.5"}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-950">Admin Settings</h1>
        <p className="text-sm mt-1 text-gray-600">Configure platform settings</p>
      </div>

      {saved && <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm font-medium text-green-800">✓ Settings saved!</div>}

      <div className="space-y-4">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h3 className="mb-4 font-bold text-gray-950">General Settings</h3>
          <div className="space-y-3">
            {[
              { label: "Platform Name", key: "siteName" },
              { label: "Admin Email", key: "email" },
              { label: "Contact Phone", key: "phone" },
              { label: "Address", key: "address" },
              { label: "Commission Rate (%)", key: "commissionRate" },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-1 block text-xs font-medium text-gray-700">{field.label}</label>
                <input
                  value={settings[field.key]}
                  onChange={(event) => setSettings((prev) => ({ ...prev, [field.key]: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
          <h3 className="mb-4 font-bold text-gray-950">Platform Controls</h3>
          <div className="space-y-4">
            {[
              { label: "Auto Approve Bookings", key: "autoApprove" },
              { label: "Maintenance Mode", key: "maintenanceMode" },
              { label: "Email Verification", key: "emailVerification" },
            ].map((field) => (
              <div key={field.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{field.label}</p>
                  <p className="text-xs text-gray-500">Toggle this platform setting</p>
                </div>
                <Toggle checked={settings[field.key]} onChange={() => toggle(field.key)} />
              </div>
            ))}
          </div>
          <button onClick={save} className="mt-6 rounded-xl bg-[#ff6fae] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95">Save Settings</button>
        </div>
      </div>
    </div>
  );
}
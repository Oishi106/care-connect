"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchServices, fallbackServices } from "@/lib/services";

const caregiverOptions = [
  { id: 1, name: "Tanvir Hossain", specialty: "Elderly Care", rating: 4.9, available: true },
  { id: 2, name: "Maya Islam", specialty: "Baby Sitting", rating: 4.8, available: true },
  { id: 3, name: "Sophie Rahman", specialty: "Patient Care", rating: 4.9, available: false },
  { id: 4, name: "Ethan Karim", specialty: "Special Needs", rating: 4.7, available: true },
];

function getServiceEmoji(title) {
  const value = String(title || "").toLowerCase();
  if (value.includes("elder")) return "👴";
  if (value.includes("baby") || value.includes("child") || value.includes("newborn")) return "👶";
  if (value.includes("patient") || value.includes("post-op") || value.includes("medical")) return "🏥";
  if (value.includes("special") || value.includes("disability") || value.includes("autism")) return "💝";
  if (value.includes("night")) return "🌙";
  if (value.includes("therapy")) return "🧘";
  if (value.includes("respite")) return "🤝";
  return "✨";
}

function getServiceKey(service) {
  return service._id || service.id;
}

function getServiceRate(service) {
  const value = String(service?.price || "");
  const match = value.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function ServiceCard({ service, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group rounded-3xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${selected ? "border-[#ff6fae] bg-pink-50 shadow-pink-100" : "border-gray-100 bg-white"}`}
    >
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${service.color || "from-gray-50 to-gray-100"}`}>
        <span className="text-xl">{service.icon || getServiceEmoji(service.title)}</span>
      </div>
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="line-clamp-1 font-bold text-gray-900">{service.title}</h3>
          <p className="text-xs font-semibold text-[#ff6fae]">{service.cat || "General"}</p>
        </div>
        {service.tag && (
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${service.tagBg || "bg-[#ff6fae]"}`}>
            {service.tag}
          </span>
        )}
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">{service.description}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-[#ff6fae]">{service.price}</p>
        {selected ? (
          <span className="rounded-full bg-[#ff6fae] px-3 py-1 text-xs font-semibold text-white">Selected</span>
        ) : (
          <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500">Choose</span>
        )}
      </div>
    </button>
  );
}

export default function BookService() {
  const { data: session } = useSession();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [step, setStep] = useState(1);
  const [serviceSearch, setServiceSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState({ service: null, caregiver: null, date: "", time: "", hours: 4, notes: "" });
  const [bookingId, setBookingId] = useState("");
  const [creatingDraft, setCreatingDraft] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadServices = async () => {
      try {
        const remoteServices = await fetchServices();
        if (mounted && remoteServices.length > 0) {
          setServices(remoteServices);
          return;
        }
      } catch {
        // Use fallback services if API is unavailable.
      }

      if (mounted) {
        setServices(fallbackServices);
      }
    };

    loadServices().finally(() => {
      if (mounted) {
        setLoadingServices(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const selectedService = useMemo(() => services.find(service => getServiceKey(service) === selected.service), [services, selected.service]);
  const selectedServiceRate = selectedService ? getServiceRate(selectedService) : 0;
  const totalPrice = selectedServiceRate * selected.hours;
  const categories = useMemo(() => ["All", ...Array.from(new Set(services.map(service => service.cat || "General")))], [services]);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = activeCategory === "All" || (service.cat || "General") === activeCategory;
      const searchText = `${service.title || ""} ${service.description || ""}`.toLowerCase();
      const matchesSearch = !serviceSearch || searchText.includes(serviceSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, serviceSearch, services]);

  const groupedServices = useMemo(() => {
    return categories
      .filter(category => category !== "All")
      .map(category => ({
        category,
        items: filteredServices.filter(service => (service.cat || "General") === category),
      }))
      .filter(group => group.items.length > 0);
  }, [categories, filteredServices]);

  const createDraftBooking = async () => {
    if (!session?.user?.email || !selectedService) {
      throw new Error("Please sign in and select a service first.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: session.user.email,
        userName: session.user.name,
        serviceId: getServiceKey(selectedService),
        serviceTitle: selectedService.title,
        caregiverId: selected.caregiver,
        caregiverName: caregiverOptions.find(caregiver => caregiver.id === selected.caregiver)?.name,
        date: selected.date,
        time: selected.time,
        hours: selected.hours,
        notes: selected.notes,
        totalPrice,
        status: "Pending",
        paymentStatus: "unpaid",
        createdAt: new Date(),
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to save booking draft.");
    }

    const data = await response.json();
    const id = data._id || data.insertedId;

    if (!id) {
      throw new Error("Unable to create booking draft.");
    }

    setBookingId(id);
    return id;
  };

  const updateDraftBooking = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: getServiceKey(selectedService),
        serviceTitle: selectedService.title,
        caregiverId: selected.caregiver,
        caregiverName: caregiverOptions.find(caregiver => caregiver.id === selected.caregiver)?.name,
        date: selected.date,
        time: selected.time,
        hours: selected.hours,
        notes: selected.notes,
        totalPrice,
        status: "Pending",
        paymentStatus: "unpaid",
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to update booking draft.");
    }
  };

  const handleCaregiverContinue = async () => {
    if (!selected.caregiver) return;

    try {
      setCreatingDraft(true);
      setPayError("");

      if (!bookingId) {
        await createDraftBooking();
      }

      setStep(3);
    } catch (error) {
      setPayError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setCreatingDraft(false);
    }
  };

  const handlePayAndBook = async () => {
    if (!session?.user?.email || !selectedService) return;

    try {
      setPaying(true);
      setPayError("");

      const draftId = bookingId || await createDraftBooking();
      await updateDraftBooking(draftId);

      const stripeResponse = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: selectedService.title,
          priceLabel: selectedService.price,
          hours: selected.hours,
          bookingId: draftId,
          successPath: `/payment/success?booking_id=${draftId}`,
          cancelPath: "/payment/cancel",
        }),
      });

      const stripeData = await stripeResponse.json();

      if (!stripeResponse.ok || !stripeData.url) {
        throw new Error(stripeData.error || "Payment setup failed. Please try again.");
      }

      window.location.href = stripeData.url;
    } catch (error) {
      setPayError(error?.message || "Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Book a Care Service</h1>
        <p className="text-gray-500 mt-1">Choose your service, caregiver, and schedule</p>
      </div>

      <div className="mb-8 flex items-center gap-2">
        {["Choose Service", "Select Caregiver", "Schedule & Pay"].map((label, index) => (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition ${step > index + 1 ? "bg-green-500 text-white" : step === index + 1 ? "bg-[#ff6fae] text-white" : "bg-gray-200 text-gray-500"}`}>
                {step > index + 1 ? "✓" : index + 1}
              </div>
              <span className={`hidden text-sm font-medium sm:inline ${step === index + 1 ? "text-[#ff6fae]" : "text-gray-500"}`}>{label}</span>
            </div>
            {index < 2 && <div className={`h-0.5 flex-1 ${step > index + 1 ? "bg-[#ff6fae]" : "bg-gray-200"}`} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Select a Care Service</h2>
              <p className="mt-1 text-sm text-gray-500">Organized by category with search, so even 20 services stay easy to scan.</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
              {services.length} services available
            </div>
          </div>

          <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto]">
            <label className="relative block">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">⌕</span>
              <input
                type="search"
                value={serviceSearch}
                onChange={e => setServiceSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/15"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "bg-[#ff6fae] text-white shadow-md shadow-pink-200" : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6fae] hover:text-[#ff6fae]"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loadingServices ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-52 rounded-3xl bg-gray-100 animate-pulse" />)}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="mb-6 rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
              <p className="text-3xl mb-2">🔎</p>
              <p className="font-medium">No services match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setServiceSearch("");
                  setActiveCategory("All");
                }}
                className="mt-3 rounded-full bg-[#ff6fae] px-4 py-2 text-sm font-semibold text-white"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-8 mb-6">
              {activeCategory === "All" ? groupedServices.map(group => (
                <div key={group.category}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">{group.category}</h3>
                    <span className="text-xs text-gray-400">{group.items.length} services</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {group.items.map(service => (
                      <ServiceCard
                        key={getServiceKey(service)}
                        service={service}
                        selected={selected.service === getServiceKey(service)}
                        onSelect={() => setSelected(prev => ({ ...prev, service: getServiceKey(service) }))}
                      />
                    ))}
                  </div>
                </div>
              )) : (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">{activeCategory}</h3>
                    <span className="text-xs text-gray-400">{filteredServices.length} services</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {filteredServices.map(service => (
                      <ServiceCard
                        key={getServiceKey(service)}
                        service={service}
                        selected={selected.service === getServiceKey(service)}
                        onSelect={() => setSelected(prev => ({ ...prev, service: getServiceKey(service) }))}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            disabled={!selected.service}
            onClick={() => setStep(2)}
            className="rounded-xl bg-[#ff6fae] px-8 py-3 font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-800">Choose a Caregiver</h2>
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            {caregiverOptions.map(caregiver => (
              <button
                key={caregiver.id}
                type="button"
                onClick={() => caregiver.available && setSelected(prev => ({ ...prev, caregiver: caregiver.id }))}
                className={`rounded-2xl border-2 p-4 text-left transition ${selected.caregiver === caregiver.id ? "border-[#ff6fae] shadow-md" : "border-gray-100 hover:border-gray-200"} ${!caregiver.available ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-[#ff6fae]/10 flex items-center justify-center text-[#ff6fae] font-bold text-lg">{caregiver.name[0]}</div>
                  <div>
                    <p className="font-bold text-gray-900">{caregiver.name}</p>
                    <p className="text-xs font-medium text-[#ff6fae]">{caregiver.specialty}</p>
                    <p className="text-xs font-bold text-gray-700">★ {caregiver.rating}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${caregiver.available ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {caregiver.available ? "Available" : "Unavailable"}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">← Back</button>
            <button disabled={!selected.caregiver || creatingDraft} onClick={handleCaregiverContinue} className="rounded-xl bg-[#ff6fae] px-8 py-3 font-semibold text-white transition hover:brightness-95 disabled:opacity-50">
              {creatingDraft ? "Saving..." : "Continue →"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-800">Schedule & Pay</h2>
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={selected.date}
                  onChange={e => setSelected(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={selected.time}
                  onChange={e => setSelected(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Duration: <span className="font-bold text-[#ff6fae]">{selected.hours} hours</span></label>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={selected.hours}
                  onChange={e => setSelected(prev => ({ ...prev, hours: Number(e.target.value) }))}
                  className="w-full accent-[#ff6fae]"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400"><span>1hr</span><span>6hr</span><span>12hr</span></div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Special Notes</label>
                <textarea
                  rows={3}
                  value={selected.notes}
                  onChange={e => setSelected(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any specific instructions..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-500">Service</span><span className="font-medium text-gray-900">{selectedService?.title}</span></div>
                <div className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-500">Caregiver</span><span className="font-medium text-gray-900">{caregiverOptions.find(caregiver => caregiver.id === selected.caregiver)?.name}</span></div>
                <div className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-500">Date</span><span className="font-medium text-gray-900">{selected.date || "Not set"}</span></div>
                <div className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-500">Duration</span><span className="font-medium text-gray-900">{selected.hours} hours</span></div>
                <div className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-500">Rate</span><span className="font-medium text-gray-900">${selectedService?.price}/hr</span></div>
                <div className="flex justify-between rounded-xl bg-pink-50 px-3 py-3"><span className="font-bold text-gray-900">Total</span><span className="font-bold text-[#ff6fae] text-lg">${totalPrice}</span></div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="1" y="4" width="22" height="16" rx="2" stroke="#6b7280" strokeWidth="1.5" /><path d="M1 10h22" stroke="#6b7280" strokeWidth="1.5" /></svg>
                <p className="text-xs text-gray-500">Secured by <span className="font-bold text-gray-700">Stripe</span> — cards, bKash, Nagad accepted</p>
              </div>

              {payError && <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">{payError}</div>}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">← Back</button>
            <button
              disabled={!selected.date || !selected.time || paying}
              onClick={handlePayAndBook}
              className="flex items-center gap-2 rounded-xl bg-[#ff6fae] px-8 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:brightness-95 disabled:opacity-50"
            >
              {paying ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Redirecting...</>) : (<>Pay ${totalPrice} via Stripe →</>)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

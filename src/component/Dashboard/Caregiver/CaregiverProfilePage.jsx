"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CaregiverProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    experience: "",
    bio: "",
    imageUrl: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("/api/caregiver/profile");
        const data = response.ok ? await response.json() : null;
        if (data) {
          setForm((current) => ({
            ...current,
            name: data.name || session?.user?.name || "",
            email: data.email || session?.user?.email || "",
            phone: data.phone || "",
            serviceType: data.serviceType || "",
            experience: data.experience || "",
            bio: data.bio || "",
            imageUrl: data.imageUrl || session?.user?.image || "",
          }));
        }
      } catch (err) {
        setError("Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [session?.user?.email, session?.user?.image, session?.user?.name]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/caregiver/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to update profile.");
      }

      setMessage(data.message || "Profile updated successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#ff6fae]">Caregiver Dashboard</span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">Update your caregiver information and profile image.</p>

        {error && <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        {message && <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

        <form onSubmit={handleSave} className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt={form.name || "Caregiver"} className="h-64 w-full object-cover" />
              ) : (
                <div className="flex h-64 items-center justify-center bg-linear-to-br from-pink-100 to-pink-200 text-5xl font-bold text-[#ff6fae]">
                  {(form.name || session?.user?.name || "C")?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-gray-500">Paste a direct image URL to update your profile photo.</p>
          </div>

          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                <input value={form.name} onChange={updateField("name")} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                <input value={form.email} disabled className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Phone</label>
                <input value={form.phone} onChange={updateField("phone")} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Service Type</label>
                <input value={form.serviceType} onChange={updateField("serviceType")} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Experience</label>
                <input value={form.experience} onChange={updateField("experience")} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Profile Image URL</label>
                <input value={form.imageUrl} onChange={updateField("imageUrl")} placeholder="https://..." className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">Bio</label>
              <textarea rows="5" value={form.bio} onChange={updateField("bio")} placeholder="Tell families about your background and experience" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#ff6fae]" />
            </div>

            <button type="submit" disabled={saving} className="mt-6 rounded-xl bg-[#ff6fae] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
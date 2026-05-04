"use client";
import React, { useState } from "react";

const completedBookings = [
  { id: "BK003", caregiver: "Sophie Rahman", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop&q=60", service: "Patient Care", date: "Apr 28, 2026", reviewed: true, rating: 5, review: "Sophie was absolutely wonderful. Very attentive to my mother's needs." },
  { id: "BK004", caregiver: "Ethan Karim", avatar: "https://images.unsplash.com/photo-1592334873219-42ca023e48ce?w=100&auto=format&fit=crop&q=60", service: "Special Needs", date: "Apr 20, 2026", reviewed: false, rating: 0, review: "" },
];

export default function ReviewsPage() {
  const [bookings, setBookings] = useState(completedBookings);
  const [modalId, setModalId] = useState(null);
  const [star, setStar] = useState(0);
  const [text, setText] = useState("");

  const submitReview = () => {
    setBookings(prev => prev.map(b => b.id === modalId ? { ...b, reviewed: true, rating: star, review: text } : b));
    setModalId(null); setStar(0); setText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-gray-500 text-sm mt-1">Rate and review your caregivers</p>
      </div>

      <div className="space-y-4">
        {bookings.map(b => (
          <div key={b.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-4 mb-4">
              <img src={b.avatar} alt={b.caregiver} className="h-12 w-12 rounded-full object-cover"/>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{b.caregiver}</p>
                <p className="text-sm text-[#ff6fae]">{b.service}</p>
                <p className="text-xs text-gray-400">{b.date}</p>
              </div>
              {!b.reviewed ? (
                <button onClick={() => setModalId(b.id)} className="rounded-xl bg-[#ff6fae] px-4 py-2 text-sm font-semibold text-white hover:brightness-95 transition">
                  Write Review
                </button>
              ) : (
                <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">✓ Reviewed</span>
              )}
            </div>
            {b.reviewed && (
              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < b.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">"{b.review}"</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {modalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Write a Review</h3>
            <div className="flex gap-2 mb-4">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setStar(s)} className={`text-3xl transition ${s <= star ? "text-yellow-400" : "text-gray-200"}`}>★</button>
              ))}
            </div>
            <textarea
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Share your experience..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#ff6fae] mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setModalId(null)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={submitReview} disabled={!star || !text} className="flex-1 rounded-xl bg-[#ff6fae] py-2.5 text-sm font-semibold text-white disabled:opacity-50 hover:brightness-95 transition">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

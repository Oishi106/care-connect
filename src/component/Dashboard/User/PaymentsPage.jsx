"use client";
import React, { useState } from "react";

const transactions = [
  { id: "TXN001", desc: "Elderly Care - Tanvir Hossain", date: "May 10, 2026", amount: "$120", status: "Paid", method: "Card" },
  { id: "TXN002", desc: "Baby Sitting - Maya Islam", date: "May 12, 2026", amount: "$48", status: "Pending", method: "bKash" },
  { id: "TXN003", desc: "Patient Care - Sophie Rahman", date: "Apr 28, 2026", amount: "$180", status: "Paid", method: "Card" },
  { id: "TXN004", desc: "Special Needs - Ethan Karim", date: "Apr 20, 2026", amount: "$120", status: "Paid", method: "Nagad" },
  { id: "TXN005", desc: "Elderly Care - Farhana Akter", date: "Apr 15, 2026", amount: "$90", status: "Refunded", method: "Card" },
];

const statusColors = { Paid: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Refunded: "bg-blue-100 text-blue-700", Failed: "bg-red-100 text-red-700" };

export default function PaymentsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your payment methods and history</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#ff6fae] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95 transition">
          + Add Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Spent", value: "$558", icon: "💰", color: "from-[#ff6fae] to-[#ff8fc4]" },
          { label: "This Month", value: "$168", icon: "📅", color: "from-blue-400 to-blue-500" },
          { label: "Pending", value: "$48", icon: "⏳", color: "from-yellow-400 to-yellow-500" },
          { label: "Refunded", value: "$90", icon: "↩️", color: "from-purple-400 to-purple-500" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-lg mb-3`}>{s.icon}</div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Saved Cards */}
      <div className="mb-6 rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Saved Payment Methods</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-gradient-to-br from-[#ff6fae] to-[#d4578d] p-4 text-white">
            <div className="flex justify-between items-start mb-8">
              <p className="text-sm font-semibold opacity-80">VISA</p>
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><circle cx="12" cy="10" r="10" fill="white" fillOpacity="0.4"/><circle cx="20" cy="10" r="10" fill="white" fillOpacity="0.2"/></svg>
            </div>
            <p className="text-lg font-mono tracking-widest">**** **** **** 4242</p>
            <div className="flex justify-between mt-2 text-xs opacity-80">
              <span>FATIMA AHMED</span><span>12/28</span>
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 flex items-center justify-center text-gray-400 cursor-pointer hover:border-[#ff6fae] hover:text-[#ff6fae] transition" onClick={() => setShowModal(true)}>
            <div className="text-center">
              <p className="text-3xl mb-1">+</p>
              <p className="text-sm font-medium">Add New Card</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-gray-500 font-medium">ID</th>
                <th className="text-left py-3 text-gray-500 font-medium">Description</th>
                <th className="text-left py-3 text-gray-500 font-medium hidden sm:table-cell">Date</th>
                <th className="text-left py-3 text-gray-500 font-medium hidden md:table-cell">Method</th>
                <th className="text-left py-3 text-gray-500 font-medium">Status</th>
                <th className="text-right py-3 text-gray-500 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-3 text-gray-400 font-mono text-xs">{tx.id}</td>
                  <td className="py-3 text-gray-800 font-medium pr-4">{tx.desc}</td>
                  <td className="py-3 text-gray-500 hidden sm:table-cell">{tx.date}</td>
                  <td className="py-3 text-gray-500 hidden md:table-cell">{tx.method}</td>
                  <td className="py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[tx.status]}`}>{tx.status}</span></td>
                  <td className="py-3 text-right font-bold text-gray-900">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Add Payment Method</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Card Number" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"/>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM/YY" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"/>
                <input type="text" placeholder="CVV" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"/>
              </div>
              <input type="text" placeholder="Cardholder Name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#ff6fae]"/>
              <button onClick={() => setShowModal(false)} className="w-full rounded-xl bg-[#ff6fae] py-3 text-white font-semibold hover:brightness-95 transition">
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

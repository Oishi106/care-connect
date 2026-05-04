"use client";
import React, { useState } from "react";

const conversations = [
  { id: 1, name: "Tanvir Hossain", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&auto=format&fit=crop&q=60", lastMsg: "I'll be there at 9 AM sharp tomorrow.", time: "2h ago", unread: 2, online: true },
  { id: 2, name: "Maya Islam", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60", lastMsg: "Thanks! Your son was wonderful today.", time: "Yesterday", unread: 0, online: false },
  { id: 3, name: "Support Team", avatar: null, lastMsg: "Your booking has been confirmed.", time: "2 days ago", unread: 1, online: true },
];

const messages = {
  1: [
    { from: "them", text: "Hello! I wanted to confirm our appointment tomorrow.", time: "10:00 AM" },
    { from: "me", text: "Yes, please be here by 9 AM. My father needs morning medication at 9:30.", time: "10:05 AM" },
    { from: "them", text: "Understood! I'll bring the care kit. Anything else to note?", time: "10:08 AM" },
    { from: "me", text: "He prefers Bengali conversations. And no TV after 8 PM please.", time: "10:12 AM" },
    { from: "them", text: "I'll be there at 9 AM sharp tomorrow.", time: "2h ago" },
  ],
};

export default function MessagesPage() {
  const [active, setActive] = useState(1);
  const [input, setInput] = useState("");
  const [localMsgs, setLocalMsgs] = useState(messages);

  const send = () => {
    if (!input.trim()) return;
    setLocalMsgs(prev => ({
      ...prev,
      [active]: [...(prev[active] || []), { from: "me", text: input, time: "Just now" }],
    }));
    setInput("");
  };

  const activeMsgs = localMsgs[active] || [];
  const activePerson = conversations.find(c => c.id === active);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Messages</h2>
          <div className="relative mt-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input placeholder="Search..." className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff6fae]"/>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <button key={conv.id} onClick={() => setActive(conv.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-pink-50 transition text-left border-b border-gray-50 ${active === conv.id ? "bg-pink-50" : ""}`}>
              <div className="relative flex-shrink-0">
                {conv.avatar ? (
                  <img src={conv.avatar} alt={conv.name} className="h-11 w-11 rounded-full object-cover"/>
                ) : (
                  <div className="h-11 w-11 rounded-full bg-[#ff6fae] flex items-center justify-center text-white font-bold">S</div>
                )}
                {conv.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm text-gray-900 truncate">{conv.name}</p>
                  <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.time}</p>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMsg}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-[#ff6fae] text-white text-xs flex items-center justify-center font-bold">{conv.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
          {activePerson?.avatar ? (
            <img src={activePerson.avatar} alt="" className="h-10 w-10 rounded-full object-cover"/>
          ) : (
            <div className="h-10 w-10 rounded-full bg-[#ff6fae] flex items-center justify-center text-white font-bold">S</div>
          )}
          <div>
            <p className="font-bold text-gray-900">{activePerson?.name}</p>
            <p className="text-xs text-green-500">{activePerson?.online ? "Online" : "Offline"}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeMsgs.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2.5 ${msg.from === "me" ? "bg-[#ff6fae] text-white rounded-br-md" : "bg-white text-gray-800 border border-gray-100 rounded-bl-md shadow-sm"}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.from === "me" ? "text-white/70" : "text-gray-400"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:border-[#ff6fae]"
          />
          <button onClick={send} className="h-10 w-10 rounded-xl bg-[#ff6fae] flex items-center justify-center text-white hover:brightness-95 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export default function MessagesPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [conversations, setConversations] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  const loadMessages = (bookingId) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${bookingId}`)
      .then(r => r.json())
      .then(data => {
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch(() => setMessages([]));
  };

  // Fetch confirmed bookings = conversations
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations?email=${user.email}`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setConversations(list);
        if (list.length > 0) setActiveBooking(list[0]);
        setLoadingConvs(false);
      })
      .catch(() => setLoadingConvs(false));
  }, [user?.email]);

  // Fetch messages for active booking
  useEffect(() => {
    if (!activeBooking?._id) return;

    loadMessages(activeBooking._id);

    // Mark as read
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/read/${activeBooking._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ readerEmail: user?.email }),
    }).catch(() => {});

    // Poll every 4 seconds for new messages
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      loadMessages(activeBooking._id);
    }, 4000);

    return () => clearInterval(pollRef.current);
  }, [activeBooking?._id, user?.email]);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !activeBooking || sending) return;
    setSending(true);

    const msgData = {
      bookingId: activeBooking._id,
      senderEmail: user?.email,
      senderName: user?.name,
      receiverEmail: activeBooking.caregiverEmail || "caregiver@careconnect.com",
      receiverName: activeBooking.caregiverName,
      text: input.trim(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgData),
      });
      const saved = await res.json();
      setMessages(prev => [...prev, saved]);
      setInput("");
    } catch (e) {
      // optimistic update even if failed
      setMessages(prev => [...prev, { ...msgData, createdAt: new Date(), _id: Date.now() }]);
      setInput("");
    }
    setSending(false);
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatConvTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString();
  };

  const getInitial = (name) => name?.[0]?.toUpperCase() || "C";

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">

      {/* ---- Conversations Sidebar ---- */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Messages</h2>
          <p className="text-xs text-gray-400 mt-0.5">Your confirmed care sessions</p>
          <div className="relative mt-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input placeholder="Search..." className="w-full pl-8 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff6fae]"/>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingConvs ? (
            <div className="p-4 space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse"/>)}
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-400">
              <p className="text-4xl mb-3">💬</p>
              <p className="font-medium text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Book and confirm a service to start chatting with your caregiver</p>
            </div>
          ) : (
            conversations.map(conv => {
              const isActive = activeBooking?._id === conv._id;
              return (
                <button
                  key={conv._id}
                  onClick={() => setActiveBooking(conv)}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-pink-50 transition text-left border-b border-gray-50 ${isActive ? "bg-pink-50" : ""}`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#ff6fae] to-[#e0508f] flex items-center justify-center text-white font-bold text-sm">
                      {getInitial(conv.caregiverName)}
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {conv.caregiverName || "Caregiver"}
                      </p>
                      <p className="text-xs text-gray-400 flex-shrink-0 ml-2">
                        {formatConvTime(conv.createdAt)}
                      </p>
                    </div>
                    <p className="text-xs text-[#ff6fae] font-medium truncate">{conv.serviceTitle}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      Booking #{conv._id?.slice(-6)}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ---- Chat Area ---- */}
      <div className="flex-1 flex flex-col min-w-0">
        {!activeBooking ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <p className="text-6xl mb-4">💬</p>
            <p className="font-semibold text-lg text-gray-600">Select a conversation</p>
            <p className="text-sm mt-1">Choose a caregiver from the left to start chatting</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#ff6fae] to-[#e0508f] flex items-center justify-center text-white font-bold flex-shrink-0">
                {getInitial(activeBooking.caregiverName)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">{activeBooking.caregiverName || "Caregiver"}</p>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <p className="text-xs text-green-600 font-medium">Online</p>
                  <span className="text-xs text-gray-400">·</span>
                  <p className="text-xs text-gray-400">{activeBooking.serviceTitle}</p>
                </div>
              </div>

              {/* Booking info chip */}
              <div className="hidden sm:flex items-center gap-2 rounded-xl bg-pink-50 border border-pink-100 px-3 py-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="#ff6fae" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className="text-xs font-semibold text-[#ff6fae]">{activeBooking.date}</p>
                  <p className="text-xs text-gray-400">{activeBooking.time}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                  <p className="text-4xl mb-3">👋</p>
                  <p className="font-medium text-sm">Start the conversation!</p>
                  <p className="text-xs mt-1">Say hello to {activeBooking.caregiverName}</p>
                </div>
              ) : (
                messages.map((msg, i) => {
                  const isMe = msg.senderEmail === user?.email;
                  const messageText = msg.text || msg.message || msg.content || msg.body || "";
                  return (
                    <div key={msg._id || i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      {!isMe && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#ff6fae] to-[#e0508f] flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 self-end">
                          {getInitial(msg.senderName)}
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2.5 ${isMe ? "bg-[#ff6fae] text-white rounded-br-md" : "bg-white text-gray-800 border border-gray-100 rounded-bl-md shadow-sm"}`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{messageText}</p>
                        <p className={`text-xs mt-1 ${isMe ? "text-white/70" : "text-gray-400"}`}>
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                      {isMe && (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold ml-2 flex-shrink-0 self-end overflow-hidden">
                          {user?.image ? (
                            <img src={user.image} alt="" className="h-full w-full object-cover"/>
                          ) : (
                            getInitial(user?.name)
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={bottomRef}/>
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder={`Message ${activeBooking.caregiverName || "caregiver"}...`}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ff6fae] focus:ring-2 focus:ring-[#ff6fae]/20"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="h-10 w-10 rounded-xl bg-[#ff6fae] flex items-center justify-center text-white hover:brightness-95 transition disabled:opacity-50 flex-shrink-0"
              >
                {sending ? (
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
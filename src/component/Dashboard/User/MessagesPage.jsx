"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function MessagesPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [conversations, setConversations] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [showMobileList, setShowMobileList] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  const loadMessages = (bookingId) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${bookingId}`)
      .then((r) => r.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch(() => setMessages([]));
  };

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations?email=${user.email}`)
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setConversations(list);
        if (list.length > 0) setActiveBooking(list[0]);
        setLoadingConvs(false);
      })
      .catch(() => setLoadingConvs(false));
  }, [user?.email]);

  useEffect(() => {
    if (!activeBooking?._id) return;

    loadMessages(activeBooking._id);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/read/${activeBooking._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ readerEmail: user?.email }),
    }).catch(() => {});

    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      loadMessages(activeBooking._id);
    }, 4000);

    return () => clearInterval(pollRef.current);
  }, [activeBooking?._id, user?.email]);

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
      setMessages((prev) => [...prev, saved]);
      setInput("");
    } catch (error) {
      setMessages((prev) => [...prev, { ...msgData, createdAt: new Date(), _id: Date.now() }]);
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

  const handleSelectConversation = (conversation) => {
    setActiveBooking(conversation);
    setShowMobileList(false);
  };

  const showConversationList = showMobileList || !activeBooking;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-gray-50 md:flex-row">
      <div className={`${showConversationList ? "flex" : "hidden"} w-full shrink-0 flex-col border-gray-100 bg-white md:flex md:w-80 md:border-r`}>
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between gap-3 md:block">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Messages</h2>
              <p className="mt-0.5 text-xs text-gray-400">Your confirmed care sessions</p>
            </div>
            <button
              type="button"
              onClick={() => setShowMobileList(false)}
              className="rounded-full border border-pink-100 px-3 py-2 text-xs font-semibold text-[#ff6fae] md:hidden"
            >
              Chat view
            </button>
          </div>
          <div className="relative mt-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input placeholder="Search..." className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-sm focus:border-[#ff6fae] focus:outline-none" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingConvs ? (
            <div className="space-y-3 p-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center text-gray-400">
              <p className="mb-3 text-4xl">💬</p>
              <p className="text-sm font-medium">No conversations yet</p>
              <p className="mt-1 text-xs">Book and confirm a service to start chatting with your caregiver</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = activeBooking?._id === conv._id;
              return (
                <button
                  key={conv._id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`flex w-full items-center gap-3 border-b border-gray-50 p-3 text-left transition hover:bg-pink-50 sm:p-4 ${isActive ? "bg-pink-50" : ""}`}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#ff6fae] to-[#e0508f] text-sm font-bold text-white">
                      {getInitial(conv.caregiverName)}
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-gray-900">{conv.caregiverName || "Caregiver"}</p>
                      <p className="shrink-0 text-xs text-gray-400">{formatConvTime(conv.createdAt)}</p>
                    </div>
                    <p className="truncate text-xs font-medium text-[#ff6fae]">{conv.serviceTitle}</p>
                    <p className="mt-0.5 truncate text-xs text-gray-400">Booking #{conv._id?.slice(-6)}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className={`${showConversationList ? "hidden" : "flex"} min-w-0 flex-1 flex-col md:flex`}>
        {!activeBooking ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center text-gray-400">
            <p className="mb-4 text-6xl">💬</p>
            <p className="text-lg font-semibold text-gray-600">Select a conversation</p>
            <p className="mt-1 text-sm">Choose a caregiver from the left to start chatting</p>
            <button
              type="button"
              onClick={() => setShowMobileList(true)}
              className="mt-6 rounded-full bg-[#ff6fae] px-4 py-2 text-sm font-semibold text-white md:hidden"
            >
              Browse conversations
            </button>
          </div>
        ) : (
          <>
            <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 bg-white px-4 py-3 sm:px-6 sm:py-4">
              <button
                type="button"
                onClick={() => setShowMobileList(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 md:hidden"
                aria-label="Back to conversations"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#ff6fae] to-[#e0508f] font-bold text-white">
                {getInitial(activeBooking.caregiverName)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900">{activeBooking.caregiverName || "Caregiver"}</p>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-xs font-medium text-green-600">Online</p>
                  <span className="text-xs text-gray-400">·</span>
                  <p className="text-xs text-gray-400">{activeBooking.serviceTitle}</p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-xl border border-pink-100 bg-pink-50 px-3 py-2 sm:flex">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="#ff6fae" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-[#ff6fae]">{activeBooking.date}</p>
                  <p className="text-xs text-gray-400">{activeBooking.time}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-4 text-center text-gray-400">
                  <p className="mb-3 text-4xl">👋</p>
                  <p className="text-sm font-medium">Start the conversation!</p>
                  <p className="mt-1 text-xs">Say hello to {activeBooking.caregiverName}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, i) => {
                    const isMe = msg.senderEmail === user?.email;
                    const messageText = msg.text || msg.message || msg.content || msg.body || "";
                    return (
                      <div key={msg._id || i} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                        {!isMe && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#ff6fae] to-[#e0508f] text-xs font-bold text-white">
                            {getInitial(msg.senderName)}
                          </div>
                        )}
                        <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 sm:max-w-xs lg:max-w-md ${isMe ? "rounded-br-md bg-[#ff6fae] text-white" : "rounded-bl-md border border-gray-100 bg-white text-gray-800 shadow-sm"}`}>
                          <p className="wrap-break-word whitespace-pre-wrap break-words text-sm leading-relaxed">{messageText}</p>
                          <p className={`mt-1 text-xs ${isMe ? "text-white/70" : "text-gray-400"}`}>{formatTime(msg.createdAt)}</p>
                        </div>
                        {isMe && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                            {user?.image ? (
                              <Image src={user.image} alt="" width={32} height={32} className="h-full w-full object-cover" />
                            ) : (
                              getInitial(user?.name)
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex shrink-0 items-end gap-3 border-t border-gray-100 bg-white px-3 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:px-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder={`Message ${activeBooking.caregiverName || "caregiver"}...`}
                className="min-h-11 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#ff6fae] focus:outline-none focus:ring-2 focus:ring-[#ff6fae]/20"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ff6fae] text-white transition hover:brightness-95 disabled:opacity-50"
              >
                {sending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
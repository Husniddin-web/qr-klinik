"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MessageSquare,
  X,
  Send,
  User,
  Phone,
  Clock,
  CheckCheck,
  Headphones,
} from "lucide-react";
import { getSocket } from "@/lib/socket";
import { apiClient } from "@/lib/api-client";

interface Message {
  _id?: string;
  conversationId: string;
  sender: "user" | "admin";
  text: string;
  isRead?: boolean;
  createdAt: string;
}

const STORAGE_KEY = "qr_clinic_chat_session_v1";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // User details
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [conversationId, setConversationId] = useState("");

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Restore or init session from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let session = "";
      if (stored) {
        const parsed = JSON.parse(stored);
        session = parsed.sessionId || "";
        setSessionId(session);
        setUserName(parsed.userName || "");
        setUserPhone(parsed.userPhone || "");
        setConversationId(parsed.conversationId || "");
        if (parsed.conversationId) {
          setIsStarted(true);
        }
      } else {
        session = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        setSessionId(session);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ sessionId: session, userName: "", userPhone: "", conversationId: "" })
        );
      }
    } catch {
      // ignore
    }
  }, []);

  // 2. Connect Socket and handle events
  useEffect(() => {
    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    // When conversation is ready from server
    const handleConversationReady = (data: { conversation: any }) => {
      const conv = data.conversation;
      if (conv) {
        setConversationId(conv._id);
        setIsStarted(true);
        if (conv.unreadUserCount && !isOpen) {
          setUnreadCount(conv.unreadUserCount);
        }

        // Save session data
        if (typeof window !== "undefined") {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              sessionId: conv.sessionId,
              userName: conv.userName,
              userPhone: conv.userPhone,
              conversationId: conv._id,
            })
          );
        }

        // Fetch message history
        apiClient
          .get<Message[]>(`/chat/conversations/${conv._id}/messages`)
          .then((res) => {
            if (res.success && Array.isArray(res.data)) {
              setMessages(res.data);
            }
          })
          .catch(() => {});
      }
    };

    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => {
        // avoid duplicate if local ID matches
        if (msg._id && prev.some((m) => m._id === msg._id)) {
          return prev;
        }
        return [...prev, msg];
      });

      if (!isOpen && msg.sender === "admin") {
        setUnreadCount((c) => c + 1);
      } else if (isOpen && msg.sender === "admin" && conversationId) {
        socket.emit("mark_read", { conversationId, reader: "user" });
      }
    };

    const handleUserTyping = (data: { sender: string; isTyping: boolean }) => {
      if (data.sender === "admin") {
        setIsAdminTyping(data.isTyping);
      }
    };

    const handleMessagesRead = (data: { reader: string }) => {
      if (data.reader === "admin") {
        setMessages((prev) =>
          prev.map((m) => (m.sender === "user" ? { ...m, isRead: true } : m))
        );
      }
    };

    socket.on("conversation_ready", handleConversationReady);
    socket.on("new_message", handleNewMessage);
    socket.on("user_typing", handleUserTyping);
    socket.on("messages_read", handleMessagesRead);

    return () => {
      socket.off("conversation_ready", handleConversationReady);
      socket.off("new_message", handleNewMessage);
      socket.off("user_typing", handleUserTyping);
      socket.off("messages_read", handleMessagesRead);
    };
  }, [isOpen, conversationId]);

  // Re-join if already has session
  useEffect(() => {
    if (sessionId && isStarted) {
      const socket = getSocket();
      socket.emit("user_join", { sessionId, userName, userPhone });
    }
  }, [sessionId, isStarted, userName, userPhone]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isAdminTyping]);

  // Handle open widget
  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setUnreadCount(0);
      if (conversationId) {
        const socket = getSocket();
        socket.emit("mark_read", { conversationId, reader: "user" });
      }
    }
  };

  // Start chat session
  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsConnecting(true);
    const socket = getSocket();

    socket.emit("user_join", {
      sessionId,
      userName: userName.trim(),
      userPhone: userPhone.trim(),
    });

    setIsConnecting(false);
  };

  // Send message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputVal.trim();
    if (!text || !conversationId) return;

    const socket = getSocket();
    socket.emit("send_message", {
      conversationId,
      sender: "user",
      text,
    });

    // notify typing stopped
    socket.emit("typing", {
      conversationId,
      sender: "user",
      isTyping: false,
    });

    setInputVal("");
  };

  // Typing event emission
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);

    if (!conversationId) return;
    const socket = getSocket();

    socket.emit("typing", {
      conversationId,
      sender: "user",
      isTyping: true,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", {
        conversationId,
        sender: "user",
        isTyping: false,
      });
    }, 1500);
  };

  const handleQuickQuestion = (text: string) => {
    setInputVal(text);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* 🌟 Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={toggleOpen}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0f172a] text-white shadow-xl hover:bg-[#1e293b] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
          aria-label="Onlayn chatni ochish"
        >
          <MessageSquare className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1 text-xs font-bold text-white bg-[#dc2626] rounded-full ring-2 ring-white animate-bounce">
              {unreadCount}
            </span>
          )}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>
      )}

      {/* 🌟 Chat Modal Window */}
      {isOpen && (
        <div className="flex flex-col w-[360px] sm:w-[390px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden shrink-0 border border-slate-700">
                <Image
                  src="/main-logo.jpg"
                  alt="Klinika"
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  QAXRAMON-RAXIMJON
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Onlayn Administrator</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleOpen}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {!isStarted ? (
            /* Onboarding Form */
            <div className="flex-1 p-6 flex flex-col justify-center bg-slate-50/50">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#dc2626] mx-auto flex items-center justify-center mb-3">
                  <Headphones className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  Savolingiz bormi?
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Mutaxassislarimiz bilan real vaqtda bog&apos;lanish uchun
                  o&apos;zingizni tanishtiring.
                </p>
              </div>

              <form onSubmit={handleStartChat} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ism-familiyangiz *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Masalan: Sardor Aliyev"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefon raqamingiz (ixtiyoriy)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isConnecting || !userName.trim()}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold transition-all disabled:opacity-50 mt-2 shadow-sm cursor-pointer"
                >
                  {isConnecting ? "Ulanmoqda..." : "Muloqotni boshlash"}
                </button>
              </form>
            </div>
          ) : (
            /* Active Chat View */
            <div className="flex-1 flex flex-col min-h-0 bg-slate-50/40">
              {/* Message Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                {/* Greeting banner */}
                <div className="text-center my-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] bg-slate-200/70 text-slate-600 font-medium">
                    Klinika administratoriga xabar yo&apos;llang
                  </span>
                </div>

                {messages.length === 0 && (
                  <div className="text-center text-xs text-slate-400 py-6">
                    Assalomu alaykum, {userName}! Sizga qanday yordam bera olamiz?
                  </div>
                )}

                {messages.map((msg, idx) => {
                  const isUser = msg.sender === "user";
                  const time = msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "";

                  return (
                    <div
                      key={msg._id || idx}
                      className={`flex flex-col ${
                        isUser ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-[#0f172a] text-white rounded-br-xs"
                            : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                        <div
                          className={`flex items-center gap-1 mt-1 text-[9px] ${
                            isUser ? "text-slate-300 justify-end" : "text-slate-400 justify-start"
                          }`}
                        >
                          <Clock className="w-2.5 h-2.5" />
                          <span>{time}</span>
                          {isUser && msg.isRead && (
                            <CheckCheck className="w-3 h-3 text-emerald-400 ml-0.5" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isAdminTyping && (
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs py-1">
                    <span className="text-[11px] font-medium text-slate-500">
                      Operator yozmoqda
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions (if few messages) */}
              {messages.length < 3 && (
                <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto border-t border-slate-100 bg-white shrink-0 scrollbar-none">
                  {[
                    "Qabulga yozilish",
                    "MRT narxi qancha?",
                    "Ish vaqtingiz?",
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleQuickQuestion(chip)}
                      className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full shrink-0 transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Bar */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={handleInputChange}
                  placeholder="Xabaringizni yozing..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-100 border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none transition-all text-slate-800"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="w-9 h-9 rounded-xl bg-[#dc2626] text-white flex items-center justify-center hover:bg-[#b91c1c] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer shadow-sm"
                  aria-label="Yuborish"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Clock,
  CheckCheck,
  User,
  Radio,
  Sparkles,
} from "lucide-react";
import { getSocket } from "@/lib/socket";
import { apiClient } from "@/lib/api-client";

interface Conversation {
  _id: string;
  sessionId: string;
  userName: string;
  userPhone: string;
  lastMessage: string;
  unreadAdminCount: number;
  unreadUserCount: number;
  status: "active" | "closed";
  createdAt: string;
  updatedAt: string;
}

interface Message {
  _id?: string;
  conversationId: string;
  sender: "user" | "admin";
  text: string;
  isRead?: boolean;
  createdAt: string;
}

const QUICK_REPLIES = [
  "Assalomu alaykum! Sizga qanday yordam bera olamiz?",
  "Qabulga yozilish uchun telefon raqamingizni tasdiqlab yuboring.",
  "MRT tekshiruvi har kuni soat 08:00 dan 20:00 gacha ishlaydi.",
  "Shifokor ko'rigi uchun navbat olindi. Operator tez orada bog'lanadi.",
];

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUnread, setFilterUnread] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active conversation object
  const activeConversation = conversations.find((c) => c._id === activeId);

  // 1. Initial load conversations
  useEffect(() => {
    async function loadConversations() {
      try {
        const res = await apiClient.get<Conversation[]>("/chat/conversations");
        if (res.success && Array.isArray(res.data)) {
          setConversations(res.data);
          if (res.data.length > 0 && !activeId) {
            setActiveId(res.data[0]._id);
          }
        }
      } catch (err) {
        console.error("Failed to load conversations:", err);
      } finally {
        setLoading(false);
      }
    }

    loadConversations();
  }, []);

  // 2. Socket setup for Admin
  useEffect(() => {
    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => {
      setIsConnected(true);
      socket.emit("admin_join");
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    if (socket.connected) {
      setIsConnected(true);
      socket.emit("admin_join");
    }

    // Real-time conversation list updates
    const handleConversationUpdate = (data: {
      conversation: Conversation;
      message?: Message;
    }) => {
      const updatedConv = data.conversation;
      setConversations((prev) => {
        const exists = prev.some((c) => c._id === updatedConv._id);
        let list: Conversation[];
        if (exists) {
          list = prev.map((c) => (c._id === updatedConv._id ? updatedConv : c));
        } else {
          list = [updatedConv, ...prev];
        }
        return list.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    };

    // Real-time new message
    const handleNewMessage = (msg: Message) => {
      if (activeId && msg.conversationId === activeId) {
        setMessages((prev) => {
          if (msg._id && prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });

        if (msg.sender === "user") {
          socket.emit("mark_read", {
            conversationId: activeId,
            reader: "admin",
          });
        }
      }
    };

    // Typing
    const handleUserTyping = (data: {
      conversationId: string;
      sender: string;
      isTyping: boolean;
    }) => {
      if (activeId && data.conversationId === activeId && data.sender === "user") {
        setIsUserTyping(data.isTyping);
      }
    };

    socket.on("admin_conversation_update", handleConversationUpdate);
    socket.on("new_message", handleNewMessage);
    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("admin_conversation_update", handleConversationUpdate);
      socket.off("new_message", handleNewMessage);
      socket.off("user_typing", handleUserTyping);
    };
  }, [activeId]);

  // 3. When activeId changes, join room & fetch messages
  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }

    const socket = getSocket();
    socket.emit("join_conversation", activeId);
    socket.emit("mark_read", { conversationId: activeId, reader: "admin" });

    // Mark locally as read
    setConversations((prev) =>
      prev.map((c) => (c._id === activeId ? { ...c, unreadAdminCount: 0 } : c))
    );

    // Fetch message history
    apiClient
      .get<Message[]>(`/chat/conversations/${activeId}/messages`)
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setMessages(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load messages:", err);
      });

    return () => {
      socket.emit("leave_conversation", activeId);
    };
  }, [activeId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isUserTyping]);

  // Send message from Admin
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputVal).trim();
    if (!text || !activeId) return;

    const socket = getSocket();
    socket.emit("send_message", {
      conversationId: activeId,
      sender: "admin",
      text,
    });

    socket.emit("typing", {
      conversationId: activeId,
      sender: "admin",
      isTyping: false,
    });

    setInputVal("");
  };

  // Handle Typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    if (!activeId) return;

    const socket = getSocket();
    socket.emit("typing", {
      conversationId: activeId,
      sender: "admin",
      isTyping: true,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", {
        conversationId: activeId,
        sender: "admin",
        isTyping: false,
      });
    }, 1500);
  };

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    if (filterUnread && c.unreadAdminCount === 0) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.userName.toLowerCase().includes(q) ||
      (c.userPhone && c.userPhone.includes(q)) ||
      (c.lastMessage && c.lastMessage.toLowerCase().includes(q))
    );
  });

  const totalUnread = conversations.reduce(
    (sum, c) => sum + (c.unreadAdminCount || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#dc2626] uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Jonli Muloqot Markazi
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Onlayn Chat & Bemorlar Murojaati
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Saytdan murojaat qilayotgan bemorlar bilan real vaqtda yozishing
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 shadow-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            <span className="text-slate-700">
              {isConnected ? "WebSocket: Ulangan" : "Ulanmoqda..."}
            </span>
          </div>

          {totalUnread > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-[#dc2626] border border-red-200">
              <span>{totalUnread} ta yangi xabar</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Layout */}
      <div className="h-[calc(100vh-210px)] min-h-[580px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Conversation List */}
        <div className="md:col-span-4 lg:col-span-4 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
          {/* Search and Filters */}
          <div className="p-3.5 border-b border-slate-200 space-y-2 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ism yoki telefon qidirish..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilterUnread(false)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  !filterUnread
                    ? "bg-[#0f172a] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Barchasi ({conversations.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterUnread(true)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterUnread
                    ? "bg-[#dc2626] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                O&apos;qilmagan ({totalUnread})
              </button>
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Muloqotlar yuklanmoqda...
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-300 stroke-1" />
                <p className="text-xs font-semibold text-slate-500">
                  Muloqotlar topilmadi
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Bemor saytdan savol yuborishi bilan bu yerda real vaqtda aks etadi.
                </p>
              </div>
            ) : (
              filteredConversations.map((c) => {
                const isActive = c._id === activeId;
                const time = c.updatedAt
                  ? new Date(c.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "";

                return (
                  <button
                    key={c._id}
                    type="button"
                    onClick={() => setActiveId(c._id)}
                    className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                      isActive
                        ? "bg-white shadow-xs border-l-4 border-l-[#dc2626]"
                        : "hover:bg-slate-100/70 border-l-4 border-l-transparent"
                    }`}
                  >
                    {/* User Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs uppercase">
                        {c.userName ? c.userName.slice(0, 2) : "B"}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4
                          className={`text-xs font-bold truncate ${
                            isActive ? "text-[#0f172a]" : "text-slate-800"
                          }`}
                        >
                          {c.userName}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {time}
                        </span>
                      </div>

                      {c.userPhone && (
                        <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mb-0.5">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{c.userPhone}</span>
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 mt-1">
                        <p className="text-[11px] text-slate-500 truncate">
                          {c.lastMessage || "Muloqot boshlandi"}
                        </p>
                        {c.unreadAdminCount > 0 && (
                          <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-bold bg-[#dc2626] text-white rounded-full min-w-[18px] text-center">
                            {c.unreadAdminCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className="md:col-span-8 lg:col-span-8 flex flex-col h-full bg-slate-50/20">
          {!activeConversation ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <MessageSquare className="w-8 h-8 stroke-1" />
              </div>
              <h3 className="text-sm font-bold text-slate-700">
                Muloqot tanlanmagan
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Chap paneldan kerakli bemorni tanlang va unga javob qaytaring.
              </p>
            </div>
          ) : (
            <>
              {/* Chat Active Header */}
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {activeConversation.userName
                      ? activeConversation.userName.slice(0, 2)
                      : "B"}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0f172a]">
                      {activeConversation.userName}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      {activeConversation.userPhone ? (
                        <a
                          href={`tel:${activeConversation.userPhone}`}
                          className="flex items-center gap-1 hover:text-[#dc2626] transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{activeConversation.userPhone}</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Telefon ko&apos;rsatilmagan
                        </span>
                      )}
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {activeConversation.sessionId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Faol suhbat
                  </span>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-xs text-slate-400 py-10">
                    Hozircha xabarlar yo&apos;q. Bemorga xabar yuboring.
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isAdmin = msg.sender === "admin";
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
                          isAdmin ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                            isAdmin
                              ? "bg-[#0f172a] text-white rounded-br-xs"
                              : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>
                          <div
                            className={`flex items-center gap-1 mt-1 text-[9px] ${
                              isAdmin
                                ? "text-slate-300 justify-end"
                                : "text-slate-400 justify-start"
                            }`}
                          >
                            <Clock className="w-2.5 h-2.5" />
                            <span>{time}</span>
                            {isAdmin && (
                              <CheckCheck
                                className={`w-3 h-3 ml-0.5 ${
                                  msg.isRead ? "text-emerald-400" : "text-slate-400"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}

                {/* User typing notification */}
                {isUserTyping && (
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs py-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-medium text-slate-500">
                      Bemor yozmoqda
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

              {/* Quick reply templates */}
              <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3 h-3 text-[#dc2626]" />
                  Shablonlar:
                </span>
                {QUICK_REPLIES.map((reply, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(reply)}
                    className="px-3 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full shrink-0 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={handleInputChange}
                  placeholder="Bemorga javob yozing... (Enter bosish orqali yuboring)"
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-100 border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none transition-all text-slate-800"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer shadow-sm"
                >
                  <span>Yuborish</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

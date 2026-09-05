"use client";

import { useState, useEffect, useRef, useId } from "react";
import Image from "next/image";
import { Gig, ChatMessage } from "@/lib/gigTypes";

interface PosterChatModalProps {
  gig: Gig | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PosterChatModal({
  gig,
  isOpen,
  onClose,
}: PosterChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headingId = useId();

  // Initialize or restore conversation when gig changes
  useEffect(() => {
    if (!gig) return;

    // Check localStorage for existing conversation for this gig
    const storageKey = `chat_gig_${gig.id}`;
    const saved = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        setMessages(getDefaultMessages(gig));
      }
    } else {
      setMessages(getDefaultMessages(gig));
    }
  }, [gig]);

  // Persist messages to localStorage
  useEffect(() => {
    if (!gig || messages.length === 0) return;
    const storageKey = `chat_gig_${gig.id}`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      // Ignore storage quota errors
    }
  }, [gig, messages]);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !gig) return null;

  const { poster } = gig;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate realistic poster typing and contextual reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const posterReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "poster",
        text: generatePosterReply(text, gig),
        timestamp: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, posterReply]);
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Pre-configured external direct contact links
  const whatsappNumber = poster.whatsapp?.replace(/[^0-9]/g, "") || "";
  const whatsappPreFilled = encodeURIComponent(
    `Hi ${poster.name}, I found your gig "${gig.title}" on Hiremaxxing and would love to connect!`
  );
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappPreFilled}`
    : null;

  const emailSubject = encodeURIComponent(`Inquiry: ${gig.title} via Hiremaxxing`);
  const emailBody = encodeURIComponent(
    `Hi ${poster.name},\n\nI'm reaching out regarding your open gig for "${gig.title}".\n\nI would love to discuss deliverables and share my portfolio.\n\nBest regards,`
  );
  const mailtoUrl = poster.email
    ? `mailto:${poster.email}?subject=${emailSubject}&body=${emailBody}`
    : null;

  const quickPrompts = [
    "👋 Hey! I'm interested and available to start immediately.",
    "📁 Here is my portfolio and recent relevant work.",
    "⏱️ What is your target kickoff date?",
    "💰 Does the budget cover ongoing revisions?",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <div
        className="relative flex flex-col w-full max-w-lg h-[640px] max-h-[92vh] rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 bg-white px-5 py-3.5 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Poster Avatar with Live Status Dot */}
            <div className="relative h-11 w-11 flex-shrink-0 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100">
              <Image
                src={poster.avatar}
                alt={poster.name}
                fill
                sizes="44px"
                className="object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                  poster.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                }`}
                title={poster.status === "online" ? "Online now" : "Away"}
              />
            </div>

            {/* Poster Name & Title */}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 id={headingId} className="text-base font-semibold text-black leading-none">
                  {poster.name}
                </h3>
                {poster.verified && (
                  <svg
                    className="h-4 w-4 text-black fill-current"
                    viewBox="0 0 24 24"
                    aria-label="Verified Client"
                  >
                    <title>Verified Client</title>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {poster.role} · {poster.company}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                ⚡ {poster.responseTime}
              </p>
            </div>
          </div>

          {/* Quick Action Shortcuts (WhatsApp, Email, Close) */}
          <div className="flex items-center gap-1.5">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:border-emerald-600"
                title="Chat directly on WhatsApp"
                aria-label="Open WhatsApp Chat"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.59L5.06 16.27C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.44C16.32 14.32 15.11 13.72 14.88 13.64C14.65 13.56 14.49 13.52 14.32 13.76C14.16 14.01 13.68 14.58 13.53 14.75C13.39 14.91 13.24 14.93 12.99 14.81C12.74 14.68 11.94 14.42 10.99 13.57C10.25 12.91 9.75 12.1 9.6 11.85C9.46 11.6 9.58 11.47 9.71 11.34C9.82 11.23 9.96 11.05 10.08 10.91C10.21 10.76 10.25 10.66 10.33 10.49C10.41 10.33 10.37 10.19 10.31 10.06C10.25 9.94 9.76 8.74 9.56 8.24C9.36 7.76 9.16 7.82 9.01 7.81C8.87 7.81 8.71 7.81 8.54 7.81C8.38 7.81 8.11 7.87 7.89 8.11C7.66 8.36 7.03 8.95 7.03 10.15C7.03 11.35 7.91 12.51 8.03 12.67C8.16 12.84 9.76 15.31 12.21 16.37C12.8 16.62 13.25 16.77 13.61 16.89C14.2 17.07 14.73 17.05 15.16 16.98C15.63 16.91 16.62 16.38 16.82 15.8C17.03 15.22 17.03 14.73 16.97 14.62C16.91 14.52 16.82 14.47 16.57 14.44Z" />
                </svg>
              </a>
            )}

            {mailtoUrl && (
              <a
                href={mailtoUrl}
                className="btn-icon h-8 w-8 text-neutral-600 hover:text-black hover:border-black"
                title="Send Email"
                aria-label="Send direct email"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="btn-icon h-8 w-8 text-neutral-400 hover:text-black hover:border-black"
              aria-label="Close Chat"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Gig Context Bar */}
        <div className="flex items-center justify-between gap-3 bg-neutral-50 px-5 py-2.5 border-b border-neutral-100 flex-shrink-0 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px]">
              Gig
            </span>
            <span className="font-medium text-black truncate">
              {gig.title}
            </span>
          </div>
          <span className="font-semibold text-black bg-white border border-neutral-200 px-2 py-0.5 rounded-full flex-shrink-0">
            {gig.budget}
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5 bg-neutral-50/30">
          <div className="text-center my-2">
            <span className="text-[11px] font-medium text-neutral-400 bg-neutral-100/80 px-2.5 py-1 rounded-full">
              Direct inquiry started today
            </span>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="relative h-7 w-7 flex-shrink-0 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 mb-0.5">
                    <Image
                      src={poster.avatar}
                      alt={poster.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-xs ${
                    isUser
                      ? "bg-black text-white rounded-br-xs"
                      : "bg-white text-neutral-900 border border-neutral-200 rounded-bl-xs"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap break-words">
                    {msg.text}
                  </p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      isUser ? "text-neutral-400" : "text-neutral-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start animate-in fade-in duration-200">
              <div className="relative h-7 w-7 flex-shrink-0 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 mb-0.5">
                <Image
                  src={poster.avatar}
                  alt={poster.name}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-xs flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-neutral-100 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] whitespace-nowrap bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="border-t border-neutral-200 bg-white p-3 flex-shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${poster.name}...`}
              className="flex-1 rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-black placeholder:text-neutral-400 outline-none focus:border-black transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="btn-primary px-3.5 py-2.5 rounded-xl disabled:opacity-40 disabled:hover:bg-black text-sm flex items-center justify-center cursor-pointer"
              title="Send message"
              aria-label="Send message"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Off-platform Fallback Bar */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500 px-1">
            <span>Direct conversation with project creator</span>
            <div className="flex items-center gap-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-600 hover:underline flex items-center gap-0.5"
                >
                  WhatsApp &rarr;
                </a>
              )}
              {mailtoUrl && (
                <a
                  href={mailtoUrl}
                  className="font-medium text-neutral-800 hover:underline flex items-center gap-0.5"
                >
                  Email &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helpers
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getDefaultMessages(gig: Gig): ChatMessage[] {
  return [
    {
      id: `initial-${gig.id}`,
      sender: "poster",
      text: gig.poster.initialGreeting,
      timestamp: formatTime(new Date()),
    },
  ];
}

function generatePosterReply(userText: string, gig: Gig): string {
  const lower = userText.toLowerCase();

  if (lower.includes("portfolio") || lower.includes("work") || lower.includes("link") || lower.includes("github")) {
    return `Awesome, thank you for sharing! I'm reviewing your work now. Since we want to move quickly on "${gig.title}", what's the best email or phone number to reach you for a quick 10-minute intro call?`;
  }

  if (lower.includes("available") || lower.includes("start") || lower.includes("timeline")) {
    return `That's great timing! Our target kickoff is within the next 3-5 days. If you haven't already, please drop your portfolio link or recent samples so our team can review today!`;
  }

  if (lower.includes("budget") || lower.includes("rate") || lower.includes("cost") || lower.includes("price")) {
    return `Our budgeted range is ${gig.budget} for this scope. We're happy to discuss milestones or hourly terms based on your proposal and experience!`;
  }

  return `Thanks for reaching out! I've received your note about "${gig.title}". I'm actively reviewing candidate profiles today — feel free to also reach me directly at ${gig.poster.email || "our team"} or on WhatsApp so we can coordinate next steps!`;
}

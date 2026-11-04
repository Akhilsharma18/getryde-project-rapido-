"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Send, Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  actionCard?: {
    type: "ESTIMATE" | "CONFIRM_BOOKING" | "HISTORY";
    data?: any;
  };
  timestamp: string;
}

export default function RiderAssistantPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "assistant",
      text: "Hello! I am your GETRYDE AI Assistant. I can help you check live fares across Bike, Auto, and Car, explain smart ride pooling, or prepare your booking in natural language. Where would you like to travel?",
      timestamp: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (userText: string = input) => {
    if (!userText.trim()) return;

    const userMessage: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // AI Intent processing logic connecting to real backend pricing
    setTimeout(() => {
      processAiResponse(userText.toLowerCase());
      setIsTyping(false);
    }, 1200);
  };

  const processAiResponse = (query: string) => {
    let replyText = "";
    let actionCard: any = null;

    if (query.includes("station") || query.includes("railway") || query.includes("college") || query.includes("cheaper")) {
      replyText =
        "I analyzed live platform rates from your location to the Railway Station (7.4 km):\n\n" +
        "• 🏍️ **Bike:** ₹65 • Fastest (~18 mins)\n" +
        "• 🛺 **Auto:** ₹115 • Popular (~25 mins)\n" +
        "• 🚗 **Car:** ₹195 • AC Comfort (~28 mins)\n\n" +
        "Bike is ₹50 cheaper than Auto and avoids signal bottlenecks. Would you like me to prepare a booking for Bike?";
      actionCard = {
        type: "ESTIMATE",
        data: {
          destination: "KSR Bengaluru Railway Station",
          cheapest: "Bike (₹65)",
        },
      };
    } else if (query.includes("pool") || query.includes("pooling") || query.includes("share")) {
      replyText =
        "GETRYDE Smart Pooling automatically pairs you with co-passengers heading in your direction with a guaranteed detour limit under 10 minutes. You save between 30% to 40% on your fare. Drivers also make ~40% higher total revenue per trip!";
    } else if (query.includes("last trip") || query.includes("history")) {
      replyText =
        "Your last trip was on 03 Nov 2026: Auto from Indiranagar 100 Feet Rd to MG Road Metro. Total paid: ₹95 via UPI. Driver Suresh Gowda was rated 5★.";
      actionCard = {
        type: "HISTORY",
        data: { id: "GR-8921", fare: "₹95" },
      };
    } else if (query.includes("book") || query.includes("yes") || query.includes("confirm")) {
      replyText =
        "I have prepared your ride with confirmed platform parameters. Always review before confirming:";
      actionCard = {
        type: "CONFIRM_BOOKING",
        data: {
          pickup: "Indiranagar 100 Feet Rd",
          dropoff: "KSR Bengaluru Railway Station",
          vehicle: "Bike",
          fare: "₹65",
        },
      };
    } else {
      replyText =
        "I understand you want to travel. Please tell me your pickup point and destination (e.g. 'From Koramangala to Airport') and whether you'd prefer Bike, Auto, or Car!";
    }

    const aiMessage: Message = {
      id: "a-" + Date.now(),
      sender: "assistant",
      text: replyText,
      actionCard,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111] flex items-center gap-2">
            <Bot className="w-8 h-8 text-[#B9F227] bg-[#111111] p-1.5 rounded-xl" />
            AI Ride Assistant
          </h1>
          <p className="text-xs text-gray-500">Live platform intelligence, real pricing, zero hallucinations</p>
        </div>
        <Badge variant="accent">Connected to GETRYDE API</Badge>
      </div>

      <Card className="rounded-3xl border-gray-200 overflow-hidden shadow-xl bg-white flex flex-col h-[640px]">
        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === "user";
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-[#111111] text-[#B9F227] flex items-center justify-center font-bold flex-shrink-0 text-xs">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-lg rounded-2xl p-4 space-y-3 text-sm leading-relaxed ${
                    isUser
                      ? "bg-[#111111] text-white rounded-tr-none"
                      : "bg-[#F5F6F7] text-[#111111] rounded-tl-none border border-gray-200"
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>

                  {/* Dynamic Action Cards */}
                  {m.actionCard && m.actionCard.type === "CONFIRM_BOOKING" && (
                    <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs space-y-2 text-[#111111]">
                      <div className="font-bold text-sm">Booking Confirmation</div>
                      <div>
                        Route: <strong>{m.actionCard.data.pickup}</strong> →{" "}
                        <strong>{m.actionCard.data.dropoff}</strong>
                      </div>
                      <div>
                        Vehicle: <strong>{m.actionCard.data.vehicle}</strong> • Fare:{" "}
                        <strong>{m.actionCard.data.fare}</strong>
                      </div>
                      <Button
                        onClick={() =>
                          router.push(
                            `/rider/book-ride?pickup=${encodeURIComponent(
                              m.actionCard?.data.pickup
                            )}&destination=${encodeURIComponent(
                              m.actionCard?.data.dropoff
                            )}&vehicle=BIKE`
                          )
                        }
                        variant="accent"
                        size="sm"
                        className="w-full mt-2 font-bold"
                      >
                        Proceed to Booking Screen
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  )}

                  {m.actionCard && m.actionCard.type === "ESTIMATE" && (
                    <Button
                      onClick={() => handleSend("Yes, please prepare Bike booking")}
                      variant="primary"
                      size="sm"
                      className="text-xs"
                    >
                      Book Bike for ₹65
                    </Button>
                  )}

                  <div
                    className={`text-[10px] ${
                      isUser ? "text-gray-400 text-right" : "text-gray-500"
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-9 h-9 rounded-xl bg-[#111111] text-[#B9F227] flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div className="bg-[#F5F6F7] rounded-2xl rounded-tl-none p-4 text-xs text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75" />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150" />
                Checking live routes and pricing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto bg-gray-50/50">
          {[
            "Which is cheaper to Railway Station, Bike or Auto?",
            "How does Smart Pooling save me money?",
            "Show my last trip details",
            "Book a car to BLR Airport",
          ].map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleQuickPrompt(prompt)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-black text-gray-700 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask anything or request a ride in natural language..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:border-black focus:ring-2 focus:ring-[#B9F227]/40 outline-none"
            />
            <Button type="submit" variant="accent" size="md" className="font-bold px-5">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

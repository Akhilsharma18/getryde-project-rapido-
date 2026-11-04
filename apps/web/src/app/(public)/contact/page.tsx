"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="accent">24/7 Support</Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-[#111111] tracking-tight">
            We&apos;re here to help you get moving.
          </h1>
          <p className="text-lg text-gray-600">
            Have questions about fares, partnerships, driver onboarding, or need assistance? Reach out to our dedicated support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B9F227] flex items-center justify-center font-bold flex-shrink-0">
                <Mail className="w-6 h-6 text-[#111111]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111111]">Email Support</h4>
                <p className="text-sm text-gray-500">support@getryde.in</p>
                <p className="text-sm text-gray-500">partnerships@getryde.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#111111] flex items-center justify-center font-bold flex-shrink-0">
                <Phone className="w-6 h-6 text-[#B9F227]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111111]">Phone & WhatsApp Helpline</h4>
                <p className="text-sm text-gray-500">+91 80 4000 9000 (Toll-Free)</p>
                <p className="text-sm text-gray-500">Available 24x7 for active trip assistance</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F6F7] flex items-center justify-center font-bold flex-shrink-0">
                <MapPin className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111111]">Headquarters</h4>
                <p className="text-sm text-gray-500">
                  GETRYDE Technologies Ltd.
                  <br />
                  Level 4, Innovate Tech Park, Koramangala
                  <br />
                  Bengaluru, Karnataka 560034
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Card className="rounded-3xl p-8 border-gray-200">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111]">Message Received!</h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto">
                    Thank you, {name}. Our support team will get back to you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-[#111111]">Send us a message</h3>
                  <div className="space-y-4">
                    <Input
                      label="Your Name"
                      placeholder="e.g. Rahul Sharma"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-700 tracking-wide uppercase">
                        Message / Query
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="How can we assist you today?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#111111] focus:ring-2 focus:ring-[#B9F227]/40 outline-none"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="accent" size="lg" className="w-full font-bold">
                    Submit Message
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

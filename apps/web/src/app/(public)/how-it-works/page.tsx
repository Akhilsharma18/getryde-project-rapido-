import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Zap, Sparkles } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="accent">User Guide</Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-[#111111] tracking-tight">
            How GETRYDE Empowers Your Daily Commute
          </h1>
          <p className="text-lg text-gray-600">
            A step-by-step walkthrough of booking, smart fare negotiation, pooling, and safety.
          </p>
        </div>

        <div className="space-y-12">
          {[
            {
              num: "1",
              title: "Step 1: Set Your Route & Select Vehicle",
              desc: "Enter your pickup location and destination. Choose between Bike (fastest solo trip), Auto (versatile 3-seater), or Car (comfortable AC ride). We calculate real-time distance and estimated duration using live OpenStreetMap routing.",
            },
            {
              num: "2",
              title: "Step 2: Propose Your Fare or Join a Pool",
              desc: "You can accept the suggested fair fare or propose your own price. If you want to save money and don't mind sharing, toggle Smart Pooling to match with passengers along the same route for up to 40% discount.",
            },
            {
              num: "3",
              title: "Step 3: Driver Acceptance or Counter-Offer",
              desc: "Nearby online drivers receive your proposal along with complete route details. A driver can accept immediately, or suggest a minor counter-offer. You have the ultimate freedom to accept or decline before anything is confirmed.",
            },
            {
              num: "4",
              title: "Step 4: Live GPS Tracking & Seamless Payment",
              desc: "Once assigned, track your driver's real-time approach on the interactive map. When the trip finishes, pay securely via Razorpay (UPI, Credit/Debit Card, Net Banking) or Cash. Rate your driver to keep our community safe.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl border border-gray-200 bg-[#F5F6F7]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#111111] text-[#B9F227] flex items-center justify-center font-black text-2xl flex-shrink-0">
                {item.num}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#111111]">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link href="/rider/book-ride">
            <Button variant="accent" size="lg">
              Book a Ride Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

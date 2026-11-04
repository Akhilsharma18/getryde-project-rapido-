"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, ShieldCheck, Clock, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function RiderPoolingPage() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  const activePools = [
    {
      id: "POOL-101",
      route: "HSR Layout Sector 2 → Whitefield ITPL",
      vehicle: "Car (AC Sedan)",
      seatsAvailable: 2,
      totalSeats: 4,
      detourMinutes: 6,
      currentFarePerRider: 165,
      soloFare: 260,
      savings: 95,
      departureTime: "In 15 mins (08:45 AM)",
      passengers: ["Aarav (You)", "Priya S."],
    },
    {
      id: "POOL-102",
      route: "Indiranagar 100 Feet Rd → Manyata Tech Park",
      vehicle: "Car (AC Hatchback)",
      seatsAvailable: 1,
      totalSeats: 3,
      detourMinutes: 8,
      currentFarePerRider: 180,
      soloFare: 290,
      savings: 110,
      departureTime: "In 25 mins (08:55 AM)",
      passengers: ["Vikram R.", "Neha K."],
    },
    {
      id: "POOL-103",
      route: "Koramangala Sony World → Electronic City Phase 1",
      vehicle: "Auto (Pool)",
      seatsAvailable: 1,
      totalSeats: 2,
      detourMinutes: 4,
      currentFarePerRider: 95,
      soloFare: 150,
      savings: 55,
      departureTime: "In 10 mins (08:40 AM)",
      passengers: ["Deepak G."],
    },
  ];

  const handleJoinPool = (id: string) => {
    setSelectedPool(id);
    toast.success(`Matched & Joined ${id}! Redirecting to live tracking...`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#111111] text-white p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="accent">Smart Corridor Match</Badge>
          <h1 className="text-3xl font-black tracking-tight">Smart Ride Pooling</h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Match with verified commuters traveling along your exact route. Cut your travel costs
            by up to 40% with guaranteed maximum 10-minute detour caps.
          </p>
        </div>
        <Link href="/rider/book-ride">
          <Button variant="accent" size="lg" className="font-bold flex-shrink-0">
            Create Custom Pool
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Corridor Pooling Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#111111]">Active Shared Corridors Near You</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {activePools.map((pool) => (
            <Card
              key={pool.id}
              className={`rounded-3xl border-2 p-6 flex flex-col justify-between transition-all ${
                selectedPool === pool.id
                  ? "border-[#B9F227] bg-[#B9F227]/5 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gray-500">{pool.id}</span>
                  <Badge variant="accent">{pool.departureTime}</Badge>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#111111] leading-snug">{pool.route}</h3>
                  <div className="text-xs text-gray-500 mt-1">{pool.vehicle}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F5F6F7] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Seats Open:</span>
                    <strong className="text-emerald-700">
                      {pool.seatsAvailable} of {pool.totalSeats} seats left
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Max Detour Time:</span>
                    <strong className="text-gray-900">+{pool.detourMinutes} mins max</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-xs text-gray-400 line-through">₹{pool.soloFare} solo</div>
                    <div className="text-2xl font-black text-[#111111]">₹{pool.currentFarePerRider}</div>
                  </div>
                  <Badge variant="success">Save ₹{pool.savings}</Badge>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => handleJoinPool(pool.id)}
                  variant="primary"
                  size="md"
                  className="w-full font-bold"
                >
                  Join This Pool
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

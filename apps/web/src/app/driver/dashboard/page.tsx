"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  ArrowRight,
  Radio,
  Percent,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function DriverDashboardPage() {
  const [incomingRequest, setIncomingRequest] = useState<any>({
    id: "REQ-7819",
    pickup: "Indiranagar 100 Feet Rd (0.8 km away)",
    destination: "Koramangala 4th Block (6.2 km total)",
    vehicle: "Auto",
    riderOffer: 140,
    platformFeePercent: 15,
    platformFeeAmount: 21,
    driverPayout: 119,
    riderName: "Neha K. (4.9★)",
    expiresInSeconds: 28,
  });

  const [counterValue, setCounterValue] = useState(130);
  const [showCounterInput, setShowCounterInput] = useState(false);

  const handleAcceptRequest = () => {
    toast.success(`Accepted ride ${incomingRequest.id} for ₹${incomingRequest.driverPayout} payout!`);
    setIncomingRequest(null);
  };

  const handleRejectRequest = () => {
    toast.info("Ride request declined");
    setIncomingRequest(null);
  };

  const handleSendCounter = () => {
    toast.success(`Counter-offer of ₹${counterValue} sent to rider!`);
    setShowCounterInput(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Active Driver Session
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111] mt-1">
            Rajesh Kumar (Auto • KA-03-AA-9988)
          </h1>
        </div>

        <Link href="/driver/active-ride">
          <Button variant="accent" size="md" className="font-bold">
            View Live Route Map
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl p-5 border-gray-200 bg-white">
          <div className="text-xs font-bold text-gray-500 uppercase">Today&apos;s Net Earnings</div>
          <div className="text-3xl font-black text-[#111111] mt-2">₹1,840.00</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">11 Completed Trips</div>
        </Card>

        <Card className="rounded-2xl p-5 border-gray-200 bg-white">
          <div className="text-xs font-bold text-gray-500 uppercase">This Week&apos;s Total</div>
          <div className="text-3xl font-black text-[#111111] mt-2">₹12,450.00</div>
          <div className="text-xs text-gray-500 font-medium mt-1">100% Settled to Bank</div>
        </Card>

        <Card className="rounded-2xl p-5 border-gray-200 bg-white">
          <div className="text-xs font-bold text-gray-500 uppercase">Driver Rating</div>
          <div className="text-3xl font-black text-amber-500 mt-2 flex items-center gap-1">
            4.92 <Star className="w-6 h-6 fill-amber-500" />
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Based on 840 ratings</div>
        </Card>

        <Card className="rounded-2xl p-5 border-gray-200 bg-white">
          <div className="text-xs font-bold text-gray-500 uppercase">Platform Commission</div>
          <div className="text-3xl font-black text-[#111111] mt-2">15%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Guaranteed Flat Rate</div>
        </Card>
      </div>

      {/* Live Incoming Ride Request Card */}
      {incomingRequest ? (
        <Card className="rounded-3xl border-2 border-[#111111] bg-[#111111] text-white p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B9F227] text-[#111111] flex items-center justify-center font-bold">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Incoming Ride Request</h3>
                <p className="text-xs text-gray-400">Rider: {incomingRequest.riderName}</p>
              </div>
            </div>
            <Badge variant="accent">Expires in {incomingRequest.expiresInSeconds}s</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Route */}
            <div className="space-y-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Pickup</div>
                  <div className="text-sm font-bold text-gray-100">{incomingRequest.pickup}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Drop-off</div>
                  <div className="text-sm font-bold text-gray-100">{incomingRequest.destination}</div>
                </div>
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="space-y-2 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Rider Proposed Fare:</span>
                <span className="font-bold text-white">₹{incomingRequest.riderOffer}.00</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Platform Commission (15%):</span>
                <span>- ₹{incomingRequest.platformFeeAmount}.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm font-bold">
                <span className="text-[#B9F227]">Your Net Take-Home Payout:</span>
                <span className="text-2xl text-[#B9F227] font-black">
                  ₹{incomingRequest.driverPayout}.00
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {showCounterInput ? (
            <div className="p-4 bg-neutral-900 rounded-2xl space-y-3">
              <label className="text-xs font-bold text-gray-300 uppercase">
                Propose Counter-Offer to Rider (₹)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={counterValue}
                  onChange={(e) => setCounterValue(Number(e.target.value))}
                  className="w-full text-xl font-bold bg-neutral-800 text-white px-4 py-2 rounded-xl outline-none border border-neutral-700"
                />
                <Button onClick={handleSendCounter} variant="accent" size="md" className="font-bold">
                  Send Counter
                </Button>
                <Button
                  onClick={() => setShowCounterInput(false)}
                  variant="outline"
                  size="md"
                  className="border-neutral-700 text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={handleAcceptRequest}
                variant="accent"
                size="lg"
                className="w-full font-bold shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Accept ₹{incomingRequest.driverPayout}
              </Button>
              <Button
                onClick={() => setShowCounterInput(true)}
                variant="outline"
                size="lg"
                className="border-neutral-700 text-white hover:bg-neutral-800"
              >
                <Percent className="w-4 h-4 mr-2" />
                Counter-Offer
              </Button>
              <Button
                onClick={handleRejectRequest}
                variant="ghost"
                size="lg"
                className="text-red-400 hover:bg-red-950/40"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Decline
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <Card className="rounded-3xl border-gray-200 p-8 text-center bg-white space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-[#111111]">Looking for nearby riders...</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            You are online and positioned in high-demand zone Koramangala. New requests will appear
            instantly.
          </p>
        </Card>
      )}

      {/* Quick History */}
      <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#111111]">Recent Completed Trips</h3>
          <Link href="/driver/history">
            <Button variant="ghost" size="sm">
              View All History
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {[
            {
              id: "TRIP-401",
              time: "12:15 PM",
              route: "Indiranagar → Commercial Street (4.2 km)",
              fare: "₹110",
              net: "₹93.50",
            },
            {
              id: "TRIP-400",
              time: "11:20 AM",
              route: "Domlur Flyover → MG Road (3.8 km)",
              fare: "₹95",
              net: "₹80.75",
            },
            {
              id: "TRIP-399",
              time: "10:05 AM",
              route: "Koramangala 1st Block → HSR Layout (5.1 km)",
              fare: "₹130",
              net: "₹110.50",
            },
          ].map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#111111]">{item.route}</span>
                <div className="text-gray-400">
                  {item.id} • {item.time}
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-700">{item.net} Net</span>
                <div className="text-gray-400">Gross: {item.fare}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

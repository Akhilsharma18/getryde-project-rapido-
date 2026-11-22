"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Bike,
  Navigation,
  ArrowRight,
  Clock,
  MapPin,
  Shield,
  Bot,
  CreditCard,
  Plus,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export default function RiderDashboardPage() {
  const { user } = useAuthStore();

  const recentRides = [
    {
      id: "GR-8921",
      date: "Today, 10:30 AM",
      pickup: "udhampur , bus- stand , jk ",
      dropoff: "Manwal akhil home , jk",
      vehicle: "Auto",
      fare: "₹95",
      status: "COMPLETED",
    },
    {
      id: "GR-7412",
      date: "Yesterday, 07:15 PM",
      pickup: "udhampur , jammu kashmir",
      dropoff: "jammu , jammu kashmir",
      vehicle: "Bike",
      fare: "₹55",
      status: "COMPLETED",
    },
    {
      id: "GR-6309",
      date: "28 Oct, 09:00 AM",
      pickup: "Whitefield ITPL",
      dropoff: "Bellandur EcoSpace",
      vehicle: "Car (Pool)",
      fare: "₹140",
      status: "COMPLETED",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-[#111111] text-white p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <Badge variant="accent">Rider Hub</Badge>
          <h1 className="text-3xl font-black tracking-tight">
            Hello, {user?.name || "Akhil"} 👋
          </h1>
          <p className="text-gray-400 text-sm max-w-lg">
            Where would you like to travel today? Propose your fair price or split costs with smart
            pooling.
          </p>
        </div>
        <div className="flex gap-3 relative z-10">
          <Link href="/rider/book-ride">
            <Button variant="accent" size="lg" className="font-bold">
              Book a Ride
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/rider/assistant">
            <Button variant="outline" size="lg" className="border-neutral-700 text-white hover:bg-neutral-800">
              <Bot className="w-4 h-4 mr-2 text-[#B9F227]" />
              AI Assistant
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl p-5 border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Total Trips Taken
          </div>
          <div className="text-3xl font-black text-[#111111] mt-2">28</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">4.9 Rider Rating</div>
        </Card>

        <Card className="rounded-2xl p-5 border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Pooling Savings
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2">₹1,420</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Saved across 12 shared trips</div>
        </Card>

        <Card className="rounded-2xl p-5 border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            GETRYDE Wallet
          </div>
          <div className="text-3xl font-black text-[#111111] mt-2">₹450</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Ready for 1-tap checkout</div>
        </Card>

        <Card className="rounded-2xl p-5 border-gray-200">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Safety Contacts
          </div>
          <div className="text-3xl font-black text-[#111111] mt-2">2 Active</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Live SOS Ready</div>
        </Card>
      </div>

      {/* Main Grid: Book Shortcut & Saved Places */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Rides Table */}
        <div className="lg:col-span-8">
          <Card className="rounded-3xl border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#111111]">Recent Journeys</h3>
                <p className="text-xs text-gray-500">Your latest completed rides and receipts</p>
              </div>
              <Link href="/rider/rides">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {recentRides.map((ride) => (
                <div key={ride.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F6F7] flex items-center justify-center font-bold text-xs text-[#111111]">
                      {ride.vehicle === "Bike" ? "🏍️" : ride.vehicle === "Auto" ? "🛺" : "🚗"}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#111111]">
                        {ride.pickup} → {ride.dropoff}
                      </div>
                      <div className="text-xs text-gray-500">
                        {ride.date} • {ride.vehicle}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-[#111111]">{ride.fare}</div>
                    <Badge variant="success" className="text-[10px]">
                      {ride.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Destinations / Saved Locations */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-3xl border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#111111]">Saved Locations</h3>
              <button className="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                Add New
              </button>
            </div>

            <div className="space-y-3">
              <Link
                href="/rider/book-ride?destination=Home"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F6F7] hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs">
                    🏠
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#111111]">Home</div>
                    <div className="text-xs text-gray-500">Indiranagar 12th Main</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link
                href="/rider/book-ride?destination=Office"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F6F7] hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs">
                    💼
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#111111]">Office</div>
                    <div className="text-xs text-gray-500">Embassy Golf Links (EGL)</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </Card>

          {/* Safety SOS Quick Card */}
          <Card className="rounded-3xl border border-red-200 bg-red-50/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <Shield className="w-5 h-5 text-red-600" />
              Safety Command
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              In any uncomfortable or emergency scenario, tap to dispatch live location to local
              police and your 2 emergency contacts.
            </p>
            <Link href="/safety">
              <Button variant="danger" size="sm" className="w-full font-bold">
                Emergency Assistance
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

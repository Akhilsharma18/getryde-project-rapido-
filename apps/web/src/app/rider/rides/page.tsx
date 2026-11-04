"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, Search, MapPin, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

export default function RiderRidesPage() {
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "CANCELLED">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const rides = [
    {
      id: "GR-8921",
      date: "03 Nov 2026, 10:30 AM",
      pickup: "Udhampur, jammu and kashmir",
      dropoff: "manwal , jammu and kashmir",
      vehicle: "Auto",
      driver: "Suresh Gowda",
      rating: 5,
      fare: 95,
      method: "UPI",
      status: "COMPLETED",
    },
    {
      id: "GR-7412",
      date: "02 Nov 2026, 07:15 PM",
      pickup: "udhampur , jammu and kashmir",
      dropoff: "manwal , jammu and kashmir",
      vehicle: "Bike",
      driver: "Ramesh K.",
      rating: 4,
      fare: 55,
      method: "Cash",
      status: "COMPLETED",
    },
    {
      id: "GR-6309",
      date: "28 Oct 2026, 09:00 AM",
      pickup: "Whitefield ITPL, Bengaluru",
      dropoff: "Bellandur EcoSpace, Bengaluru",
      vehicle: "Car (Pool)",
      driver: "Anil Kumar",
      rating: 5,
      fare: 140,
      method: "Card",
      status: "COMPLETED",
    },
    {
      id: "GR-5120",
      date: "24 Oct 2026, 11:20 PM",
      pickup: "Kalyan Nagar, Bengaluru",
      dropoff: "Hebbal Flyover, Bengaluru",
      vehicle: "Car",
      driver: "None",
      rating: null,
      fare: 210,
      method: "UPI",
      status: "CANCELLED",
    },
  ];

  const filteredRides = rides.filter((ride) => {
    if (filter !== "ALL" && ride.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        ride.id.toLowerCase().includes(term) ||
        ride.pickup.toLowerCase().includes(term) ||
        ride.dropoff.toLowerCase().includes(term) ||
        ride.driver.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">My Rides</h1>
          <p className="text-xs text-gray-500">Track and view invoices for all your past journeys</p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-gray-200">
          {(["ALL", "COMPLETED", "CANCELLED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filter === tab ? "bg-[#111111] text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {tab === "ALL" ? "All Trips" : tab === "COMPLETED" ? "Completed" : "Cancelled"}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search by trip ID, address, or driver name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-black outline-none"
        />
      </div>

      {/* Rides List */}
      <div className="space-y-4">
        {filteredRides.map((ride) => (
          <Card key={ride.id} className="rounded-2xl border-gray-200 p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-gray-500">{ride.id}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {ride.date}
                </span>
                <Badge variant={ride.status === "COMPLETED" ? "success" : "danger"}>
                  {ride.status}
                </Badge>
              </div>
              <div className="text-lg font-black text-[#111111]">₹{ride.fare}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-400">Pickup:</span> {ride.pickup}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-400">Drop-off:</span> {ride.dropoff}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end justify-between gap-3 text-xs">
                <div className="text-gray-500">
                  Vehicle: <strong className="text-black">{ride.vehicle}</strong> • Driver:{" "}
                  <strong className="text-black">{ride.driver}</strong>
                </div>

                <div className="flex items-center gap-2">
                  {ride.rating && (
                    <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {ride.rating}.0
                    </div>
                  )}
                  {ride.status === "COMPLETED" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success(`Downloading invoice for ${ride.id}...`)}
                      className="text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Invoice
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

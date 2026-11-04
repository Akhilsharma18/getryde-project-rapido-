"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, Search, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function DriverHistoryPage() {
  const [trips] = useState([
    {
      id: "TRIP-401",
      date: "03 Nov 2026, 12:15 PM",
      rider: "Aditi V.",
      route: "Indiranagar 100ft → Commercial St (4.2 km)",
      gross: 110,
      commission: 16.5,
      net: 93.5,
      rating: 5,
      status: "COMPLETED",
    },
    {
      id: "TRIP-400",
      date: "03 Nov 2026, 11:20 AM",
      rider: "Rahul M.",
      route: "Domlur Flyover → MG Road (3.8 km)",
      gross: 95,
      commission: 14.25,
      net: 80.75,
      rating: 5,
      status: "COMPLETED",
    },
    {
      id: "TRIP-399",
      date: "03 Nov 2026, 10:05 AM",
      rider: "Siddharth B.",
      route: "Koramangala 1st Block → HSR Layout (5.1 km)",
      gross: 130,
      commission: 19.5,
      net: 110.5,
      rating: 4,
      status: "COMPLETED",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Trip History & Invoices</h1>
          <p className="text-xs text-gray-500">Full logs of completed journeys, commissions, and ratings</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Trip log statement downloaded")}
          className="text-xs"
        >
          <Download className="w-3.5 h-3.5 mr-1" />
          Export All
        </Button>
      </div>

      <div className="space-y-4">
        {trips.map((trip) => (
          <Card key={trip.id} className="rounded-2xl border-gray-200 p-6 bg-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gray-500">{trip.id}</span>
                <span className="text-xs text-gray-500">• {trip.date}</span>
                <Badge variant="success">{trip.status}</Badge>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-current" />
                {trip.rating}.0
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
              <div>
                <div className="text-sm font-bold text-gray-900">{trip.route}</div>
                <div className="text-gray-500">Passenger: {trip.rider}</div>
              </div>

              <div className="text-right">
                <div className="text-base font-black text-emerald-700">₹{trip.net} Net</div>
                <div className="text-gray-400">
                  Gross: ₹{trip.gross} (Fee: -₹{trip.commission})
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

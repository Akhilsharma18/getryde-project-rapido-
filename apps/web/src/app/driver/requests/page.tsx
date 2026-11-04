"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radio, MapPin, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DriverRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState([
    {
      id: "REQ-9901",
      rider: "Rahul S. (4.8★)",
      pickup: "Koramangala 5th Block",
      destination: "Indiranagar 12th Main",
      distance: "4.8 km",
      offerFare: 110,
      payout: 93.5,
      vehicle: "Auto",
      eta: "3 mins away",
    },
    {
      id: "REQ-9902",
      rider: "Deepa M. (4.9★)",
      pickup: "Domlur Flyover Signal",
      destination: "MG Road Metro Station",
      distance: "3.5 km",
      offerFare: 90,
      payout: 76.5,
      vehicle: "Auto",
      eta: "5 mins away",
    },
  ]);

  const handleAccept = (req: any) => {
    toast.success(`Accepted ${req.id} for ₹${req.payout} net! Navigating to active ride HUD...`);
    setTimeout(() => {
      router.push("/driver/active-ride");
    }, 1000);
  };

  const handleDecline = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
    toast.info("Request dismissed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Live Ride Requests</h1>
        <p className="text-xs text-gray-500">Nearby riders broadcasting proposals within a 3km radius</p>
      </div>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card className="rounded-3xl border-gray-200 p-12 text-center bg-white space-y-3">
            <Radio className="w-8 h-8 text-gray-400 mx-auto animate-pulse" />
            <h3 className="text-base font-bold text-gray-700">No active broadcast requests right now</h3>
            <p className="text-xs text-gray-400">Keep your app open; requests appear in real time</p>
          </Card>
        ) : (
          requests.map((req) => (
            <Card key={req.id} className="rounded-3xl border-gray-200 p-6 bg-white space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-gray-500">{req.id}</span>
                  <span className="text-xs font-bold text-black">{req.rider}</span>
                </div>
                <Badge variant="accent">{req.eta}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                    <div>
                      <span className="text-gray-400">Pickup:</span> {req.pickup}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-red-500 mt-0.5" />
                    <div>
                      <span className="text-gray-400">Drop-off:</span> {req.destination}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-center">
                  <div className="text-xs text-gray-400">Total Payout (After 15% Comm)</div>
                  <div className="text-2xl font-black text-emerald-700">₹{req.payout}</div>
                  <div className="text-[11px] text-gray-400">Rider Fare: ₹{req.offerFare}</div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Button onClick={() => handleAccept(req)} variant="accent" size="md" className="w-full font-bold">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Accept Request
                </Button>
                <Button onClick={() => handleDecline(req.id)} variant="outline" size="md" className="w-full">
                  <XCircle className="w-4 h-4 mr-2 text-gray-500" />
                  Dismiss
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

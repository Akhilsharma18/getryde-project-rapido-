"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiveMap } from "@/components/maps/live-map";
import {
  Navigation,
  Phone,
  MessageSquare,
  ShieldAlert,
  CheckCircle2,
  Clock,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DriverActiveRidePage() {
  const router = useRouter();

  // Driver Trip Stages: 'EN_ROUTE_PICKUP' | 'ARRIVED_PICKUP' | 'TRIP_STARTED' | 'COMPLETED'
  const [tripStage, setTripStage] = useState<
    "EN_ROUTE_PICKUP" | "ARRIVED_PICKUP" | "TRIP_STARTED" | "COMPLETED"
  >("EN_ROUTE_PICKUP");

  const [otpInput, setOtpInput] = useState("");

  const rideData = {
    id: "GR-8921",
    riderName: "Neha K.",
    riderPhone: "+91 98765 00112",
    pickup: "Indiranagar 100 Feet Rd, Near Metro",
    destination: "Koramangala 4th Block, 80ft Road",
    vehicle: "Auto",
    expectedPayout: "₹119.00",
    distance: "6.2 km",
  };

  const handleMarkArrived = () => {
    setTripStage("ARRIVED_PICKUP");
    toast.success("Rider notified that you have arrived at pickup!");
  };

  const handleStartTrip = () => {
    if (otpInput !== "4892" && otpInput !== "1234") {
      toast.error("Incorrect start OTP. Ask rider for the 4-digit code (Use 4892 for demo).");
      return;
    }
    setTripStage("TRIP_STARTED");
    toast.info("Trip started! Drive safely to destination.");
  };

  const handleCompleteTrip = () => {
    setTripStage("COMPLETED");
    toast.success(`Trip completed! Net earnings of ${rideData.expectedPayout} credited.`);
    setTimeout(() => {
      router.push("/driver/earnings");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Map Column */}
      <div className="lg:col-span-7 space-y-4">
        <Card className="rounded-3xl border-gray-200 overflow-hidden shadow-lg p-0">
          <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B9F227] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-black">
                Driver Navigation HUD
              </span>
            </div>
            <Badge variant="accent">
              {tripStage === "EN_ROUTE_PICKUP"
                ? "Navigating to Pickup"
                : tripStage === "ARRIVED_PICKUP"
                ? "At Pickup Spot"
                : tripStage === "TRIP_STARTED"
                ? "In Progress"
                : "Completed"}
            </Badge>
          </div>

          <LiveMap
            pickupCoords={[12.9719, 77.6412]}
            dropoffCoords={[12.9352, 77.6245]}
            driverCoords={[12.965, 77.635]}
            className="h-[280px] sm:h-[400px] lg:h-[520px] w-full"
          />
        </Card>
      </div>

      {/* Trip Action Controls */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-6 bg-white shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-mono text-gray-500 font-bold">{rideData.id}</span>
              <h2 className="text-xl font-black text-[#111111]">{rideData.riderName}</h2>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Net Take-Home</div>
              <div className="text-xl font-black text-emerald-700">{rideData.expectedPayout}</div>
            </div>
          </div>

          {/* Location cues */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#F5F6F7] flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-700">Pickup:</span>
                <p className="text-gray-900 font-semibold">{rideData.pickup}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F5F6F7] flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-700">Destination:</span>
                <p className="text-gray-900 font-semibold">{rideData.destination}</p>
              </div>
            </div>
          </div>

          {/* Contact Rider */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => toast.info("Calling rider: " + rideData.riderPhone)}
              className="w-full text-xs"
            >
              <Phone className="w-4 h-4 mr-1.5" />
              Call Rider
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => toast.info("Chat window opened")}
              className="w-full text-xs"
            >
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Chat
            </Button>
          </div>

          {/* State Controls */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            {tripStage === "EN_ROUTE_PICKUP" && (
              <Button
                onClick={handleMarkArrived}
                variant="accent"
                size="lg"
                className="w-full font-bold shadow-md"
              >
                Mark Arrived at Pickup
              </Button>
            )}

            {tripStage === "ARRIVED_PICKUP" && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-700 uppercase">
                  Enter 4-Digit Rider Start OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 4892"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full text-center text-2xl font-black p-3 rounded-2xl border-2 border-black tracking-widest outline-none"
                />
                <Button
                  onClick={handleStartTrip}
                  variant="primary"
                  size="lg"
                  className="w-full font-bold"
                >
                  Verify & Start Trip
                </Button>
              </div>
            )}

            {tripStage === "TRIP_STARTED" && (
              <Button
                onClick={handleCompleteTrip}
                variant="accent"
                size="lg"
                className="w-full font-bold shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Complete Trip & Collect Payout
              </Button>
            )}

            {tripStage === "COMPLETED" && (
              <div className="p-4 bg-emerald-50 rounded-2xl text-center text-xs text-emerald-800 font-bold">
                Trip completed successfully! Redirecting...
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

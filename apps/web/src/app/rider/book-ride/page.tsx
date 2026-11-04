"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LiveMap } from "@/components/maps/live-map";
import {
  Bike,
  Car,
  Navigation,
  MapPin,
  ArrowRight,
  Shield,
  Users,
  Percent,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Phone,
  MessageSquare,
  CreditCard,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { VehicleCategory, RideStatus } from "@getryde/shared";
import { apiClient } from "@/services/api-client";

function BookRideContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Inputs
  const [pickup, setPickup] = useState(
    searchParams.get("pickup") || "udhampur , jammu and kashmir"
  );
  const [destination, setDestination] = useState(
    searchParams.get("destination") || "manwal , jammu and kashmir"
  );
  const [vehicle, setVehicle] = useState<VehicleCategory>(
    (searchParams.get("vehicle") as VehicleCategory) || VehicleCategory.AUTO
  );

  // Flow State: 'PLANNING' | 'NEGOTIATING' | 'MATCHING' | 'ASSIGNED' | 'IN_TRIP' | 'PAYMENT' | 'RATING'
  const [flowState, setFlowState] = useState<
    "PLANNING" | "NEGOTIATING" | "MATCHING" | "ASSIGNED" | "IN_TRIP" | "PAYMENT" | "RATING"
  >("PLANNING");

  // Options
  const [isPooling, setIsPooling] = useState(false);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [customOffer, setCustomOffer] = useState<number>(0);
  const [counterOffer, setCounterOffer] = useState<number | null>(null);

  // Estimates
  const distanceKm = 6.4;
  const durationMins = 24;

  const getBaseFare = (cat: VehicleCategory) => {
    switch (cat) {
      case VehicleCategory.BIKE:
        return 65;
      case VehicleCategory.AUTO:
        return 120;
      case VehicleCategory.CAR:
        return 210;
    }
  };

  const calculatedBaseFare = getBaseFare(vehicle);
  const effectiveFare = isPooling
    ? Math.round(calculatedBaseFare * 0.7) // 30% discount
    : isNegotiating && customOffer > 0
    ? customOffer
    : calculatedBaseFare;

  // Driver details once assigned
  const [assignedDriver, setAssignedDriver] = useState<any>(null);
  const [driverLocation, setDriverLocation] = useState<[number, number]>([12.978, 77.64]);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  // Map coordinates
  const pickupCoords: [number, number] = [12.9719, 77.6412];
  const dropoffCoords: [number, number] = [12.9352, 77.6245];

  const handleStartBooking = () => {
    if (!pickup || !destination) {
      toast.error("Please enter both pickup and destination addresses");
      return;
    }

    if (isNegotiating) {
      setFlowState("NEGOTIATING");
    } else {
      setFlowState("MATCHING");
      simulateDriverMatching();
    }
  };

  const simulateDriverMatching = (agreedFare: number = effectiveFare) => {
    toast.info("Broadcasting ride request to nearby drivers...");
    setTimeout(() => {
      setAssignedDriver({
        name: "Suresh Gowda",
        phone: "+91 98450 12345",
        rating: 4.9,
        vehicleModel: vehicle === "BIKE" ? "Hero Splendor (KA-01-EQ-4421)" : vehicle === "AUTO" ? "Bajaj RE Auto (KA-03-AA-9988)" : "Maruti Dzire (KA-05-MM-1204)",
        fare: agreedFare,
        etaMinutes: 3,
      });
      setFlowState("ASSIGNED");
      toast.success("Driver assigned! Suresh is on his way.");
    }, 3000);
  };

  const handleSendCustomOffer = () => {
    if (customOffer < calculatedBaseFare * 0.7) {
      toast.error(`Offer cannot be lower than ₹${Math.round(calculatedBaseFare * 0.7)} (minimum floor)`);
      return;
    }
    if (customOffer > calculatedBaseFare * 1.5) {
      toast.error(`Offer cannot be higher than ₹${Math.round(calculatedBaseFare * 1.5)}`);
      return;
    }

    toast.info("Sending your offer to 5 nearby drivers...");
    setTimeout(() => {
      // Simulate driver counter-offer
      const driverCounter = Math.round((customOffer + calculatedBaseFare) / 2);
      setCounterOffer(driverCounter);
      toast.warning(`Driver Rajesh sent a counter-offer of ₹${driverCounter}`);
    }, 2500);
  };

  const handleAcceptCounterOffer = () => {
    if (counterOffer) {
      toast.success(`Accepted counter-offer of ₹${counterOffer}!`);
      setFlowState("MATCHING");
      simulateDriverMatching(counterOffer);
    }
  };

  const handleStartTrip = () => {
    setFlowState("IN_TRIP");
    toast.info("Trip started. Have a safe journey!");
  };

  const handleCompleteTrip = () => {
    setFlowState("PAYMENT");
    toast.success("Destination reached! Please complete payment.");
  };

  const handlePayment = (method: string) => {
    toast.success(`Payment of ₹${assignedDriver?.fare || effectiveFare} via ${method} successful!`);
    setFlowState("RATING");
  };

  const handleSubmitRating = () => {
    toast.success("Thank you for rating your ride!");
    router.push("/rider/rides");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Interactive Map & Live Tracking */}
      <div className="lg:col-span-7 space-y-4">
        <Card className="rounded-3xl border-gray-200 overflow-hidden shadow-lg p-0">
          <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Live Route & Driver Location
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500">
              {distanceKm} km • ~{durationMins} mins
            </div>
          </div>
          <LiveMap
            pickupCoords={pickupCoords}
            dropoffCoords={dropoffCoords}
            driverCoords={flowState === "ASSIGNED" || flowState === "IN_TRIP" ? driverLocation : undefined}
            className="h-[280px] sm:h-[400px] lg:h-[520px] w-full"
          />
        </Card>

        {/* Live Status Pill when on trip */}
        {(flowState === "ASSIGNED" || flowState === "IN_TRIP") && (
          <div className="bg-[#111111] text-white p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#B9F227] text-[#111111] flex items-center justify-center font-bold">
                {flowState === "ASSIGNED" ? <Clock className="w-5 h-5" /> : <Navigation className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {flowState === "ASSIGNED" ? "Driver Arriving in 3 mins" : "On the way to destination"}
                </div>
                <div className="text-xs text-gray-400">
                  {assignedDriver?.vehicleModel}
                </div>
              </div>
            </div>
            {flowState === "ASSIGNED" && (
              <Button variant="accent" size="sm" onClick={handleStartTrip}>
                Start Trip
              </Button>
            )}
            {flowState === "IN_TRIP" && (
              <Button variant="accent" size="sm" onClick={handleCompleteTrip}>
                End Trip
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Workflow Control Card */}
      <div className="lg:col-span-5">
        {/* 1. PLANNING STATE */}
        {flowState === "PLANNING" && (
          <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-6 shadow-xl bg-white">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-black text-[#111111]">Book a Ride</h2>
                <p className="text-xs text-gray-500">Choose vehicle, pricing & pooling</p>
              </div>
              <Badge variant="accent">Instant Dispatch</Badge>
            </div>

            {/* Address inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">Pickup Location</label>
                <div className="relative mt-1">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#111111] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">Drop-off Destination</label>
                <div className="relative mt-1">
                  <MapPin className="w-4 h-4 text-red-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-[#111111] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 uppercase">Vehicle Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: VehicleCategory.BIKE, name: "Bike", icon: Bike, fare: 65 },
                  { id: VehicleCategory.AUTO, name: "Auto", icon: Navigation, fare: 120 },
                  { id: VehicleCategory.CAR, name: "Car", icon: Car, fare: 210 },
                ].map((v) => {
                  const Icon = v.icon;
                  const isSel = vehicle === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setVehicle(v.id);
                        setCustomOffer(v.fare);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSel
                          ? "border-[#111111] bg-[#111111] text-white"
                          : "border-gray-200 bg-white hover:border-gray-300 text-gray-900"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${isSel ? "text-[#B9F227]" : "text-gray-700"}`} />
                      <div className="font-bold text-xs">{v.name}</div>
                      <div className={`text-[11px] font-semibold ${isSel ? "text-gray-300" : "text-gray-500"}`}>
                        ₹{v.fare}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles: Smart Pooling & Fare Negotiation */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div
                onClick={() => {
                  setIsPooling(!isPooling);
                  if (!isPooling) setIsNegotiating(false);
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isPooling ? "border-blue-500 bg-blue-50/50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Smart Ride Pooling</div>
                    <div className="text-[11px] text-gray-500">Save 30% • Shared route corridor</div>
                  </div>
                </div>
                <input type="checkbox" checked={isPooling} readOnly className="h-4 w-4 rounded accent-blue-600" />
              </div>

              <div
                onClick={() => {
                  setIsNegotiating(!isNegotiating);
                  if (!isNegotiating) {
                    setIsPooling(false);
                    setCustomOffer(calculatedBaseFare);
                  }
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isNegotiating ? "border-[#B9F227] bg-[#B9F227]/10" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#111111] text-[#B9F227] flex items-center justify-center font-bold">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">Smart Fare Negotiation</div>
                    <div className="text-[11px] text-gray-500">Propose your price to nearby drivers</div>
                  </div>
                </div>
                <input type="checkbox" checked={isNegotiating} readOnly className="h-4 w-4 rounded accent-[#111111]" />
              </div>
            </div>

            {/* Total Fare Breakdown */}
            <div className="p-4 rounded-2xl bg-[#F5F6F7] flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Estimated Total Fare</div>
                <div className="text-2xl font-black text-[#111111]">₹{effectiveFare}</div>
              </div>
              {isPooling && <Badge variant="success">Save ₹{calculatedBaseFare - effectiveFare}</Badge>}
            </div>

            <Button
              onClick={handleStartBooking}
              variant="accent"
              size="lg"
              className="w-full font-bold shadow-md"
            >
              {isNegotiating ? "Set My Offer" : "Confirm & Find Drivers"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        )}

        {/* 2. NEGOTIATING STATE */}
        {flowState === "NEGOTIATING" && (
          <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-6 shadow-xl bg-white">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-xl font-black text-[#111111]">Negotiate Fare</h2>
              <button
                onClick={() => setFlowState("PLANNING")}
                className="text-xs text-gray-500 hover:text-black font-semibold"
              >
                Cancel
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F6F7] space-y-2 text-center">
              <div className="text-xs text-gray-500 uppercase font-semibold">Suggested Fare</div>
              <div className="text-3xl font-black text-[#111111]">₹{calculatedBaseFare}</div>
              <p className="text-[11px] text-gray-500">
                Allowed range: ₹{Math.round(calculatedBaseFare * 0.7)} - ₹{Math.round(calculatedBaseFare * 1.5)}
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase">Your Proposed Offer (₹)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={customOffer}
                  onChange={(e) => setCustomOffer(Number(e.target.value))}
                  className="w-full text-2xl font-black text-center py-3 rounded-2xl border-2 border-[#111111] focus:ring-2 focus:ring-[#B9F227]/40 outline-none"
                />
              </div>

              {/* Quick offer adjustment pills */}
              <div className="flex justify-center gap-2 pt-1">
                {[-20, -10, 0, 10, 20].map((delta) => (
                  <button
                    key={delta}
                    type="button"
                    onClick={() => setCustomOffer(calculatedBaseFare + delta)}
                    className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-bold hover:bg-gray-100"
                  >
                    {delta > 0 ? `+₹${delta}` : delta < 0 ? `-₹${Math.abs(delta)}` : "Base"}
                  </button>
                ))}
              </div>
            </div>

            {counterOffer ? (
              <div className="p-4 rounded-2xl border-2 border-[#B9F227] bg-[#B9F227]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-gray-800">Driver Counter-Offer</div>
                  <Badge variant="accent">New</Badge>
                </div>
                <div className="text-2xl font-black text-[#111111]">₹{counterOffer}</div>
                <div className="flex gap-2">
                  <Button onClick={handleAcceptCounterOffer} variant="accent" size="sm" className="w-full font-bold">
                    Accept ₹{counterOffer}
                  </Button>
                  <Button
                    onClick={() => {
                      setCounterOffer(null);
                      toast.info("Counter-offer declined");
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={handleSendCustomOffer}
                variant="primary"
                size="lg"
                className="w-full font-bold"
              >
                Send Offer to Drivers
              </Button>
            )}
          </Card>
        )}

        {/* 3. MATCHING STATE */}
        {flowState === "MATCHING" && (
          <Card className="rounded-3xl border-gray-200 p-8 text-center space-y-6 shadow-xl bg-white">
            <div className="w-16 h-16 rounded-full bg-[#B9F227] flex items-center justify-center mx-auto animate-bounce">
              <Navigation className="w-8 h-8 text-[#111111]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-[#111111]">Finding Nearest Driver...</h2>
              <p className="text-xs text-gray-500">Contacting high-rated drivers nearby your pickup</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F5F6F7] text-xs text-gray-600">
              Agreed Fare: <strong className="text-black">₹{effectiveFare}</strong> • Vehicle: <strong>{vehicle}</strong>
            </div>
          </Card>
        )}

        {/* 4. DRIVER ASSIGNED & ACTIVE TRIP */}
        {(flowState === "ASSIGNED" || flowState === "IN_TRIP") && (
          <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-6 shadow-xl bg-white">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] text-[#B9F227] flex items-center justify-center font-bold text-lg">
                  SG
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111111]">{assignedDriver?.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-800">{assignedDriver?.rating}</span>
                    <span>• 1,280 trips</span>
                  </div>
                </div>
              </div>
              <Badge variant="accent">
                {flowState === "ASSIGNED" ? "Arriving" : "In Progress"}
              </Badge>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F6F7] space-y-2">
              <div className="text-xs text-gray-500">Vehicle Details</div>
              <div className="text-sm font-bold text-[#111111]">{assignedDriver?.vehicleModel}</div>
              <div className="text-xs text-emerald-700 font-semibold">OTP for ride start: 4892</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => toast.info("Calling driver: " + assignedDriver?.phone)}
                className="w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Driver
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => toast.info("Driver chat opened")}
                className="w-full"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>

            <div className="pt-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setFlowState("PLANNING");
                  toast.warning("Ride cancelled");
                }}
                className="w-full"
              >
                Cancel Ride
              </Button>
            </div>
          </Card>
        )}

        {/* 5. PAYMENT STATE (Razorpay Workflow) */}
        {flowState === "PAYMENT" && (
          <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-6 shadow-xl bg-white">
            <div className="text-center space-y-1 pb-4 border-b border-gray-100">
              <Badge variant="success">Trip Finished</Badge>
              <h2 className="text-2xl font-black text-[#111111] mt-2">Trip Receipt</h2>
              <div className="text-3xl font-black text-[#111111] mt-2">₹{assignedDriver?.fare || effectiveFare}</div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-700 uppercase">Select Payment Method (Razorpay Test Mode)</div>

              <button
                type="button"
                onClick={() => handlePayment("UPI (Google Pay / PhonePe)")}
                className="w-full p-4 rounded-2xl border border-gray-200 hover:border-black flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#B9F227] flex items-center justify-center font-bold text-xs text-black">
                    UPI
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">UPI Instant Pay</div>
                    <div className="text-xs text-gray-500">GPay, PhonePe, Paytm</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                type="button"
                onClick={() => handlePayment("Credit / Debit Card")}
                className="w-full p-4 rounded-2xl border border-gray-200 hover:border-black flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#111111] flex items-center justify-center font-bold text-xs text-white">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">Cards / Netbanking</div>
                    <div className="text-xs text-gray-500">Visa, Mastercard, RuPay</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                type="button"
                onClick={() => handlePayment("Cash to Driver")}
                className="w-full p-4 rounded-2xl border border-gray-200 hover:border-black flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-200 flex items-center justify-center font-bold text-xs text-black">
                    💵
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">Cash to Driver</div>
                    <div className="text-xs text-gray-500">Pay directly after trip</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </Card>
        )}

        {/* 6. RATING STATE */}
        {flowState === "RATING" && (
          <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-6 shadow-xl bg-white text-center">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-[#111111]">Rate your Driver</h2>
              <p className="text-xs text-gray-500">How was your journey with Suresh Gowda?</p>
            </div>

            {/* 5-star selector */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-2 transition-transform hover:scale-125"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              placeholder="Leave a compliment or constructive feedback (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#111111]"
            />

            <Button
              onClick={handleSubmitRating}
              variant="accent"
              size="lg"
              className="w-full font-bold"
            >
              Submit Review
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function BookRidePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm">Loading booking console...</div>}>
      <BookRideContent />
    </Suspense>
  );
}

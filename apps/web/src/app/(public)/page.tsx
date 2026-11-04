"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bike,
  Car,
  Navigation,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Percent,
  Users,
  Bot,
  Sparkles,
  CheckCircle2,
  Clock,
  HelpCircle,
  TrendingUp,
  Wallet,
  PhoneCall,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<"BIKE" | "AUTO" | "CAR">("AUTO");
  const [isLocating, setIsLocating] = useState(false);

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPickup("Current Location (Indiranagar, Bengaluru)");
          setIsLocating(false);
        },
        () => {
          setPickup("Indiranagar 100 Feet Rd, Bengaluru");
          setIsLocating(false);
        }
      );
    } else {
      setPickup("Indiranagar 100 Feet Rd, Bengaluru");
      setIsLocating(false);
    }
  };

  const handleSearchRide = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      pickup: pickup || "Koramangala, Bengaluru",
      destination: destination || "Indiranagar, Bengaluru",
      vehicle: selectedVehicle,
    });
    router.push(`/rider/book-ride?${query.toString()}`);
  };

  const vehicleOptions = [
    {
      id: "BIKE" as const,
      name: "Bike",
      icon: Bike,
      tagline: "Solo & Fast",
      eta: "2 mins",
      fareEstimate: "₹45",
      desc: "Beat peak-hour traffic at the lowest price.",
      badge: "Fastest",
      capacity: "1 Passenger",
    },
    {
      id: "AUTO" as const,
      name: "Auto",
      icon: Navigation,
      tagline: "City Favorite",
      eta: "4 mins",
      fareEstimate: "₹85",
      desc: "Spacious 3-seater with doorstep pickup.",
      badge: "Popular",
      capacity: "3 Passengers",
    },
    {
      id: "CAR" as const,
      name: "Car",
      icon: Car,
      tagline: "Comfort & AC",
      eta: "6 mins",
      fareEstimate: "₹160",
      desc: "Clean sedans & hatchbacks with climate control.",
      badge: "Premium",
      capacity: "4 Passengers",
    },
  ];

  const faqs = [
    {
      q: "How does Smart Fare Negotiation work?",
      a: "Unlike rigid traditional ride apps, GETRYDE suggests a fair base price, but you can propose an offer that suits your budget. Nearby drivers can either accept directly or send a reasonable counter-offer. You both agree before the trip begins!",
    },
    {
      q: "What is Smart Ride Pooling?",
      a: "If two riders are traveling along the same corridor, GETRYDE intelligently matches them with a maximum 10-minute detour constraint. You save up to 40% on your fare, and drivers earn more per kilometer.",
    },
    {
      q: "Why do drivers prefer GETRYDE?",
      a: "GETRYDE charges a transparent, ultra-low platform fee (12-15%) compared to industry norms of 25-30%. Drivers see the full payout, rider offer, and exact route before accepting any trip.",
    },
    {
      q: "How does the AI Ride Assistant help me?",
      a: "You can talk to the GETRYDE AI Assistant in natural language: e.g. 'Book a bike from HSR Layout to MG Road under ₹120' or 'When is the cheapest time to travel today?'. The AI queries live platform pricing directly.",
    },
    {
      q: "Is it safe for late-night rides?",
      a: "Every driver undergoes strict background verification (KYC, DL, police record check). You also get 1-click live trip sharing with emergency contacts and an integrated 24/7 Safety Command interface.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-14 md:pb-0">
      {/* 1. HERO SECTION & MOBILE-FRIENDLY BOOKING CARD */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6F7] via-white to-white pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-[#E5E7EB]">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-[#B9F227]"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Next-Gen Mobility Platform
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight leading-[1.12]">
                Your city. <br className="hidden sm:inline" />
                Your journey. <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10">Your GETRYDE.</span>
                  <span className="absolute bottom-1.5 left-0 right-0 h-3.5 bg-[#B9F227] -rotate-1 -z-0 rounded-sm"></span>
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Book a <strong>Bike</strong>, <strong>Auto</strong>, or <strong>Car</strong> with
                live fare negotiation, shared corridor pooling, and complete transparent pricing
                for both riders and drivers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Link href="/rider/book-ride" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto px-7 font-bold shadow-md">
                    Book a Ride
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/driver/dashboard" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-300 font-bold">
                    Become a Driver
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E7EB] max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#111111]">₹0</div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-medium">Hidden Surges</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#111111]">100%</div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-medium">Driver Take-Home</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#111111]">4.9★</div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-medium">Verified Safety</div>
                </div>
              </div>
            </div>

            {/* Right Column: Mobile-Optimized Android-Style Booking Card */}
            <div className="lg:col-span-5 w-full">
              <Card className="border border-gray-300 sm:border-2 sm:border-[#111111] shadow-xl sm:shadow-2xl bg-white rounded-3xl p-5 sm:p-7 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#111111]">Where are you going?</h2>
                    <p className="text-xs text-gray-500">Fast pickup & real-time negotiation</p>
                  </div>
                  <Badge variant="accent">Instant</Badge>
                </div>

                <form onSubmit={handleSearchRide} className="space-y-4 pt-4">
                  {/* Location Inputs with App-Style Route Line */}
                  <div className="relative space-y-3 pl-3">
                    {/* Visual Route Connector Line */}
                    <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-gray-200 -z-0" />

                    {/* Pickup */}
                    <div className="relative z-10 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                          Pickup Location
                        </span>
                        <button
                          type="button"
                          onClick={handleGetCurrentLocation}
                          className="text-[#111111] hover:text-[#B9F227] font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                        >
                          <Navigation className="w-3 h-3" />
                          {isLocating ? "Locating..." : "Use GPS"}
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute left-3.5 top-3 text-emerald-600">
                          <MapPin className="w-4 h-4 fill-emerald-600 text-white" />
                        </div>
                        <input
                          type="text"
                          placeholder="Current location or pickup address"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#111111] focus:ring-2 focus:ring-[#B9F227]/40 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="relative z-10 space-y-1">
                      <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                        Drop-off Destination
                      </span>
                      <div className="relative">
                        <div className="absolute left-3.5 top-3 text-red-500">
                          <MapPin className="w-4 h-4 fill-red-500 text-white" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search destination or landmark"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:border-[#111111] focus:ring-2 focus:ring-[#B9F227]/40 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Picker (Android Touch Friendly) */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">
                      Select Vehicle Category
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {vehicleOptions.map((v) => {
                        const Icon = v.icon;
                        const isSelected = selectedVehicle === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVehicle(v.id)}
                            className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all active:scale-95 ${
                              isSelected
                                ? "border-[#111111] bg-[#111111] text-white shadow-sm"
                                : "border-gray-200 bg-white hover:border-gray-300 text-gray-900"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <Icon
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  isSelected ? "text-[#B9F227]" : "text-gray-700"
                                }`}
                              />
                              <span
                                className={`text-[9px] font-bold px-1 py-0.2 rounded ${
                                  isSelected
                                    ? "bg-[#B9F227] text-[#111111]"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {v.badge}
                              </span>
                            </div>
                            <div className="font-bold text-xs sm:text-sm">{v.name}</div>
                            <div
                              className={`text-[10px] sm:text-xs font-semibold ${
                                isSelected ? "text-gray-300" : "text-gray-500"
                              }`}
                            >
                              from {v.fareEstimate}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA Submit Button */}
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full text-sm sm:text-base font-bold shadow-md py-3.5"
                  >
                    Find Rides & Estimate Fare
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 pt-1">
                    <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Fare Negotiation
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      Smart Pooling
                    </span>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLEET OPTIONS SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
            <Badge variant="secondary">Fleet Options</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
              A ride for every journey
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Quick bike hops, versatile auto rides, or climate-controlled cars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {vehicleOptions.map((v) => {
              const Icon = v.icon;
              return (
                <Card
                  key={v.id}
                  className="rounded-3xl border border-gray-200 hover:border-[#111111] hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#F5F6F7] group-hover:bg-[#B9F227] flex items-center justify-center transition-colors">
                        <Icon className="w-7 h-7 text-[#111111]" />
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        {v.eta} away
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl sm:text-2xl font-black text-[#111111]">{v.name}</h3>
                        <span className="text-xs text-gray-500 font-semibold">{v.capacity}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">{v.tagline}</p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-gray-400">Starting from</div>
                        <div className="text-xl font-black text-[#111111]">{v.fareEstimate}</div>
                      </div>
                      <Link href={`/rider/book-ride?vehicle=${v.id}`}>
                        <Button variant="outline" size="sm" className="group-hover:bg-[#111111] group-hover:text-white font-bold">
                          Select {v.name}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CORE DIFFERENTIATOR: SMART FARE NEGOTIATION */}
      <section className="py-16 sm:py-20 bg-[#F5F6F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="accent">Fair & Transparent</Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight">
                Smart Fare Negotiation. <br />
                Say goodbye to arbitrary surges.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Traditional platforms impose opaque surge multipliers. With GETRYDE, riders can
                propose fair fares within reasonable guardrails, and drivers can accept or counter
                in real time.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "No algorithm-driven arbitrary 3x surge gouging",
                  "Drivers choose rides that make economic sense to them",
                  "2-way negotiation with automated 120-second timeout",
                  "Strict floor and ceiling bounds to protect both sides",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link href="/rider/book-ride">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold">
                    Try Fare Negotiation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Negotiation Simulation UI Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#B9F227] text-[#111111] flex items-center justify-center font-bold">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Negotiation Window</div>
                      <div className="text-xs text-gray-400">Ride #GR-4091 • Auto</div>
                    </div>
                  </div>
                  <Badge variant="accent">Offer Active</Badge>
                </div>

                <div className="space-y-3">
                  <div className="bg-neutral-900 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <div className="text-gray-400">System Suggested Base</div>
                      <div className="text-base font-bold text-gray-200">₹140</div>
                    </div>
                    <span className="text-gray-500">Distance: 5.4 km</span>
                  </div>

                  <div className="bg-neutral-800/90 p-4 rounded-2xl border-l-4 border-[#B9F227]">
                    <div className="text-xs text-[#B9F227] font-bold">Rider Offer Submitted</div>
                    <div className="text-2xl font-black text-white mt-0.5">₹120</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Broadcasted to 4 nearby drivers</div>
                  </div>

                  <div className="bg-neutral-900 p-3.5 rounded-2xl flex items-center justify-between border border-neutral-700">
                    <div>
                      <div className="text-xs text-gray-300 font-semibold">
                        Driver Ramesh K. (4.9★)
                      </div>
                      <div className="text-xs text-emerald-400 font-bold">
                        Accepted ₹120 offer!
                      </div>
                    </div>
                    <Badge variant="success">Confirmed</Badge>
                  </div>
                </div>

                <div className="text-center pt-1 text-[11px] text-gray-500">
                  Mutual agreement reached in 18 seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE DIFFERENTIATOR: SMART RIDE POOLING */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="bg-[#F5F6F7] p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base sm:text-lg font-black text-[#111111]">Active Corridor Match</h4>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                    Max 8 min detour
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                        P1
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#111111]">Aarav (You)</div>
                        <div className="text-[11px] text-gray-500">HSR Sector 2 → Whitefield</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#111111]">₹180</div>
                      <div className="text-[11px] text-emerald-600 font-bold">Saved 35%</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                        P2
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#111111]">Priya S.</div>
                        <div className="text-[11px] text-gray-500">Bellandur Gate → ITPL</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#111111]">₹140</div>
                      <div className="text-[11px] text-emerald-600 font-bold">Saved 30%</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#111111] text-white flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Driver Total Payout</div>
                    <div className="text-xl font-black text-[#B9F227]">₹320</div>
                  </div>
                  <div className="text-xs text-gray-300 text-right">
                    vs ₹220 solo trip
                    <br />
                    <span className="text-emerald-400 font-bold">+45% higher revenue</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <Badge variant="secondary">Eco & Pocket Friendly</Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight">
                Smart Ride Pooling. <br />
                Split fares, cut emissions.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                GETRYDE&apos;s corridor algorithm matches passengers traveling along compatible
                routes with automated seat checking, strict detour limits, and transparent fare
                splitting.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#F5F6F7] border border-gray-200">
                  <div className="text-xl sm:text-2xl font-black text-[#111111]">Up to 40%</div>
                  <div className="text-xs text-gray-500 font-medium">Passenger Savings</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F5F6F7] border border-gray-200">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">Zero Added Delay</div>
                  <div className="text-xs text-gray-500 font-medium">Algorithmic Detour Cap</div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/rider/pooling">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold">
                    Explore Pooling Routes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DRIVER-FIRST EARNINGS TRANSPARENCY */}
      <section className="py-16 sm:py-20 bg-[#F5F6F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="accent">For Drivers</Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight">
                100% Earnings Transparency. <br />
                Keep what you earn.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Before you tap &apos;Accept&apos;, GETRYDE shows the exact pickup distance,
                destination, rider offer, platform commission, and your net take-home cash.
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#B9F227] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-[#111111]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#111111]">Flat Low Commission</h4>
                    <p className="text-xs text-gray-500">Only 12-15% platform fee compared to 25-30% elsewhere.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#B9F227] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Wallet className="w-4 h-4 text-[#111111]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#111111]">Daily Instant Payouts</h4>
                    <p className="text-xs text-gray-500">Direct settlement to your UPI or bank account every single day.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/driver/dashboard">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold">
                    Drive with GETRYDE
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs font-bold text-[#B9F227] uppercase tracking-wider">
                    New Incoming Request
                  </span>
                  <span className="text-xs font-mono text-gray-400">Expires in 22s</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Rider Fare Offer:</span>
                    <span className="text-xl font-black text-white">₹220.00</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>GETRYDE Platform Fee (15%):</span>
                    <span>- ₹33.00</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-sm font-bold">
                    <span className="text-[#B9F227]">Your Net Payout:</span>
                    <span className="text-xl text-[#B9F227]">₹187.00</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-900 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Pickup: Koramangala 4th Block (1.2 km away)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Drop-off: Indiranagar Metro (6.8 km total)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Button variant="outline" size="sm" className="border-neutral-700 text-white hover:bg-neutral-800">
                    Decline
                  </Button>
                  <Button variant="accent" size="sm" className="font-bold">
                    Accept ₹187.00
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI RIDE ASSISTANT SHOWCASE */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#111111] to-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="accent">Built-in Intelligence</Badge>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Meet your personal <br />
                AI Ride Assistant.
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Wondering if a Bike or Auto is cheaper right now? Just ask in plain language. Our
                AI queries verified platform pricing directly with zero hallucinated rates.
              </p>

              <div className="space-y-2.5">
                {[
                  "Natural language booking & category comparison",
                  "Suggests the most economical time to leave",
                  "Always asks for your confirmation before booking",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#B9F227]" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link href="/rider/assistant">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold">
                    Chat with AI Assistant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-3.5">
                <div className="flex items-center gap-3 pb-3 border-b border-neutral-800">
                  <div className="w-9 h-9 rounded-full bg-[#B9F227] text-[#111111] flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white">GETRYDE Assistant</div>
                    <div className="text-[11px] text-[#B9F227]">Online • Live Database Connected</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-end">
                    <div className="bg-neutral-800 text-gray-200 px-3.5 py-2.5 rounded-2xl rounded-tr-none max-w-xs sm:max-w-sm">
                      Which is cheaper to reach Majestic Station right now, Bike or Auto?
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-[#111111] border border-neutral-700 text-gray-200 px-3.5 py-3 rounded-2xl rounded-tl-none max-w-sm sm:max-w-md space-y-1.5">
                      <p>Based on live traffic from your location (7.2 km):</p>
                      <ul className="text-xs space-y-1 text-gray-300">
                        <li>⚡ <strong>Bike:</strong> ₹65 • ETA 18 mins (Cheapest)</li>
                        <li>🛺 <strong>Auto:</strong> ₹115 • ETA 28 mins</li>
                      </ul>
                      <p className="text-xs text-[#B9F227]">
                        Would you like me to prepare a Bike booking for ₹65?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SAFETY AT EVERY TURN */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
            <Badge variant="secondary">Zero Compromise</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
              Safety at every turn
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Built with rigorous safety protocols for passengers and drivers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="rounded-3xl p-6 border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-2">Verified Drivers & Vehicles</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Mandatory document checks (driving license, vehicle fitness, criminal background)
                verified by human administrators before any driver goes online.
              </p>
            </Card>

            <Card className="rounded-3xl p-6 border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-[#F4FDCF] text-[#111111] flex items-center justify-center mb-4">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-2">1-Click Live Trip Sharing</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Share a live GPS tracking link with your loved ones via WhatsApp or SMS. They can
                watch your route progress in real time.
              </p>
            </Card>

            <Card className="rounded-3xl p-6 border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-2">24/7 Emergency Support</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Instant SOS interface that immediately alerts your emergency contacts and local
                emergency services with your real-time vehicle coordinates.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-20 bg-[#F5F6F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 space-y-2">
            <Badge variant="secondary">FAQ</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-colors"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#111111] flex items-center justify-between">
                  <span>{faq.q}</span>
                  <HelpCircle className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3" />
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION / BECOME A DRIVER BANNER */}
      <section className="py-16 sm:py-20 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <span className="text-xs font-bold text-[#B9F227] uppercase tracking-wider">
                Drive When You Want
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Ready to earn with true independence?
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto lg:mx-0">
                Sign up in 5 minutes with your Driving License and Vehicle RC. Start accepting
                rides with full earnings transparency today.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link href="/driver/dashboard" className="w-full">
                <Button variant="accent" size="lg" className="w-full font-bold shadow-xl">
                  Register as a Driver
                </Button>
              </Link>
              <Link href="/rider/book-ride" className="w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-neutral-700 text-white hover:bg-neutral-900 font-bold"
                >
                  Book Your First Ride
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

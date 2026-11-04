"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Plus, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { VehicleCategory } from "@getryde/shared";

export default function RiderScheduledRidesPage() {
  const [scheduledList, setScheduledList] = useState([
    {
      id: "SCH-901",
      date: "Tomorrow, 06:30 AM",
      pickup: "Indiranagar 100 Feet Rd, Bengaluru",
      dropoff: "Kempegowda International Airport (BLR)",
      vehicle: "Car (Sedan)",
      fare: "₹850",
      status: "SCHEDULED",
    },
    {
      id: "SCH-902",
      date: "05 Nov 2026, 09:00 AM",
      pickup: "Koramangala 4th Block",
      dropoff: "Whitefield ITPL",
      vehicle: "Auto",
      fare: "₹180",
      status: "SCHEDULED",
    },
  ]);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState<VehicleCategory>(VehicleCategory.CAR);

  const handleCreateScheduledRide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination || !date || !time) {
      toast.error("Please fill in all fields");
      return;
    }

    const newRide = {
      id: "SCH-" + Math.floor(100 + Math.random() * 900),
      date: `${date}, ${time}`,
      pickup,
      dropoff: destination,
      vehicle: vehicle === VehicleCategory.CAR ? "Car" : vehicle === VehicleCategory.AUTO ? "Auto" : "Bike",
      fare: vehicle === VehicleCategory.CAR ? "₹450" : vehicle === VehicleCategory.AUTO ? "₹220" : "₹110",
      status: "SCHEDULED",
    };

    setScheduledList([newRide, ...scheduledList]);
    toast.success("Ride scheduled! Driver will be dispatched 15 mins before departure.");
    setPickup("");
    setDestination("");
    setDate("");
    setTime("");
  };

  const handleCancelRide = (id: string) => {
    setScheduledList(scheduledList.filter((r) => r.id !== id));
    toast.warning(`Scheduled ride ${id} cancelled`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Scheduled Rides</h1>
        <p className="text-xs text-gray-500">
          Book up to 7 days in advance for airport transfers, morning flights, or planned meetings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form: Schedule New Ride */}
        <div className="lg:col-span-5">
          <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 space-y-5 bg-white shadow-md">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#B9F227] bg-[#111111] p-0.5 rounded-md" />
              Schedule a Journey
            </h3>

            <form onSubmit={handleCreateScheduledRide} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Pickup Location</label>
                <input
                  type="text"
                  placeholder="e.g. Indiranagar, Bengaluru"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full mt-1 p-2.5 text-sm rounded-xl border border-gray-200 focus:border-black outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Drop-off Destination</label>
                <input
                  type="text"
                  placeholder="e.g. BLR Airport Terminal 2"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full mt-1 p-2.5 text-sm rounded-xl border border-gray-200 focus:border-black outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full mt-1 p-2.5 text-sm rounded-xl border border-gray-200 focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase">Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full mt-1 p-2.5 text-sm rounded-xl border border-gray-200 focus:border-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Vehicle Preference</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {[
                    { id: VehicleCategory.BIKE, label: "Bike" },
                    { id: VehicleCategory.AUTO, label: "Auto" },
                    { id: VehicleCategory.CAR, label: "Car" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicle(v.id)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        vehicle === v.id
                          ? "border-black bg-[#111111] text-white"
                          : "border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full font-bold">
                Confirm Schedule
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Card>
        </div>

        {/* List of Scheduled Rides */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-[#111111]">Upcoming Scheduled Pickups</h3>

          {scheduledList.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-500 bg-white rounded-3xl border border-gray-200">
              No upcoming scheduled rides.
            </div>
          ) : (
            scheduledList.map((ride) => (
              <Card key={ride.id} className="rounded-3xl border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-500">{ride.id}</span>
                    <Badge variant="accent">{ride.date}</Badge>
                  </div>
                  <div className="text-base font-black text-[#111111]">{ride.fare}</div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                    <div>
                      <span className="text-gray-400">Pickup:</span> {ride.pickup}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-red-500 mt-0.5" />
                    <div>
                      <span className="text-gray-400">Drop-off:</span> {ride.dropoff}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Category: <strong className="text-black">{ride.vehicle}</strong>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCancelRide(ride.id)}
                    className="text-xs text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Cancel Ride
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

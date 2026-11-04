"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation, Clock } from "lucide-react";

export default function AdminRidesPage() {
  const rides = [
    {
      id: "RIDE-991",
      rider: "Neha K.",
      driver: "Rajesh Kumar",
      vehicle: "Auto",
      route: "Indiranagar 100ft → Koramangala 4th Block",
      fare: "₹140.00",
      commission: "₹21.00",
      status: "IN_PROGRESS",
    },
    {
      id: "RIDE-990",
      rider: "Aarav Sharma",
      driver: "Suresh Gowda",
      vehicle: "Auto",
      route: "Indiranagar 100ft → MG Road",
      fare: "₹95.00",
      commission: "₹14.25",
      status: "COMPLETED",
    },
    {
      id: "RIDE-989",
      rider: "Priya S.",
      driver: "Anil Kumar",
      vehicle: "Car (Pool)",
      route: "Whitefield → Bellandur",
      fare: "₹140.00",
      commission: "₹21.00",
      status: "COMPLETED",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Platform Rides Monitor</h1>
        <p className="text-xs text-gray-500">Live trip tracking, completed rides, commissions & status</p>
      </div>

      <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-4">Ride ID</th>
                <th className="py-3 px-4">Participants</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Fare & Take</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rides.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{r.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">R: {r.rider}</div>
                    <div className="text-gray-500">D: {r.driver} ({r.vehicle})</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">{r.route}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{r.fare}</div>
                    <div className="text-[11px] text-emerald-600 font-bold">Comm: {r.commission}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={r.status === "COMPLETED" ? "success" : "accent"}>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

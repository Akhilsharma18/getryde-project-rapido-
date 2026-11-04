"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Star, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState([
    {
      id: "DRV-101",
      name: "Rajesh Kumar",
      phone: "+91 98450 12345",
      vehicle: "Auto (Bajaj RE)",
      plate: "KA-03-AA-9988",
      rating: 4.92,
      trips: 840,
      status: "APPROVED",
    },
    {
      id: "DRV-901",
      name: "Manoj Kumar",
      phone: "+91 98450 44332",
      vehicle: "Auto (Bajaj Compact)",
      plate: "KA-04-BB-1122",
      rating: null,
      trips: 0,
      status: "PENDING",
    },
    {
      id: "DRV-902",
      name: "Siddiq Ahmed",
      phone: "+91 97120 55441",
      vehicle: "Car (Maruti Dzire)",
      plate: "KA-01-EE-9800",
      rating: null,
      trips: 0,
      status: "PENDING",
    },
  ]);

  const handleApprove = (id: string) => {
    setDrivers(drivers.map((d) => (d.id === id ? { ...d, status: "APPROVED" } : d)));
    toast.success(`Driver ${id} approved & onboarded!`);
  };

  const handleReject = (id: string) => {
    setDrivers(drivers.map((d) => (d.id === id ? { ...d, status: "REJECTED" } : d)));
    toast.error(`Driver ${id} rejected.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Driver Fleet & Approvals</h1>
        <p className="text-xs text-gray-500">Verify driving licenses, vehicles, and manage onboarding</p>
      </div>

      <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-4">Driver</th>
                <th className="py-3 px-4">Vehicle & Plate</th>
                <th className="py-3 px-4">Rating & Trips</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {drivers.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {d.name}
                    <div className="text-[11px] font-normal text-gray-400">{d.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">
                    {d.vehicle}
                    <div className="text-[11px] font-mono text-gray-500 font-bold">{d.plate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    {d.rating ? (
                      <span className="font-bold text-amber-600 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {d.rating} ({d.trips} trips)
                      </span>
                    ) : (
                      <span className="text-gray-400">New Applicant</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        d.status === "APPROVED"
                          ? "success"
                          : d.status === "PENDING"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {d.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {d.status === "PENDING" ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleApprove(d.id)}
                          variant="accent"
                          size="sm"
                          className="font-bold text-xs"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(d.id)}
                          variant="outline"
                          size="sm"
                          className="text-xs text-red-600"
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-400">Active in Service</span>
                    )}
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

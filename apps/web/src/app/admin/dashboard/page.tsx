"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Car,
  Navigation,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const metrics = [
    { label: "Total Riders", value: "24,850", delta: "+14% this month", icon: Users },
    { label: "Registered Drivers", value: "3,420", delta: "2,890 verified", icon: Car },
    { label: "Active Live Trips", value: "142", delta: "Across 3 city zones", icon: Navigation },
    { label: "Today's Gross Fares", value: "₹4,82,400", delta: "Platform take: ₹72,360", icon: DollarSign },
  ];

  const pendingDrivers = [
    {
      id: "DRV-901",
      name: "Manoj Kumar",
      phone: "+91 98450 44332",
      vehicle: "Auto (Bajaj Compact)",
      plate: "KA-04-BB-1122",
      status: "PENDING",
      submittedDate: "2 hours ago",
    },
    {
      id: "DRV-902",
      name: "Siddiq Ahmed",
      phone: "+91 97120 55441",
      vehicle: "Car (Maruti Dzire)",
      plate: "KA-01-EE-9800",
      status: "PENDING",
      submittedDate: "4 hours ago",
    },
  ];

  const handleApproveDriver = (id: string) => {
    toast.success(`Driver ${id} approved & KYC verified successfully!`);
  };

  const handleRejectDriver = (id: string) => {
    toast.error(`Driver ${id} registration rejected.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Platform Command Center</h1>
          <p className="text-xs text-gray-500">Live operational overview, metrics, driver approvals & safety</p>
        </div>
        <Badge variant="accent">Production Cluster Active</Badge>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className="rounded-3xl border-gray-200 p-6 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">{m.label}</span>
                <Icon className="w-4 h-4 text-gray-700" />
              </div>
              <div className="text-3xl font-black text-[#111111]">{m.value}</div>
              <div className="text-xs text-emerald-600 font-semibold">{m.delta}</div>
            </Card>
          );
        })}
      </div>

      {/* Grid: Pending Approvals & Live System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pending Driver Approvals */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-[#111111]">Pending Driver KYC Verifications</h3>
                <p className="text-xs text-gray-500">Review government credentials before activation</p>
              </div>
              <Link href="/admin/drivers">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="divide-y divide-gray-100 space-y-3">
              {pendingDrivers.map((d) => (
                <div key={d.id} className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-bold text-sm text-[#111111]">{d.name}</div>
                    <div className="text-gray-500">
                      {d.phone} • {d.vehicle} ({d.plate})
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">Submitted {d.submittedDate}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleApproveDriver(d.id)}
                      variant="accent"
                      size="sm"
                      className="font-bold text-xs"
                    >
                      Approve & Activate
                    </Button>
                    <Button
                      onClick={() => handleRejectDriver(d.id)}
                      variant="outline"
                      size="sm"
                      className="text-xs text-red-600 hover:bg-red-50"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Real-Time Platform Status */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-4">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              System Status
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F6F7]">
                <span className="font-semibold text-gray-700">Socket.IO Gateway</span>
                <Badge variant="success">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F6F7]">
                <span className="font-semibold text-gray-700">PostGIS Geocoding</span>
                <Badge variant="success">Operational</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F6F7]">
                <span className="font-semibold text-gray-700">Razorpay Webhooks</span>
                <Badge variant="success">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F6F7]">
                <span className="font-semibold text-gray-700">AI Ride Assistant</span>
                <Badge variant="accent">Online</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  ArrowUpRight,
  Download,
  Calendar,
  Percent,
  TrendingUp,
  Building,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

export default function DriverEarningsPage() {
  const [period, setPeriod] = useState<"DAILY" | "WEEKLY" | "MONTHLY">("WEEKLY");

  const weeklyData = [
    { day: "Mon", gross: 2400, net: 2040, trips: 14 },
    { day: "Tue", gross: 2100, net: 1785, trips: 12 },
    { day: "Wed", gross: 2800, net: 2380, trips: 16 },
    { day: "Thu", gross: 1950, net: 1657, trips: 11 },
    { day: "Fri", gross: 3200, net: 2720, trips: 18 },
    { day: "Sat", gross: 3600, net: 3060, trips: 20 },
    { day: "Sun", gross: 2900, net: 2465, trips: 15 },
  ];

  const payouts = [
    {
      id: "PO-4091",
      date: "03 Nov 2026",
      amount: "₹12,450.00",
      account: "HDFC Bank (**8812)",
      status: "SETTLED",
    },
    {
      id: "PO-3810",
      date: "27 Oct 2026",
      amount: "₹14,200.00",
      account: "HDFC Bank (**8812)",
      status: "SETTLED",
    },
    {
      id: "PO-3501",
      date: "20 Oct 2026",
      amount: "₹11,900.00",
      account: "HDFC Bank (**8812)",
      status: "SETTLED",
    },
  ];

  const handleInstantPayout = () => {
    toast.success("Instant payout of ₹1,840 initiated to your bank account via IMPS!");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Earnings Transparency</h1>
          <p className="text-xs text-gray-500">
            100% upfront fare calculations, zero hidden cuts, guaranteed 15% flat commission
          </p>
        </div>

        <Button onClick={handleInstantPayout} variant="accent" size="md" className="font-bold">
          <Wallet className="w-4 h-4 mr-2" />
          Request Instant Payout
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-2">
          <div className="text-xs font-bold text-gray-500 uppercase">Available for Settlement</div>
          <div className="text-3xl font-black text-[#111111]">₹1,840.00</div>
          <div className="text-xs text-emerald-600 font-semibold">Ready for 1-click IMPS transfer</div>
        </Card>

        <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-2">
          <div className="text-xs font-bold text-gray-500 uppercase">Gross Passenger Fares</div>
          <div className="text-3xl font-black text-[#111111]">₹18,950.00</div>
          <div className="text-xs text-gray-500">Across 106 trips this week</div>
        </Card>

        <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-2">
          <div className="text-xs font-bold text-gray-500 uppercase">Platform Fee (Flat 15%)</div>
          <div className="text-3xl font-black text-gray-700">₹2,842.50</div>
          <div className="text-xs text-gray-500">You keep 85% of every single fare</div>
        </Card>
      </div>

      {/* Recharts Graphical Chart */}
      <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 bg-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#111111]">Weekly Net Payout Trends</h3>
            <p className="text-xs text-gray-500">Net take-home cash after platform commission</p>
          </div>
          <Badge variant="accent">Weekly Breakdown</Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip
                formatter={(value: any) => [`₹${value}`, "Net Payout"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB" }}
              />
              <Bar dataKey="net" fill="#111111" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Payout Settlements History */}
      <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 bg-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-base font-bold text-[#111111]">Bank Payout Dispatches</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast.success("Downloading full payout ledger CSV...")}
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Download Statement
          </Button>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {payouts.map((po) => (
            <div key={po.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F6F7] flex items-center justify-center font-bold">
                  <Building className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#111111]">{po.amount}</div>
                  <div className="text-gray-500">
                    {po.id} • {po.date} • {po.account}
                  </div>
                </div>
              </div>
              <Badge variant="success">{po.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

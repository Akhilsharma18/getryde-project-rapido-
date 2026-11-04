"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Save, Percent, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { VehicleCategory } from "@getryde/shared";

export default function AdminPricingPage() {
  const [pricingRules, setPricingRules] = useState({
    BIKE: { baseFare: 30, perKm: 9, minFare: 40, maxDevPercent: 30 },
    AUTO: { baseFare: 40, perKm: 15, minFare: 60, maxDevPercent: 30 },
    CAR: { baseFare: 80, perKm: 22, minFare: 120, maxDevPercent: 30 },
  });

  const [platformCommission, setPlatformCommission] = useState(15); // 15%

  const handleUpdate = (cat: "BIKE" | "AUTO" | "CAR", field: string, value: number) => {
    setPricingRules({
      ...pricingRules,
      [cat]: {
        ...pricingRules[cat],
        [field]: value,
      },
    });
  };

  const handleSaveAll = () => {
    toast.success("Platform pricing formulas & negotiation bounds updated globally!");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Pricing & Rules Configuration</h1>
          <p className="text-xs text-gray-500">
            Set base fares, distance coefficients, negotiation caps, and platform fees
          </p>
        </div>
        <Button onClick={handleSaveAll} variant="accent" size="md" className="font-bold">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Global Commission Setting */}
      <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-4">
        <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
          <Percent className="w-5 h-5 text-[#B9F227] bg-black p-0.5 rounded-md" />
          Driver-First Platform Commission
        </h3>
        <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
          GETRYDE charges a flat, transparent fee. Unlike competitors charging 25-30%, our standard
          is locked at 15% to guarantee maximum driver retention.
        </p>
        <div className="flex items-center gap-4 max-w-xs">
          <Input
            type="number"
            value={platformCommission}
            onChange={(e) => setPlatformCommission(Number(e.target.value))}
          />
          <span className="text-sm font-bold text-gray-700">% Flat</span>
        </div>
      </Card>

      {/* Vehicle Specific Pricing Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["BIKE", "AUTO", "CAR"] as const).map((cat) => (
          <Card key={cat} className="rounded-3xl border-gray-200 p-6 bg-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-black text-lg text-[#111111]">{cat} Category</h3>
              <Badge variant="accent">Active</Badge>
            </div>

            <div className="space-y-3">
              <Input
                label="Base Booking Fare (₹)"
                type="number"
                value={pricingRules[cat].baseFare}
                onChange={(e) => handleUpdate(cat, "baseFare", Number(e.target.value))}
              />

              <Input
                label="Per Kilometer Rate (₹/km)"
                type="number"
                value={pricingRules[cat].perKm}
                onChange={(e) => handleUpdate(cat, "perKm", Number(e.target.value))}
              />

              <Input
                label="Minimum Trip Fare (₹)"
                type="number"
                value={pricingRules[cat].minFare}
                onChange={(e) => handleUpdate(cat, "minFare", Number(e.target.value))}
              />

              <Input
                label="Max Negotiation Deviation (±%)"
                type="number"
                value={pricingRules[cat].maxDevPercent}
                onChange={(e) => handleUpdate(cat, "maxDevPercent", Number(e.target.value))}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

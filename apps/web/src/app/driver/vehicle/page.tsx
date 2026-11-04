"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { VehicleCategory } from "@getryde/shared";

export default function DriverVehiclePage() {
  const [category, setCategory] = useState<VehicleCategory>(VehicleCategory.AUTO);
  const [make, setMake] = useState("Bajaj");
  const [model, setModel] = useState("Compact RE 4S");
  const [year, setYear] = useState("2023");
  const [plateNumber, setPlateNumber] = useState("KA-03-AA-9988");
  const [color, setColor] = useState("Yellow / Green");

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Vehicle details submitted for verification!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Vehicle Details</h1>
        <p className="text-xs text-gray-500">Manage registered vehicle specifications and status</p>
      </div>

      <Card className="rounded-3xl border-gray-200 p-6 sm:p-8 bg-white space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#111111] text-[#B9F227] flex items-center justify-center font-bold">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#111111]">{plateNumber}</h3>
              <p className="text-xs text-gray-500">
                {make} {model} ({year})
              </p>
            </div>
          </div>
          <Badge variant="success">Verified & Active</Badge>
        </div>

        <form onSubmit={handleSaveVehicle} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase">Vehicle Category</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {[
                { id: VehicleCategory.BIKE, label: "Bike (1 Seater)" },
                { id: VehicleCategory.AUTO, label: "Auto (3 Seater)" },
                { id: VehicleCategory.CAR, label: "Car (4 Seater)" },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setCategory(v.id)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    category === v.id
                      ? "border-black bg-[#111111] text-white"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Make / Manufacturer" value={make} onChange={(e) => setMake(e.target.value)} />
            <Input label="Model" value={model} onChange={(e) => setModel(e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input label="Manufacturing Year" value={year} onChange={(e) => setYear(e.target.value)} />
            <Input label="Color" value={color} onChange={(e) => setColor(e.target.value)} />
            <Input
              label="Registration Plate"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="accent" size="lg" className="w-full font-bold">
              Update Vehicle Information
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, PhoneCall, Lock, AlertTriangle, Eye, UserCheck } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="accent">Safety First</Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Your safety is engineered into every single ride.
          </h1>
          <p className="text-lg text-gray-600">
            From driver background verification to 24/7 SOS interfaces, GETRYDE provides a secure,
            monitored travel environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-3xl p-6 border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111111]">Rigorous Driver Vetting</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every driver must submit government identity documents, driving license, vehicle
              registration certificate, commercial insurance, and pass a police verification check
              before being granted access.
            </p>
          </Card>

          <Card className="rounded-3xl p-6 border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111111]">Real-Time GPS Monitoring</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              All active trips are broadcast over authenticated Socket.IO connections. Our systems
              automatically detect unexpected stops or major route deviations and alert safety
              personnel.
            </p>
          </Card>

          <Card className="rounded-3xl p-6 border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111111]">Emergency SOS Interface</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              One-tap emergency trigger transmits live coordinates and driver details to police
              dispatch and up to 3 pre-configured emergency contacts simultaneously.
            </p>
          </Card>
        </div>

        <div className="bg-[#111111] text-white p-8 sm:p-12 rounded-3xl space-y-6">
          <h2 className="text-2xl font-black">Community Code of Conduct</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
            GETRYDE enforces strict zero-tolerance policies regarding harassment, discrimination,
            unsafe driving, and alcohol consumption. Riders and drivers can rate and review each other
            after every trip; accounts falling below safety benchmarks are automatically reviewed and
            suspended.
          </p>
        </div>
      </div>
    </div>
  );
}

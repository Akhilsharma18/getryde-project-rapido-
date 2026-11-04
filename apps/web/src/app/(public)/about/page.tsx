import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Shield, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="accent">Our Mission</Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Restoring fairness, freedom, and transparency to urban mobility.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            GETRYDE was founded on a simple principle: mobility should be empowering for both the
            people who ride and the people who drive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="rounded-3xl p-8 border-gray-200">
            <div className="w-12 h-12 rounded-2xl bg-[#B9F227] flex items-center justify-center font-bold mb-6">
              <Target className="w-6 h-6 text-[#111111]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111111] mb-3">The Problem We Solve</h3>
            <p className="text-gray-600 leading-relaxed">
              For too long, legacy ride-hailing conglomerates have trapped passengers in opaque surge
              pricing traps while cutting driver earnings down to unsustainably low commissions.
              Surges don&apos;t reach drivers, and passengers feel gouged.
            </p>
          </Card>

          <Card className="rounded-3xl p-8 border-gray-200">
            <div className="w-12 h-12 rounded-2xl bg-[#111111] flex items-center justify-center font-bold mb-6">
              <Award className="w-6 h-6 text-[#B9F227]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111111] mb-3">The GETRYDE Solution</h3>
            <p className="text-gray-600 leading-relaxed">
              We replaced black-box algorithms with transparent baseline fare estimates, real-time
              mutual negotiation, and smart ride pooling. Drivers see full upfront payout details,
              and riders know exactly why they pay what they pay.
            </p>
          </Card>
        </div>

        <div className="bg-[#F5F6F7] p-10 rounded-3xl space-y-6">
          <h2 className="text-2xl font-black text-[#111111]">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="font-bold text-lg text-[#111111] mb-1">100% Transparency</div>
              <p className="text-sm text-gray-600">No hidden surge algorithms or unexpected commission cuts.</p>
            </div>
            <div>
              <div className="font-bold text-lg text-[#111111] mb-1">Driver Dignity</div>
              <p className="text-sm text-gray-600">Fair pay, instant daily settlements, and full route visibility.</p>
            </div>
            <div>
              <div className="font-bold text-lg text-[#111111] mb-1">Passenger Choice</div>
              <p className="text-sm text-gray-600">Pick your preferred vehicle, price point, and pooling options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminReportsPage() {
  const reports = [
    {
      id: "REP-01",
      title: "Monthly Financial Reconciliation & GST Ledger",
      desc: "All ride gross revenues, 15% platform commissions, and payment gateway fees.",
      period: "October 2026",
    },
    {
      id: "REP-02",
      title: "Driver Safety & SLA Performance Audit",
      desc: "Cancellation rates, speed violation alerts, average ratings, and complaints audit.",
      period: "Last 30 Days",
    },
    {
      id: "REP-03",
      title: "Corridor Ride Pooling Efficiency & Detour Analysis",
      desc: "Passenger matching rate, average detour duration, and fuel reduction metrics.",
      period: "Q3 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Platform Analytics & Reports</h1>
        <p className="text-xs text-gray-500">Audit logs, financial statements, and regulatory compliance reports</p>
      </div>

      <div className="space-y-4">
        {reports.map((rep) => (
          <Card key={rep.id} className="rounded-2xl border-gray-200 p-6 bg-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F6F7] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">{rep.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{rep.desc}</p>
                  <div className="text-[11px] font-semibold text-gray-400 mt-1">{rep.period}</div>
                </div>
              </div>

              <Button
                onClick={() => toast.success(`Generated and downloading ${rep.title}...`)}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                Export PDF/CSV
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

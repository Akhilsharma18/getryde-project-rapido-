"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Clock, UploadCloud, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function DriverDocumentsPage() {
  const [docs, setDocs] = useState([
    {
      id: "DL-101",
      name: "Driving License (Smart Card)",
      type: "DRIVING_LICENSE",
      status: "APPROVED",
      expiry: "Exp: 14 Aug 2032",
    },
    {
      id: "RC-202",
      name: "Vehicle Registration Certificate (RC)",
      type: "VEHICLE_REGISTRATION",
      status: "APPROVED",
      expiry: "Exp: 22 Dec 2038",
    },
    {
      id: "INS-303",
      name: "Commercial Vehicle Insurance Policy",
      type: "INSURANCE",
      status: "APPROVED",
      expiry: "Exp: 10 Jan 2027",
    },
    {
      id: "POL-404",
      name: "Police Clearance Certificate (PCC)",
      type: "IDENTITY_PROOF",
      status: "UNDER_REVIEW",
      expiry: "Uploaded 2 days ago",
    },
  ]);

  const handleUpload = (type: string) => {
    toast.success(`New document for ${type} uploaded. Admin verification queued!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">KYC & Driver Documents</h1>
        <p className="text-xs text-gray-500">Government compliance and verification records</p>
      </div>

      <div className="space-y-4">
        {docs.map((doc) => (
          <Card key={doc.id} className="rounded-2xl border-gray-200 p-6 bg-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F6F7] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">{doc.name}</h4>
                  <p className="text-xs text-gray-500">{doc.expiry}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={doc.status === "APPROVED" ? "success" : "warning"}>
                  {doc.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpload(doc.name)}
                  className="text-xs"
                >
                  <UploadCloud className="w-3.5 h-3.5 mr-1" />
                  Re-upload
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

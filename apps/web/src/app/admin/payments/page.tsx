"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function AdminPaymentsPage() {
  const [payments] = useState([
    {
      id: "PAY-1001",
      rideId: "RIDE-990",
      amount: "₹95.00",
      method: "Razorpay UPI",
      razorpayId: "pay_test_9834012",
      status: "CAPTURED",
      date: "03 Nov 2026, 11:00 AM",
    },
    {
      id: "PAY-1002",
      rideId: "RIDE-989",
      amount: "₹140.00",
      method: "Razorpay Card",
      razorpayId: "pay_test_7712093",
      status: "CAPTURED",
      date: "03 Nov 2026, 09:30 AM",
    },
  ]);

  const handleTriggerRefund = (id: string) => {
    toast.success(`Refund initiated via Razorpay Test API for transaction ${id}!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Payment Gateways & Refunds</h1>
        <p className="text-xs text-gray-500">Monitor Razorpay webhooks, captured settlements, and trigger refunds</p>
      </div>

      <Card className="rounded-3xl border-gray-200 p-6 bg-white space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-4">Transaction</th>
                <th className="py-3 px-4">Ride ID</th>
                <th className="py-3 px-4">Gateway Reference</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Refund Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{p.id}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-600">{p.rideId}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-400">{p.razorpayId}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">{p.amount}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">{p.status}</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      onClick={() => handleTriggerRefund(p.id)}
                      variant="outline"
                      size="sm"
                      className="text-xs text-red-600 hover:bg-red-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      Issue Refund
                    </Button>
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

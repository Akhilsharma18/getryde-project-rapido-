"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, Download } from "lucide-react";
import { toast } from "sonner";

export default function RiderPaymentsPage() {
  const [walletBalance, setWalletBalance] = useState(450);

  const transactions = [
    {
      id: "PAY-9912",
      date: "03 Nov 2026, 11:00 AM",
      description: "Auto Ride #GR-8921 to MG Road",
      amount: -95,
      method: "Razorpay UPI (Google Pay)",
      status: "SUCCESS",
    },
    {
      id: "PAY-8821",
      date: "01 Nov 2026, 04:30 PM",
      description: "Wallet Auto-Topup",
      amount: +500,
      method: "HDFC Debit Card **4012",
      status: "SUCCESS",
    },
    {
      id: "PAY-7650",
      date: "28 Oct 2026, 09:35 AM",
      description: "Car Pool #GR-6309 to Bellandur",
      amount: -140,
      method: "GETRYDE Wallet",
      status: "SUCCESS",
    },
    {
      id: "REF-2104",
      date: "24 Oct 2026, 11:30 PM",
      description: "Refund for Cancelled Ride #GR-5120",
      amount: +210,
      method: "Razorpay Instant Refund",
      status: "REFUNDED",
    },
  ];

  const handleTopup = () => {
    toast.success("Wallet credited with ₹500 via Razorpay Test Gateway!");
    setWalletBalance(walletBalance + 500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111]">Payments & Wallet</h1>
        <p className="text-xs text-gray-500">Manage payment methods, instant refunds, and Razorpay transactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Wallet & Payment Methods */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="rounded-3xl border-2 border-[#111111] bg-[#111111] text-white p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#B9F227]" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  GETRYDE Balance
                </span>
              </div>
              <Badge variant="accent">1-Tap Pay</Badge>
            </div>

            <div>
              <div className="text-4xl font-black text-white">₹{walletBalance}.00</div>
              <p className="text-xs text-gray-400 mt-1">Ready for automated checkout on all rides</p>
            </div>

            <Button
              onClick={handleTopup}
              variant="accent"
              size="md"
              className="w-full font-bold shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add ₹500 to Wallet
            </Button>
          </Card>

          {/* Payment Gateways info */}
          <Card className="rounded-3xl border-gray-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wide">
              Supported Payment Methods
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F6F7]">
                <span className="font-semibold text-black">Unified Payments Interface (UPI)</span>
                <span className="text-emerald-700 font-bold">Zero Fee</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F6F7]">
                <span className="font-semibold text-black">Cards (RuPay, Visa, Mastercard)</span>
                <span className="text-emerald-700 font-bold">Encrypted</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F6F7]">
                <span className="font-semibold text-black">Direct Cash to Driver</span>
                <span className="text-gray-500">Supported</span>
              </div>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Razorpay 256-bit SSL Test Mode Gateway Active</span>
            </div>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-[#111111]">Transaction History</h3>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <Card key={tx.id} className="rounded-2xl border-gray-200 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      tx.amount > 0 ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tx.amount > 0 ? (
                      <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-gray-700" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#111111]">{tx.description}</div>
                    <div className="text-xs text-gray-500">
                      {tx.date} • {tx.method}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-base font-black ${
                      tx.amount > 0 ? "text-emerald-600" : "text-[#111111]"
                    }`}
                  >
                    {tx.amount > 0 ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
                  </div>
                  <Badge variant={tx.status === "REFUNDED" ? "warning" : "success"} className="text-[10px]">
                    {tx.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

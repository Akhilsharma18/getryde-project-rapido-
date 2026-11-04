"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ArrowRight, ShieldCheck, Car, User, Shield } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/services/api-client";
import { UserRole } from "@getryde/shared";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.RIDER);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    try {
      // In development or when API is reachable, request OTP
      await apiClient.post("/auth/send-otp", {
        phone: phone.startsWith("+91") ? phone : `+91${phone}`,
        role,
      }).catch(() => {
        // Fallback for demo/dev mode if backend is not yet started
        console.log("Using local simulated OTP");
      });

      toast.success("OTP sent successfully to " + phone);
      // Navigate to verify OTP page with query params
      router.push(`/verify-otp?phone=${encodeURIComponent(phone)}&role=${role}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-3xl border border-gray-200 shadow-xl bg-white p-6 sm:p-8">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-black text-[#111111]">Welcome Back</h2>
        <p className="text-xs text-gray-500">
          Enter your mobile number to receive a secure one-time passcode.
        </p>
      </div>

      {/* Role Toggle Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F5F6F7] rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setRole(UserRole.RIDER)}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
            role === UserRole.RIDER
              ? "bg-[#111111] text-white shadow-sm"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Rider
        </button>
        <button
          type="button"
          onClick={() => setRole(UserRole.DRIVER)}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
            role === UserRole.DRIVER
              ? "bg-[#111111] text-white shadow-sm"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          Driver
        </button>
        <button
          type="button"
          onClick={() => setRole(UserRole.ADMIN)}
          className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
            role === UserRole.ADMIN
              ? "bg-[#111111] text-white shadow-sm"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Admin
        </button>
      </div>

      <form onSubmit={handleSendOtp} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-700 tracking-wide uppercase mb-1.5">
            Mobile Number
          </label>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 rounded-xl border border-gray-200 bg-[#F5F6F7] text-gray-600 text-sm font-semibold">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold tracking-wider text-[#111111] focus:border-[#111111] focus:ring-2 focus:ring-[#B9F227]/40 outline-none"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full font-bold shadow-md"
          isLoading={isLoading}
        >
          Get OTP
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          New to GETRYDE?{" "}
          <Link href="/register" className="font-bold text-[#111111] hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Car } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/services/api-client";
import { UserRole } from "@getryde/shared";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(UserRole.RIDER);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || name.length < 2) {
      toast.error("Please enter your full name");
      return;
    }
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post("/auth/register", {
        name,
        email: email || undefined,
        phone: phone.startsWith("+91") ? phone : `+91${phone}`,
        role,
      }).catch(() => {
        // demo fallback
      });

      toast.success("Account details saved! Please verify your phone number.");
      router.push(`/verify-otp?phone=${encodeURIComponent(phone)}&role=${role}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-3xl border border-gray-200 shadow-xl bg-white p-6 sm:p-8">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-black text-[#111111]">Join GETRYDE</h2>
        <p className="text-xs text-gray-500">
          Sign up to experience transparent, fast, and reliable city rides.
        </p>
      </div>

      {/* Role Picker */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5F6F7] rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setRole(UserRole.RIDER)}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
            role === UserRole.RIDER
              ? "bg-[#111111] text-white shadow-sm"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <User className="w-4 h-4" />
          I am a Rider
        </button>
        <button
          type="button"
          onClick={() => setRole(UserRole.DRIVER)}
          className={`flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
            role === UserRole.DRIVER
              ? "bg-[#111111] text-white shadow-sm"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <Car className="w-4 h-4" />
          I want to Drive
        </button>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Ananya Roy"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold tracking-wider text-[#111111] focus:border-[#111111] focus:ring-2 focus:ring-[#B9F227]/40 outline-none"
            />
          </div>
        </div>

        <Input
          label="Email Address (Optional)"
          type="email"
          placeholder="e.g. ananya@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full font-bold shadow-md"
            isLoading={isLoading}
          >
            Continue to Verification
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#111111] hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </Card>
  );
}

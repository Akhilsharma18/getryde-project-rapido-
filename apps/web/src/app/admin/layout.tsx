"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { useAuthStore } from "@/store/auth-store";
import {
  Shield,
  Users,
  Car,
  Navigation,
  DollarSign,
  CreditCard,
  BarChart3,
  LogOut,
  Menu,
  X,
  FileCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminLinks = [
    { label: "Overview", href: "/admin/dashboard", icon: BarChart3 },
    { label: "Users Management", href: "/admin/users", icon: Users },
    { label: "Drivers & KYC", href: "/admin/drivers", icon: Car },
    { label: "All Rides & Trips", href: "/admin/rides", icon: Navigation },
    { label: "Pricing & Rules", href: "/admin/pricing", icon: DollarSign },
    { label: "Payments & Refunds", href: "/admin/payments", icon: CreditCard },
    { label: "Reports & Logs", href: "/admin/reports", icon: FileCheck },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col md:flex-row">
      {/* Mobile Top Nav */}
      <div className="md:hidden bg-[#111111] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Logo variant="dark" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl text-gray-300 hover:bg-neutral-800"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-[#111111] text-white flex flex-col justify-between transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="pb-6 border-b border-neutral-800 flex items-center justify-between">
            <Logo variant="dark" showTagline={false} />
            <Badge variant="accent" className="text-[10px]">ADMIN</Badge>
          </div>

          <nav className="mt-6 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#B9F227] text-[#111111] font-bold shadow-sm"
                      : "text-gray-400 hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}

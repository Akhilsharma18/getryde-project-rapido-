"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { useAuthStore } from "@/store/auth-store";
import {
  LayoutDashboard,
  Radio,
  Navigation,
  Wallet,
  Clock,
  Car,
  FileText,
  Star,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Power,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isOnline, setIsOnline] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarLinks = [
    { label: "Dashboard", href: "/driver/dashboard", icon: LayoutDashboard },
    { label: "Ride Requests", href: "/driver/requests", icon: Radio },
    { label: "Active Trip", href: "/driver/active-ride", icon: Navigation },
    { label: "Earnings Transparency", href: "/driver/earnings", icon: Wallet },
    { label: "Trip History", href: "/driver/history", icon: Clock },
    { label: "My Vehicle", href: "/driver/vehicle", icon: Car },
    { label: "Documents & KYC", href: "/driver/documents", icon: FileText },
  ];

  const toggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (nextState) {
      toast.success("You are now ONLINE. Ready to receive ride requests.");
    } else {
      toast.info("You are now OFFLINE. No incoming requests.");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#111111] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Logo variant="dark" />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl text-gray-300 hover:bg-neutral-800"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-[#111111] text-white flex flex-col justify-between transition-transform duration-200 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="pb-6 border-b border-neutral-800">
            <Logo variant="dark" showTagline={false} />

            {/* Online / Offline status toggle card */}
            <div className="mt-4 p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? "bg-[#B9F227] animate-pulse" : "bg-gray-500"
                  }`}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleOnline}
                className={`p-1.5 rounded-xl transition-all ${
                  isOnline
                    ? "bg-[#B9F227] text-[#111111]"
                    : "bg-neutral-800 text-gray-400 hover:text-white"
                }`}
                title="Toggle Online/Offline"
              >
                <Power className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#B9F227] text-[#111111] font-bold shadow-sm"
                      : "text-gray-400 hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#111111]" : "text-gray-400"
                    }`}
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
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

      {/* Main Content Area */}
      <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}

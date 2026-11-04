"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import {
  LayoutDashboard,
  Car,
  Clock,
  Users,
  Calendar,
  CreditCard,
  Bot,
  Shield,
  HelpCircle,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  MapPin,
} from "lucide-react";

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarLinks = [
    { label: "Overview", href: "/rider/dashboard", icon: LayoutDashboard },
    { label: "Book a Ride", href: "/rider/book-ride", icon: Car },
    { label: "My Rides", href: "/rider/rides", icon: Clock },
    { label: "Ride Pooling", href: "/rider/pooling", icon: Users },
    { label: "Scheduled Rides", href: "/rider/scheduled", icon: Calendar },
    { label: "Payments", href: "/rider/payments", icon: CreditCard },
    { label: "AI Assistant", href: "/rider/assistant", icon: Bot },
    { label: "Safety & SOS", href: "/safety", icon: Shield },
    { label: "Help & Support", href: "/contact", icon: HelpCircle },
    { label: "Profile", href: "/rider/profile", icon: User },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-[#E5E7EB] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Logo />
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl text-gray-700 hover:bg-[#F5F6F7]"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop / Collapsible Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-white border-r border-[#E5E7EB] flex flex-col justify-between transition-transform duration-200 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="pb-6 border-b border-[#E5E7EB]">
            <Logo showTagline={false} />
            <div className="mt-4 p-3 rounded-2xl bg-[#F5F6F7] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-[#B9F227] flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name[0].toUpperCase() : "R"}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-[#111111] truncate">
                  {user?.name || "Aarav Sharma"}
                </div>
                <div className="text-xs text-gray-500 truncate">Rider Account</div>
              </div>
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
                      ? "bg-[#111111] text-white shadow-sm"
                      : "text-gray-600 hover:bg-[#F5F6F7] hover:text-[#111111]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#B9F227]" : "text-gray-500"
                    }`}
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#E5E7EB] space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
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

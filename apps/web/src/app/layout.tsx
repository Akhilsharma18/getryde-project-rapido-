import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { MobileNav } from "@/components/layout/mobile-nav";

export const metadata: Metadata = {
  title: "GETRYDE — Your Ride. Your Choice. Your Way.",
  description:
    "India's next-generation mobility platform. Book Bike, Auto, or Car rides with smart fare negotiation, pooling, transparent driver earnings, and AI assistance.",
  applicationName: "GETRYDE",
  appleWebApp: {
    capable: true,
    title: "GETRYDE",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#111111] antialiased selection:bg-[#B9F227] selection:text-[#111111]">
        {children}
        <MobileNav />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PwaRegistrar } from "@/components/pwa/pwa-registrar";

export const metadata: Metadata = {
  title: "GETRYDE — Your Ride. Your Choice. Your Way.",
  description:
    "India's next-generation mobility platform. Book Bike, Auto, or Car rides with smart fare negotiation, pooling, transparent driver earnings, and AI assistance.",
  applicationName: "GETRYDE",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "GETRYDE",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body className="min-h-screen bg-white text-[#111111] antialiased selection:bg-[#B9F227] selection:text-[#111111]">
        {children}
        <MobileNav />
        <PwaRegistrar />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

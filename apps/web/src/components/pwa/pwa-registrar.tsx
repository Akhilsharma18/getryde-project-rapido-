"use client";

import React, { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PwaRegistrar: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("PWA Service Worker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.warn("PWA Service Worker registration failed:", error);
          });
      });
    }

    // 2. Check if already installed in standalone mode
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone)
    ) {
      setIsInstalled(true);
    }

    // 3. Listen for Android Chrome 'beforeinstallprompt'
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show banner if not already installed and not dismissed in this session
      const dismissed = sessionStorage.getItem("pwa_install_dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // 4. Listen for app installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem("pwa_install_dismissed", "true");
  };

  if (!showInstallBanner || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-16 md:bottom-5 left-4 right-4 md:left-auto md:right-5 md:max-w-sm z-50 animate-in slide-in-from-bottom-3 duration-300">
      <div className="bg-[#111111] text-white p-4 rounded-2xl border border-neutral-700 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B9F227] text-[#111111] flex items-center justify-center font-black text-xs flex-shrink-0">
            RYDE
          </div>
          <div>
            <div className="text-xs font-bold text-white">Install GETRYDE App</div>
            <div className="text-[11px] text-gray-400">Fast, offline-ready & standalone</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleInstallClick}
            variant="accent"
            size="sm"
            className="text-xs font-bold px-3 py-1.5 h-auto shadow-sm"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Install
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-gray-400 hover:text-white"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

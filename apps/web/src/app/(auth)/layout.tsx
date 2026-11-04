import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Logo showTagline={true} className="items-center" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      <div className="mt-8 text-center text-xs text-gray-500">
        By continuing, you agree to GETRYDE&apos;s{" "}
        <Link href="/safety" className="underline hover:text-black">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/safety" className="underline hover:text-black">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}

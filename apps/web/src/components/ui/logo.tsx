import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "default";
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "default",
  showTagline = false,
}) => {
  const isDark = variant === "dark";

  return (
    <Link href="/" className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className="flex items-center gap-1.5 font-black text-2xl tracking-tighter">
        <span
          className={`px-2.5 py-0.5 rounded-md font-extrabold ${
            isDark ? "bg-[#B9F227] text-[#111111]" : "bg-[#111111] text-[#FFFFFF]"
          }`}
        >
          GET
        </span>
        <span className={isDark ? "text-white" : "text-[#111111]"}>
          RYDE
          <span className="text-[#B9F227] ml-0.5">.</span>
        </span>
      </div>
      {showTagline && (
        <span
          className={`text-[10px] uppercase font-semibold tracking-wider mt-0.5 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Your Ride. Your Choice. Your Way.
        </span>
      )}
    </Link>
  );
};

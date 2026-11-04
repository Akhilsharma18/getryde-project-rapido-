import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 mb-14 md:mb-0 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" showTagline={true} />
            <p className="text-gray-400 text-sm max-w-sm mt-3 leading-relaxed">
              GETRYDE is India&apos;s transparent, next-generation ride-booking platform.
              Empowering riders with smart fare negotiation and pooling, while giving drivers
              100% earnings transparency.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-[#B9F227]">
              <span className="flex h-2 w-2 rounded-full bg-[#B9F227] animate-pulse"></span>
              Live in Metros & Tier-2/3 Cities
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition-colors">
                  Safety First
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Careers & Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Riders & Drivers
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/rider/book-ride" className="hover:text-white transition-colors">
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link href="/rider/pooling" className="hover:text-white transition-colors">
                  Smart Pooling
                </Link>
              </li>
              <li>
                <Link href="/driver/dashboard" className="hover:text-white transition-colors">
                  Become a Driver
                </Link>
              </li>
              <li>
                <Link href="/driver/earnings" className="hover:text-white transition-colors">
                  Earnings Transparency
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-[#B9F227] transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/safety" className="hover:text-white transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Emergency Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} GETRYDE Mobility Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for the future of mobility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

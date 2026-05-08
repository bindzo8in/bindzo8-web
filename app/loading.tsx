"use client";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Logo with Pulse Effect */}
        <div className="relative h-20 w-48 mb-8 animate-pulse">
          <Image
            src="/nav_logo.png"
            alt="Bindzo 8 Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Sleek Progress Bar */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-[#d6335a] animate-loading-bar w-1/3 rounded-full"></div>
        </div>
        
        <p className="mt-4 text-[13px] font-medium text-gray-400 uppercase tracking-[0.2em] animate-pulse">
          Loading Excellence...
        </p>
      </div>

      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 60%; }
          100% { transform: translateX(400%); width: 30%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

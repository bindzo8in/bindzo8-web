"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center bg-white font-kumbh pt-20 md:pt-24">
      <div className="relative mb-8 h-12 w-32 grayscale opacity-50">
        <Image
          src="/nav_logo.png"
          alt="Bindzo 8"
          fill
          className="object-contain"
        />
      </div>

      <div className="w-16 h-16 bg-[#d6335a]/10 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-[#d6335a]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Unexpected Turbulence
      </h2>
      <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
        Something went wrong on our end. We're already looking into it.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-full bg-[#d6335a] px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#b52a4b] hover:shadow-lg active:scale-95"
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gray-100 px-8 py-3 text-sm font-bold text-gray-700 transition-all hover:bg-gray-200 active:scale-95"
        >
          Back to Home
        </a>
      </div>
      
      {error.digest && (
        <p className="mt-8 text-[10px] font-mono text-gray-300">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-white">
          <div className="relative mb-8 h-12 w-32 grayscale opacity-50">
            <Image
              src="/nav_logo.png"
              alt="Bindzo 8"
              fill
              className="object-contain"
            />
          </div>

          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-red-500"
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

          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Critical System Error
          </h1>
          <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
            A major failure occurred. Please try refreshing the application.
          </p>

          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-[#d6335a] px-10 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-[#b52a4b] active:scale-95"
          >
            Recover Application
          </button>
          
          {error.digest && (
            <p className="mt-8 text-[10px] font-mono text-gray-300">
              Diagnostic ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}

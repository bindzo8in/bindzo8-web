// components/MarketingSection.tsx
"use client";

import React from "react";

export interface Feature {
  title: string;
  description: string;
}

export interface MarketingSectionProps {
  title: string;
  media: React.ReactNode;
  heroLabel: string;
  heroDescription: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  features: Feature[];
  className?: string;
}

export function MarketingSection({
  title,
  media,
  heroLabel,
  heroDescription,
  ctaLabel = "Get Quote",
  onCtaClick,
  features,
  className = "",
}: MarketingSectionProps) {
  return (
    <div className={`min-h-screen bg-white font-kumbh ${className}`}>
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#fce4ec 0%,#fdf0f5 30%,#ede7f6 70%,#dce8f8 100%)",
        }}
      >
        <Glow className="-left-24 top-0 h-72 w-72" color="#f48fb1" />
        <Glow className="bottom-0 right-0 h-64 w-64" color="#b39ddb" />

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-10">
          <h1
            className="mb-10 text-center text-3xl font-semibold tracking-tight"
            style={{ color: "#d63a6e" }}
          >
            {title}
          </h1>

          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center">
            <div className="flex flex-1 items-center justify-center">
              {media}
            </div>

            <div className="max-w-lg flex-1">
              <p className="text-sm leading-relaxed text-gray-700">
                <span className="font-bold text-gray-900">{heroLabel}</span>{" "}
                {heroDescription}
              </p>

              <button
                onClick={onCtaClick}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#e84b7a" }}
              >
                {ctaLabel}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <ul className="space-y-6" role="list">
          {features.map((feature) => (
            <li key={feature.title}>
              <p className="text-sm text-gray-800">
                <span className="font-bold">{feature.title}</span>
                <br />
                <span className="text-gray-500">{feature.description}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Glow({
  className,
  color,
}: {
  className: string;
  color: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full opacity-40 ${className}`}
      aria-hidden="true"
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
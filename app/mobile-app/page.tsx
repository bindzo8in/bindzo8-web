"use client";

import React from "react";
import Image from "next/image";

export default function MobileAppDevelopmentPage() {
  return (
    <main className="bg-black text-white overflow-x-hidden font-kumbh">
      <HeroSection />
      <IntroSection />
      <FramesSection />
      <TechSection />
      <CTASection />
    </main>
  );
}

/* ---------------- HERO ---------------- */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <p className="text-orange-500 uppercase tracking-[0.25em] mb-4 text-sm">
            Mobile App Development
          </p>

          <h1 className="font-bold leading-[0.95] text-[clamp(2.8rem,7vw,6rem)]">
            Build Apps
            <br />
            Users Love
          </h1>

          <p className="mt-6 max-w-xl text-white/80 text-[clamp(1rem,1.3vw,1.35rem)] leading-relaxed">
            We create fast, scalable, beautiful Android and iOS apps with
            premium UI, clean architecture, and business-focused features.
          </p>
        </div>

        <div className="relative h-[320px] sm:h-[420px] lg:h-[620px]">
          <Image
            src="/mobile-app/hero-phone.png"
            alt="Mobile App UI"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- INTRO ---------------- */

function IntroSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 xl:px-24 py-20">
      <div className="max-w-5xl">
        <h2 className="text-orange-500 font-semibold text-[clamp(2rem,4vw,4rem)] mb-6">
          Why Mobile Apps Matter
        </h2>

        <p className="text-white/85 text-[clamp(1rem,1.2vw,1.3rem)] leading-relaxed">
          Mobile apps improve customer retention, streamline operations, increase
          engagement, and open direct communication channels with your users.
          Your business is already in their pocket — the question is whether your
          brand is too.
        </p>
      </div>
    </section>
  );
}

/* ---------------- FRAMES ---------------- */

function FramesSection() {
  const frames = [
    "/mobile-app/Property 1=Group 162.svg",
    "/mobile-app/Property 1=Group 163.svg",
    "/mobile-app/Property 1=Group 164.svg",
    "/mobile-app/Property 1=Group 165.svg",
    "/mobile-app/Property 1=Variant5.svg",
  ];

  return (
    <section className="px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
      <div className="mb-8">
        <h2 className="text-orange-500 font-semibold text-[clamp(2rem,4vw,4rem)]">
          Development Workflow
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {frames.map((frame, i) => (
          <div
            key={i}
            className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-[1.45/1]"
          >
            <Image
              src={frame}
              alt={`Frame ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TECH ---------------- */

function TechSection() {
  const tech = [
    "Flutter",
    "React Native",
    "Swift",
    "Kotlin",
    "Firebase",
    "Node.js",
    "MongoDB",
    "REST API",
  ];

  return (
    <section className="px-6 sm:px-10 lg:px-16 xl:px-24 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-orange-500 font-semibold text-[clamp(2rem,4vw,4rem)] mb-6">
            Technologies We Use
          </h2>

          <div className="flex flex-wrap gap-4">
            {tech.map((item) => (
              <span
                key={item}
                className="px-5 py-3 rounded-full border border-white/15 bg-white/5 text-white/90"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-[300px] sm:h-[420px]">
          <Image
            src="/mobile-app/mobile_app_developement_screen.svg"
            alt="App design screen"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */

function CTASection() {
  return (
    <section className="px-6 sm:px-10 lg:px-16 xl:px-24 py-24">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 sm:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-bold leading-[0.95] text-[clamp(2rem,5vw,4.5rem)]">
              Ready to Launch
              <br />
              Your App?
            </h2>

            <p className="mt-6 text-white/80 max-w-xl">
              From idea to App Store & Play Store deployment — we handle design,
              development, testing, and launch.
            </p>
          </div>

          <div className="flex lg:justify-end">
            <button className="px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-400 transition text-white font-semibold">
              Start Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

// ── tunables ────────────────────────────────────────────────────────────────
const LOGO_SIZE    = 332;   // px — logo square
const DIP_THRESHOLD = 0.70; // 0–1: fraction of max travel where squish begins
const SQUISH        = 0.78; // minimum scale on the colliding axis
const SPEED         = 0.00036; // radians per ms
// ────────────────────────────────────────────────────────────────────────────

interface FloatingBrandMarkProps {
  children?: React.ReactNode;
}

export default function FloatingBrandMark({ children }: FloatingBrandMarkProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgLayerRef  = useRef<HTMLDivElement>(null); // background animation wrapper
  const logoRef     = useRef<HTMLDivElement>(null);
  const shadowRef   = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const bgLayer = bgLayerRef.current!;

    let rafId: number;
    let startTime: number | null = null;

    // ── entrance ──────────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(section,  { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo(logoRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1,   opacity: 1, duration: 1, ease: "back.out(1.8)" },
        "-=0.3"
      )
      .fromTo(shadowRef.current,
        { opacity: 0, scaleX: 0.3 },
        { opacity: 1, scaleX: 1,   duration: 0.7 },
        "-=0.5"
      );

    // ── rAF loop: Lissajous inside section bounds ─────────────────
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const t = (now - startTime) * SPEED;

      const { width: W, height: H } = bgLayer.getBoundingClientRect();
      const half = LOGO_SIZE / 2;
      const maxX = W / 2 - half;
      const maxY = H / 2 - half;

      const rawX = Math.sin(1       * t) * maxX;
      const rawY = Math.cos(1.61803 * t) * maxY; // golden-ratio freq → no repeat

      // proximity to each wall, 0 = centre → 1 = wall
      const proxX = Math.abs(rawX) / maxX;
      const proxY = Math.abs(rawY) / maxY;

      // dip factor 0 → 1 past threshold
      const dipX = Math.max(0, (proxX - DIP_THRESHOLD) / (1 - DIP_THRESHOLD));
      const dipY = Math.max(0, (proxY - DIP_THRESHOLD) / (1 - DIP_THRESHOLD));

      // squish colliding axis, puff perpendicular
      const finalScaleX = (1 - dipX * (1 - SQUISH)) * (1 + dipY * 0.14);
      const finalScaleY = (1 - dipY * (1 - SQUISH)) * (1 + dipX * 0.14);
      const tiltZ       = (rawX / maxX) * 6;

      gsap.set(logoRef.current, {
        x: rawX, y: rawY,
        scaleX: finalScaleX, scaleY: finalScaleY,
        rotation: tiltZ,
      });

      // shadow — shrinks / fades when logo is high
      const normY        = (rawY + maxY) / (2 * maxY); // 0 = top, 1 = bottom
      gsap.set(shadowRef.current, {
        scaleX:  0.35 + 0.65 * normY,
        opacity: 0.10 + 0.30 * normY,
        x:       rawX * 0.3,
      });

      // glow trails at 50% displacement
      gsap.set(glowRef.current, { x: rawX * 0.5, y: rawY * 0.5 });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      gsap.killTweensOf([section, logoRef.current, shadowRef.current]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-fit lg:min-h-screen overflow-hidden "
    >
      {/* ── BACKGROUND LAYER (pointer-events-none) ────────────────── */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* subtle page vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 75%)",
          }}
        />

        {/* large diffuse glow that chases the logo */}
        <div
          ref={glowRef}
          className="absolute"
          style={{
            top: "50%", left: "50%",
            translate: "-50% -50%",
            width: 360, height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 65%)",
            filter: "blur(48px)",
          }}
        />

        {/* logo — absolutely centred; gsap x/y from that origin */}
        <div
          ref={logoRef}
          className="absolute"
          style={{
            top: "50%", left: "50%",
            translate: "-50% -50%",
            width: LOGO_SIZE, height: LOGO_SIZE,
            opacity: 0.18,          /* subtle — it's a background element */
          }}
        >
          <Image
            src="/home/ourProducts/Bindzo_logo.png"
            alt=""
            fill
            priority
            className="object-contain"
            style={{
              filter:
                "drop-shadow(0 0 32px rgba(99,102,241,0.55)) blur(0.4px)",
            }}
          />
        </div>

        {/* ground shadow pinned to bottom-centre of section */}
        <div
          ref={shadowRef}
          className="absolute"
          style={{
            bottom: 32,
            left: "50%",
            translate: "-50% 0",
            width: LOGO_SIZE * 0.6,
            height: 12,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.25)",
            filter: "blur(8px)",
            transformOrigin: "center center",
          }}
        />

        {/* faint grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(165,180,252,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(165,180,252,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── FOREGROUND CONTENT (full z-index, fully interactive) ──── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-fit lg:min-h-screen px-6 py-20">
        {children ?? <DefaultContent />}
      </div>
    </section>
  );
}

// ── example foreground content ───────────────────────────────────────────────
function DefaultContent() {
  return (
    <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
      {/* eyebrow */}
      <span
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase"
        style={{
          border: "1px solid rgba(165,180,252,0.25)",
          color: "rgba(165,180,252,0.8)",
          background: "rgba(99,102,241,0.08)",
          letterSpacing: "0.14em",
        }}
      >
        <span
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "rgba(129,140,248,0.9)",
            boxShadow: "0 0 6px rgba(129,140,248,0.8)",
            display: "inline-block",
          }}
        />
        Now in public beta
      </span>

      {/* headline */}
      <h1
        className="font-semibold leading-tight"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          color: "rgba(255,255,255,0.94)",
          letterSpacing: "-0.02em",
        }}
      >
        Build something{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #a5b4fc 0%, #818cf8 60%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          extraordinary
        </span>
      </h1>

      {/* body */}
      <p
        className="leading-relaxed max-w-lg"
        style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.45)" }}
      >
        The floating mark behind you is a background element — it never
        interferes with clicks, selections, or keyboard focus on this layer.
      </p>

      {/* CTA row */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: "rgba(99,102,241,0.9)",
            color: "#fff",
            border: "1px solid rgba(129,140,248,0.4)",
            boxShadow: "0 0 20px rgba(99,102,241,0.35)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(129,140,248,0.95)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(99,102,241,0.9)";
          }}
        >
          Get started
        </button>

        <button
          className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.04)";
          }}
        >
          Read the docs →
        </button>
      </div>

      {/* stat row */}
      <div
        className="flex gap-8 mt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}
      >
        {[
          { value: "10k+", label: "Developers" },
          { value: "99.9%", label: "Uptime" },
          { value: "<50ms", label: "Latency" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span
              style={{
                fontSize: "1.4rem", fontWeight: 600,
                color: "rgba(255,255,255,0.88)",
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
              {label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
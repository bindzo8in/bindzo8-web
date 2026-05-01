
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type BlobPoint = {
  x: number;
  y: number;
  scale: number;
};

type BlobState = {
  yellow: BlobPoint;
  cyan: BlobPoint;
  pink: BlobPoint;
};

const blobSize = 350;

const blobStates: BlobState[] = [
  {
    yellow: { x: 0.12, y: 0.12, scale: 1.1 },
    cyan: { x: 0.55, y: 0.08, scale: 1 },
    pink: { x: 0.78, y: 0.18, scale: 1.2 },
  },
  {
    yellow: { x: 0.22, y: 0.35, scale: 1.3 },
    cyan: { x: 0.52, y: 0.22, scale: 1.1 },
    pink: { x: 0.75, y: 0.38, scale: 0.9 },
  },
  {
    yellow: { x: 0.42, y: 0.28, scale: 1.5 },
    cyan: { x: 0.12, y: 0.55, scale: 1 },
    pink: { x: 0.72, y: 0.58, scale: 1.1 },
  },
  {
    yellow: { x: 0.68, y: 0.18, scale: 1.2 },
    cyan: { x: 0.35, y: 0.52, scale: 1.4 },
    pink: { x: 0.08, y: 0.62, scale: 1 },
  },
  {
    yellow: { x: 0.18, y: 0.48, scale: 1 },
    cyan: { x: 0.62, y: 0.55, scale: 1.3 },
    pink: { x: 0.74, y: 0.12, scale: 1.2 },
  },
  {
    yellow: { x: 0.48, y: 0.62, scale: 1.4 },
    cyan: { x: 0.1, y: 0.16, scale: 1.1 },
    pink: { x: 0.76, y: 0.42, scale: 1.3 },
  },
];

type AnimatedBlobsProps = {
  className?: string;
};

const AnimatedBlobs = ({ className = "" }: AnimatedBlobsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const yellowRef = useRef<HTMLDivElement | null>(null);
  const cyanRef = useRef<HTMLDivElement | null>(null);
  const pinkRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const yellow = yellowRef.current;
      const cyan = cyanRef.current;
      const pink = pinkRef.current;

      if (!container || !yellow || !cyan || !pink) return;

      const toPx = (point: BlobPoint) => {
        const rect = container.getBoundingClientRect();

        return {
          x: point.x * (rect.width - blobSize),
          y: point.y * (rect.height - blobSize),
          scale: point.scale,
        };
      };

      gsap.set(yellow, toPx(blobStates[0].yellow));
      gsap.set(cyan, toPx(blobStates[0].cyan));
      gsap.set(pink, toPx(blobStates[0].pink));

      const blobTl = gsap.timeline({
        repeat: -1,
        defaults: {
          duration: 3,
          ease: "sine.inOut",
        },
      });

      blobStates.forEach((state) => {
        blobTl.to(yellow, toPx(state.yellow), ">");
        blobTl.to(cyan, toPx(state.cyan), "<");
        blobTl.to(pink, toPx(state.pink), "<");
      });

      const resizeObserver = new ResizeObserver(() => {
        gsap.set(yellow, toPx(blobStates[0].yellow));
        gsap.set(cyan, toPx(blobStates[0].cyan));
        gsap.set(pink, toPx(blobStates[0].pink));
      });

      resizeObserver.observe(container);

      return () => {
        blobTl.kill();
        resizeObserver.disconnect();
      };
    },
    {
      scope: containerRef,
    }
  );

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        ref={yellowRef}
        className="absolute size-[350px] rounded-full bg-yellow-400/40 blur-[125px]"
      />

      <div
        ref={cyanRef}
        className="absolute size-[350px] rounded-full bg-cyan-400/40 blur-[125px]"
      />

      <div
        ref={pinkRef}
        className="absolute size-[350px] rounded-full bg-pink-600/40 blur-[125px]"
      />
    </div>
  );
};

export default AnimatedBlobs;
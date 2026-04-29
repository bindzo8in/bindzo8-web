"use client";

import { useEffect, useRef } from "react";

const COLOR_PALETTE = [
  [0, 229, 255],
  [255, 0, 221],
  [13, 255, 0],
  [255, 187, 0],
  [255, 0, 34],
];

const COLOR_CYCLE_SPEED = 0.012;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getSyncedWaveColor(t: number) {
  const progress = t * COLOR_CYCLE_SPEED;
  const index = Math.floor(progress) % COLOR_PALETTE.length;
  const next = (index + 1) % COLOR_PALETTE.length;
  const mix = progress % 1;

  const c1 = COLOR_PALETTE[index];
  const c2 = COLOR_PALETTE[next];

  const r = Math.round(lerp(c1[0], c2[0], mix));
  const g = Math.round(lerp(c1[1], c2[1], mix));
  const b = Math.round(lerp(c1[2], c2[2], mix));

  return { r, g, b };
}

const SPEED_MULTIPLIER = 0.10;

const WAVE_LINES = [
  {
    baseY: 0.20, archAmp: -0.13, archPhase: 0.00,
    speed1: 0.0011, speed2: 0.0007, speed3: 0.0016,
    freq1: 0.0028,  freq2: 0.0051,  freq3: 0.0017,
    phase1: 0.00,   phase2: 1.30,   phase3: 2.70,
    amp1: 0.055,   amp2: 0.035,   amp3: 0.022,
    alpha: 0.55, lw: 0.85,
    opacitySpeed: 0.00041, opacityPhase: 0.00, opacityMin: 0.25,
  },
  {
    baseY: 0.22, archAmp: -0.12, archPhase: 0.10,
    speed1: 0.0015, speed2: 0.0009, speed3: 0.0013,
    freq1: 0.0033,  freq2: 0.0045,  freq3: 0.0022,
    phase1: 0.80,   phase2: 2.10,   phase3: 0.40,
    amp1: 0.045,   amp2: 0.040,   amp3: 0.018,
    alpha: 0.85, lw: 1.30,
    opacitySpeed: 0.00067, opacityPhase: 1.80, opacityMin: 0.30,
  },
  {
    baseY: 0.24, archAmp: -0.11, archPhase: -0.10,
    speed1: 0.0009, speed2: 0.0014, speed3: 0.0012,
    freq1: 0.0040,  freq2: 0.0029,  freq3: 0.0058,
    phase1: 1.50,   phase2: 0.60,   phase3: 3.10,
    amp1: 0.050,   amp2: 0.028,   amp3: 0.030,
    alpha: 0.60, lw: 0.85,
    opacitySpeed: 0.00053, opacityPhase: 3.50, opacityMin: 0.20,
  },
  {
    baseY: 0.26, archAmp: -0.10, archPhase: 0.20,
    speed1: 0.0013, speed2: 0.0008, speed3: 0.0019,
    freq1: 0.0024,  freq2: 0.0060,  freq3: 0.0035,
    phase1: 2.20,   phase2: 3.50,   phase3: 1.10,
    amp1: 0.038,   amp2: 0.044,   amp3: 0.025,
    alpha: 0.50, lw: 0.75,
    opacitySpeed: 0.00079, opacityPhase: 0.90, opacityMin: 0.15,
  },
  {
    baseY: 0.74, archAmp: 0.12, archPhase: 0.00,
    speed1: 0.0010, speed2: 0.0017, speed3: 0.0007,
    freq1: 0.0036,  freq2: 0.0022,  freq3: 0.0053,
    phase1: 1.10,   phase2: 0.30,   phase3: 2.00,
    amp1: 0.048,   amp2: 0.032,   amp3: 0.028,
    alpha: 0.50, lw: 0.75,
    opacitySpeed: 0.00046, opacityPhase: 2.30, opacityMin: 0.15,
  },
  {
    baseY: 0.76, archAmp: 0.13, archPhase: -0.10,
    speed1: 0.0015, speed2: 0.0011, speed3: 0.0006,
    freq1: 0.0027,  freq2: 0.0049,  freq3: 0.0038,
    phase1: 3.00,   phase2: 1.80,   phase3: 0.70,
    amp1: 0.052,   amp2: 0.038,   amp3: 0.022,
    alpha: 0.85, lw: 1.30,
    opacitySpeed: 0.00061, opacityPhase: 4.10, opacityMin: 0.30,
  },
  {
    baseY: 0.78, archAmp: 0.11, archPhase: 0.10,
    speed1: 0.0012, speed2: 0.0008, speed3: 0.0015,
    freq1: 0.0043,  freq2: 0.0031,  freq3: 0.0019,
    phase1: 0.50,   phase2: 2.60,   phase3: 1.40,
    amp1: 0.042,   amp2: 0.046,   amp3: 0.019,
    alpha: 0.60, lw: 0.85,
    opacitySpeed: 0.00073, opacityPhase: 1.20, opacityMin: 0.20,
  },
  {
    baseY: 0.80, archAmp: 0.10, archPhase: -0.20,
    speed1: 0.0017, speed2: 0.0013, speed3: 0.0009,
    freq1: 0.0031,  freq2: 0.0055,  freq3: 0.0042,
    phase1: 2.80,   phase2: 0.90,   phase3: 3.30,
    amp1: 0.035,   amp2: 0.041,   amp3: 0.031,
    alpha: 0.55, lw: 0.85,
    opacitySpeed: 0.00057, opacityPhase: 5.00, opacityMin: 0.25,
  },
];

type WaveLine = typeof WAVE_LINES[0];

function getY(line: WaveLine, x: number, W: number, H: number, t: number): number {
  const nx = x / W;
  const tt = t * SPEED_MULTIPLIER;

  const arch = H * line.archAmp * Math.sin((nx + line.archPhase) * Math.PI);

  const w1 =
    H *
    line.amp1 *
    Math.sin(x * line.freq1 + tt * line.speed1 * 60 + line.phase1);

  const w2 =
    H *
    line.amp2 *
    Math.sin(x * line.freq2 + tt * line.speed2 * 60 + line.phase2);

  const w3 =
    H *
    line.amp3 *
    Math.cos(x * line.freq3 + tt * line.speed3 * 60 + line.phase3);

  return H * line.baseY + arch + w1 + w2 + w3;
}

function getLiveAlpha(line: WaveLine, t: number): number {
  const tt = t * SPEED_MULTIPLIER;
  const norm =
    (Math.sin(tt * line.opacitySpeed * 60 + line.opacityPhase) + 1) / 2;

  const factor =
    line.opacityMin + norm * (1 - line.opacityMin);

  return line.alpha * factor;
}

// const BLOB_FRAMES = [
//   {
//     red:   { x: 0.52, y: 0.70, s: 0.58 },
//     green: { x: 0.22, y: 0.26, s: 0.54 },
//     blue:  { x: 0.73, y: 0.24, s: 0.42 },
//   },
//   {
//     red:   { x: 0.25, y: 0.28, s: 0.52 },
//     green: { x: 0.80, y: 0.26, s: 0.34 },
//     blue:  { x: 0.54, y: 0.70, s: 0.64 },
//   },
//   {
//     red:   { x: 0.72, y: 0.36, s: 0.68 },
//     green: { x: 0.50, y: 0.74, s: 0.36 },
//     blue:  { x: 0.22, y: 0.32, s: 0.50 },
//   },
// ] as const;
// BEFORE → AFTER
const BLOB_FRAMES = [
  // Frame A
  {
    red:   { x: 0.52, y: 0.70, s: 0.40 }, // was 0.58
    green: { x: 0.22, y: 0.26, s: 0.38 }, // was 0.54
    blue:  { x: 0.73, y: 0.24, s: 0.30 }, // was 0.42
  },
  // Frame B
  {
    red:   { x: 0.25, y: 0.28, s: 0.36 }, // was 0.52
    green: { x: 0.80, y: 0.26, s: 0.24 }, // was 0.34
    blue:  { x: 0.54, y: 0.70, s: 0.45 }, // was 0.64
  },
  // Frame C
  {
    red:   { x: 0.72, y: 0.36, s: 0.48 }, // was 0.68
    green: { x: 0.50, y: 0.74, s: 0.25 }, // was 0.36
    blue:  { x: 0.22, y: 0.32, s: 0.35 }, // was 0.50
  },
] as const;

const BLOB_DURATION = 2000;

type BlobState = { x: number; y: number; s: number };

function lerpBlob(a: BlobState, b: BlobState, t: number): BlobState {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    s: lerp(a.s, b.s, t),
  };
}

function drawBlob(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  cx: number,
  cy: number,
  sr: number,
  r: number,
  g: number,
  b: number
) {
  const vmin = Math.min(W, H);
  const px = cx * W;
  const py = cy * H;
  const radius = sr * vmin;

  const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
  // grad.addColorStop(0, `rgba(${r},${g},${b},0.88)`);
  // grad.addColorStop(0.28, `rgba(${r},${g},${b},0.60)`);
  // grad.addColorStop(0.58, `rgba(${r},${g},${b},0.22)`);
  // grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  grad.addColorStop(0,    `rgba(${r},${g},${b},0.55)`);
grad.addColorStop(0.28, `rgba(${r},${g},${b},0.35)`);
grad.addColorStop(0.58, `rgba(${r},${g},${b},0.12)`);
grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);
  const blobStartTimeRef = useRef<number | null>(null);
  const blobFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function draw(timestamp: number) {
      const W = canvas!.width;
      const H = canvas!.height;
      const t = tRef.current;
      const syncedColor = getSyncedWaveColor(t);

      ctx!.fillStyle = "#04050a";
      ctx!.fillRect(0, 0, W, H);

      if (blobStartTimeRef.current === null) {
        blobStartTimeRef.current = timestamp;
      }

      let progress = (timestamp - blobStartTimeRef.current) / BLOB_DURATION;

      if (progress >= 1) {
        blobFrameRef.current = (blobFrameRef.current + 1) % BLOB_FRAMES.length;
        blobStartTimeRef.current = timestamp;
        progress = 0;
      }

      const fromFrame = BLOB_FRAMES[blobFrameRef.current];
      const toFrame = BLOB_FRAMES[(blobFrameRef.current + 1) % BLOB_FRAMES.length];

      const red = lerpBlob(fromFrame.red as BlobState, toFrame.red as BlobState, progress);
      const green = lerpBlob(fromFrame.green as BlobState, toFrame.green as BlobState, progress);
      const blue = lerpBlob(fromFrame.blue as BlobState, toFrame.blue as BlobState, progress);

      drawBlob(ctx!, W, H, red.x, red.y, red.s, 242, 100, 90);
      drawBlob(ctx!, W, H, green.x, green.y, green.s, 72, 230, 168);
      drawBlob(ctx!, W, H, blue.x, blue.y, blue.s, 110, 110, 235);

      WAVE_LINES.forEach((line) => {
        const liveAlpha = getLiveAlpha(line, t);

        ctx!.beginPath();
        for (let x = 0; x <= W; x += 4) {
          const y = getY(line, x, W, H, t);
          x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = `rgba(${syncedColor.r},${syncedColor.g},${syncedColor.b},${liveAlpha * 0.18})`;
        ctx!.lineWidth = 10;
        ctx!.lineJoin = "round";
        ctx!.stroke();

        ctx!.beginPath();
        for (let x = 0; x <= W; x += 4) {
          const y = getY(line, x, W, H, t);
          x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = `rgba(${syncedColor.r},${syncedColor.g},${syncedColor.b},${liveAlpha})`;
        ctx!.lineWidth = line.lw;
        ctx!.lineJoin = "round";
        ctx!.stroke();
      });
    }

    function loop(timestamp: number) {
      tRef.current += 1;
      draw(timestamp);
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ display: "block", zIndex: 0 }}
    />
  );
}

// "use client";

// import { useEffect, useRef } from "react";

// const COLOR_PALETTE = [
//   [0, 229, 255], // #00E5FF
//   [255, 0, 221], // #FF00DD
//   [13, 255, 0],  // #0DFF00
//   [255, 187, 0], // #FFBB00
//   [255, 0, 34],  // #FF0022
// ];

// const COLOR_CYCLE_SPEED = 0.012; // lower = slower

// function lerp(a: number, b: number, t: number) {
//   return a + (b - a) * t;
// }

// function getSyncedWaveColor(t: number) {
//   const progress = t * COLOR_CYCLE_SPEED;
//   const index = Math.floor(progress) % COLOR_PALETTE.length;
//   const next = (index + 1) % COLOR_PALETTE.length;
//   const mix = progress % 1;

//   const c1 = COLOR_PALETTE[index];
//   const c2 = COLOR_PALETTE[next];

//   const r = Math.round(lerp(c1[0], c2[0], mix));
//   const g = Math.round(lerp(c1[1], c2[1], mix));
//   const b = Math.round(lerp(c1[2], c2[2], mix));

//   return { r, g, b };
// }

// const SPEED_MULTIPLIER = 0.10;

// // Each line has completely independent speeds, frequencies, phases and amplitudes
// // so they NEVER move in sync — pure organic water-flow feel
// const WAVE_LINES = [
//   // ── Top group (4 lines) ────────────────────────────────────────────
//   {
//     baseY: 0.20, archAmp: -0.13, archPhase: 0.00,
//     speed1: 0.0011, speed2: 0.0007, speed3: 0.0016,
//     freq1: 0.0028,  freq2: 0.0051,  freq3: 0.0017,
//     phase1: 0.00,   phase2: 1.30,   phase3: 2.70,
//     amp1: 0.055,   amp2: 0.035,   amp3: 0.022,
//     alpha: 0.55, lw: 0.85,
//     // opacity animation: oscillates between alpha*opacityMin and alpha*1
//     opacitySpeed: 0.00041, opacityPhase: 0.00, opacityMin: 0.25,
//   },
//   {
//     baseY: 0.22, archAmp: -0.12, archPhase: 0.10,
//     speed1: 0.0015, speed2: 0.0009, speed3: 0.0013,
//     freq1: 0.0033,  freq2: 0.0045,  freq3: 0.0022,
//     phase1: 0.80,   phase2: 2.10,   phase3: 0.40,
//     amp1: 0.045,   amp2: 0.040,   amp3: 0.018,
//     alpha: 0.85, lw: 1.30,
//     opacitySpeed: 0.00067, opacityPhase: 1.80, opacityMin: 0.30,
//   },
//   {
//     baseY: 0.24, archAmp: -0.11, archPhase: -0.10,
//     speed1: 0.0009, speed2: 0.0014, speed3: 0.0012,
//     freq1: 0.0040,  freq2: 0.0029,  freq3: 0.0058,
//     phase1: 1.50,   phase2: 0.60,   phase3: 3.10,
//     amp1: 0.050,   amp2: 0.028,   amp3: 0.030,
//     alpha: 0.60, lw: 0.85,
//     opacitySpeed: 0.00053, opacityPhase: 3.50, opacityMin: 0.20,
//   },
//   {
//     baseY: 0.26, archAmp: -0.10, archPhase: 0.20,
//     speed1: 0.0013, speed2: 0.0008, speed3: 0.0019,
//     freq1: 0.0024,  freq2: 0.0060,  freq3: 0.0035,
//     phase1: 2.20,   phase2: 3.50,   phase3: 1.10,
//     amp1: 0.038,   amp2: 0.044,   amp3: 0.025,
//     alpha: 0.50, lw: 0.75,
//     opacitySpeed: 0.00079, opacityPhase: 0.90, opacityMin: 0.15,
//   },

//   // ── Bottom group (4 lines) ─────────────────────────────────────────
//   {
//     baseY: 0.74, archAmp: 0.12, archPhase: 0.00,
//     speed1: 0.0010, speed2: 0.0017, speed3: 0.0007,
//     freq1: 0.0036,  freq2: 0.0022,  freq3: 0.0053,
//     phase1: 1.10,   phase2: 0.30,   phase3: 2.00,
//     amp1: 0.048,   amp2: 0.032,   amp3: 0.028,
//     alpha: 0.50, lw: 0.75,
//     opacitySpeed: 0.00046, opacityPhase: 2.30, opacityMin: 0.15,
//   },
//   {
//     baseY: 0.76, archAmp: 0.13, archPhase: -0.10,
//     speed1: 0.0015, speed2: 0.0011, speed3: 0.0006,
//     freq1: 0.0027,  freq2: 0.0049,  freq3: 0.0038,
//     phase1: 3.00,   phase2: 1.80,   phase3: 0.70,
//     amp1: 0.052,   amp2: 0.038,   amp3: 0.022,
//     alpha: 0.85, lw: 1.30,
//     opacitySpeed: 0.00061, opacityPhase: 4.10, opacityMin: 0.30,
//   },
//   {
//     baseY: 0.78, archAmp: 0.11, archPhase: 0.10,
//     speed1: 0.0012, speed2: 0.0008, speed3: 0.0015,
//     freq1: 0.0043,  freq2: 0.0031,  freq3: 0.0019,
//     phase1: 0.50,   phase2: 2.60,   phase3: 1.40,
//     amp1: 0.042,   amp2: 0.046,   amp3: 0.019,
//     alpha: 0.60, lw: 0.85,
//     opacitySpeed: 0.00073, opacityPhase: 1.20, opacityMin: 0.20,
//   },
//   {
//     baseY: 0.80, archAmp: 0.10, archPhase: -0.20,
//     speed1: 0.0017, speed2: 0.0013, speed3: 0.0009,
//     freq1: 0.0031,  freq2: 0.0055,  freq3: 0.0042,
//     phase1: 2.80,   phase2: 0.90,   phase3: 3.30,
//     amp1: 0.035,   amp2: 0.041,   amp3: 0.031,
//     alpha: 0.55, lw: 0.85,
//     opacitySpeed: 0.00057, opacityPhase: 5.00, opacityMin: 0.25,
//   },
// ];

// type WaveLine = typeof WAVE_LINES[0];

// function getY(line: WaveLine, x: number, W: number, H: number, t: number): number {
//   const nx = x / W;

//   const tt = t * SPEED_MULTIPLIER;

//   const arch = H * line.archAmp * Math.sin((nx + line.archPhase) * Math.PI);

//   const w1 =
//     H *
//     line.amp1 *
//     Math.sin(x * line.freq1 + tt * line.speed1 * 60 + line.phase1);

//   const w2 =
//     H *
//     line.amp2 *
//     Math.sin(x * line.freq2 + tt * line.speed2 * 60 + line.phase2);

//   const w3 =
//     H *
//     line.amp3 *
//     Math.cos(x * line.freq3 + tt * line.speed3 * 60 + line.phase3);

//   return H * line.baseY + arch + w1 + w2 + w3;
// }

// // Returns a live alpha for this line that breathes in/out independently
// function getLiveAlpha(line: WaveLine, t: number): number {
//   const tt = t * SPEED_MULTIPLIER;

//   const norm =
//     (Math.sin(tt * line.opacitySpeed * 60 + line.opacityPhase) + 1) / 2;

//   const factor =
//     line.opacityMin + norm * (1 - line.opacityMin);

//   return line.alpha * factor;
// }

// export default function WaveBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animRef = useRef<number>(0);
//   const tRef = useRef(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     function draw() {
//       const W = canvas!.width;
//       const H = canvas!.height;
//       const t = tRef.current;
//       const syncedColor = getSyncedWaveColor(t);

//       // Base
//       ctx!.fillStyle = "#04050a";
//       ctx!.fillRect(0, 0, W, H);

//       // Teal blob — top center-right
//       const teal = ctx!.createRadialGradient(W * 0.58, H * 0.20, 0, W * 0.58, H * 0.20, W * 0.30);
//       teal.addColorStop(0, "rgba(0,125,145,0.90)");
//       teal.addColorStop(0.5, "rgba(0,90,110,0.40)");
//       teal.addColorStop(1, "transparent");
//       ctx!.fillStyle = teal;
//       ctx!.fillRect(0, 0, W, H);

//       // Yellow-green blob — bottom left
//       const yellow = ctx!.createRadialGradient(W * 0.17, H * 0.74, 0, W * 0.17, H * 0.74, W * 0.24);
//       yellow.addColorStop(0, "rgba(115,115,0,0.90)");
//       yellow.addColorStop(0.5, "rgba(80,80,0,0.40)");
//       yellow.addColorStop(1, "transparent");
//       ctx!.fillStyle = yellow;
//       ctx!.fillRect(0, 0, W, H);

//       // Purple blob — bottom right
//       const purple = ctx!.createRadialGradient(W * 0.87, H * 0.78, 0, W * 0.87, H * 0.78, W * 0.23);
//       purple.addColorStop(0, "rgba(130,0,110,0.90)");
//       purple.addColorStop(0.5, "rgba(90,0,80,0.40)");
//       purple.addColorStop(1, "transparent");
//       ctx!.fillStyle = purple;
//       ctx!.fillRect(0, 0, W, H);

//       // Draw each wave line independently
//       WAVE_LINES.forEach((line) => {
//         const liveAlpha = getLiveAlpha(line, t);

//         // Soft glow pass
//         ctx!.beginPath();
//         for (let x = 0; x <= W; x += 4) {
//           const y = getY(line, x, W, H, t);
//           x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
//         }
//         // ctx!.strokeStyle = `rgba(210,25,15,${liveAlpha * 0.18})`;
//         ctx!.strokeStyle = `rgba(${syncedColor.r},${syncedColor.g},${syncedColor.b},${liveAlpha * 0.18})`;
//         ctx!.lineWidth = 10;
//         ctx!.lineJoin = "round";
//         ctx!.stroke();

//         // Sharp line pass
//         ctx!.beginPath();
//         for (let x = 0; x <= W; x += 4) {
//           const y = getY(line, x, W, H, t);
//           x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
//         }
//         ctx!.strokeStyle = `rgba(${syncedColor.r},${syncedColor.g},${syncedColor.b},${liveAlpha})`;
//         ctx!.lineWidth = line.lw;
//         ctx!.lineJoin = "round";
//         ctx!.stroke();
//       });
//     }

//     function loop() {
//       tRef.current += 1;
//       draw();
//       animRef.current = requestAnimationFrame(loop);
//     }

//     loop();

//     return () => {
//       cancelAnimationFrame(animRef.current);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 w-full h-full"
//       style={{ display: "block", zIndex: 0 }}
//     />
//   );
// }
// // "use client"
// // import { motion, useAnimationControls } from "motion/react"
// // import { useEffect } from "react";


// // export default function Background() {
// //     const floatControls = useAnimationControls();

// //     useEffect(() => {
// //         const timeout = setTimeout(() => {
// //             floatControls.start({
// //                 y: [0, -20, 0], // Move up and down
// //                 transition: {
// //                     duration: 4,
// //                     repeat: Infinity,
// //                     ease: "easeInOut",
// //                 },
// //             })
// //         }, 1600)
// //         return () => clearTimeout(timeout);
// //     }, [floatControls])


// //     return (
// //         <>
// // {/* === Animated Wave Lines === */}
// // <motion.div
// //   className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
// //   animate={{
// //     color: ["#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#ef4444", "#f59e0b", "#22c55e"],
// //   }}
// //   transition={{
// //     duration: 20,
// //     repeat: Infinity,
// //     ease: "linear",
// //   }}
// // >
// //   {/* TOP WAVES */}
// //   <motion.div
// //     className="absolute top-0 left-0 w-full h-[150px]"
// //     animate={{ y: [0, -12, 8, -6, 0] }}
// //     transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
// //   >
// //     {[
// //       { top: 10, sw: 1.2, opacityKf: [0.8, 0.2, 0.7, 0.3, 0.8], yKf: [0, -10, 6, -4, 0], dur: 10 },
// //       { top: 30, sw: 1, opacityKf: [0.5, 0.9, 0.2, 0.7, 0.5], yKf: [0, 8, -12, 5, 0], dur: 13 },
// //       { top: 50, sw: 0.8, opacityKf: [0.3, 0.7, 0.5, 0.1, 0.3], yKf: [0, -14, 10, -8, 0], dur: 16 },
// //       { top: 70, sw: 0.8, opacityKf: [0.7, 0.1, 0.6, 0.9, 0.7], yKf: [0, 12, -6, 10, 0], dur: 11 },
// //       { top: 90, sw: 0.6, opacityKf: [0.2, 0.6, 0.9, 0.2, 0.2], yKf: [0, -8, 14, -10, 0], dur: 14 },
// //     ].map((l, i) => (
// //       <motion.svg
// //         key={`t${i}`}
// //         className="absolute left-0 w-full"
// //         style={{ top: l.top }}
// //         height="60"
// //         viewBox="0 0 1440 60"
// //         preserveAspectRatio="none"
// //         fill="none"
// //         animate={{ opacity: l.opacityKf, y: l.yKf }}
// //         transition={{
// //           opacity: { duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
// //           y: { duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
// //         }}
// //       >
// //         <path
// //           d={i % 2 === 0
// //             ? "M-50,30 C100,10 250,50 400,20 C550,-5 700,45 850,15 C1000,-5 1150,40 1300,12 C1400,5 1490,30 1490,30"
// //             : "M-50,30 C100,50 250,10 400,42 C550,60 700,15 850,48 C1000,60 1150,18 1300,45 C1400,55 1490,30 1490,30"
// //           }
// //           stroke="currentColor"
// //           strokeWidth={l.sw}
// //           strokeLinecap="round"
// //           fill="none"
// //         />
// //       </motion.svg>
// //     ))}
// //   </motion.div>

// //   {/* BOTTOM WAVES */}
// //   <motion.div
// //     className="absolute bottom-0 left-0 w-full h-[150px]"
// //     animate={{ y: [0, 10, -8, 12, 0] }}
// //     transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
// //   >
// //     {[
// //       { bottom: 90, sw: 1.2, opacityKf: [0.7, 0.2, 0.6, 0.3, 0.7], yKf: [0, 10, -8, 6, 0], dur: 11 },
// //       { bottom: 70, sw: 1, opacityKf: [0.4, 0.8, 0.1, 0.6, 0.4], yKf: [0, -12, 8, -10, 0], dur: 14 },
// //       { bottom: 50, sw: 0.8, opacityKf: [0.2, 0.6, 0.8, 0.2, 0.2], yKf: [0, 8, -14, 12, 0], dur: 12 },
// //       { bottom: 30, sw: 0.8, opacityKf: [0.8, 0.3, 0.5, 0.7, 0.8], yKf: [0, -10, 12, -6, 0], dur: 15 },
// //       { bottom: 10, sw: 0.6, opacityKf: [0.3, 0.7, 0.2, 0.8, 0.3], yKf: [0, 14, -6, 8, 0], dur: 13 },
// //     ].map((l, i) => (
// //       <motion.svg
// //         key={`b${i}`}
// //         className="absolute left-0 w-full"
// //         style={{ bottom: l.bottom }}
// //         height="60"
// //         viewBox="0 0 1440 60"
// //         preserveAspectRatio="none"
// //         fill="none"
// //         animate={{ opacity: l.opacityKf, y: l.yKf }}
// //         transition={{
// //           opacity: { duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
// //           y: { duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
// //         }}
// //       >
// //         <path
// //           d={i % 2 === 0
// //             ? "M-50,30 C100,50 250,10 400,42 C550,60 700,15 850,48 C1000,60 1150,18 1300,45 C1400,55 1490,30 1490,30"
// //             : "M-50,30 C100,10 250,50 400,20 C550,-5 700,45 850,15 C1000,-5 1150,40 1300,12 C1400,5 1490,30 1490,30"
// //           }
// //           stroke="currentColor"
// //           strokeWidth={l.sw}
// //           strokeLinecap="round"
// //           fill="none"
// //         />
// //       </motion.svg>
// //     ))}
// //   </motion.div>
// // </motion.div>
// //                 {/* === Glow Light Effects (section-wide) === */}

// //                 {/* Purple glow - top center area */}
// //                 <motion.div
// //                     className="absolute top-1/4 left-1/2 z-0 w-[500px] h-[500px] rounded-full pointer-events-none"
// //                     style={{
// //                         background: "radial-gradient(circle, rgba(168,85,247,1) 0%, rgba(168,85,247,0) 70%)",
// //                         filter: "blur(100px)",
// //                     }}
// //                     animate={{
// //                         x: ["-50%", "-30%", "-60%", "-50%"],
// //                         y: ["-50%", "-70%", "-30%", "-50%"],
// //                         scale: [1, 1.2, 0.9, 1],
// //                     }}
// //                     transition={{
// //                         duration: 10,
// //                         repeat: Infinity,
// //                         ease: "easeInOut",
// //                     }}
// //                 />

// //                 {/* Blue glow - left side behind text */}
// //                 <motion.div
// //                     className="absolute top-1/2 left-1/4 z-0 w-[400px] h-[400px] rounded-full pointer-events-none"
// //                     style={{
// //                         background: "radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%)",
// //                         filter: "blur(100px)",
// //                     }}
// //                     animate={{
// //                         x: ["0%", "30%", "-20%", "0%"],
// //                         y: ["0%", "-40%", "30%", "0%"],
// //                         scale: [1, 0.85, 1.2, 1],
// //                     }}
// //                     transition={{
// //                         duration: 12,
// //                         repeat: Infinity,
// //                         ease: "easeInOut",
// //                     }}
// //                 />

// //                 {/* Pink glow - right side behind hero images */}
// //                 <motion.div
// //                     className="absolute top-1/2 right-1/4 z-0 w-[450px] h-[450px] rounded-full pointer-events-none"
// //                     style={{
// //                         background: "radial-gradient(circle, rgba(236,72,153,1) 0%, rgba(236,72,153,0) 70%)",
// //                         filter: "blur(100px)",
// //                     }}
// //                     animate={{
// //                         x: ["0%", "-40%", "30%", "0%"],
// //                         y: ["0%", "25%", "-35%", "0%"],
// //                         scale: [1, 1.3, 0.8, 1],
// //                     }}
// //                     transition={{
// //                         duration: 14,
// //                         repeat: Infinity,
// //                         ease: "easeInOut",
// //                     }}
// //                 />

// //                 {/* Orange accent glow - near CTA button area */}
// //                 <motion.div
// //                     className="absolute bottom-1/3 left-1/3 z-0 w-[300px] h-[300px] rounded-full pointer-events-none"
// //                     style={{
// //                         background: "radial-gradient(circle, rgba(239,128,48,1) 0%, rgba(239,128,48,0) 70%)",
// //                         filter: "blur(80px)",
// //                     }}
// //                     animate={{
// //                         x: ["0%", "25%", "-30%", "0%"],
// //                         y: ["0%", "-20%", "25%", "0%"],
// //                         scale: [1, 1.1, 1.3, 1],
// //                     }}
// //                     transition={{
// //                         duration: 8,
// //                         repeat: Infinity,
// //                         ease: "easeInOut",
// //                     }}
// //                 />

// //                 {/* Cyan glow - top right accent */}
// //                 <motion.div
// //                     className="absolute top-1/4 right-1/3 z-0 w-[250px] h-[250px] rounded-full pointer-events-none"
// //                     style={{
// //                         background: "radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(34,211,238,0) 70%)",
// //                         filter: "blur(80px)",
// //                     }}
// //                     animate={{
// //                         x: ["0%", "-35%", "25%", "0%"],
// //                         y: ["0%", "35%", "-25%", "0%"],
// //                         scale: [1, 1.2, 0.9, 1],
// //                     }}
// //                     transition={{
// //                         duration: 7,
// //                         repeat: Infinity,
// //                         ease: "easeInOut",
// //                     }}
// //                 />
// //         </>
// //     );
// // }
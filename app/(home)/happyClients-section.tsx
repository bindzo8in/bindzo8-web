"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useMemo, useEffect, useState } from "react";

const clients = [
  { name: "GENESIS", logo: "/clients/genesis.png" },
  { name: "Vrindhavana", logo: "/clients/vrindhavana.png" },
  { name: "SUPER SAFE", logo: "/clients/supersafe.png" },
  { name: "SUN-MAX", logo: "/clients/sunmax.png" },
  { name: "NoviTech", logo: "/clients/novitech.png" },
  { name: "Get Direction", logo: "/clients/getdirection.png" },
  { name: "VARI", logo: "/clients/vari.png" },
  { name: "GOD VIBES", logo: "/clients/godvibes.png" },
  { name: "Pantech", logo: "/clients/pantech.png" },
  { name: "Impruven", logo: "/clients/impruven.png" },
];

const IMAGE_WIDTH = 150;
const IMAGE_MARGIN = 24;
const ITEM_TOTAL_WIDTH = IMAGE_WIDTH + IMAGE_MARGIN;

interface ClientImage {
  name: string;
  logo: string;
}

const defaultClients: ClientImage[] = clients;

function MarqueeRow({
  clients,
  reverse = false,
  speed = 60,
}: {
  clients: ClientImage[];
  reverse?: boolean;
  speed?: number;
}) {
  const { duplicatedClients, totalWidth, scrollDistance, duration } =
    useMemo(() => {
      const baseWidth = clients.length * ITEM_TOTAL_WIDTH;

      const loops = 8;
      const duplicated = Array(loops).fill(clients).flat();

      const width = duplicated.length * ITEM_TOTAL_WIDTH;
      const distance = baseWidth;

      const pixelsPerSecond = speed;
      const animationDuration = distance / pixelsPerSecond;

      return {
        duplicatedClients: duplicated,
        totalWidth: width,
        scrollDistance: distance,
        duration: animationDuration,
      };
    }, [clients, speed]);

  return (
    <div className="relative overflow-hidden py-3 sm:py-4 md:py-6">
      <motion.div
        className="flex will-change-transform"
        style={{ width: totalWidth }}
        animate={{
          x: reverse ? [-scrollDistance, 0] : [0, -scrollDistance],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
      >
        {duplicatedClients.map((client, idx) => (
          <div
            key={`${client.name}-${idx}`}
            className="flex shrink-0 items-center justify-center"
            style={{
              width: IMAGE_WIDTH,
              marginRight: IMAGE_MARGIN,
            }}
          >
            <div className="relative h-16 w-full transition-transform duration-300 hover:scale-105 sm:h-20 md:h-24">
              <Image
                src={client.logo || "/placeholder.png"}
                alt={client.name}
                fill
                className="object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                draggable={false}
                sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, 180px"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ClientCarousel({
  speed = 60,
  className = "",
  heading = "Trusted By Industry Leaders",
  subheading,
}: {
  speed?: number;
  className?: string;
  heading?: string;
  subheading?: string;
}) {
  const [clients, setClients] = useState<ClientImage[]>(defaultClients);

  useEffect(() => {
    fetch("/api/clients?limit=50")
      .then((res) => res.json())
      .then((data) => {
        if (data?.items?.length > 0) {
          setClients(
            data.items.map((c: { name: string; logoUrl: string }) => ({
              name: c.name,
              logo: c.logoUrl,
            }))
          );
        }
      })
      .catch(() => {
        // fallback already set
      });
  }, []);

  const safeClients = useMemo(() => {
    if (clients.length === 1) {
      return Array(8).fill(clients[0]);
    }

    return clients;
  }, [clients]);

  const mid = Math.ceil(safeClients.length / 2);
  const row1 = safeClients.slice(0, mid);
  const row2 = safeClients.slice(mid);

  return (
    <section
      className={`relative overflow-hidden bg-background py-12 sm:py-14 md:py-16 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="mb-3 text-[26px] font-bold leading-tight text-primary sm:text-3xl md:text-4xl">
            {heading}
          </h2>

          {subheading && (
            <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {subheading}
            </p>
          )}
        </div>

        <div className="relative flex flex-col gap-3 sm:gap-4 md:gap-6">
          {/* Row 1 → LEFT */}
          <MarqueeRow clients={row1} speed={speed} />

          {/* Row 2 → RIGHT */}
          <MarqueeRow clients={row2} reverse speed={speed * 0.8} />

          {/* Edge fade - mobile fixed */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent sm:w-12 md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent sm:w-12 md:w-24" />
        </div>
      </div>
    </section>
  );
}
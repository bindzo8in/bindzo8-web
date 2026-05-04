"use client";


import Image from "next/image";
import { motion } from "motion/react";
import { useMemo, useEffect, useState } from "react";

const clients = [
  { name: 'GENESIS', logo: '/clients/genesis.png' },
  { name: 'Vrindhavana', logo: '/clients/vrindhavana.png' },
  { name: 'SUPER SAFE', logo: '/clients/supersafe.png' },
  { name: 'SUN-MAX', logo: '/clients/sunmax.png' },
  { name: 'NoviTech', logo: '/clients/novitech.png' },
  { name: 'Get Direction', logo: '/clients/getdirection.png' },
  { name: 'VARI', logo: '/clients/vari.png' },
  { name: 'GOD VIBES', logo: '/clients/godvibes.png' },
  { name: 'Pantech', logo: '/clients/pantech.png' },
  { name: 'Impruven', logo: '/clients/impruven.png' },
]
const IMAGE_WIDTH = 180;
const IMAGE_MARGIN = 36;
const ITEM_TOTAL_WIDTH = IMAGE_WIDTH + IMAGE_MARGIN;

interface ClientImage {
  name: string;
  logo: string;
}

// fallback data
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

      // force enough content ALWAYS (no resize issues)
      const loops = 6;
      const duplicated = Array(loops).fill(clients).flat();

      const width = duplicated.length * ITEM_TOTAL_WIDTH;

      // scroll only one set width (seamless illusion)
      const distance = baseWidth;

      // constant speed (px/sec)
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
    <div className="relative overflow-hidden py-6">
      <motion.div
        className="flex will-change-transform"
        style={{ width: totalWidth }}
        animate={{
          x: reverse
            ? [-scrollDistance, 0]
            : [0, -scrollDistance],
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
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: IMAGE_WIDTH,
              marginRight: IMAGE_MARGIN,
            }}
          >
            <div className="relative w-full h-24 transition-transform duration-300 hover:scale-105">
              <Image
                src={client.logo || "/placeholder.png"}
                alt={client.name}
                fill
                className="object-contain opacity-80 hover:opacity-100"
                draggable={false}
                sizes="(max-width: 768px) 100px, 180px"
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
    fetch("/api/client-logos")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setClients(data);
        }
      })
      .catch(() => {
        // fallback already set
      });
  }, []);

  // handle 1 logo edge case
  const safeClients = useMemo(() => {
    if (clients.length === 1) {
      return Array(8).fill(clients[0]);
    }
    return clients;
  }, [clients]);

  // split into 2 rows
  const mid = Math.ceil(safeClients.length / 2);
  const row1 = safeClients.slice(0, mid);
  const row2 = safeClients.slice(mid);

  return (
    <section className={`relative py-16 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            {heading}
          </h2>
          {subheading && (
            <p className="text-muted-foreground max-w-xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        <div className="relative flex flex-col gap-6">
          
          {/* Row 1 → LEFT */}
          <MarqueeRow clients={row1} speed={speed} />

          {/* Row 2 → RIGHT */}
          <MarqueeRow clients={row2} reverse speed={speed * 0.8} />

          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import WaveBackground from "./background";

type TeamMember = {
  id: string;
  name: string;
  position: string;
  mediaUrl: string;
};

const LIMIT = 100;

const FALLBACK_MEMBERS = [
  { name: "Manikandan R", role: "Graphic Designer", image: "/binzo8_members/mani_bro.png" },
  { name: "Ranjani Rajkumar", role: "UI/UX Designer", image: "/binzo8_members/ranjani_mam.png" },
  { name: "Jeyapandi R", role: "Developer", image: "/binzo8_members/m3.png" },
  
];

function Member() {
  const [items, setItems] = useState<{ name: string, role: string, image: string }[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const fetchPage = useCallback(async (cursor?: string) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const params = new URLSearchParams({ limit: String(LIMIT) });
      if (cursor) params.set("cursor", cursor);

      const res = await fetch(`/api/team?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();



      if (data?.items?.length > 0) {
        const mappedItems = data.items.map((m: TeamMember) => ({
          name: m.name,
          role: m.position,
          image: m.mediaUrl,
        }));

        setItems((prev) => {
          // Avoid duplicates if initial fetch and fallback might overlap (though unlikely with real IDs)
          return [...prev, ...mappedItems];
        });
        setNextCursor(data.nextCursor ?? null);
        setHasMore(!!data.nextCursor);
        setUseFallback(false);
      } else if (!cursor) {
        // No items in DB at all on first load
        setItems(FALLBACK_MEMBERS);
        setHasMore(false);
        setUseFallback(true);
      }
    } catch {
      if (!cursor) {
        setItems(FALLBACK_MEMBERS);
        setHasMore(false);
        setUseFallback(true);
      }
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  // IntersectionObserver sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || useFallback) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
          fetchPage(nextCursor ?? undefined);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchPage, hasMore, nextCursor, useFallback]);

  return (
    <section className="relative font-kumbh py-16 overflow-hidden min-h-screen bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WaveBackground />
      </div>

      {/* All content above background */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl mb-8 text-[#EF8030]">
            The Bindzo 8 Family
          </h3>

          <p className="text-xl text-white">
            Bindzo 8 is fortunate to be guided by some of the most skilled minds
            in the creative and technology space, supported by a team with decades
            of combined industry experience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10 justify-items-center">
            {items.map((member, index) => (
              <MemberCard key={`${member.name}-${index}`} {...member} />
            ))}

            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonMemberCard key={`sk-${i}`} />
              ))}
          </div>

          {/* Invisible sentinel triggers next page load */}
          <div ref={sentinelRef} className="h-1 w-full" />

          {!hasMore && items.length > 0 && !useFallback && (
            <p className="mt-12 text-center text-sm text-white/40 tracking-widest uppercase">
              End of team members
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Member;

type MemberCardProps = {
  name: string;
  role: string;
  image: string;
};

export function MemberCard({ name, role, image }: MemberCardProps) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative w-full max-w-[220px] aspect-square mb-6 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 220px, 220px"
          className="object-contain"
        />
      </div>

      <h4 className="text-white text-lg tracking-wide">{name}</h4>
      <p className="text-gray-400 text-sm">{role}</p>
    </div>
  );
}

function SkeletonMemberCard() {
  return (
    <div className="flex flex-col items-center text-center animate-pulse">
      <div className="w-[220px] aspect-square mb-6 bg-white/10 rounded-full" />
      <div className="h-6 w-32 bg-white/10 rounded mb-2" />
      <div className="h-4 w-24 bg-white/10 rounded" />
    </div>
  );
}
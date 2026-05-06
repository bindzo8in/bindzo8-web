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
  console.log(useFallback)

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
              // <MemberCard key={`${member.name}-${index}`} {...member} />
              <TeamMemberCard key={`${member.name}-${index}`} member={member} />
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
    <div className="flex flex-col items-center text-center group ">
      <div className="relative w-full max-w-[220px] aspect-square mb-6 transition-transform duration-500 group-hover:scale-105 bg-black">
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

interface TeamMemberCardProps {
  member: {
    name: string;
    role: string;
    image: string;
  };
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="group relative mx-auto flex w-full max-w-[300px] flex-col items-center overflow-hidden rounded-[30px] border border-white/30 bg-[#6b6b6b]/60 px-4 pb-8 text-center shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-[340px] sm:rounded-[34px] sm:px-6 sm:pb-10 sm:hover:-translate-y-2">
      {/* image + circle area */}
      <div className="relative mb-6 h-[285px] w-full max-w-[250px] [perspective:1000px] sm:mb-7 sm:h-[330px] sm:max-w-[290px]">
        {/* default black circle - desktop only visible */}
        <div className="absolute left-1/2 top-[52px] z-0 h-[215px] w-[215px] -translate-x-1/2 rounded-full bg-gradient-to-r from-black to-gray-900 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-[58px] sm:h-[245px] sm:w-[245px] sm:scale-100 sm:opacity-100 sm:group-hover:scale-105 sm:group-hover:opacity-0" />

        {/* brand gradient circle - active on mobile, hover on desktop */}
        <div className="absolute left-1/2 top-[52px] z-[1] h-[215px] w-[215px] -translate-x-1/2 scale-105 rounded-full bg-gradient-to-r from-[#E7325C] to-[#EF8030] opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-[58px] sm:h-[245px] sm:w-[245px] sm:scale-100 sm:opacity-0 sm:group-hover:scale-105 sm:group-hover:opacity-100" />

        {/* back full circle */}
        <div className="absolute left-1/2 top-[46px] z-10 h-[225px] w-[225px] -translate-x-1/2 scale-105 rounded-full border-[5px] border-white/85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-[52px] sm:h-[255px] sm:w-[255px] sm:scale-100 sm:border-[6px] sm:group-hover:scale-105" />

        {/* person image */}
        <img
          src={member.image}
          alt={`Portrait of ${member.name}`}
          className="absolute bottom-0 left-1/2 z-20 h-[255px] w-[235px] -translate-x-1/2 -translate-y-3 scale-105 object-contain grayscale-0 drop-shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] rotate-x-[5deg] rotate-y-[-6deg] sm:h-[300px] sm:w-[270px] sm:translate-y-0 sm:scale-100 sm:rotate-x-0 sm:rotate-y-0 sm:grayscale sm:group-hover:-translate-y-4 sm:group-hover:scale-110 sm:group-hover:rotate-x-[6deg] sm:group-hover:rotate-y-[-8deg] sm:group-hover:grayscale-0"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/300x300/E2E8F0/4A5568?text=${member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}`;
          }}
        />

        {/* bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-16 w-full bg-gradient-to-t from-[#6b6b6b]/40 to-transparent" />
      </div>

      {/* text content */}
      <div className="relative z-40 flex flex-col items-center">
        <h3 className="relative mb-4 -translate-y-1 scale-105 text-[24px] font-bold text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:translate-y-0 sm:scale-100 sm:text-[28px] sm:group-hover:-translate-y-1 sm:group-hover:scale-105">
          <span className="bg-gradient-to-r from-[#E7325C] to-[#EF8030] bg-clip-text text-transparent transition-all duration-700 sm:from-white sm:to-white sm:group-hover:from-[#E7325C] sm:group-hover:to-[#EF8030]">
            {member.name}
          </span>

          <span className="absolute -bottom-2 left-1/2 h-[3px] w-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#E7325C] to-[#EF8030] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-0 sm:group-hover:w-20" />
        </h3>

        <p className="relative -translate-y-1 scale-105 overflow-hidden rounded-full border border-transparent px-7 py-3 text-sm font-bold text-white shadow-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:translate-y-0 sm:scale-100 sm:border-white/20 sm:px-8 sm:text-base sm:shadow-lg sm:group-hover:-translate-y-1 sm:group-hover:scale-105 sm:group-hover:border-transparent sm:group-hover:shadow-xl">
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#E7325C] to-[#EF8030] opacity-100 transition-opacity duration-700 sm:opacity-0 sm:group-hover:opacity-100" />

          <span className="absolute inset-y-0 left-[130%] w-1/2 skew-x-[-20deg] bg-white/25 transition-all duration-1000 ease-out sm:left-[-75%] sm:group-hover:left-[130%]" />

          <span className="relative z-10">{member.role}</span>
        </p>
      </div>
    </div>
  );
};
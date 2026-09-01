"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import TeamSection from "@/components/home/team-section";

type TeamMember = {
  id: string;
  name: string;
  position: string;
  mediaUrl: string;
};

const LIMIT = 100;

const FALLBACK_MEMBERS = [
  { name: "Balaji", position: "Founder", mediaUrl: "/binzo8_members/balaji_sir.png", id: "1" },
  { name: "Manikandan R", position: "Graphic Designer", mediaUrl: "/binzo8_members/mani_bro.png", id: "2" },
  { name: "Ranjani Rajkumar", position: "UI/UX Designer", mediaUrl: "/binzo8_members/ranjani_mam.png", id: "3" },
  { name: "Jeyapandi R", position: "Developer", mediaUrl: "/binzo8_members/m3.png", id: "4" },
];

function Member() {
  const [items, setItems] = useState<TeamMember[]>([]);
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
          position: m.position,
          mediaUrl: m.mediaUrl,
          id: m.id
        }));

        setItems((prev) => {
          return [...prev, ...mappedItems];
        });
        setNextCursor(data.nextCursor ?? null);
        setHasMore(!!data.nextCursor);
        setUseFallback(false);
      } else if (!cursor) {
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

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

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

  if (items.length === 0 && isLoading) {
    return (
      <section className="relative font-inter py-16 overflow-hidden min-h-screen bg-[#0b0b0c] flex items-center justify-center">
         <div className="animate-pulse w-32 h-32 rounded-full bg-white/10" />
      </section>
    );
  }

  return (
    <div className="relative font-inter min-h-screen bg-[#0b0b0c]">
       <TeamSection 
          teams={items} 
          hideGlow={true} 
          eyebrowText="Our Team" 
          titleText={<>THE BINDZO 8<br/>FAMILY</>} 
       />
       {/* Invisible sentinel triggers next page load if applicable */}
       <div ref={sentinelRef} className="h-1 w-full absolute bottom-0" />
    </div>
  );
}

export default Member;
// const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
//   return (
//     <div className="group relative mx-auto flex w-full max-w-[300px] flex-col items-center overflow-hidden rounded-[30px] border border-white/30 bg-[#6b6b6b]/60 px-4 pt-8 pb-8 text-center shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-[340px] sm:rounded-[34px] sm:px-6 sm:pt-10 sm:pb-10 sm:hover:-translate-y-2">
//       {/* image + circle area */}
//       <div className="relative mb-4 h-[260px] w-full max-w-[240px] [perspective:1000px] sm:mb-6 sm:h-[310px] sm:max-w-[280px]">
//         {/* default black circle - desktop only visible */}
//         <div className="absolute left-1/2 top-[40px] z-0 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-gradient-to-r from-black to-gray-900 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-[45px] sm:h-[240px] sm:w-[240px] sm:scale-100 sm:opacity-100 sm:group-hover:scale-105 sm:group-hover:opacity-0" />

//         {/* brand gradient circle - active on mobile, hover on desktop */}
//         <div className="absolute left-1/2 top-[40px] z-[1] h-[200px] w-[200px] -translate-x-1/2 scale-105 rounded-full bg-gradient-to-r from-[#c42b47] to-[#d3325c] opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-[45px] sm:h-[240px] sm:w-[240px] sm:scale-100 sm:opacity-0 sm:group-hover:scale-105 sm:group-hover:opacity-100" />

//         {/* BACK full circle border (behind head) */}
//         <div className="absolute left-1/2 top-[34px] z-10 h-[212px] w-[212px] -translate-x-1/2 scale-105 rounded-full border-[5px] border-white/85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-[38px] sm:h-[252px] sm:w-[252px] sm:scale-100 sm:border-[6px] sm:group-hover:scale-105" />

//         {/* person image with smooth bottom fade mask */}
//         <img
//           src={member.image}
//           alt={`Portrait of ${member.name}`}
//           style={{
//             maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
//             WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
//           }}
//           className="absolute bottom-0 left-1/2 z-20 h-[250px] w-[230px] -translate-x-1/2 scale-105 object-contain grayscale-0 drop-shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] rotate-x-[5deg] rotate-y-[-6deg] sm:h-[300px] sm:w-[270px] sm:scale-100 sm:rotate-x-0 sm:rotate-y-0 sm:grayscale sm:group-hover:-translate-y-4 sm:group-hover:scale-110 sm:group-hover:rotate-x-[6deg] sm:group-hover:rotate-y-[-8deg] sm:group-hover:grayscale-0 "
//           onError={(e) => {
//             const target = e.target as HTMLImageElement;
//             target.onerror = null;
//             target.src = `https://placehold.co/300x300/E2E8F0/4A5568?text=${member.name
//               .split(" ")
//               .map((n) => n[0])
//               .join("")}`;
//           }}
//         />

//         {/* FRONT clipped border (in front of chest/body for 3D depth) */}
//         <div
//           className="absolute left-1/2 top-[34px] z-30 h-[212px] w-[212px] -translate-x-1/2 scale-105 rounded-full border-[5px] border-white/85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-[38px] sm:h-[252px] sm:w-[252px] sm:scale-100 sm:border-[6px] sm:group-hover:scale-105"
//           style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
//         />
//       </div>

//       {/* text content */}
//       <div className="relative z-40 flex flex-col items-center">
//         <h3 className="relative mb-4 -translate-y-1 scale-105 text-[24px] font-bold text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:translate-y-0 sm:scale-100 sm:text-[28px] sm:group-hover:-translate-y-1 sm:group-hover:scale-105">
//           <span className="bg-gradient-to-r from-[#c42b47] to-[#d3325c] bg-clip-text text-transparent transition-all duration-700 sm:from-white sm:to-white sm:group-hover:from-[#c42b47] sm:group-hover:to-[#d3325c] font-antonio">
//             {member.name}
//           </span>

//           <span className="absolute -bottom-2 left-1/2 h-[3px] w-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#c42b47] to-[#d3325c] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-0 sm:group-hover:w-20" />
//         </h3>

//         <p className="relative -translate-y-1 scale-105 overflow-hidden rounded-full border border-transparent px-7 py-3 text-sm font-bold text-white shadow-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:translate-y-0 sm:scale-100 sm:border-white/20 sm:px-8 sm:text-base sm:shadow-lg sm:group-hover:-translate-y-1 sm:group-hover:scale-105 sm:group-hover:border-transparent sm:group-hover:shadow-xl font-inter">
//           <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#c42b47] to-[#d3325c] opacity-100 transition-opacity duration-700 sm:opacity-0 sm:group-hover:opacity-100" />

//           <span className="absolute inset-y-0 left-[130%] w-1/2 skew-x-[-20deg] bg-white/25 transition-all duration-1000 ease-out sm:left-[-75%] sm:group-hover:left-[130%]" />

//           <span className="relative z-10">{member.role}</span>
//         </p>
//       </div>
//     </div>
//   );
// };
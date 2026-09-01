"use client";

import { useProjects } from "@/lib/hooks/use-projects";
import { useEffect, useRef, useState, useMemo } from "react";
import MasonryLayout from "@/components/ui/masonry-layout";
import FeaturedWorkCard from "@/components/featured-work/FeaturedWorkCard";
import { normalizeProjectToFeaturedWorkItem } from "@/components/featured-work/featured-work.utils";
import type { FeaturedWorkItem } from "@/components/featured-work/featured-work.types";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FeaturedPortfolioListProps {
  services: { id: string, name: string }[];
  defaultServiceId?: string;
  excludeServiceId?: string;
}

export default function FeaturedPortfolioList({
  services,
  defaultServiceId,
  excludeServiceId
}: FeaturedPortfolioListProps) {
  const [serviceId, setServiceId] = useState<string>(defaultServiceId || "all");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useProjects({
    serviceId: serviceId === "all" ? undefined : serviceId,
    excludeServiceId,
    status: "PUBLISHED",
    take: 12
  });

  const projects = data?.pages.flatMap(p => p.data) || [];
  
  const normalizedItems = useMemo<FeaturedWorkItem[]>(() => {
    // We cast project to any since useProjects returns the API project type which contains what we need
    return projects.map((project: any) => normalizeProjectToFeaturedWorkItem(project));
  }, [projects]);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [normalizedItems, isLoading]);

  const allFilters = [{ id: "all", name: "All Work" }, ...services];

  return (
    <div className="mx-auto w-full max-w-[1560px] px-5 pb-[clamp(90px,11vw,150px)] sm:px-8 lg:px-[clamp(40px,6vw,72px)]">
      {/* Filters */}
      <div className="mb-[clamp(30px,4vw,46px)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-[clamp(18px,2.4vw,32px)]">
          {allFilters.map((filter) => {
            const active = serviceId === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                data-cursor-select
                onClick={() => setServiceId(filter.id)}
                className="group relative cursor-pointer border-0 bg-transparent pb-2 font-[var(--font-space-grotesk)] text-[clamp(14px,1.6vw,17px)] tracking-[0.01em] transition-colors duration-300"
                style={{
                  color: active ? "#f2efe9" : "#8b8985",
                }}
              >
                {filter.name}
                <span
                  className={`absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-[#E7325C] to-[#EF8030] transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-[#161616] aspect-[4/3] rounded-xl border border-[rgba(242,239,233,0.13)]" />
          ))}
        </div>
      ) : normalizedItems.length > 0 ? (
        <>
          <MasonryLayout
            className="w-full"
            itemClassName="w-full sm:w-[calc(50%-11px)] lg:w-[calc(50%-11px)] mb-[clamp(14px,1.6vw,22px)]"
            sizerClassName="w-full sm:w-[calc(50%-11px)] lg:w-[calc(50%-11px)]"
            gutterClassName="w-0 sm:w-[22px] lg:w-[22px]"
            items={normalizedItems}
            getKey={(item) => item.id}
            renderItem={(item, index) => (
              <FeaturedWorkCard item={item} index={index} />
            )}
          />

          {/* Infinite Scroll Trigger */}
          <div ref={loadMoreRef} className="mt-8 flex justify-center py-8">
            {isFetchingNextPage && (
              <p className="font-[var(--font-space-grotesk)] text-[#8b8985] text-sm uppercase tracking-[0.1em]">
                Loading more...
              </p>
            )}
            {!hasNextPage && normalizedItems.length > 0 && (
              <p className="font-[var(--font-space-grotesk)] text-[#8b8985] text-sm uppercase tracking-[0.1em]">
                End of portfolio
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-[#8b8985] font-[var(--font-space-grotesk)]">
          <p className="text-lg">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import WaveBackground from "./background";
import { useCallback, useEffect, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tag: string;
  mediaUrl: string;
  mediaType: string;
};

type ProjectsResponse = {
  items: Project[];
  nextCursor?: string | null;
};

const LIMIT = 9;

export default function ProductsSection({
  title = "Our Products",
}: {
  title?: string;
}) {
  const [items, setItems] = useState<Project[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const didInitialFetchRef = useRef(false);

  const fetchPage = useCallback(async (cursor?: string | null) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setError(null);

    const isFirstPage = !cursor;

    if (isFirstPage) {
      setIsInitialLoading(true);
    } else {
      setIsPaginationLoading(true);
    }

    try {
      const params = new URLSearchParams({
        limit: String(LIMIT),
      });

      if (cursor) {
        params.set("cursor", cursor);
      }

      const res = await fetch(`/api/projects?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data: ProjectsResponse = await res.json();

      setItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));

        const freshItems = data.items.filter(
          (item) => !existingIds.has(item.id)
        );

        return isFirstPage ? freshItems : [...prev, ...freshItems];
      });

      const newCursor = data.nextCursor ?? null;

      setNextCursor(newCursor);
      setHasMore(Boolean(newCursor));
    } catch (err) {
      
      setError("Unable to load projects. Please try again.");
      setHasMore(false);
    } finally {
      setIsInitialLoading(false);
      setIsPaginationLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (didInitialFetchRef.current) return;

    didInitialFetchRef.current = true;
    fetchPage();
  }, [fetchPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;
    if (isInitialLoading) return;
    if (!hasMore) return;
    if (!nextCursor) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          hasMore &&
          nextCursor &&
          !isFetchingRef.current
        ) {
          fetchPage(nextCursor);
        }
      },
      {
        root: null,
        rootMargin: "250px 0px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [fetchPage, hasMore, isInitialLoading, nextCursor]);

  return (
    <section className="relative w-full overflow-hidden bg-black py-20 font-kumbh">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80">
        <WaveBackground />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-[#E7325C] md:mb-20 md:text-5xl lg:text-6xl">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:px-12 xl:grid-cols-3 xl:gap-12 xl:px-0">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {isInitialLoading &&
            Array.from({ length: LIMIT }).map((_, index) => (
              <SkeletonCard key={`initial-skeleton-${index}`} />
            ))}
        </div>

        {isPaginationLoading && (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:px-12 xl:grid-cols-3 xl:gap-12 xl:px-0">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={`pagination-skeleton-${index}`} />
            ))}
          </div>
        )}

        {error && (
          <p className="mt-10 text-center text-sm font-medium text-red-300">
            {error}
          </p>
        )}

        {hasMore && !isInitialLoading && (
          <div ref={sentinelRef} className="h-10 w-full" />
        )}

        {!hasMore && items.length > 0 && !error && (
          <p className="mt-12 text-center text-sm uppercase tracking-widest text-white/40">
            All projects loaded
          </p>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Project }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/20 bg-[#FFF4F4]/95 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-[240px] w-full sm:h-[280px] md:h-[320px]">
        <Image
          src={product.mediaUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex min-h-[180px] flex-col p-6 sm:p-8 md:min-h-[220px]">
        <span className="mb-3 self-start rounded-full bg-[#E7325C]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#E7325C]">
          {product.category}
        </span>

        <h3 className="mb-4 text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
          {product.title}
        </h3>

        <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
          {product.description}
        </p>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="h-[240px] animate-pulse bg-white/10 sm:h-[280px] md:h-[320px]" />

      <div className="min-h-[180px] space-y-3 p-6 sm:p-8 md:min-h-[220px]">
        <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />

        <div className="space-y-2 pt-1">
          <div className="h-3 w-full animate-pulse rounded bg-white/10" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
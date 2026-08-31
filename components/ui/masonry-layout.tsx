"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
} from "react";

interface MasonryLayoutProps<T> {
  items: T[];

  renderItem: (
    item: T,
    index: number,
  ) => React.ReactNode;

  getKey: (
    item: T,
    index: number,
  ) => React.Key;

  className?: string;
  itemClassName?: string;
  sizerClassName?: string;
  gutterClassName?: string;
}

export default function MasonryLayout<T>({
  items,
  renderItem,
  getKey,
  className = "",
  itemClassName = "",
  sizerClassName = "",
  gutterClassName = "",
}: MasonryLayoutProps<T>) {
  const gridRef = useRef<HTMLDivElement>(null);

  const masonryRef = useRef<any>(null);

  const initializedRef = useRef(false);

  const initializeMasonry = useCallback(async () => {
    if (typeof window === "undefined") return;

    const grid = gridRef.current;

    if (!grid) return;

    // Prevent duplicate initialization
    if (initializedRef.current) {
      masonryRef.current?.reloadItems?.();
      masonryRef.current?.layout?.();
      return;
    }

    const [
      MasonryModule,
      imagesLoadedModule,
    ] = await Promise.all([
      import("masonry-layout"),
      import("imagesloaded"),
    ]);

    const Masonry =
      MasonryModule.default;

    const imagesLoaded =
      imagesLoadedModule.default;

    // Component might have unmounted while importing
    if (!gridRef.current) return;

    const masonry = new Masonry(grid, {
      itemSelector: ".masonry-item",
      columnWidth: ".masonry-sizer",
      gutter: ".masonry-gutter-sizer",
      percentPosition: true,
      transitionDuration: "0.4s",
      horizontalOrder: true,
    });

    masonryRef.current = masonry;

    initializedRef.current = true;

    imagesLoaded(grid, () => {
      masonry.reloadItems?.();
      masonry.layout?.();
    });
  }, []);

  /*
   * Initialize Masonry
   */
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      await initializeMasonry();

      if (!isMounted) return;
    };

    init();

    return () => {
      isMounted = false;

      masonryRef.current?.destroy?.();

      masonryRef.current = null;
      initializedRef.current = false;
    };
  }, [initializeMasonry]);

  /*
   * Recalculate when items change
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timeout = window.setTimeout(async () => {
      const masonry = masonryRef.current;
      const grid = gridRef.current;

      if (!masonry || !grid) return;

      masonry.reloadItems?.();
      masonry.layout?.();

      const imagesLoadedModule =
        await import("imagesloaded");

      const imagesLoaded =
        imagesLoadedModule.default;

      imagesLoaded(grid, () => {
        masonry.reloadItems?.();
        masonry.layout?.();
      });
    }, 100);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [items]);

  /*
   * Responsive resize handling
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const grid = gridRef.current;

    if (!grid) return;

    const resizeObserver = new ResizeObserver(() => {
      masonryRef.current?.layout?.();
    });

    resizeObserver.observe(grid);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={`masonry-grid relative w-full ${className}`}
    >
      {/* Column width */}
      <div
        aria-hidden="true"
        className={`masonry-sizer ${sizerClassName}`}
      />

      {/* Gutter */}
      <div
        aria-hidden="true"
        className={`masonry-gutter-sizer ${gutterClassName}`}
      />

      {items.map((item, index) => (
        <div
          key={getKey(item, index)}
          className={`masonry-item ${itemClassName}`}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
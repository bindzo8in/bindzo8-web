"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";

interface MasonryGalleryProps {
  images: string[];
}

export function MasonryGallery({ images }: MasonryGalleryProps) {
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-4"
      columnClassName="space-y-4"
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt=""
          width={800}
          height={600}
          className="h-auto w-full rounded-lg"
        />
      ))}
    </Masonry>
  );
}
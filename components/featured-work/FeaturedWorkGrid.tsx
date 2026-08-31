"use client";

import MasonryLayout from "@/components/ui/masonry-layout";

import FeaturedWorkCard from "./FeaturedWorkCard";
import type { FeaturedWorkItem } from "./featured-work.types";

interface FeaturedWorkGridProps {
  items: FeaturedWorkItem[];
}

export default function FeaturedWorkGrid({
  items,
}: FeaturedWorkGridProps) {
  return (
    <MasonryLayout
      className="w-full"
      itemClassName="w-full sm:w-[calc(50%-11px)] lg:w-[calc(50%-11px)] mb-[clamp(14px,1.6vw,22px)]"
      sizerClassName="w-full sm:w-[calc(50%-11px)] lg:w-[calc(50%-11px)]"
      gutterClassName="w-0 sm:w-[22px] lg:w-[22px]"
      items={items}
      getKey={(item) => item.id}
      renderItem={(item, index) => (
        <FeaturedWorkCard
          item={item}
          index={index}
        />
      )}
    />
  );
}
// import type { WorkItem } from "./featured-work.types";
// import FeaturedWorkCard from "./FeaturedWorkCard";

// interface FeaturedWorkGridProps {
//   items: WorkItem[];
// }

// export default function FeaturedWorkGrid({
//   items,
// }: FeaturedWorkGridProps) {
//   return (
//     <div
//       className="
//         grid
//         grid-cols-6
//         gap-[clamp(14px,1.6vw,22px)]
//       "
//     >
//       {items.map((item) => (
//         <FeaturedWorkCard
//           key={item.id}
//           item={item}
//         />
//       ))}
//     </div>
//   );
// }
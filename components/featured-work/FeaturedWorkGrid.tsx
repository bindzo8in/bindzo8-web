import type { WorkItem } from "./featured-work.types";
import FeaturedWorkCard from "./FeaturedWorkCard";

interface FeaturedWorkGridProps {
  items: WorkItem[];
}

export default function FeaturedWorkGrid({
  items,
}: FeaturedWorkGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-6
        gap-[clamp(14px,1.6vw,22px)]
      "
    >
      {items.map((item) => (
        <FeaturedWorkCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}
import type { WorkFilter } from "./featured-work.types";
import { WORK_FILTERS } from "./featured-work.data";

interface FeaturedWorkFiltersProps {
  activeFilter: WorkFilter;
  count: number;
  onFilterChange: (filter: WorkFilter) => void;
}

export default function FeaturedWorkFilters({
  activeFilter,
  count,
  onFilterChange,
}: FeaturedWorkFiltersProps) {
  return (
    <div
      className="
        mb-[clamp(30px,4vw,46px)]
        flex
        flex-wrap
        items-center
        justify-between
        gap-4
      "
    >
      <div
        className="
          flex
          flex-wrap
          gap-[clamp(18px,2.4vw,32px)]
        "
      >
        {WORK_FILTERS.map((filter) => {
          const active =
            activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              data-cursor-select
              onClick={() =>
                onFilterChange(filter.value)
              }
              className="
                group
                relative
                cursor-pointer
                border-0
                bg-transparent
                pb-2
                font-[var(--font-space-grotesk)]
                text-[clamp(14px,1.6vw,17px)]
                tracking-[0.01em]
                transition-colors
                duration-300
              "
              style={{
                color: active
                  ? "#f2efe9"
                  : "#8b8985",
              }}
            >
              {filter.label}

              <span
                className={`
                  absolute
                  bottom-0
                  left-0
                  h-px
                  w-full
                  origin-left
                  bg-gradient-to-r
                  from-[#E7325C]
                  to-[#EF8030]
                  transition-transform
                  duration-300
                  ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }
                `}
              />
            </button>
          );
        })}
      </div>

      <span
        className="
          whitespace-nowrap
          font-[var(--font-space-grotesk)]
          text-[13px]
          tracking-[0.08em]
          text-[#8b8985]
        "
      >
        ( {String(count).padStart(2, "0")} )
      </span>
    </div>
  );
}
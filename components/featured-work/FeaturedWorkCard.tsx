import Image from "next/image";
import type { WorkItem } from "./featured-work.types";

interface FeaturedWorkCardProps {
  item: WorkItem;
}

const sizeClasses = {
  c2: "lg:col-span-2",
  c3: "lg:col-span-3",
  c4: "lg:col-span-4",
  c6: "lg:col-span-6",
};

export default function FeaturedWorkCard({
  item,
}: FeaturedWorkCardProps) {
  const aspectClasses =
    item.size === "c6"
      ? "aspect-[4/5] lg:aspect-[21/9]"
      : item.size === "c2"
        ? "aspect-[4/5]"
        : item.size === "c3"
          ? "aspect-[4/5] lg:aspect-[16/12]"
          : "aspect-[16/11]";

  return (
    <article
      data-work-tile
      data-category={item.category}
      className={`
        relative
        col-span-6
        ${sizeClasses[item.size]}
      `}
    >
      <div
        data-work-media
        className={`
          group
          relative
          cursor-pointer
          overflow-hidden
          rounded-lg
          border
          border-[rgba(242,239,233,0.13)]
          bg-[#161616]
          ${aspectClasses}
        `}
      >
        {/* Number */}
        <span
          className="
            absolute
            left-4
            top-3.5
            z-30
            font-[var(--font-space-grotesk)]
            text-[12px]
            tracking-[0.05em]
            text-[#8b8985]
          "
        >
          {String(item.id).padStart(2, "0")}
        </span>

        {/* Image */}
        {item.image && (
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="
              (max-width: 900px) 100vw,
              50vw
            "
            className="
              object-cover
              lg:grayscale
              contrast-[1.03]
              scale-[1.12]
              transition-[filter,transform]
              duration-700
              ease-[cubic-bezier(.16,1,.3,1)]
              lg:group-hover:scale-100
              lg:group-hover:grayscale-0
            "
          />
        )}

        {/* Video */}
        {item.video && (
          <video
            data-work-video
            src={item.video}
            poster={item.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              lg:grayscale
              contrast-[1.03]
              scale-[1.12]
              transition-[filter,transform]
              duration-700
              ease-[cubic-bezier(.16,1,.3,1)]
              lg:group-hover:scale-100
              lg:group-hover:grayscale-0
            "
          />
        )}



        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            z-10
            flex
            flex-col
            justify-end
            bg-gradient-to-t
            from-[rgba(11,11,12,0.82)]
            via-[rgba(11,11,12,0.05)]
            to-transparent
            p-[clamp(16px,2vw,26px)]
          "
        >
          <p
            className="
              mb-2
              translate-y-2
              font-[var(--font-space-grotesk)]
              text-[11px]
              uppercase
              tracking-[0.1em]
              text-[#EF8030]
              lg:opacity-0
              transition-all
              duration-400
              lg:group-hover:translate-y-0
              lg:group-hover:opacity-100
            "
          >
            {item.categoryLabel}
          </p>

          <h3
            className="
              m-0
              font-[var(--font-fraunces)]
              text-[clamp(22px,2.4vw,34px)]
              font-medium
              leading-[1.05]
              text-[#f2efe9]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-2
              translate-y-2
              font-[var(--font-space-grotesk)]
              text-[12px]
              tracking-[0.06em]
              text-[#8b8985]
              lg:opacity-0
              transition-all
              delay-75
              duration-400
              lg:group-hover:translate-y-0
              lg:group-hover:opacity-100
            "
          >
            {item.year}
          </p>
        </div>
      </div>
    </article>
  );
}
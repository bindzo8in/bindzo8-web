import { MARQUEE_ITEMS } from "./featured-work.data";

export default function FeaturedWorkMarquee() {
  return (
    <div
      className="
        my-[clamp(40px,5vw,64px)]
        overflow-hidden
        border-y
        border-[rgba(242,239,233,0.13)]
        py-[15px]
      "
    >
      <div
        data-marquee-track
        className="flex w-max whitespace-nowrap"
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0"
          >
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="
                  px-5
                  font-[var(--font-space-grotesk)]
                  text-[clamp(13px,1.8vw,19px)]
                  uppercase
                  tracking-[0.05em]
                  text-[#8b8985]
                "
              >
                {item}

                <span className="ml-5 text-[#EF8030]">
                  •
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default function FeaturedWorkHero() {
  return (
    <div className="featured-work-hero py-[clamp(70px,11vw,120px)] pb-[clamp(24px,4vw,44px)]">
      {/* Eyebrow */}
      <p
        className="
          mb-[22px]
          flex
          flex-wrap
          items-center
          gap-2.5
          font-[var(--font-space-grotesk)]
          text-[12px]
          uppercase
          tracking-[0.26em]
          text-[#8b8985]
        "
      >
        <span>Website</span>
        <span className="opacity-40">·</span>

        <span>Mobile App</span>
        <span className="opacity-40">·</span>

        <span>Software &amp; CRM</span>
        <span className="opacity-40">·</span>

        <span>Branding</span>
        <span className="opacity-40">·</span>

        <span>Digital Marketing</span>
        <span className="opacity-40">·</span>

        <span>Video Editing</span>
      </p>

      {/* Selected */}
      <div className="relative overflow-hidden leading-[0.92]">
        <span
          className="
            block
            whitespace-nowrap
            font-[var(--font-fraunces)]
            text-[clamp(56px,13vw,210px)]
            font-semibold
            italic
            tracking-[-0.02em]
            text-transparent
            [-webkit-text-stroke:1.4px_rgba(242,239,233,0.35)]
          "
        >
          Selected
        </span>

        <span
          aria-hidden="true"
          className="
            hero-fill
            absolute
            left-0
            top-0
            block
            whitespace-nowrap
            bg-gradient-to-br
            from-[#E7325C]
            to-[#EF8030]
            bg-clip-text
            font-[var(--font-fraunces)]
            text-[clamp(56px,13vw,210px)]
            font-semibold
            italic
            tracking-[-0.02em]
            text-transparent
            [clip-path:inset(0_100%_0_0)]
          "
        >
          Selected
        </span>
      </div>

      {/* Work */}
      <div className="relative overflow-hidden text-right leading-[0.92]">
        <span
          className="
            block
            whitespace-nowrap
            font-[var(--font-fraunces)]
            text-[clamp(56px,13vw,210px)]
            font-semibold
            italic
            tracking-[-0.02em]
            text-transparent
            [-webkit-text-stroke:1.4px_rgba(242,239,233,0.35)]
          "
        >
          Work.
        </span>

        <span
          aria-hidden="true"
          className="
            hero-fill
            absolute
            right-0
            top-0
            block
            whitespace-nowrap
            bg-gradient-to-br
            from-[#E7325C]
            to-[#EF8030]
            bg-clip-text
            font-[var(--font-fraunces)]
            text-[clamp(56px,13vw,210px)]
            font-semibold
            italic
            tracking-[-0.02em]
            text-transparent
            [clip-path:inset(0_0_0_100%)]
          "
        >
          Work.
        </span>
      </div>

      <p
        className="
          ml-auto
          mt-[clamp(22px,3vw,32px)]
          max-w-[600px]
          text-right
          font-[var(--font-space-grotesk)]
          text-[15px]
          leading-[1.6]
          text-[#8b8985]
        "
      >
        Across screens, systems, and brands — a few builds
        that show how we think, end to end.
      </p>
    </div>
  );
}
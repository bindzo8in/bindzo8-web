"use client";

import Image from "next/image";

type FeatureCardProps = {
    title: string;
    description: string;
    image: string;
    index?: number;
};

export function FeatureCard({ title, description, image, index = 0 }: FeatureCardProps) {
    const num = String(index + 1).padStart(2, "0");

    return (
        <div className="group relative flex flex-col md:flex-row items-start gap-4 md:gap-5 py-6 md:py-8 border-t border-[rgba(242,239,233,0.05)] last:border-b transition-colors duration-300 hover:bg-white/[0.02] px-3 -mx-3 rounded-xl md:rounded-none">
            {/* left accent bar */}
            <span className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[#EF8030] scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-300 origin-top" />

            {/* step number */}
            <span className="min-w-[28px] pt-[3px] text-[11px] font-[var(--font-space-grotesk)] font-semibold tracking-[0.2em] text-[#EF8030]/80 select-none">
                {num}
            </span>

            {/* icon container */}
            <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white/[0.02] border border-[rgba(242,239,233,0.08)] overflow-hidden transition-colors duration-300 group-hover:bg-white/[0.04] group-hover:border-[#EF8030]/30">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="128px"
                    className="object-contain p-4 md:p-6 filter grayscale invert opacity-70 group-hover:filter-none group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
            </div>

            {/* text */}
            <div className="flex-1 min-w-0 font-inter">
                <h3 className="text-[17px] md:text-[20px] font-bold text-[#f2efe9] leading-snug mb-2 md:mb-3 tracking-tight font-[var(--font-fraunces)]">
                    {title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#8b8985] leading-relaxed font-[var(--font-space-grotesk)] font-light">
                    {description}
                </p>
            </div>
        </div>
    );
}
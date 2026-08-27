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
        <div className="group relative flex items-start gap-5 py-5 border-t border-white/[0.08] last:border-b last:border-white/[0.08] transition-colors duration-300 hover:bg-[#c42b47]/[0.04] px-2 -mx-2">
            {/* left accent bar */}
            <span className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[#c42b47] scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-300 origin-top" />

            {/* step number */}
            <span className="min-w-[28px] pt-[3px] text-[11px] font-semibold tracking-widest text-[#c42b47]/70 select-none">
                {num}
            </span>

            {/* icon container */}
            <div className="relative flex-shrink-0 w-32 h-32 rounded-lg bg-[#c42b47]/10 border border-[#c42b47]/20 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                />
            </div>

            {/* text */}
            <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-medium text-white leading-snug mb-1 tracking-tight">
                    {title}
                </h3>
                <p className="text-[13px] text-white/50 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
// import Image from "next/image";

// type FeatureCardProps = {
//     title: string;
//     description: string;
//     image: string;
// };

// export function FeatureCard({
//     title,
//     description,
//     image,
// }: FeatureCardProps) {
//     return (
//         <div className="rounded-3xl bg-white/95 p-6 md:p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/20 h-full flex flex-col group">
//             <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] mb-8 overflow-hidden rounded-2xl">
//                 <Image
//                     src={image}
//                     alt={title}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
//                     className="object-contain object-center transition-transform duration-500 group-hover:scale-110"
//                 />
//             </div>

//             <h3 className="text-xl md:text-2xl font-bold text-[#c42b47] mb-4 tracking-tight">
//                 {title}
//             </h3>

//             <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
//                 {description}
//             </p>
//         </div>
//     );
// }
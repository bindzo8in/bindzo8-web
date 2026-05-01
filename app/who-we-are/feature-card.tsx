import Image from "next/image";

type FeatureCardProps = {
    title: string;
    description: string;
    image: string;
};

export function FeatureCard({
    title,
    description,
    image,
}: FeatureCardProps) {
    return (
        <div className="rounded-3xl bg-white/95 p-6 md:p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/20 h-full flex flex-col group">
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] mb-8 overflow-hidden rounded-2xl">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-contain object-center transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-[#E7325C] mb-4 tracking-tight">
                {title}
            </h3>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
}
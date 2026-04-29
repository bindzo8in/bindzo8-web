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
        <div className="rounded-2xl bg-white p-6 shadow-md max-w-sm pb-20">

            {/* Image */}
            <div className="relative w-full h-[260px] mb-6">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 418px"
                    className="object-contain object-center"
                />
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-semibold text-[#E7325C] mb-3">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {description}
            </p>

        </div>
    );
}
"use client"
// app/page.tsx
import Image from "next/image";
import { MarketingSection, Feature } from "./service";


const features: Feature[] = [
    {
        title: "High-impact visual storytelling",
        description:
            "Engaging videos and animations that communicate your message clearly and emotionally.",
    },
    {
        title: "Professional 2D & 3D animation",
        description:
            "Character animation, product demos, explainer videos, and motion graphics designed with precision.",
    },
    {
        title: "Cinematic video production",
        description:
            "Shoot, edit, and produce high-quality promotional, corporate, and branding videos.",
    },
    {
        title: "Brand-focused creative direction",
        description:
            "Every frame is crafted to match your brand's identity, tone, and marketing goals.",
    },
    {
        title: "Social media-ready content",
        description:
            "Shorts, reels, ads, and promotional clips optimized for all major platforms.",
    },
    {
        title: "Advanced editing & post-production",
        description:
            "Color grading, sound design, VFX, transitions, titles, and polishing for a premium finish.",
    },
    {
        title: "End-to-end production support",
        description:
            "From scripting and storyboarding to final delivery — everything handled seamlessly.",
    },
];

export default function Page() {
    console.log("Features:", features)
    return (
        <MarketingSection
            title="Social Media Marketing"
            media={
                <Image
                    src="/services_gif/gif3.gif"
                    alt="Social media marketing"
                    width={340}
                    height={260}
                    className="h-auto w-full max-w-[340px]"
                />
            }
            heroLabel="Animation and video production"
            heroDescription="involves creating engaging visual content through motion graphics, storytelling, and edited footage. It helps brands communicate ideas clearly, attract attention, and deliver messages in a dynamic and memorable way."
            ctaLabel="Get Quote"
            onCtaClick={() => console.log("CTA clicked")}
            features={features}
        />
    );
}
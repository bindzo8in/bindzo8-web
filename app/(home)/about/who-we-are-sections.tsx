"use client";

import Image from "next/image";
import { FeatureCard } from "./feature-card";

const features = [
    {
        image: "/who_we_are/why_choose_us/proven_expertise.png",
        title: "Proven Expertise",
        description:
            "We bring years of experience across digital, branding, and technology, delivering high-quality solutions that help businesses scale with confidence.",
    },
    {
        image: "/who_we_are/why_choose_us/creative_custom_solution.png",
        title: "Creative & Custom Solutions",
        description:
            "Every project is uniquely crafted. We design strategies, visuals, and systems that perfectly align with your brand's identity and goals.",
    },
    {
        image: "/who_we_are/why_choose_us/modern_tech.png",
        title: "Modern Technology Stack",
        description:
            "From web and mobile to advanced automation, we use cutting-edge tools to build fast, secure, and performance-driven digital products.",
    },
    {
        image: "/who_we_are/why_choose_us/ontime_delivery.png",
        title: "On-Time Delivery",
        description:
            "Our workflows are structured for speed and accuracy, ensuring every project is delivered on schedule without compromising quality.",
    },
    {
        image: "/who_we_are/why_choose_us/transparant_comunication.png",
        title: "Transparent Communication",
        description:
            "We stay connected with clear updates, quick responses, and zero hidden processes, ensuring trust and smooth collaboration.",
    },
    {
        image: "/who_we_are/why_choose_us/e2e_support.png",
        title: "End-to-End Support",
        description:
            "From planning to launch and ongoing maintenance, we support your brand at every stage to ensure long-term success.",
    },
];

const industries = [
    {
        image: "/who_we_are/who_we_work_with/cce.svg",
        title: "Cryptocurrency Exchange",
    },
    {
        image: "/who_we_are/who_we_work_with/financial_technology.svg",
        title: "Financial Technologies",
    },
    {
        image: "/who_we_are/who_we_work_with/retail.svg",
        title: "Retail & E-Commerce",
    },
    {
        image: "/who_we_are/who_we_work_with/h&tm.svg",
        title: "Healthcare / Telemedicine",
    },
    {
        image: "/who_we_are/who_we_work_with/on_demand.svg",
        title: "On-Demand Services",
    },
    {
        image: "/who_we_are/who_we_work_with/entertainment.svg",
        title: "Entertainment",
    },
    {
        image: "/who_we_are/who_we_work_with/education.svg",
        title: "Education",
    },
    {
        image: "/who_we_are/who_we_work_with/logistics.svg",
        title: "Logistics",
    },
    {
        image: "/who_we_are/who_we_work_with/factory.svg",
        title: "Food Industries",
    },
    {
        image: "/who_we_are/who_we_work_with/public_sector.svg",
        title: "Public Sectors",
    },
    {
        image: "/who_we_are/who_we_work_with/travel&transport.svg",
        title: "Travel and Transport",
    },
    {
        image: "/who_we_are/who_we_work_with/publication.png",
        title: "Media & Publishing",
    },
];

const whatWeDo = [
    {
        image: "/who_we_are/what_we_do/idea_to_implementation.svg",
        title: "Idea to Implementation",
        description:
            "We transform raw concepts into fully functional digital solutions—planning, architecting, and executing with precision.",
    },
    {
        image: "/who_we_are/what_we_do/design-deploy.svg",
        title: "Design & Deploy Solutions",
        description:
            "From UI/UX to complete system build-outs, we design intelligently and deploy seamlessly across platforms.",
    },
    {
        image: "/who_we_are/what_we_do/technology_driver_solution.svg",
        title: "Technology-Driven Development",
        description:
            "We craft scalable websites, apps, and software using modern, secure, and future-ready tech stacks.",
    },
    {
        image: "/who_we_are/what_we_do/dm.svg",
        title: "Digital Branding & Creative Strategy",
        description:
            "We build visually strong, memorable brand identities that communicate value and enhance market presence.",
    },
    {
        image: "/who_we_are/what_we_do/smart.svg",
        title: "Smart Business Strategy",
        description:
            "We analyze, plan, and execute strategies tailored to elevate your brand in a competitive market.",
    },
    {
        image: "/who_we_are/what_we_do/consistency.svg",
        title: "Consistency & Follow-Up",
        description:
            "We ensure ongoing support, updates, and improvements—keeping your systems stable, optimized, and always growing.",
    },
];

/* ─── Shared section header ─── */
function SectionHeader({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="max-w-2xl font-inter">
            <p className="text-[11px] font-[var(--font-space-grotesk)] tracking-[.14em] uppercase text-[#EF8030]/80 mb-3">
                Bindzo 8
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-fraunces)] font-bold text-[#f2efe9] tracking-tight leading-[1.1]">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-base md:text-lg font-[var(--font-space-grotesk)] text-[#8b8985] leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}

/* ─── Industry pill ─── */
type IndustryPillProps = {
    title: string;
    image: string;
};

function IndustryPill({ title, image }: IndustryPillProps) {
    return (
        <div className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[rgba(242,239,233,0.13)] bg-white/[0.03] transition-all duration-300 hover:border-[#EF8030]/40 hover:bg-[#EF8030]/[0.08] cursor-default">
            <div className="relative w-5 h-5 flex-shrink-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="20px"
                    className="object-contain filter grayscale invert opacity-70 group-hover:filter-none group-hover:opacity-100 transition-all duration-300"
                />
            </div>
            <span className="font-[var(--font-space-grotesk)] text-[13px] font-medium text-[#8b8985] group-hover:text-[#f2efe9] transition-colors duration-300 whitespace-nowrap">
                {title}
            </span>
        </div>
    );
}


export function WhoWeAreSections() {
    return (
        <div className="relative font-inter">
            <div className="relative z-10">
                {/* ── Why Choose Us ── */}
                <section id="why-choose-us" className="py-16 md:py-24">
                    <div className="max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,6vw,72px)]">
                        <SectionHeader
                            title="Why Choose Us"
                            description="Bindzo 8 delivers cutting-edge, timely solutions by embracing innovative methods and advanced technologies to ensure customer-focused results. With extensive experience, we've successfully handled it all before."
                        />

                        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
                            {features.map((item, i) => (
                                <FeatureCard key={i} {...item} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Who We Work With ── */}
                <section id="who-we-work" className="py-16 md:py-24 bg-white/[0.02] border-y border-[rgba(242,239,233,0.05)]">
                    <div className="max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,6vw,72px)]">
                        <SectionHeader
                            title="Who We Work With"
                            description="Many of our clients have dedicated years to building new business capabilities, integrating acquired systems, and modernizing their IT infrastructure — enabling Bindzo 8 to deliver complete, end-to-end solutions."
                        />

                        <div className="mt-10 md:mt-14 flex flex-wrap gap-3">
                            {industries.map((item, i) => (
                                <IndustryPill key={i} {...item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── What We Do ── */}
                <section id="what-we-do" className="py-16 md:py-24">
                    <div className="max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,6vw,72px)]">
                        <SectionHeader
                            title="What We Do"
                            description="Over the years, Bindzo 8 has successfully delivered 300+ projects, empowering businesses with data-driven solutions and consistently delivering exceptional value to our clients."
                        />

                        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
                            {whatWeDo.map((item, i) => (
                                <FeatureCard key={i} {...item} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

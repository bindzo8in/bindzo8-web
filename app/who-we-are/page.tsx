import Image from "next/image";
import WaveBackground from "./background";
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
            "Every project is uniquely crafted. We design strategies, visuals, and systems that perfectly align with your brand’s identity and goals.",
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
        image: "/who_we_are/who_we_work_with/media.svg", // ⚠️ if not present, update filename
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

export default function Page() {
    return (
        <div className="font-kumbh relative pt-16 md:pt-20">

            <div className="z-0 absolute inset-0 pointer-events-none">
                <WaveBackground />
            </div>

            <div className="relative z-10">
                {/* why choose us */}
                <section id="why-choose-us" className="py-12 md:py-20 flex justify-center items-center flex-col gap-10 md:gap-16">
                    <div className="max-w-5xl mx-auto px-6 sm:px-8">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#E7325C] text-center tracking-tight">
                            Why Choose Us
                        </h2>
                        <p className="text-base md:text-xl text-center text-white leading-relaxed opacity-90 max-w-4xl mx-auto">
                            Bindzo 8 delivers cutting-edge, timely solutions by embracing innovative methods and advanced technologies to ensure customer-focused results. With extensive experience, we’ve successfully handled it all before.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-6 max-w-7xl mx-auto">
                        {features.map((item, i) => (
                            <FeatureCard key={i} {...item} />
                        ))}
                    </div>
                </section>

                {/* who we work with */}
                <section id="who-we-work" className="py-12 md:py-20 flex justify-center items-center flex-col gap-10 md:gap-16 bg-white/5">
                    <div className="max-w-5xl mx-auto px-6 sm:px-8">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#E7325C] text-center tracking-tight">
                            Who We Work With
                        </h2>
                        <p className="text-base md:text-xl text-center text-white leading-relaxed opacity-90 max-w-4xl mx-auto">
                            Many of our clients have dedicated years to building new business capabilities, integrating acquired systems, and modernizing their IT infrastructure, enabling Bindzo 8 to deliver complete, end-to-end solutions that seamlessly reach the market.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 px-4 md:px-6 max-w-6xl mx-auto">
                        {industries.map((item, i) => (
                            <IndustryCard key={i} {...item} />
                        ))}
                    </div>
                </section>

                {/* what we do */}
                <section id="what-we-do" className="py-12 md:py-20 flex justify-center items-center flex-col gap-10 md:gap-16">
                    <div className="max-w-5xl mx-auto px-6 sm:px-8">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#E7325C] text-center tracking-tight">
                            What We Do
                        </h2>
                        <p className="text-base md:text-xl text-center text-white leading-relaxed opacity-90 max-w-4xl mx-auto">
                            Over the years, Bindzo 8 has successfully delivered 300+ projects, empowering businesses with data-driven solutions and consistently delivering exceptional value to our clients.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-6 max-w-7xl mx-auto">
                        {whatWeDo.map((item, i) => (
                            <FeatureCard key={i} {...item} />
                        ))}
                    </div>
                </section>

                {/* achievements */}
                <section id="our-achievements" className="py-12 md:py-20 flex justify-center items-center flex-col gap-10 md:gap-16">
                    <div className="max-w-5xl mx-auto px-6 sm:px-8 text-[#E7325C]">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center tracking-tight">
                            Achievements & Celebrations
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 px-6 max-w-7xl mx-auto w-full">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="w-full aspect-[4/3] bg-white/10 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm flex items-center justify-center text-white/20 text-xl font-bold italic">
                                Celebration Image {i + 1}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}


type IndustryCardProps = {
    title: string;
    image: string;
};

export function IndustryCard({ title, image }: IndustryCardProps) {
    return (
        <article className="group flex aspect-square w-full flex-col items-center justify-center rounded-2xl bg-white/95 p-4 md:p-6 shadow-xl transition-all duration-500 hover:bg-[#FFF0F0] hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative mb-4 md:mb-6 h-[60px] w-[60px] md:h-[88px] md:w-[88px] transition-transform duration-500 group-hover:scale-110">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 60px, 88px"
                    className="object-contain"
                />
            </div>

            <h3 className="w-full text-center text-xs md:text-base font-bold leading-tight text-[#EF8030] px-2">
                {title}
            </h3>
        </article>
    );
}
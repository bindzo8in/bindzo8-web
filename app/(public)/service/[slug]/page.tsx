import { marketingPagesData } from "@/lib/data/service";
import { notFound } from "next/navigation";
import { MarketingSection } from "./service";
import ProductsSection from "@/app/(public)/products/ourProducts";
// import DV360ServicePage from "@/components/dv-360";
import DV360ServicePage from "@/components/dv-360-v2";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/components/seo/Schemas";
import { PortfolioList } from "@/components/portfolio/portfolio-list";
import { getServices } from "@/lib/repositories/project";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    if (slug === "dv-360") {
        return {
            title: "DV360 Programmatic Advertising Services | Display & Video 360 Agency",
            description: "Professional DV360 programmatic advertising services for CTV, audio, DOOH, display, video, audience strategy, reporting, and enterprise media optimization.",
            keywords: [
                "DV360 services",
                "Display & Video 360 agency",
                "programmatic advertising",
                "CTV advertising",
                "programmatic media buying",
                "Google Marketing Platform",
                "DV360 management",
            ],
            alternates: {
                canonical: `/service/${slug}`,
            },
            openGraph: {
                title: "DV360 Programmatic Advertising Services",
                description: "Scale enterprise media buying with DV360 strategy, premium inventory, privacy-safe data, AI creative workflows, and transparent reporting.",
                type: "website",
                images: ["/og/dv360-service.jpg"],
            },
        };
    }

    const data = marketingPagesData.find((item) => item.slug === slug);

    if (!data) return {};

    return {
        title: data.title,
        description: data.heroDescription,
        alternates: {
            canonical: `/service/${slug}`,
        },
        openGraph: {
            title: data.title,
            description: data.heroDescription,
            url: `/service/${slug}`,
            type: "article",
        },
    };
}

export default async function ServicePage({ params }: PageProps<"/service/[slug]">) {
    const { slug } = await params;
    let data;
    let services;
    let withProducts: boolean = false;
    if (marketingPagesData.some((item) => item.slug === slug)) {
        if (slug === "design-solution") {
            withProducts = true
            services = await getServices({ nameContains: "design" });
        } else if (slug === "dv-360") {
            return <DV360ServicePage />
        }

        data = marketingPagesData.find((item) => item.slug === slug);
    }

    if (!data) {
        notFound()
    }

    const { title, media, heroLabel, heroDescription, features } = data;


    return (
        <>
            <JsonLd data={getServiceSchema(title, heroDescription)} />
            <MarketingSection title={title} media={media} heroLabel={heroLabel} heroDescription={heroDescription} features={features} />
            {withProducts &&
                <PortfolioList services={services ?? []} defaultServiceId={services?.[0]?.id} />}
        </>
    )
}
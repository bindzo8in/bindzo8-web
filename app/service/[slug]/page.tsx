import { marketingPagesData } from "@/lib/data/service";
import { notFound } from "next/navigation";
import { MarketingSection } from "./service";
import ProductsSection from "@/app/products/ourProducts";
import DV360ServicePage from "@/components/dv-360";

export default async function ServicePage({ params }: PageProps<"/service/[slug]">) {
    const { slug } = await params;
    let data;
    let withProducts: boolean = false;
    if (marketingPagesData.some((item) => item.slug === slug)) {
        if (slug === "design-solution") {
            withProducts = true
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
        <MarketingSection title={title} media={media} heroLabel={heroLabel} heroDescription={heroDescription} features={features} />
        {withProducts &&
        <ProductsSection />}
        </>
    )
}
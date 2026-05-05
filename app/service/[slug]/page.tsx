import { marketingPagesData } from "@/lib/data/service";
import { notFound } from "next/navigation";
import { MarketingSection } from "./service";

export default async function ServicePage({ params }: PageProps<"/service/[slug]">) {
    const { slug } = await params;
    let data;
    if (marketingPagesData.some((item) => item.slug === slug)) {
        data = marketingPagesData.find((item) => item.slug === slug);
    }

    if (!data) {
        notFound()
    }

    const {title,media,heroLabel,heroDescription,features}= data;


    return (
       <MarketingSection title={title} media={media} heroLabel={heroLabel} heroDescription={heroDescription} features={features} />
    )
}
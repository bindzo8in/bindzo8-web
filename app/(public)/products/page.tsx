import CTA from "./cta";
import FAQSection from "./FAQSection";
import ProductsSection from "./ourProducts";
import { Metadata } from 'next'
import JsonLd from "@/components/seo/JsonLd";
import { getProductSchema } from "@/components/seo/Schemas";

export const metadata: Metadata = {
  title: "Our Products | Bindzo 8",
  description: "Discover innovative enterprise software and digital products developed by Bindzo 8.",
  alternates: {
    canonical: "/products",
  },
};

function Page() {
    return (
        <main className="overflow-hidden pt-16 md:pt-20">
            <JsonLd data={getProductSchema(
              "Bindzo 8 Enterprise Solutions",
              "Innovative enterprise software and digital products developed by Bindzo 8."
            )} />
            {/* <ProductsSection /> */}
            <CTA />
            <FAQSection />
        </main>
        //  <main className="overflow-hidden pt-16 md:pt-20 min-h-screen w-full bg-black">
            //  
        // </main>
    )
}

export default Page
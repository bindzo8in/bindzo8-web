import CTA from "./cta";
import FAQSection from "./FAQSection";
import ProductsSection from "./ourProducts";

function Page() {
    return (
        <main className="overflow-hidden pt-16 md:pt-20">
            <ProductsSection />
            <CTA />
            <FAQSection />
        </main>
    )
}

export default Page
import WaveBackground from "./background";
import CTA from "./cta";
import FAQSection from "./FAQSection";
import ProductsSection from "./ourProducts";

const products = [
    {
        title: "Travel Website Design",
        image: "/products/1.jpeg",
        description:
            "A modern, visually rich travel website designed with smooth navigation, destination highlights, package listings, and booking-friendly layouts to attract travelers and convert visitors into customers.",
    },
    {
        title: "Good Vibes Package Design",
        image: "/products/2.jpeg",
        description:
            "A vibrant, eye-catching packaging concept created for Good Vibes food products, focusing on freshness, clarity, and shelf appeal to make the brand stand out instantly.",
    },
    {
        title: "Outdoor Banner",
        image: "/products/3.jpeg",
        description:
            "High-impact outdoor banner design crafted for maximum visibility, bold messaging, and strong brand presence, perfect for promotions, events, and storefront advertising.",
    },
    {
        title: "Green Diamond Package Design",
        image: "/products/4.jpeg",
        description: "A premium packaging design built around a clean, professional aesthetic with strong visual hierarchy and product-focused detailing to elevate brand trust."
    },
    {
        title: "Abirami Package Design",
        image: "/products/5.jpeg",
        description: "A culturally inspired packaging style that blends tradition with modern appeal, ensuring the product looks authentic, attractive, and market-ready."
    },
    {
        title: "Expo Advertisement",
        image: "/products/5.jpeg",
        description: "A compelling expo advertisement layout with striking visuals, key highlights, and brand identity elements designed to draw attention in crowded exhibition spaces."
    },
    {
        title: "Arasan Package Design",
        image: "/products/6.jpeg",
        description: "A bold and clear packaging design with strong typography and color balance, crafted to enhance product recognition and communicate quality at first glance."
    },
    {
        title: "Visiting Card Design",
        image: "/products/7.jpeg",
        description: "A sleek and professional business card concept that represents brand identity with clean layout, modern typography, and premium finish.",
    },
    {
        title: "Identity Card Design",
        image: "/products/8.jpeg",
        description: "A neat, functional, and secure ID card design with photo placement, brand colors, and essential employee information—ideal for corporate use."
    }
];

function Page() {
    return (
        <main className="overflow-hidden">
            <ProductsSection products={products} />
            <CTA />
            <FAQSection />
        </main>
    )
}

export default Page
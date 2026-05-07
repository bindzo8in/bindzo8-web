import Sidebar from "./Sidebar";
import ServicesSection from "./ServicesSection";
import WebCreateSection from "./WebCreateSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getFAQSchema } from "@/components/seo/Schemas";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore our range of professional services including web development, digital marketing, mobile apps, and more. Tailored solutions for your business growth.",
  alternates: {
    canonical: "/services",
  },
};

export default function Home() {
  const faqs = [
    { question: "What services do you offer?", answer: "We offer web development, digital marketing, mobile apps, and more." },
    { question: "How long does a project take?", answer: "Project timelines vary based on complexity, but typically range from 4 to 12 weeks." },
  ];

  return (
    <main className="relative bg-[#f0eee9] font-kumbh flex flex-col lg:flex-row items-start">
      <JsonLd data={getServiceSchema("Bindzo 8 Services", "Comprehensive technology and marketing services.")} />
      <JsonLd data={getFAQSchema(faqs)} />
      {/* Mobile-only ServicesSection (appears first) */}
      <div className="w-full lg:hidden order-1">
        <ServicesSection />
      </div>

      {/* Sidebar (appears second on mobile, first on desktop) */}
      <Sidebar />

      {/* Desktop content area */}
      <div className="flex-1 w-full min-w-0 bg-[#f0eee9] order-3 lg:order-none">
        {/* Desktop-only ServicesSection */}
        <div className="hidden lg:block">
          <ServicesSection />
        </div>
        <WebCreateSection />
        <FAQSection />
        <CTASection />
      </div>
    </main>
  );
}
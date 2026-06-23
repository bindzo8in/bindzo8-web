import { Metadata } from "next";
import { getServices, getAllTags } from "@/lib/repositories/project";
import { PortfolioList } from "@/components/portfolio/portfolio-list";
import CTA from "../products/cta";
import FAQSection from "../products/FAQSection";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description: "Explore our portfolio of website development, ecommerce, mobile apps, branding, and digital marketing case studies.",
};

export default async function PortfolioPage() {
  const [allServices, tags] = await Promise.all([getServices(), getAllTags()]);
  
  const designService = allServices.find(s => s.name.toLowerCase().includes("design"));
  const services = allServices.filter(s => s.id !== designService?.id);

  return (
    <div className="min-h-screen bg-white font-kumbh">
      {/* Hero Section */}
      <div className="w-full bg-[#FFF5F4] py-24 text-center px-6">
        <h1 className="text-5xl text-red-700 md:text-6xl font-bold mb-6">Our Work</h1>
        <p className="text-xl text-red-600 max-w-2xl mx-auto">
          Explore our latest projects, case studies, and creative solutions. Filter by service or view our featured work.
        </p>
      </div>

      <PortfolioList services={services} tags={tags} excludeServiceId={designService?.id} />
      <CTA />
      <FAQSection />
    </div>
  );
}

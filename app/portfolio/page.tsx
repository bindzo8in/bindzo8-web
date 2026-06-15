import { Metadata } from "next";
import { getServices } from "@/lib/repositories/project";
import { PortfolioList } from "@/components/portfolio/portfolio-list";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description: "Explore our portfolio of website development, ecommerce, mobile apps, branding, and digital marketing case studies.",
};

export default async function PortfolioPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full bg-gray-50 py-24 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Work</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our latest projects, case studies, and creative solutions. Filter by service or view our featured work.
        </p>
      </div>

      <PortfolioList services={services} />
    </div>
  );
}

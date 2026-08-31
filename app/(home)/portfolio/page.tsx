import { Metadata } from "next";
import { getServices } from "@/lib/repositories/project";
import FeaturedPortfolioList from "./FeaturedPortfolioList";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description: "Explore our portfolio of website development, ecommerce, mobile apps, branding, and digital marketing case studies.",
};

export default async function PortfolioPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#0b0b0c] font-inter text-[#f2efe9]">
      <div className="w-full pt-40 pb-24 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-[var(--font-fraunces)] font-bold mb-6 text-[#f2efe9]">Our Work</h1>
        <p className="text-lg max-w-2xl mx-auto font-[var(--font-space-grotesk)] text-[#8b8985]">
          Explore our latest projects, case studies, and creative solutions. Filter by service or view our featured work.
        </p>
      </div>

      <FeaturedPortfolioList services={services} />
    </div>
  );
}

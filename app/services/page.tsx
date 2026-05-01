import Sidebar from "./Sidebar";
import ServicesSection from "./ServicesSection";
import WebCreateSection from "./WebCreateSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";

export default function Home() {
  return (
    <main className="relative bg-[#f0eee9] font-kumbh flex flex-col lg:flex-row items-start">
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
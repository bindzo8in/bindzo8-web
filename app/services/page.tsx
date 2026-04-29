import Sidebar from "./Sidebar";
import ServicesSection from "./ServicesSection";
import WebCreateSection from "./WebCreateSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";

export default function Home() {
  return (
    <main className="relative bg-[#f0eee9] font-kumbh flex items-start">
      <Sidebar />
      <div className="flex-1 w-full lg:w-[calc(100%-425px)] min-w-0 bg-[#f0eee9]">
      <ServicesSection />
      <WebCreateSection />
      <FAQSection />
      <CTASection />
      </div>
    </main>
  );
}
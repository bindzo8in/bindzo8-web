import HorizontalScroll from "@/components/horizontal-scroll/HorizontalScroll";
import { HeroSection } from "./hero-section";
import InfoSection from "./info-section";
import UsageContent from "./usage-content";
import ProcessContent from "./process-content";
import KeybenefitContent from "./keybenefit-content";
import ServiceContent from "./service-content";
import KeyseoContent from "./keyseo-content";
import ProjectContent from "./proj-content";
import SectionFixedBlobs from "./section-fix";
import StepContent from "./step-content";
import SeoWhyChooseContent from "./whychoose-content";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/components/seo/Schemas";

export const metadata: Metadata = {
  title: "SEO - Search Engine Optimization",
  description: "Proven SEO strategies to improve visibility, rank higher on Google, and grow your business organically through data-driven optimization.",
  alternates: {
    canonical: "/services/seo",
  },
};

const Page = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden font-kumbh">
      <JsonLd data={getServiceSchema("SEO (Search Engine Optimization)", "Proven SEO strategies that improve visibility and grow your business organically.")} />
      <HeroSection heading="Seo (Search Engine
Optimization)" subHeading="Proven SEO strategies that improve visibility and grow your business organically." />

      <InfoSection content="SEO is the long-term engine that drives your business to the top of Google. At Bindzo 8 Private Limited, we optimize websites to rank higher, attract organic traffic, and convert visitors into customers."/>

      <SectionFixedBlobs>
        <HorizontalScroll>
          <KeyseoContent />
          <SeoWhyChooseContent />
          <StepContent />
          <ProcessContent />
        </HorizontalScroll>

        <KeybenefitContent />
      </SectionFixedBlobs>
    </main>
  );
};

export default Page;
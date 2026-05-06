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

const Page = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden font-kumbh">
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
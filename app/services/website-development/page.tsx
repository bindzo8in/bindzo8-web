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
import KeyHighlightContent from "./keyhighlights-content";

const Page = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden font-kumbh">
      <HeroSection />

      <InfoSection />

      <SectionFixedBlobs>
        <HorizontalScroll>
          <StepContent />
          <ProcessContent />
          <ProjectContent />
          <KeyHighlightContent />
          {/* <UsageContent />
          <ServiceContent />
          <ServiceContent />
          <KeyseoContent /> */}
        </HorizontalScroll>

        <KeybenefitContent />
      </SectionFixedBlobs>
    </main>
  );
};

export default Page;
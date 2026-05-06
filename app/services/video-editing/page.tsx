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
import VideoEditingOfferContent from "./whatweoffer-content";

const Page = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden font-kumbh">
      <HeroSection heading="Video Editing" subHeading="High-quality edits for social media, ads, events & branding."/>

      <InfoSection content="Video content is the most engaging form of digital communication. At Bindzo 8 Private Limited, we turn raw footage into compelling, visually rich stories that captivate viewers and drive results." />

      <SectionFixedBlobs>
        <HorizontalScroll>
          <UsageContent />
          <VideoEditingOfferContent />
          <ProcessContent />
        </HorizontalScroll>

        <KeybenefitContent />
      </SectionFixedBlobs>
    </main>
  );
};

export default Page;
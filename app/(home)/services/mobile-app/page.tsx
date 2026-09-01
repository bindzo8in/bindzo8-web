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
import GoodVibesContent from "./goodvibles-content";
import FoodAppKeyHighlightsContent from "./keyhighlight-content";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/components/seo/Schemas";

export const metadata: Metadata = {
  title: "Mobile App Development Services",
  description: "Custom Android & iOS apps built for performance, security, and scalability. We turn your ideas into seamless digital experiences.",
  alternates: {
    canonical: "/services/mobile-app",
  },
};

const Page = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden font-kumbh">
      <JsonLd data={getServiceSchema("Mobile App Development", "Custom Android & iOS apps built for performance, security & scalability.")} />
      <HeroSection heading="Mobile App Development" subHeading="Custom Android & iOS apps built for performance, security & scalability." />

      <InfoSection content="Apps have become essential tools for businesses looking to provide convenience, automation, and instant accessibility. At Bindzo 8 Private Limited, we develop powerful Android and iOS applications that turn ideas into seamless digital experiences." />

      <SectionFixedBlobs>
        <HorizontalScroll>
          <GoodVibesContent />
          <FoodAppKeyHighlightsContent />
          <StepContent />
          <ProcessContent />
        </HorizontalScroll>

        <KeybenefitContent />
      </SectionFixedBlobs>
    </main>
  );
};

export default Page;
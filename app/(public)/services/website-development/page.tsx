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
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/components/seo/Schemas";

export const metadata: Metadata = {
  title: "Website Development Services",
  description: "High-performance websites designed to convert. We build fast, responsive, and visually appealing websites engineered for seamless user experiences.",
  alternates: {
    canonical: "/services/website-development",
  },
};

const Page = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden font-kumbh">
      <JsonLd data={getServiceSchema("Website Development", "High-performance websites designed to convert visitors into customers.")} />
      <HeroSection heading="Website Development" subHeading="High-performance websites designed to convert visitors into customers."/>

      <InfoSection content="Your website is often the first impression your customers have of your brand. At Bindzo 8 Private Limited, we build websites that are not only visually appealing but also fast, responsive, and engineered for seamless user experiences." />

      <SectionFixedBlobs>
        <HorizontalScroll>
          <StepContent />
          <ProcessContent />
          <ProjectContent />
          <KeyHighlightContent />
         
        </HorizontalScroll>

        <KeybenefitContent />
      </SectionFixedBlobs>
    </main>
  );
};

export default Page;
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
import BrandingLogoDesignsContent from "./branding-content";
import PackageDesignsContent from "./package-content";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/components/seo/Schemas";

export const metadata: Metadata = {
  title: "Graphic Design Solutions",
  description: "Bring your ideas to life with powerful visuals. We offer branding, logo design, and package design solutions that reflect your brand identity.",
  alternates: {
    canonical: "/services/graphic-design",
  },
};
const data = {
  hero: {
    title: "Design Solution",
    desc: "We bring ideas to life through powerful visuals & modern design.",
    
  },
  info: "Design is the visual voice of your brand. At Bindzo 8 Private Limited, we craft creative, meaningful, and memorable designs that reflect your identity and communicate your story with impact."
}
const Page = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden font-kumbh">
      <JsonLd data={getServiceSchema(data.hero.title, data.hero.desc)} />
      <HeroSection heading={data.hero.title} subHeading={data.hero.desc} />

      <InfoSection content={data.info} />

      <SectionFixedBlobs>
        <HorizontalScroll>
          <BrandingLogoDesignsContent />
          <PackageDesignsContent />
          <StepContent />
          <ProcessContent />
        </HorizontalScroll>

        <KeybenefitContent />
      </SectionFixedBlobs>
    </main>
  );
};

export default Page;
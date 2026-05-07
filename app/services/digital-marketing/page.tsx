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
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/components/seo/Schemas";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description: "Strategic digital marketing campaigns including SEO, SMM, PPC, and Email marketing to deliver real visibility, engagement, and conversions.",
  alternates: {
    canonical: "/services/digital-marketing",
  },
};

const data = {
    heading: 'Digital Marketing',
    subHeading: 'Strategic campaigns that deliver real visibility, engagement & conversions.',
    info: "Your website is often the first impression your customers have of your brand.",
    services_1 : [
  {
    title: "SEO (Search Engine Optimization)",
    image: "/digital_marketing_slide/seo.png",
    text: (
      <>
        To make your website top in google search engine result page organically
        which leads to come more <b>Business Conversion, High Visibility &amp; Higher Traffic.</b>
      </>
    ),
  },
  {
    title: "SMM (Social Media Marketing)",
    image: "/digital_marketing_slide/smm.png",
    text: (
      <>
        World is connected through Social Media. We create a brand identity
        of your business in all social media and reach{" "}
        <b>Potential Customers based on your preference to Increase Your Revenue.</b>
      </>
    ),
  },
  {
    title: "PPC (Pay Per Click)",
    image: "/digital_marketing_slide/ppc.png",
    text: (
      <>
      Ads which focused on targeted peoples boost traffic, increased sales,{" "}
      <b> Brand Recognition of your business with a cost-effective method</b>
      <br />
      <b>(Only pay for the clicks)</b>
      </>
    ),
  },
],
services_2 : [
  {
    title: "e-Mail Marketing",
    image: "/digital_marketing_slide/email.png",
    text: (
      <>
      Email marketing is about building relationships. A cost-effective way
of <b>Advertising your Business with Crispy Contents.</b>
      </>
    ),
  },
  {
    title: "SMS Marketing",
    image: "/digital_marketing_slide/sms.png",
    text: (
      <>
       Mobile is a lot closer than any other in this digital world. Meet your
customers in a <b>More Accessible Way and get enquiries for your
business.</b>
      </>
    ),
  },
  {
    title: "WhatsApp Marketing",
    image: "/digital_marketing_slide/whatsapp.png",
    text: (
      <>
No one has time to read a newspaper or a signboard or a flyer in this 
busy world. But everyone is using WhatsApp. <b>The best way to reach
your Potential Customers. </b>
      </>
    ),
  },
]
}

const Page = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden font-kumbh">
      <JsonLd data={getServiceSchema(data.heading, data.subHeading)} />
      <HeroSection heading={data.heading} subHeading={data.subHeading} />

      <InfoSection content={data.info}/>

      <SectionFixedBlobs>
        <HorizontalScroll>
          <UsageContent />
          <ProcessContent />
          <ServiceContent services={data.services_1}/>
          <ServiceContent services={data.services_2}/>
        </HorizontalScroll>

        <KeybenefitContent />
      </SectionFixedBlobs>
    </main>
  );
};

export default Page;
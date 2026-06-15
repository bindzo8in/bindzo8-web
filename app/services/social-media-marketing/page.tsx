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
  title: "Social Media Marketing Services",
  description: "Transform your online presence with expert social media marketing. We craft engaging content, targeted campaigns, and data-driven strategies to boost your brand, drive real engagement, and deliver measurable business results.",
  alternates: {
    canonical: "/services/social-media-marketing",
  },
};

const data = {
    heading: 'Social Media Marketing',
    subHeading: 'Transform your online presence with expert social media marketing. We craft engaging content, targeted campaigns, and data-driven strategies to boost your brand, drive real engagement, and deliver measurable business results.',
    info: "In today’s digital-first world, your social media presence is often the first interaction potential customers have with your brand. A strong, strategic social media presence builds trust, fosters community, and drives measurable business growth.",
    services_1 : [
  {
    title: "Social Media Marketing (SMM)",
    image: "/digital_marketing_slide/seo.png",
    text: (
      <>
        We help businesses establish a strong, authentic presence across major social media platforms including Facebook, Instagram, LinkedIn, Twitter, and more. Our data-driven approach ensures your brand connects with the right audience through engaging content, strategic campaigns, and consistent interaction.
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
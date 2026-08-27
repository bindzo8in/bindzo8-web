import ClientsSection from "@/components/home/clients-section";
import FAQSection from "@/components/home/faq-section";
import HomeHeroSection from "@/components/home/hero-section";
import PartnersSection from "@/components/home/partner-section";
import PortfolioSection from "@/components/home/portfolio-section";
import ServiceSection from "@/components/home/service-section";
import TeamSection from "@/components/home/team-section";
import TestimonialSection from "@/components/home/testimonial-section";
import SmoothScroll from "@/components/smooth-scroll";
import React from "react";
import { Metadata } from "next";
import FeaturedWork from "@/components/featured-work/FeaturedWork";

export const metadata: Metadata = {
  title: "Bindzo 8 | Digital Marketing & Tech Agency",
  description:
    "Bindzo 8 provides cutting-edge digital marketing, SEO, and web development services to accelerate your business growth.",
  keywords: [
    "Digital Marketing Agency",
    "Tech Agency",
    "SEO Services",
    "Web Development",
    "Mobile App Development",
    "Bindzo 8",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bindzo 8 | Digital Marketing & Tech Agency",
    description:
      "Bindzo 8 provides cutting-edge digital marketing, SEO, and web development services to accelerate your business growth.",
    url: "/",
    siteName: "Bindzo 8",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bindzo 8 | Digital Marketing & Tech Agency",
    description:
      "Bindzo 8 provides cutting-edge digital marketing, SEO, and web development services to accelerate your business growth.",
  },
};

const Page = () => {
  return (
    <SmoothScroll>
      <main>
        <HomeHeroSection />
        <ServiceSection />
        {/* <PortfolioSection /> */}
        <FeaturedWork />
        <ClientsSection />
        <TestimonialSection />
        <PartnersSection />
        {/* <CTASection /> */}
        <TeamSection />
        <FAQSection />
      </main>
    </SmoothScroll>
  );
};

export default Page;

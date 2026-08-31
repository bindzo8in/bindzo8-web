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
import { prisma } from "@/lib/prisma";

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

const getTeamMembers = async () => {
  return await prisma.teamMember.findMany({
    select: {
      id: true,
      name: true,
      position: true,
      mediaUrl: true,
    },
    orderBy: {
      dateOfJoining: "asc",
    },
  });
};
const getTestimonials = async () => {
  return await prisma.testimonial.findMany({
    take: 5,
    select: {
      id: true,
      content: true,
      author: true,
      position: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
const getFeaturedWorks = async () => {
  return prisma.project.findMany({
    take: 12,

    where: {
      isFeatured: true,
    },

    select: {
      id: true,
      title: true,
      projectUrl: true,
      featuredMediaUrl: true,

      service: {
        select: {
          name: true,
        },
      },

      media: {
        orderBy: {
          sortOrder: "asc",
        },

        select: {
          type: true,
          url: true,
          sortOrder: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};



const Page = async () => {
  const [teams, testimonials, features] = await Promise.all([
    getTeamMembers(),
    getTestimonials(),
    getFeaturedWorks()
  ]);
  return (
    <SmoothScroll>
      <main>
        <HomeHeroSection />
        <ServiceSection />
        {/* <PortfolioSection /> */}
        <FeaturedWork items={features} />
        <ClientsSection />
        <TestimonialSection testimonials={testimonials} />
        <PartnersSection />
        {/* <CTASection /> */}
        <TeamSection teams={teams} />
        <FAQSection />
      </main>
    </SmoothScroll>
  );
};

export default Page;

import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Bindzo 8 | Digital Marketing & Tech Agency",
  description: "Bindzo 8 provides cutting-edge digital marketing, SEO, and web development services to accelerate your business growth.",
  alternates: {
    canonical: "/",
  },
};
import HeroSection from './hero-section'
import Methodology from './methodology-section'
import ServiceSection from './service-section'
import PrinciplesSection from './principle-section'
import ShowcaseSections from './showcase-section'
import CareerSection from './career-section'
import TestimonialSection from './testimonials-section'
import HappyClients from './happyClients-section'
import Background from './background'

const Page = () => {
  return (
    <main className="pt-20 md:pt-24 relative">
      <Background />
      <HeroSection />
      <ServiceSection />
      <Methodology />
      <PrinciplesSection />
      <ShowcaseSections />
      <CareerSection />
      <TestimonialSection />
      <HappyClients />
    </main >
  )
}

export default Page
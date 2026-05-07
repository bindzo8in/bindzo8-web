import React from 'react'
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
      {/* <ProductSection />
      <WhyChooseUs /> */}
      <ShowcaseSections />
      <CareerSection />
      <TestimonialSection />
      <HappyClients />
    </main >
  )
}

export default Page
import React from 'react'
import HeroSection from './hero-section'
import Methodology from './methodology-section'
import ServiceSection from './service-section'
import PrinciplesSection from './principle-section'
import ShowcaseSections from './showcase-section'
import CareerSection from './career-section'
import TestimonialSection from './testimonials-section'
import HappyClients from './happyClients-section'
import Footer from './footer'

const Page = () => {
  return (
    <div>
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
    </div>
  )
}

export default Page
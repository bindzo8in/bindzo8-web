import React from 'react'
import HeroSection from './hero-section'
import WeAre from './we-are'
import Member from './members'
import FAQSection from './faq'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Bindzo 8 — your partner in digital transformation. Our mission, values, and the expert team behind our technology solutions.",
  alternates: {
    canonical: "/about",
  },
};

function Page() {
  return (
    <main className='overflow-hidden pt-20 md:pt-24'>
        {/* hero section */}
        <HeroSection />
        <WeAre />
        <Member />
        <FAQSection />
    </main>
  )
}

export default Page
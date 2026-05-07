import React from 'react'
import HeroSection from './hero-section'
import WeAre from './we-are'
import Member from './members'
import FAQSection from './faq'

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
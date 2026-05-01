import { Button } from '@/components/ui/button'
import React from 'react'

export default function CTA() {
    return (
        <section className='font-kumbh bg-[#FFF5F4]'>
            <article className='max-w-4xl px-6 text-center flex flex-col space-y-12 md:space-y-20 text-[#B10000] mx-auto py-20 md:py-32'>
                <h5 className='text-3xl md:text-5xl font-bold leading-tight'>
                    Tap into your business potential now and achieve greater heights of success!
                </h5>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12">
                    <Button className='border-2 border-[#E7325C] bg-white text-[#E7325C] text-lg md:text-xl font-semibold py-6 w-full sm:w-auto min-w-[180px] px-8 rounded-2xl transition-all hover:bg-[#E7325C] hover:text-white shadow-md'>
                        Start a Project
                    </Button>
                    <Button className='border-2 border-[#E7325C] bg-white text-[#E7325C] text-lg md:text-xl font-semibold py-6 w-full sm:w-auto min-w-[180px] px-8 rounded-2xl transition-all hover:bg-[#E7325C] hover:text-white shadow-md'>
                        Our Services
                    </Button>
                </div>
            </article>

            <article className='bg-gradient-to-r from-[#E7325C] to-[#EF8030] text-white min-h-[350px] md:min-h-[403px] flex flex-col items-center justify-center space-y-6 px-6 py-16 md:py-0 text-center'>
                <h5 className='text-3xl md:text-5xl font-bold tracking-tight'>
                    Growth shapes you. Evolution defines you.
                </h5>
                <p className='text-xl md:text-2xl font-raleway font-medium opacity-90'>
                    Start rewriting your story.
                </p>
                <Button className='text-[#E7325C] bg-white text-xl mt-6 font-bold rounded-2xl py-7 px-12 shadow-xl hover:scale-105 transition-transform'>
                    Contact Us
                </Button>
            </article>
        </section>
    )
}

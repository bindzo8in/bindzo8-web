import { Button } from '@/components/ui/button'
import React from 'react'

export default function CTA() {
    return (
        <section className=' font-kumbh bg-[#FFF5F4]'>
            <article className=' max-w-3xl text-center flex flex-col space-y-20 text-[#B10000]  block mx-auto py-32'>
                <h5 className='text-5xl'>Tap into your business potential now and achieve greater heights of success!</h5>
                <div className="flex justify-around items-center">
                    <Button className='border border-[#E7325C] bg-white text-[#E7325C] text-xl font-light py-4 min-w-[156px] px-8 rounded-2xl'>Start a Project</Button>
                    <Button className='border border-[#E7325C] bg-white text-[#E7325C] text-xl font-light py-4 min-w-[156px] px-8 rounded-2xl'>Services</Button>
                </div>
            </article>
            <article className='bg-linear-to-r from-[#E7325C] to-[#EF8030] text-white min-h-[403px] flex flex-col items-center justify-center space-y-4'>
                <h5 className='text-4xl font-semibold '>Growth shapes you. Evolution defines you.</h5>
                <p className='text-2xl font-raleway font-semibold'>Start rewriting your story.</p>
                <Button className='text-[#E7325C] bg-white text-xl mt-8 font-semibold rounded-2xl py-5 px-8'>Contact Us</Button>
            </article>
        </section>
    )
}

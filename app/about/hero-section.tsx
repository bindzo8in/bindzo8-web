"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'

const content = [
    {
        id: 'our-mission',
        title: "Our Mission",
        text: <p>At Bindzo 8, we understand the need to stay ahead in today’s fast-moving digital world. That’s why we continuously invest in our team, our processes, and advanced technologies to deliver the highest quality services. Our ability to quickly adapt to market trends and evolving client needs makes us a dependable partner for businesses striving to stay competitive.</p>
    },
    {
        id: "our-vision",
        title: "Our Vision",
        text:
            <>
                <p>Whether you’re a growing start-up or a large enterprise, Bindzo 8 offers a wide range of services tailored to your specific requirements. From web design and CMS development to mobile app creation and quality engineering, our expertise ensures innovative solutions that go beyond expectations.</p><br/>
                <p>We empower your business strategy with a clear technology roadmap and high-performing agile development, helping you evolve your skills, processes, structures, and team culture to unlock new capabilities.</p>
            </>
    },
    {
        id: "our-goal",
        title: "Our Goal",
        text: <p>At Bindzo 8, our early focus on emerging opportunities has enabled us to scale effortlessly and evolve into a complete one-stop destination for all business technology solutions. We are powered by a skilled and passionate team whose dedication drives our continued success.</p>
    }
]
function HeroSection() {
    const [selectedContent, setSelectedContent] = useState(0)
    const current = content[selectedContent]

    const handleClickContent = (index: number) => setSelectedContent(index)
    return (
        <section className='container mx-auto min-h-[calc(100vh-95px)] flex items-center justify-center relative bg-white'>
            <div className="absolute inset-0 z-0">
                <div className="absolute top-10 left-10 w-96 h-96 bg-red-500 blur-3xl rounded-full opacity-40" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900 blur-3xl rounded-full opacity-40" />
            </div>
            <div className="absolute inset-0 z-1 font-kumbh h-fit block mx-auto py-7 my-8 space-y-8">
                <div className='bg-white'>
                    <h1 className='capitalize text-4xl text-center mb-8'>about us</h1>
                    <p className='text-lg font-extralight text-center max-w-4xl block mx-auto'>We deliver complete end-to-end IT solutions, offering website development, mobile app development, software creation, graphic design, digital marketing, animation, and video production to meet all your business needs.</p>
                </div>
                <div className="font-kumbh flex flex-row items-center justify-center gap-12">

                    {/* Left side fixed */}
                    <figure className="w-[323px] shrink-0 flex flex-col justify-center items-center">
                        <Image
                            src="/binzo8_members/balaji_sir.webp"
                            alt="founder"
                            width={323}
                            height={323}
                            className="bg-white w-[323px] h-[323px] object-cover object-center rounded-full"
                        />

                        <figcaption className="text-center mt-4">
                            <h6 className="capitalize font-bold">balaji</h6>
                            <p>Founder</p>
                        </figcaption>
                    </figure>

                    {/* Right side fixed/flexible */}
                    <article className="flex gap-8 w-[520px] shrink-0">
                        <div className="flex flex-col gap-8 w-[130px] shrink-0">
                            {content.map((item, index) => (
                                <Button
                                    key={item.id}
                                    onClick={() => handleClickContent(index)}
                                    className="rounded-4xl py-1 px-2 font-extralight bg-[#EF8030] whitespace-nowrap"
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </div>

                        <div className="w-[360px] text-xs">
                            {current.text}
                        </div>
                    </article>

                </div>
            </div>

        </section>
    )
}

export default HeroSection

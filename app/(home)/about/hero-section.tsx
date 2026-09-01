"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react"

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
        <section className='container mx-auto min-h-[calc(100vh-95px)] flex items-center justify-center relative bg-[#0b0b0c] py-12 md:py-16'>
            <div className="absolute inset-0 z-0">
                <div className="absolute top-10 left-10 w-64 h-64 md:w-96 md:h-96 bg-[#c42b47] blur-[120px] rounded-full opacity-10" />
                <div className="absolute bottom-10 right-10 w-64 h-64 md:w-96 md:h-96 bg-[#EF8030] blur-[120px] rounded-full opacity-10" />
            </div>
            
            <div className="relative z-10 font-inter w-full px-4 sm:px-6 md:px-8 space-y-12 md:space-y-20">
                <div className='max-w-4xl mx-auto text-center'>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='capitalize text-4xl md:text-5xl lg:text-7xl font-[var(--font-fraunces)] font-bold mb-6 tracking-tight text-[#f2efe9]'
                    >
                        about us
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='text-base md:text-xl font-[var(--font-space-grotesk)] font-light leading-relaxed text-[#8b8985]'
                    >
                        We deliver complete end-to-end IT solutions, offering website development, mobile app development, software creation, graphic design, digital marketing, animation, and video production to meet all your business needs.
                    </motion.p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
                    {/* Right side: Mission/Vision/Goal Tabs */}
                    <article className="flex flex-col lg:flex-row gap-8 w-full max-w-3xl">
                        <div className="grid grid-cols-3 lg:flex lg:flex-col gap-3 sm:gap-4 shrink-0">
                            {content.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleClickContent(index)}
                                    className={`relative rounded-full py-2 sm:py-3 px-1 sm:px-6 text-[10px] xs:text-xs sm:text-sm font-[var(--font-space-grotesk)] font-bold transition-all duration-300 outline-none ${
                                        selectedContent === index 
                                        ? "text-[#f2efe9]" 
                                        : "text-[#8b8985] hover:text-[#f2efe9]"
                                    } whitespace-nowrap overflow-hidden group`}
                                >
                                    <span className="relative z-10">{item.title}</span>
                                    {selectedContent === index && (
                                        <motion.div 
                                            layoutId="activeTabAbout"
                                            className="absolute inset-0 bg-gradient-to-r from-[#E7325C] to-[#EF8030] rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                                </button>
                            ))}
                        </div>

                        <motion.div 
                            layout
                            className="flex-1 min-h-[180px] flex flex-col justify-center bg-white/[0.02] backdrop-blur-md p-6 sm:p-10 rounded-[2rem] border border-[rgba(242,239,233,0.05)] shadow-sm overflow-hidden"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedContent}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-base md:text-lg leading-relaxed text-[#f2efe9] font-[var(--font-space-grotesk)] font-light"
                                >
                                    {current.text}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default HeroSection

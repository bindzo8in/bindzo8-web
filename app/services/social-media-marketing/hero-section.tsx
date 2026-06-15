"use client"

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useRef } from 'react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import Icon1 from '@/public/icons/dig_mark/1.svg'
import Icon2 from '@/public/icons/dig_mark/2.svg'
import Icon3 from '@/public/icons/dig_mark/3.svg'
import Icon4 from '@/public/icons/dig_mark/4.svg'
import Icon5 from '@/public/icons/dig_mark/5.svg'
import Icon6 from '@/public/icons/dig_mark/6.svg'
import Icon7 from '@/public/icons/dig_mark/7.svg'
import Icon8 from '@/public/icons/dig_mark/8.svg'
import Icon9 from '@/public/icons/dig_mark/9.svg'

const data = {
    heading: 'Digital Marketing',
    subHeading: 'Strategic campaigns that deliver real visibility, engagement & conversions.',
}

import { BlobAnimation } from './BlobAnimation'

const HeroSection = ({ heading, subHeading }: { heading: string, subHeading: string }) => {
    const containerRef = useRef<HTMLElement | null>(null)
    const imageRef = useRef(null)
    const headingRef = useRef(null)
    const subHeadingRef = useRef(null)
    const overlayRef = useRef(null)


    gsap.registerPlugin(useGSAP, MotionPathPlugin)

    useGSAP(() => {
        const icons_array = gsap.utils.toArray<SVGSVGElement>('.service-icon')
        const icons_path = gsap.utils.toArray<SVGPathElement>('.service-icon path')

        gsap.set(overlayRef.current, {
            opacity: 1,
            background: 'linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)',
        })

        const tl = gsap.timeline()

        // heading
        tl.fromTo(
            headingRef.current,
            { y: -1000, color: 'black' },
            { y: 0, duration: 5, ease: 'power2.out', color: 'white' }
        )

        // sub heading
        tl.fromTo(
            subHeadingRef.current,
            { y: -1000, color: 'black' },
            { y: 0, duration: 5, ease: 'power2.out', color: 'white' },
            0
        )

        // image
        tl.fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 2, ease: 'bounce.out' },
            3
        )

        // icons path color change
        tl.to(icons_path, { fill: '#ffffff', duration: 5, ease: 'none' }, 0)

        // icons position (motion path)
        icons_array.forEach((icon) => {
            const startX = gsap.utils.random(-80, 80)
            const startY = gsap.utils.random(-60, 60)
            const midX = gsap.utils.random(-40, 40)
            const midY = gsap.utils.random(-30, 30)

            tl.to(
                icon,
                {
                    motionPath: {
                        path: [
                            { x: startX, y: startY },
                            { x: midX, y: midY },
                            { x: 0, y: 0 },
                        ],
                        curviness: 1.5,
                    },
                    duration: 5,
                    ease: 'power2.out',
                },
                0
            )
        })

        // overlay gradient transitions
        tl.to(
            overlayRef.current,
            {
                background: 'linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)',
                duration: 1,
                ease: 'none',
            },
            0
        )
        tl.to(
            overlayRef.current,
            {
                background: 'linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)',
                duration: 1,
                ease: 'none',
            },
            '>'
        )
        tl.to(
            overlayRef.current,
            { background: '#000000', opacity: 0.45, duration: 1, ease: 'none' },
            '>'
        )
        tl.to(
            overlayRef.current,
            { opacity: 0, duration: 1, ease: 'none', pointerEvents: 'none' },
            '>'
        )
    }, { scope: containerRef })

    return (
        <section
            className="relative min-h-[calc(100vh-95px)] w-full font-kumbh bg-black"
            ref={containerRef}
        >
            {/* icon container — behind text, clipped to section */}
            <div className="absolute inset-0 z-10 icon-container pointer-events-none overflow-hidden">
                <Icon1 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute top-[3%] left-[3%]" />
                <Icon5 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute top-[3%] right-[3%]" />
                <Icon6 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute top-[5%] right-[18%] hidden sm:block" />
                <Icon4 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute top-[44%] left-[1%] lg:left-[3%]" />
                <Icon2 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute bottom-[5%] left-[2%] lg:left-[5%]" />
                <Icon9 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute top-[44%] right-[1%] lg:right-[3%]" />
                <Icon7 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute bottom-[10%] right-[2%] lg:right-[8%]" />
                <Icon8 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute bottom-[3%] left-[12%] hidden sm:block" />
                <Icon3 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 service-icon absolute bottom-[3%] right-[12%] hidden sm:block" />
            </div>

            {/* foreground content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-30 px-6 text-center">
                <Image
                    src="/services/digital_marketing.png"
                    alt="Digital Marketing"
                    width={330}
                    height={330}
                    priority
                    className="object-cover w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 mb-4 lg:mb-0"
                    ref={imageRef}
                />
                <h1
                    className="scroll-m-20 text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-balance mb-4 md:mb-10 lg:mb-16"
                    ref={headingRef}
                >
                    {heading}
                </h1>
                <h2
                    className="scroll-m-20 pb-2 text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight first:mt-0 max-w-2xl"
                    ref={subHeadingRef}
                >
                    {subHeading}
                </h2>
            </div>

            {/* overlay */}
            <div className="absolute inset-0 z-20" ref={overlayRef} />

            {/* blob animation — separated component */}
            <BlobAnimation containerRef={containerRef} />
        </section>
    )
}

export { HeroSection }
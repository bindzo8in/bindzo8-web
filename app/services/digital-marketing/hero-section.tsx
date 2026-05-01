"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { ComponentType, SVGProps, useRef } from 'react'
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import Icon1 from '@/public/icons/dig_mark/1.svg'
import Icon2 from '@/public/icons/dig_mark/2.svg'
import Icon3 from '@/public/icons/dig_mark/3.svg'
import Icon4 from '@/public/icons/dig_mark/4.svg'
import Icon5 from '@/public/icons/dig_mark/5.svg'
import Icon6 from '@/public/icons/dig_mark/6.svg'
import Icon7 from '@/public/icons/dig_mark/7.svg'
import Icon8 from '@/public/icons/dig_mark/8.svg'
import Icon9 from '@/public/icons/dig_mark/9.svg'

type BlobPoint = {
    x: number;
    y: number;
    scale: number;
};

const blobSize = 350;

const blobStates = [
    {
        yellow: { x: 0.12, y: 0.12, scale: 1.1 },
        cyan: { x: 0.55, y: 0.08, scale: 1 },
        pink: { x: 0.78, y: 0.18, scale: 1.2 },
    },
    {
        yellow: { x: 0.22, y: 0.35, scale: 1.3 },
        cyan: { x: 0.52, y: 0.22, scale: 1.1 },
        pink: { x: 0.75, y: 0.38, scale: 0.9 },
    },
    {
        yellow: { x: 0.42, y: 0.28, scale: 1.5 },
        cyan: { x: 0.12, y: 0.55, scale: 1 },
        pink: { x: 0.72, y: 0.58, scale: 1.1 },
    },
    {
        yellow: { x: 0.68, y: 0.18, scale: 1.2 },
        cyan: { x: 0.35, y: 0.52, scale: 1.4 },
        pink: { x: 0.08, y: 0.62, scale: 1 },
    },
    {
        yellow: { x: 0.18, y: 0.48, scale: 1 },
        cyan: { x: 0.62, y: 0.55, scale: 1.3 },
        pink: { x: 0.74, y: 0.12, scale: 1.2 },
    },
    {
        yellow: { x: 0.48, y: 0.62, scale: 1.4 },
        cyan: { x: 0.1, y: 0.16, scale: 1.1 },
        pink: { x: 0.76, y: 0.42, scale: 1.3 },
    },
];


const HeroSection = () => {
    const containerRef = useRef<HTMLElement | null>(null);
    const imageRef = useRef(null);
    const headingRef = useRef(null);
    const subHeadingRef = useRef(null);
    const overlayRef = useRef(null);

    gsap.registerPlugin(useGSAP, MotionPathPlugin);

    useGSAP(() => {

        const icons_array = gsap.utils.toArray<SVGSVGElement>(".service-icon");
        const icons_path = gsap.utils.toArray<SVGPathElement>(".service-icon path");
        const container = containerRef.current;

        if (!container) return;

        gsap.set(overlayRef.current, {
            opacity: 1,
            background:
                "linear-gradient(270deg, #FFFFFF 98.49%, #000000 100%)",
        });

        const tl = gsap.timeline();
        // heading
        tl.fromTo(headingRef.current, {
            y: -1000, color: 'black'
        }, { y: 0, duration: 5, ease: 'power2.out', color: 'white' })

        // sub heading
        tl.fromTo(subHeadingRef.current, {
            y: -1000, color: 'black'
        }, { y: 0, duration: 5, ease: 'power2.out', color: 'white' }, 0)

        // image
        tl.fromTo(imageRef.current, {
            opacity: 0, scale: 0.5
        },
            { opacity: 1, scale: 1, duration: 2, ease: 'bounce.out' }, 3
        )

        // icons path for color change
        tl.to(icons_path,
            {

                fill: "#ffffff",
                duration: 5,
                ease: "none"
                // x: 200
            },
            0
        )

        // icons for position change
        icons_array.forEach((icon) => {
            const startX = gsap.utils.random(-80, 80);
            const startY = gsap.utils.random(-60, 60);
            const midX = gsap.utils.random(-40, 40);
            const midY = gsap.utils.random(-30, 30);
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
                    ease: "power2.out",
                },
                0
            );
        });

        // overlay gradient color change
        tl.to(
            overlayRef.current,
            {
                background:
                    "linear-gradient(246.46deg, #FFFFFF 46.75%, #000000 100%)",
                duration: 1,
                ease: "none",
            },
            0
        );

        tl.to(
            overlayRef.current,
            {
                background:
                    "linear-gradient(136.7deg, #FFFFFF 24.53%, #000000 51.49%)",
                duration: 1,
                ease: "none",
            },
            ">"
        );

        tl.to(
            overlayRef.current,
            {
                background: "#000000",
                opacity: 0.45,
                duration: 1,
                ease: "none",
            },
            ">"
        );

        tl.to(
            overlayRef.current,
            {
                opacity: 0,
                duration: 1,
                ease: "none",
                pointerEvents: "none",
            },
            ">"
        );

        //  blob animation
        const toPx = (point: BlobPoint) => {
            const rect = container.getBoundingClientRect();

            return {
                x: point.x * (rect.width - blobSize),
                y: point.y * (rect.height - blobSize),
                scale: point.scale,
            };
        };

        const yellow = container.querySelector(".blob-yellow");
        const cyan = container.querySelector(".blob-cyan");
        const pink = container.querySelector(".blob-pink");

        if (!yellow || !cyan || !pink) return;

        const blobTl = gsap.timeline({
            repeat: -1,
            defaults: {
                duration: 3,
                ease: "sine.inOut",
            },
        });

        blobStates.forEach((state) => {
            blobTl.to(yellow, toPx(state.yellow), ">");
            blobTl.to(cyan, toPx(state.cyan), "<");
            blobTl.to(pink, toPx(state.pink), "<");
        });

    }, { scope: containerRef })




    return (
        <section className='relative min-h-[calc(100vh-95px)] w-full  font-kumbh bg-black' ref={containerRef}>
            {/* icon container */}
            <div className="absolute inset-0 z-40 icon-container pointer-events-none">
                {/* top outside area */}
                <Icon1 className="w-16 h-16 service-icon absolute top-[8%] left-[8%]" />
                <Icon5 className="w-16 h-16 service-icon absolute top-[8%] right-[8%]" />
                <Icon6 className="w-16 h-16 service-icon absolute top-[12%] right-[24%]" />

                {/* left outside area */}
                <Icon4 className="w-16 h-16 service-icon absolute top-[42%] left-[6%]" />
                <Icon2 className="w-16 h-16 service-icon absolute bottom-[14%] left-[8%]" />

                {/* right outside area */}
                <Icon9 className="w-16 h-16 service-icon absolute top-[42%] right-[6%]" />
                <Icon7 className="w-16 h-16 service-icon absolute bottom-[18%] right-[12%]" />

                {/* bottom outside area */}
                <Icon8 className="w-16 h-16 service-icon absolute bottom-[10%] left-[30%]" />
                <Icon3 className="w-16 h-16 service-icon absolute bottom-[10%] right-[30%]" />
            </div>

            {/* foreground container */}
            <div className='absolute inset-0 flex flex-col justify-start items-center z-30'  >
                {/* image */}
                <Image
                    src="/services/digital_marketing.png"
                    alt="Digital Marketing"
                    width={330}
                    height={330}
                    priority
                    className='object-cover w-96 h-96'
                    ref={imageRef}
                />
                {/* heading */}
                <h1 className="scroll-m-20 text-center text-8xl font-extrabold tracking-tight text-balance mb-16" ref={headingRef}>
                    Digital Marketing
                </h1>
                {/* sub heading */}
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0" ref={subHeadingRef}>
                    Strategic campaigns that deliver real visibility, engagement & conversions.
                </h2>
            </div>

            {/* overlay container */}
            <div className="absolute inset-0 z-20" ref={overlayRef} />

            {/* blob container */}
            <div className="absolute inset-0 z-10 overflow-hidden">
                <div className={`absolute blob blob-yellow bg-yellow-400 opacity-40 size-[350px] rounded-full blur-[125px]`}></div>
                <div className={`absolute blob blob-cyan bg-cyan-400 opacity-40 size-[350px] rounded-full blur-[125px]`}></div>
                <div className={`absolute blob blob-pink bg-pink-600 opacity-40 size-[350px] rounded-full blur-[125px]`}></div>
            </div>

        </section>
    )
}

export { HeroSection }
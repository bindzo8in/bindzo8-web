"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const clients = [
    {
        name: "Logo Ipsum 01",
        logo: "/img/clients/logoipsum-404.svg",
    },
    {
        name: "Logo Ipsum 02",
        logo: "/img/clients/logoipsum-414.svg",
    },
    {
        name: "Logo Ipsum 03",
        logo: "/img/clients/logoipsum-417.svg",
    },
    {
        name: "Logo Ipsum 04",
        logo: "/img/clients/logoipsum-422.svg",
    },
    {
        name: "Logo Ipsum 05",
        logo: "/img/clients/logoipsum-423.svg",
    },
    {
        name: "Logo Ipsum 06",
        logo: "/img/clients/logoipsum-424.svg",
    },
    {
        name: "Logo Ipsum 07",
        logo: "/img/clients/logoipsum-425.svg",
    },
    {
        name: "Logo Ipsum 08",
        logo: "/img/clients/logoipsum-433.svg",
    },
];

export default function ClientsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            /* =====================================================
               UNIVERSAL SETUP (DOM Prep)
            ===================================================== */
            const label = section.querySelector(".clients-label");
            const heading = section.querySelector(".clients-heading");
            const paragraph = section.querySelector(".clients-paragraph");
            const marquee = section.querySelector(".clients-marquee");

            if (heading) {
                const headingText = heading.textContent?.trim() || "";
                const headingWords = headingText.split(" ");
                heading.innerHTML = headingWords
                    .map((word, index) => {
                        const isLast = index === headingWords.length - 1;
                        const gradientClass = isLast
                            ? " bg-gradient-to-r from-[#E7325C] to-[#EF8030] bg-clip-text text-transparent"
                            : "";
                        return `<span class="clients-word-mask inline-block overflow-hidden align-top pb-[0.15em] -mb-[0.15em]"><span class="clients-word inline-block${gradientClass}">${word}</span></span>`;
                    })
                    .join(" ");
            }

            const mm = gsap.matchMedia();

            /* =====================================================
               DESKTOP
            ===================================================== */

            mm.add("(min-width: 768px)", () => {
                if (!label || !heading || !paragraph || !marquee) return;
                const words = heading.querySelectorAll(".clients-word");

                /* Initial States */
                gsap.set(label, { y: 30, opacity: 0 });
                gsap.set(words, { yPercent: 110, opacity: 0 });
                gsap.set(paragraph, { y: 40, opacity: 0 });
                gsap.set(marquee, { y: 60, opacity: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        end: "top 25%",
                        scrub: 1,
                    },
                });

                tl.to(label, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0);
                tl.to(words, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out" }, 0.1);
                tl.to(paragraph, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.55);
                tl.to(marquee, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.7);
            });

            /* =====================================================
               MOBILE
            ===================================================== */

            mm.add("(max-width: 767px)", () => {
                if (!label || !heading || !paragraph || !marquee) return;
                const words = heading.querySelectorAll(".clients-word");

                /* Initial States */
                gsap.set(label, { y: 20, opacity: 0 });
                gsap.set(words, { yPercent: 110, opacity: 0 });
                gsap.set(paragraph, { y: 20, opacity: 0 });
                gsap.set(marquee, { y: 30, opacity: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });

                tl.to(label, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
                tl.to(words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }, 0.1);
                tl.to(paragraph, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
                tl.to(marquee, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.6);
            });

            return () => mm.revert();
        },
        {
            scope: sectionRef,
        }
    );

    return (
        <section
            ref={sectionRef}
            id="home-clients"
            className="
                w-full
                overflow-hidden
                bg-white
                py-24
                md:py-32
                lg:py-40
            "
        >
            {/* =====================================================
                INTRO
            ===================================================== */}

            <div
                className="
                    clients-content
                    mx-auto
                    w-full
                    max-w-7xl
                    px-6
                    md:px-8
                    lg:px-16
                    xl:px-32
                "
            >
                <div className="max-w-6xl">
                    <p
                        className="
                            clients-label
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.2em]
                            text-gray-400
                        "
                    >
                        Industry Standard
                    </p>

                    <h2
                        className="
                            clients-heading
                            mt-6
                            text-[clamp(4rem,10vw,9rem)]
                            font-medium
                            leading-[0.82]
                            tracking-[-0.07em]
                            text-black
                        "
                    >
                        Our Clients
                    </h2>

                    <p
                        className="
                            clients-paragraph
                            mt-10
                            max-w-2xl
                            text-base
                            leading-relaxed
                            text-gray-500
                            md:text-lg
                        "
                    >
                        We work with ambitious teams to create brands,
                        websites and digital products that turn ideas into
                        meaningful experiences and measurable results.
                    </p>
                </div>
            </div>

            {/* =====================================================
                CLIENT MARQUEE
            ===================================================== */}

            <div
                className="
                    clients-marquee
                    mt-20
                    md:mt-28
                    lg:mt-36
                "
            >
                <Marquee
                    direction="left"
                    speed={45}
                    autoFill={true}
                    pauseOnHover={false}
                    gradient={true}
                    gradientColor="white"
                    gradientWidth="140px"
                >
                    {clients.map((client, index) => (
                        <div
                            key={`${client.name}-${index}`}
                            className="
                                group
                                mx-8
                                flex
                                h-28
                                w-52
                                shrink-0
                                items-center
                                justify-center

                                md:mx-12
                                md:h-32
                                md:w-60

                                lg:mx-16
                                lg:w-64
                            "
                        >
                            <Image
                                src={client.logo}
                                alt={client.name}
                                width={240}
                                height={100}
                                className="
                                    max-h-14
                                    w-auto
                                    max-w-[190px]
                                    object-contain

                                    grayscale
                                    opacity-45

                                    transition-all
                                    duration-500
                                    ease-out

                                    group-hover:scale-110
                                    group-hover:grayscale-0
                                    group-hover:opacity-100

                                    md:max-h-16
                                    md:max-w-[220px]
                                "
                            />
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* =====================================================
                FOOTNOTE
            ===================================================== */}

            <div
                className="
                    mx-auto
                    mt-12
                    w-full
                    max-w-7xl
                    px-6
                    md:px-8
                    lg:px-16
                    xl:px-32
                "
            >
                <div className="border-t border-gray-200 pt-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                        Selected collaborations
                    </p>
                </div>
            </div>
        </section>
    );
}
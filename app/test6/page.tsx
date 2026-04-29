"use client"
import { useLayoutEffect, useRef } from 'react'
import gsap from "gsap";

export default function Page() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                repeat: -1,
                defaults: {
                    ease: "none",
                },
            })

            tl.to(logoRef.current, {
                duration: 2,
                x: 143,
                y: 138,
                rotate: 32.3
            }, ">") 
          
        }, wrapRef)

    //         const points = [
    //   { x: 85, y: 96, rotate: 0 },
    //   { x: 143, y: 138, rotate: -32.3 },
    //   { x: 298.66, y: 299.22, rotate: -90 },
    //   { x: 393, y: 187, rotate: -135 },
    //   { x: 580.69, y: 98.19, rotate: 180 },
    // ];
        return () => ctx.revert();
    }, [])

    return (
        <section>
            <div className="min-h-[562px] relative flex items-center overflow-visible" ref={wrapRef}>
                <img
                    ref={logoRef}
                    src="/home/ourProducts/Bindzo_logo.png"
                    alt=""
                    className="absolute w-[clamp(120px,16vw,220px)] h-auto object-contain "
                />
            </div>
        </section>
    )
}

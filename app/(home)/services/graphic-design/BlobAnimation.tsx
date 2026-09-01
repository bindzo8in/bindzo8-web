"use client"

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type BlobPoint = {
    x: number
    y: number
    scale: number
}

const blobSize = 350

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
]

interface BlobAnimationProps {
    /** The parent container ref — blobs position themselves relative to it */
    containerRef: React.RefObject<HTMLElement | null>
}

const BlobAnimation = ({ containerRef }: BlobAnimationProps) => {
    const blobWrapperRef = useRef<HTMLDivElement>(null)

    gsap.registerPlugin(useGSAP)

    useGSAP(() => {
        const container = containerRef.current
        if (!container) return

        const toPx = (point: BlobPoint) => {
            const rect = container.getBoundingClientRect()
            return {
                x: point.x * (rect.width - blobSize),
                y: point.y * (rect.height - blobSize),
                scale: point.scale,
            }
        }

        const yellow = container.querySelector('.blob-yellow')
        const cyan = container.querySelector('.blob-cyan')
        const pink = container.querySelector('.blob-pink')

        if (!yellow || !cyan || !pink) return

        const blobTl = gsap.timeline({
            repeat: -1,
            defaults: {
                duration: 3,
                ease: 'sine.inOut',
            },
        })

        blobStates.forEach((state) => {
            blobTl.to(yellow, toPx(state.yellow), '>')
            blobTl.to(cyan, toPx(state.cyan), '<')
            blobTl.to(pink, toPx(state.pink), '<')
        })
    }, { scope: containerRef })

    return (
        <div ref={blobWrapperRef} className="absolute inset-0 z-10 overflow-hidden">
            <div className="absolute blob blob-yellow bg-yellow-400 opacity-40 size-[350px] rounded-full blur-[125px]" />
            <div className="absolute blob blob-cyan bg-cyan-400 opacity-40 size-[350px] rounded-full blur-[125px]" />
            <div className="absolute blob blob-pink bg-pink-600 opacity-40 size-[350px] rounded-full blur-[125px]" />
        </div>
    )
}

export { BlobAnimation }
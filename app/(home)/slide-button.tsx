"use client"

import { ArrowRight } from "lucide-react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

export default function SlideButton() {
  const [isCompleted, setIsCompleted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [maxDrag, setMaxDrag] = useState(220)
  const x = useMotionValue(0)
  const router = useRouter()

  useLayoutEffect(() => {
    const updateMaxDrag = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const knobWidth = 44
        const padding = 12 // 6px on each side
        setMaxDrag(containerWidth - knobWidth - padding)
      }
    }

    updateMaxDrag()
    window.addEventListener('resize', updateMaxDrag)
    return () => window.removeEventListener('resize', updateMaxDrag)
  }, [])

  const backgroundColor = useTransform(
    x,
    [0, maxDrag],
    ["#d3325c", "#c42b47"]
  )
  const slideOpacity = useTransform(x, [0, maxDrag * 0.4], [1, 0])
  const exploreOpacity = useTransform(x, [maxDrag * 0.6, maxDrag], [0, 1])

  // Idle wiggle hint
  useEffect(() => {
    if (isCompleted) return
    const interval = setInterval(() => {
      if (!isCompleted && x.get() === 0) {
        animate(x, 20, { type: "spring", stiffness: 200, damping: 10 }).then(() => {
          animate(x, 0, { type: "spring", stiffness: 300, damping: 20 })
        })
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isCompleted, x])

  const handleDragEnd = () => {
    if (x.get() > maxDrag * 0.7) {
      animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 30 })
      setIsCompleted(true)
      setTimeout(() => router.push("/services"), 500)
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 })
    }
  }

  const handleReset = () => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 30 })
    setIsCompleted(false)
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-[300px] min-w-[200px] h-[56px] rounded-full flex items-center cursor-pointer select-none overflow-hidden touch-none"
      style={{ backgroundColor }}
      onClick={isCompleted ? handleReset : undefined}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-white font-bold pointer-events-none text-[10px] uppercase tracking-tight sm:tracking-wider px-12 sm:px-0 sm:pl-12"
        style={{ opacity: slideOpacity }}
      >
        Slide to explore
      </motion.span>

      <motion.span
        className="absolute inset-0 flex items-center justify-center text-white font-bold pointer-events-none text-[10px] uppercase tracking-tight sm:tracking-wider"
        style={{ opacity: exploreOpacity }}
      >
        Explore
      </motion.span>

      <motion.div
        className="absolute left-[6px] w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center z-10 cursor-grab active:cursor-grabbing shadow-lg"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        <ArrowRight className="text-[#d3325c] w-6 h-6" />
      </motion.div>
    </motion.div>
  )
}
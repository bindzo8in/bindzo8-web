"use client"

import { ArrowRight } from "lucide-react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SlideButton() {
  const [isCompleted, setIsCompleted] = useState(false)
  const x = useMotionValue(0)
  const router = useRouter()
  const maxDrag = 220

  const backgroundColor = useTransform(
    x,
    [0, maxDrag],
    ["#EF8030", "#E7325C"]
  )
  const slideOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0])
  const exploreOpacity = useTransform(x, [maxDrag * 0.5, maxDrag], [0, 1])

  // Idle wiggle hint — runs once on mount, pauses when dragged
  useEffect(() => {
    if (isCompleted) return
    let cancelled = false
    const timeout = setTimeout(() => {
      const sequence = async () => {
        if (cancelled) return
        await animate(x, 18, { type: "spring", stiffness: 200, damping: 10 })
        if (cancelled) return
        await animate(x, 0,  { type: "spring", stiffness: 300, damping: 20 })
      }
      sequence()
    }, 800)
    return () => { cancelled = true; clearTimeout(timeout) }
  }, [isCompleted])

  const handleDragEnd = () => {
    if (x.get() > maxDrag * 0.7) {
      animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 30 })
      setIsCompleted(true)
      // Redirect after a short visual pause
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
      className="relative w-[180px] sm:w-[300px] h-[56px] rounded-full flex items-center cursor-pointer select-none overflow-hidden"
      style={{ backgroundColor }}
      onClick={isCompleted ? handleReset : undefined}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-white font-semibold pointer-events-none text-sm sm:text-base pl-8 sm:pl-0"
        style={{ opacity: slideOpacity }}
      >
        Slide to explore
      </motion.span>

      <motion.span
        className="absolute inset-0 flex items-center justify-center text-white font-semibold pointer-events-none text-sm sm:text-base"
        style={{ opacity: exploreOpacity }}
      >
        Explore
      </motion.span>

      <motion.div
        className="absolute left-[6px] w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center z-10 cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        <ArrowRight className="text-[#EF8030]" />
      </motion.div>
    </motion.div>
  )
}
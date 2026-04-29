"use client"

import { ArrowRight } from "lucide-react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useState } from "react"


export default function SlideButton() {
  const [isCompleted, setIsCompleted] = useState(false)
  const x = useMotionValue(0)

  const maxDrag = 220 // adjust based on button width minus handle size

  // Background color transitions as you drag
  const backgroundColor = useTransform(
    x,
    [0, maxDrag],
    ["#EF8030", "#E7325C"]
  )

  // Text opacity - "Slide" fades out, "Explore" fades in
  const slideOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0])
  const exploreOpacity = useTransform(x, [maxDrag * 0.5, maxDrag], [0, 1])

  const handleDragEnd = () => {
    const currentX = x.get()

    if (currentX > maxDrag * 0.7) {
      // Snap to end
      animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 30 })
      setIsCompleted(true)
    } else {
      // Snap back to start
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 })
      setIsCompleted(false)
    }
  }

  const handleReset = () => {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 30 })
    setIsCompleted(false)
  }

  return (
    <motion.div
      className="relative w-[300px] h-[56px] rounded-full flex items-center cursor-pointer select-none overflow-hidden"
      style={{ backgroundColor }}
      onClick={isCompleted ? handleReset : undefined}
    >
      {/* "Slide" text */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold pointer-events-none"
        style={{ opacity: slideOpacity }}
      >
        Slide
      </motion.span>

      {/* "Explore" text */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold pointer-events-none"
        style={{ opacity: exploreOpacity }}
      >
        Explore
      </motion.span>

      {/* Draggable handle */}
      <motion.div
        className="absolute left-[6px] w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center z-10 cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        <ArrowRight className="text-[#EF8030] text-lg" />
      </motion.div>
    </motion.div>
  )
}
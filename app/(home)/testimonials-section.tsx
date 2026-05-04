"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import BallGroup from "./ball-group"

const starOffsets = [152, 76, 0, -76, -152]

const testimonials = [
  {
    text: "Bindzo 8 transformed the way our business operates. Their team not only understood our needs but also provided innovative digital solutions that boosted our efficiency and online visibility.",
    author: "- Ravi Kumar, Director, NeoTech Enterprises"
  },
  {
    text: "The SEO services provided were top-notch. Our organic traffic doubled in just three months. A highly recommended digital partner for any growing business.",
    author: "- Maryam Tabatabaei, Founder"
  },
  {
    text: "ExhibiTrack Pro has streamlined our entire event management process. The transition was seamless and the support team is incredible.",
    author: "- Event Manager, Akira Biotek"
  }
]

const TestimonialSection = () => {
  const [index, setIndex] = useState(0)

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-[#fcf9f9] py-20 px-6 md:px-12 lg:px-24 font-kumbh relative overflow-hidden">
      <div className="max-w-[1500px] mx-auto flex flex-col items-center justify-center">

        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-2 w-full"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-[#c82433] text-[15px] tracking-widest uppercase font-medium mb-3">
            TESTIMONIALS
          </h2>
          <p className="text-[13px] font-bold text-black tracking-wide">
            The Trust We Gained from Clients
          </p>
        </motion.div>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full min-h-[300px]">

          {/* Left — BallGroup */}
          <motion.div
            className="hidden md:flex w-1/4 justify-center items-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <BallGroup className="w-full max-w-[224px] h-auto" />
          </motion.div>

          {/* Center Text Wrapper with Overflow Hidden */}
          <div className="w-full md:w-1/2 overflow-hidden relative h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-2"
                // Entry from bottom
                initial={{ opacity: 0, y: 50 }} 
                // Visible state
                animate={{ opacity: 1, y: 0 }}
                // Exit to top
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <p className="text-[14px] leading-[1.8] text-[#222222] font-medium mb-8 max-w-2xl mx-auto">
                  "{testimonials[index].text}"
                </p>
                <p className="text-[14px] font-bold text-black mb-6">
                  {testimonials[index].author}
                </p>

                {/* Stars inside the animated container so they reset with content */}
                <div className="flex items-center justify-center gap-[10px]">
                  {[...Array(5)].map((_, i) => (
                    <motion.img
                      key={i}
                      src="/services/star_icon.png"
                      alt="Star"
                      className="w-[28px] h-[28px] object-contain"
                      animate={starOffsets[i] !== 0 ? { x: [0, starOffsets[i], 0] } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 0.5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Illustration */}
          <motion.div
            className="w-full md:w-1/4 flex justify-center relative mt-12 md:mt-0"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src="/services/testimonial_illustration.png"
              alt="Testimonial Characters"
              className="w-[280px] xl:w-[320px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
// "use client"
// import { motion } from "motion/react"
// import BallGroup from "./ball-group"

// const starOffsets = [152, 76, 0, -76, -152]

// const TestimonialSection = () => {
//   return (
//     <section className="bg-[#fcf9f9] py-20 px-6 md:px-12 lg:px-24 font-kumbh relative overflow-hidden">
//       <div className="max-w-[1500px] mx-auto flex flex-col items-center justify-center">

//         {/* Header */}
//         <motion.div
//           className="text-center mb-10 md:mb-2 w-full"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <h2 className="text-[#c82433] text-[15px] tracking-widest uppercase font-medium mb-3">
//             TESTIMONIALS
//           </h2>
//           <p className="text-[13px] font-bold text-black tracking-wide">
//             The Trust We Gained from Clients
//           </p>
//         </motion.div>

//         {/* Content Row — BallGroup | Content | Right Asset */}
//         <div className="flex flex-col md:flex-row items-center justify-between w-full">

//           {/* Left — BallGroup */}
//           <motion.div
//             className="hidden md:flex w-1/4 justify-center items-center"
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
//           >
//             <BallGroup className="w-full max-w-[224px] h-auto" />
//           </motion.div>

//           {/* Center Text */}
//           <motion.div
//             className="w-full md:w-1/2 text-center z-40 px-2 mt-8 md:mt-0"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
//           >
//             <p className="text-[14px] leading-[1.8] text-[#222222] font-medium mb-8 max-w-2xl mx-auto">
//               "Bindzo 8 transformed the way our business operates. Their team not only understood our needs but also provided innovative digital solutions that boosted our efficiency and online visibility. Truly a dependable IT partner!"
//             </p>
//             <p className="text-[14px] font-bold text-black mb-10">
//               -Ravi Kumar, Director, NeoTech Enterprises
//             </p>

//             {/* Stars */}
//             <div className="flex items-center justify-center gap-[10px]">
//               {[...Array(5)].map((_, i) => (
//                 <motion.img
//                   key={i}
//                   src="/services/star_icon.png"
//                   alt="Star"
//                   className="w-[28px] h-[28px] object-contain"
//                   animate={starOffsets[i] !== 0 ? { x: [0, starOffsets[i], 0] } : {}}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     repeatDelay: 0.5,
//                   }}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Illustration */}
//           <motion.div
//             className="w-full md:w-1/4 flex justify-center relative mt-12 md:mt-0"
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
//           >
//             <img
//               src="/services/testimonial_illustration.png"
//               alt="Testimonial Characters"
//               className="w-[280px] xl:w-[320px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
//             />
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default TestimonialSection
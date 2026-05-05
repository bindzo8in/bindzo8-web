"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import BallGroup from "./ball-group";

const desktopStarOffsets = [152, 76, 0, -76, -152];
const mobileStarOffsets = [48, 24, 0, -24, -48];

const FALLBACK_TESTIMONIALS = [
  {
    text: "Bindzo 8 transformed the way our business operates. Their team not only understood our needs but also provided innovative digital solutions that boosted our efficiency and online visibility.",
    author: "- Ravi Kumar, Director, NeoTech Enterprises",
  },
  {
    text: "The SEO services provided were top-notch. Our organic traffic doubled in just three months. A highly recommended digital partner for any growing business.",
    author: "- Maryam Tabatabaei, Founder",
  },
  {
    text: "ExhibiTrack Pro has streamlined our entire event management process. The transition was seamless and the support team is incredible.",
    author: "- Event Manager, Akira Biotek",
  },
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    fetch("/api/testimonials?limit=20")
      .then((res) => res.json())
      .then((data) => {
        if (data?.items?.length > 0) {
          setTestimonials(
            data.items.map((t: { content: string; author: string }) => ({
              text: t.content,
              author: `- ${t.author}`,
            }))
          );
        }
      })
      .catch(() => {
        // keep fallback
      });
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const starOffsets = isMobile ? mobileStarOffsets : desktopStarOffsets;

  return (
    <section className="relative overflow-hidden bg-[#fcf9f9] px-5 py-14 font-kumbh sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-24">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center justify-center">
        {/* Header */}
        <motion.div
          className="mb-8 w-full text-center md:mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-3 text-[13px] font-medium uppercase tracking-[0.22em] text-[#c82433] sm:text-[14px] md:text-[15px]">
            Testimonials
          </h2>

          <p className="mx-auto max-w-[320px] text-[22px] font-bold leading-tight tracking-wide text-black sm:max-w-none sm:text-[26px] md:text-[32px]">
            The Trust We Gained from Clients
          </p>
        </motion.div>

        {/* Content Row */}
        <div className="flex min-h-[auto] w-full flex-col items-center justify-between gap-8 md:min-h-[360px] md:flex-row md:gap-0">
          {/* Left — BallGroup */}
          <motion.div
            className="hidden w-1/4 items-center justify-center md:flex"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <BallGroup className="h-auto w-full max-w-[180px] lg:max-w-[224px]" />
          </motion.div>

          {/* Center Text */}
          <div className="relative flex h-[330px] w-full items-center justify-center overflow-hidden rounded-3xl bg-white/50 px-4 shadow-[0_20px_60px_rgba(0,0,0,0.04)] sm:h-[310px] sm:px-8 md:h-[290px] md:w-1/2 md:bg-transparent md:px-2 md:shadow-none">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-8 md:px-2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <p className="mx-auto mb-6 max-w-2xl text-[15px] font-medium leading-[1.75] text-[#222222] sm:text-[16px] sm:leading-[1.8] md:text-[15px] lg:text-[16px]">
                  “{testimonials[index]?.text}”
                </p>

                <p className="mb-7 text-[13px] font-bold leading-relaxed text-black sm:text-[14px] md:mb-8">
                  {testimonials[index]?.author}
                </p>

                {/* Stars */}
                <div className="flex items-center justify-center gap-2 sm:gap-[10px]">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={
                        starOffsets[i] !== 0
                          ? { x: [0, starOffsets[i], 0] }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 0.5,
                      }}
                    >
                      <Image
                        src="/services/star_icon.png"
                        alt="Star"
                        width={28}
                        height={28}
                        className="h-[22px] w-[22px] object-contain sm:h-[26px] sm:w-[26px] md:h-[28px] md:w-[28px]"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Illustration */}
          <motion.div
            className="relative flex w-full justify-center md:mt-0 md:w-1/4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              src="/services/testimonial_illustration.png"
              alt="Testimonial Characters"
              width={320}
              height={320}
              className="h-auto w-full max-w-[220px] object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105 sm:max-w-[260px] md:max-w-[280px] xl:max-w-[320px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
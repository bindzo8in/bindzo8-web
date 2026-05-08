"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  media: string;
  slug: string;
  href: string;
}

const services: Service[] = [
  {
    title: "Digital Marketing",
    description: "Elevate your online presence with data-driven strategies and creative campaigns that convert.",
    media: "/home_service_icons/digital-marketing.webp",
    slug: "digital-marketing",
    href: `/services/digital-marketing`
  },
  {
    title: "Website Development",
    description: "High-performance, responsive websites built with the latest technologies to drive your business.",
    media: "/home_service_icons/website-development.webp",
    slug: "website-development",
    href: `/services/website-development`
  },
  {
    title: "Mobile App Development",
    description: "Scalable and intuitive mobile solutions for iOS and Android that provide a seamless user experience.",
    media: "/home_service_icons/mobile-app-development.webp",
    slug: "mobile-app",
    href: `/service/mobile-app`
  },
  {
    title: "SEO Optimization",
    description: "Boost your organic visibility and rank higher on search engines with our expert SEO techniques.",
    media: "/home_service_icons/search-engine-optimization.webp",
    href: `/services/seo`,
    slug: "seo",
  },
  {
    title: "Design Solution",
    description: "Creative and impactful design solutions that capture your brand essence and engage your audience.",
    media: "/home_service_icons/design-solution.webp",
    slug: "graphic-design",
    href: `/services/graphic-design`
  },
  {
    title: "Video Editing",
    description: "Professional video editing that tells your story and captures attention in a crowded digital world.",
    media: "/home_service_icons/video-editing.webp",
    slug: "video-editing",
    href: `/services/video-editing`,
  },
  {
    title: "E-Commerce Solutions",
    description: "Robust and user-friendly e-commerce platforms designed to maximize your sales and growth.",
    media: "/home_service_icons/ecommerce.webp",
    slug: "ecommerce",
    href: `/service/ecommerce-solutions`,
  },
  {
    title: "Branding",
    description: "Build a strong and memorable brand identity that resonates with your customers.",
    media: "/home_service_icons/branding.webp",
    slug: "branding",
    href: `/service/branding`,
  },
];

export default function ServiceSection() {
  const [current, setCurrent] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Simplified Auto-rotation
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovered, services.length]);

  // Scroll active tab into view (for mobile)
  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.children[current] as HTMLElement;
      if (activeTab) {
        tabsRef.current.scrollTo({
          left: activeTab.offsetLeft - (tabsRef.current.offsetWidth / 2) + (activeTab.offsetWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [current]);

  return (
    <section className="relative w-full py-12 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-36 overflow-hidden bg-transparent font-kumbh">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      {/* Header */}
      <div className="relative z-10 mb-8 md:mb-20 text-center md:text-left">
        <motion.h4 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#EF8030] text-sm uppercase tracking-[0.3em] font-semibold mb-4"
        >
          Our Expertise
        </motion.h4>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
        >
          Solutions that drive <br />
          <span className="text-[#E7325C]">Digital Excellence.</span>
        </motion.h2>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left: Interactive List */}
        <div 
          ref={tabsRef}
          className="w-full lg:w-[40%] flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide snap-x"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`group relative flex items-center justify-between min-w-max lg:min-w-0 w-auto lg:w-full p-4 lg:p-6 rounded-2xl transition-all duration-300 snap-center outline-none ${
                index === current 
                  ? "text-white scale-110 lg:scale-100" 
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6 z-10">
                <span className={`text-base lg:text-xl font-bold transition-colors duration-300 ${
                  index === current ? "text-[#E7325C]" : "text-white/20 group-hover:text-white/40"
                }`}>
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className={`text-sm sm:text-base lg:text-2xl font-semibold transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                  index === current ? "lg:translate-x-2" : "group-hover:translate-x-1"
                }`}>
                  {service.title}
                </span>
              </div>
              
              {index === current && (
                <>
                  {/* Desktop Pill */}
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl hidden lg:block"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  {/* Mobile Dot */}
                  <motion.div
                    layoutId="mobileIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#E7325C] rounded-full lg:hidden"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                </>
              )}
              
              <ChevronRight className={`hidden lg:block w-6 h-6 z-10 transition-all duration-300 ${
                index === current ? "text-[#E7325C] opacity-100" : "text-white/10 opacity-0 group-hover:opacity-100"
              }`} />
            </button>
          ))}
        </div>

        {/* Right: Detailed Content Card */}
        <div className="w-full lg:w-[60%] sticky top-24 h-auto lg:h-[700px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-full p-8 md:p-12 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E7325C]/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#EF8030]/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold text-white mb-6"
                >
                  {services[current].title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-10"
                >
                  {services[current].description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    href={services[current].href}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E7325C] hover:bg-[#d42d53] text-white rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(231,50,92,0.4)]"
                  >
                    Explore
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative mt-12 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={services[current].media}
                  alt={services[current].title}
                  fill
                  className="object-contain p-4 bg-white/[0.02]"
                  priority
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
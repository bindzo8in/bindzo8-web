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
    title: "Social Media Marketing",
    description: "Elevate your online presence with data-driven strategies and creative campaigns that convert.",
    media: "/home_service_icons/digital-marketing.webp",
    slug: "social-media-marketing",
    href: `/services/social-media-marketing`
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

  // {
  //   title: "Video Editing",
  //   description: "Professional video editing that tells your story and captures attention in a crowded digital world.",
  //   media: "/home_service_icons/video-editing.webp",
  //   slug: "video-editing",
  //   href: `/services/video-editing`,
  // },
  {
    title: "DV 360",
    description: "Access global inventory and advanced targeting capabilities with our DV 360 services.",
    media: "/home_service_icons/dv-360.webp",
    slug: "dv-360",
    href: `/services/dv-360`,
  },
  {
    title: "E-Commerce Development",
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
  {
    title: "Google Ads",
    description: "Drive qualified traffic and maximize ROI with expertly managed Google Ads campaigns across Search, Display, and YouTube.",
    media: "/home_service_icons/google-ads.webp",
    slug: "google-ads",
    href: `/service/google-ads`,
  },
  {
    title: "Product Shooting",
    description: "Professional product photography and videography that showcases your products with cinematic quality.",
    media: "/home_service_icons/product-shooting.webp",
    slug: "product-shooting",
    href: `/service/product-shooting`,
  },
  {
    title: "Design Solution",
    description: "Creative and impactful design solutions that capture your brand essence and engage your audience.",
    media: "/home_service_icons/design-solution.webp",
    slug: "graphic-design",
    href: `/services/graphic-design`
  },
];

export default function ServiceSection() {
  const [current, setCurrent] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered]);

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
    <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start px-8 md:px-16 sm:pb-8 font-kumbh">

      {/* LEFT COLUMN */}
      <div className="w-full lg:w-[38%] flex flex-col">

        {/* Heading */}
        <div className="mb-8 lg:mb-12 text-left">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#d3325c] text-xs uppercase tracking-[0.3em] font-semibold mb-2"
          >
            Our Expertise
          </motion.h4>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            Solutions that drive <br />
            <span className="text-[#c42b47]">
              Digital Excellence.
            </span>
          </motion.h2>
        </div>

        {/* Service List */}
        <div
          ref={tabsRef}
          className="
    w-full
    flex flex-row lg:flex-col
    gap-1
    overflow-x-auto
    lg:overflow-visible
    pb-4 lg:pb-0
    scrollbar-hide
    snap-x
  "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`group relative flex items-center justify-between min-w-max lg:min-w-0 w-auto lg:w-full p-3 lg:p-4 rounded-xl transition-all duration-300 snap-center outline-none ${index === current
                ? "text-white scale-110 lg:scale-100"
                : "text-white/40 hover:text-white/70"
                }`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 z-10">
                <span
                  className={`text-sm lg:text-base font-bold transition-colors duration-300 ${index === current
                    ? "text-[#c42b47]"
                    : "text-white/20 group-hover:text-white/40"
                    }`}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                <span
                  className={`text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${index === current
                    ? "lg:translate-x-2"
                    : "group-hover:translate-x-1"
                    }`}
                >
                  {service.title}
                </span>
              </div>

              {index === current && (
                <>
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl hidden lg:block"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />

                  <motion.div
                    layoutId="mobileIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#c42b47] rounded-full lg:hidden"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                </>
              )}

              <ChevronRight
                className={`hidden lg:block w-5 h-5 z-10 transition-all duration-300 ${index === current
                  ? "text-[#c42b47] opacity-100"
                  : "text-white/10 opacity-0 group-hover:opacity-100"
                  }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full lg:w-[62%] sticky top-20 h-auto lg:h-[calc(100vh-14rem)] lg:max-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full p-6 md:p-8 lg:p-12 rounded-[1.5rem] lg:rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* Service Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="relative w-full h-48 md:h-64 lg:h-72 rounded-xl overflow-hidden bg-gradient-to-br from-[#c42b47]/5 to-transparent mb-6 lg:mb-8"
            >
              <Image
                src={services[current].media}
                alt={services[current].title}
                fill
                className="object-contain p-4 lg:p-8"
                priority
              />
              {/* Optional floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10"
              >
                <span className="text-white/70 text-sm font-medium">
                  {services[current].title}
                </span>
              </motion.div>
            </motion.div>

            {/* Service Content */}
            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3"
              >
                {services[current].title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed mb-6 lg:mb-8"
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
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#c42b47] hover:bg-[#d42d53] text-white rounded-full font-bold text-sm lg:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(231,50,92,0.4)]"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Background Accents */}
            <div className="absolute -top-32 -right-32 w-56 h-56 bg-[#c42b47]/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-56 h-56 bg-[#d3325c]/10 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

import Link from "next/link";
import { Marquee } from "./ui/marquee";
import Image from "next/image";
import { Heart, Mail, MailOpen, MapPin, Phone, Smartphone } from "lucide-react";
import { FaInstagram, FaFacebookF, FaGoogle, FaBehance, FaLinkedinIn } from "react-icons/fa";
import QuoteModal from "./contact-model";


const icons = ["/footer_icons/1.svg", "/footer_icons/2.svg", "/footer_icons/3.svg", "/footer_icons/4.svg", "/footer_icons/5.svg",]

const socialLinks = [
  {
    icon: FaFacebookF,
    href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    color: "#1877F2", // Facebook
  },
  {
    icon: FaInstagram,
    href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
    color: "#E4405F", // Instagram
  },
  {
    icon: FaGoogle,
    href: process.env.NEXT_PUBLIC_SOCIAL_GOOGLE,
    color: "#DB4437", // Google
  },
  {
    icon: FaBehance,
    href: process.env.NEXT_PUBLIC_SOCIAL_BEHANCE,
    color: "#1769FF", // Behance
  },
  {
    icon: FaLinkedinIn,
    href: "#",
    color: "#0A66C2", // LinkedIn
  },
];

const links = {
  quick: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Products", href: "/products" },
    { title: "Career", href: "/career" },
    { title: "Contact", href: "/contact" },
  ],
  ourFeatures: [
    { title: "Why Choose Us", href: "/who-we-are#why-choose-us" },
    { title: "Who We Work", href: "/who-we-are#who-we-work" },
    { title: "What We do", href: "/who-we-are#what-we-do" },
    { title: "Our Achievements", href: "/who-we-are#our-achievements" },
    { title: "Terms Of Services", href: "/terms-of-services" },
    { title: "Privacy Policy", href: "/privacy-policy" },
  ],
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#fdf9f9] relative font-kumbh overflow-hidden border-t border-gray-100">
      {/* Top Black Bar: Follow Us */}
      {/* <div className="w-full bg-[#111111] py-5 border-b border-white/5">
      
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-[#d6335a] hidden md:block"></div>
            <h4 className="font-bold text-white text-[14px] uppercase tracking-[0.2em]">Follow Our Journey</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 text-sm hover:bg-[#d6335a] hover:text-white hover:border-[#d6335a] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div> */}
      <div className="w-full bg-[#111111] py-5 border-b border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-20 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-[#d6335a]"></div>
            <h4 className="font-bold text-white text-[14px] uppercase tracking-[0.2em]">Follow Our Journey</h4>
            <div className="h-px w-8 bg-[#d6335a]"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((item, i) => (
              <a key={i} href={item.href}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 text-base hover:bg-[#d6335a] hover:text-white hover:border-[#d6335a] transition-all duration-300 hover:-translate-y-1 active:scale-95"
              ><item.icon style={{ color: item.color }} /></a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-20 pt-16 pb-12">

        {/* Top Row: Logo & Icons */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center mb-16 gap-10">
          {/* Logo */}
          <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
            <Link href="/" className="flex items-center">
              <img src="/footer_logo.webp" alt="Bindzo 8 Logo" className="h-[50px] md:h-[60px] object-contain" />
            </Link>
            {/* <p className="text-[#f45c75] font-semibold text-[14px] md:text-[15px]">Bindzo 8 Pvt. Ltd.</p> */}
          </div>

          {/* Marquee Icons */}
          <div className="relative flex w-full max-w-lg flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {icons.map(icon =>
                <div key={icon} className="px-4">
                  <Image className="w-8 h-8 md:w-10 md:h-10 opacity-70 hover:opacity-100 transition-opacity" width={40} height={40} alt="icon" src={icon} />
                </div>
              )}
            </Marquee>
          </div>
        </div>

        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-900 text-[15px] mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4">
              {links.quick.map(item => (
                <li key={item.title}>
                  <Link href={item.href} className="text-[14px] text-gray-600 font-medium hover:text-[#d6335a] transition-colors">{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Features */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-900 text-[15px] mb-6 uppercase tracking-wider">Our Features</h4>
            <ul className="space-y-4">
              {links.ourFeatures.map(item => (
                <li key={item.title}>
                  <Link href={item.href} className="text-[14px] text-gray-600 font-medium hover:text-[#d6335a] transition-colors">{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5 text-center sm:text-left">
            <h4 className="mb-6 text-[15px] font-bold uppercase tracking-wider text-gray-900">
              Contact Us
            </h4>

            <div className="mx-auto flex w-full max-w-[310px] items-start gap-3 text-left sm:mx-0 sm:max-w-none">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d6335a]" />
              <p className="min-w-0 text-[14px] font-medium leading-relaxed text-gray-700">
                {process.env.NEXT_PUBLIC_LOCATION}
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-[310px] items-start gap-3 text-left sm:mx-0 sm:max-w-none">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#d6335a]" />
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                className="min-w-0 text-[14px] font-medium text-gray-700 hover:text-[#d6335a]"
              >
                {process.env.NEXT_PUBLIC_PHONE_LABEL}
              </a>
            </div>

            <div className="mx-auto flex w-full max-w-[310px] items-start gap-3 text-left sm:mx-0 sm:max-w-none">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#d6335a]" />

              <div className="flex min-w-0 flex-col gap-1 text-[14px] font-medium text-gray-700">
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_1}`}
                  className="break-all hover:text-[#d6335a]"
                >
                  {process.env.NEXT_PUBLIC_EMAIL_1}
                </a>

                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_2}`}
                  className="break-all hover:text-[#d6335a]"
                >
                  {process.env.NEXT_PUBLIC_EMAIL_2}
                </a>

                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_3}`}
                  className="break-all hover:text-[#d6335a]"
                >
                  {process.env.NEXT_PUBLIC_EMAIL_3}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <QuoteModal
                customTrigger={
                  <button className="rounded-full bg-[#d6335a] px-8 py-3 text-[13px] font-bold text-white shadow-md transition-all hover:bg-[#b52a4b] hover:shadow-lg active:scale-95">
                    Get a Quote
                  </button>
                }
              />
            </div>
          </div>

        </div>
      </div>

      <div className="w-full py-6 bg-[#d6335a]">
        <div className="max-w-[1500px] mx-auto px-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-[12px] font-semibold tracking-wide text-white opacity-90 md:text-left md:text-[13px]">
            Copyright © {new Date().getFullYear()} <Link href="https://bindzo8.com/">bindzo8.com</Link>. All Rights Reserved.
          </p>
          <p className="text-center text-[12px] font-semibold tracking-wide text-white opacity-90 md:text-right md:text-[13px] flex items-center gap-2">
            Designed & Developed by <Smartphone className="animate-pulse w-4 h-4" color="white" fill="red"/><Link href="https://bindzo8.com/">bindzo8.com</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

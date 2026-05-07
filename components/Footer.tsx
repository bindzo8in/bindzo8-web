import Link from "next/link";
import { Marquee } from "./ui/marquee";
import Image from "next/image";
import { Mail, MailOpen, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaFacebookF, FaGoogle, FaBehance, FaLinkedinIn } from "react-icons/fa";


const icons = ["/footer_icons/1.svg", "/footer_icons/2.svg", "/footer_icons/3.svg", "/footer_icons/4.svg", "/footer_icons/5.svg",]

const socialLinks = [
  { icon: <FaFacebookF />, href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK },
  { icon: <FaInstagram />, href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM },
  { icon: <FaGoogle />, href: process.env.NEXT_PUBLIC_SOCIAL_GOOGLE },
  { icon: <FaBehance />, href: process.env.NEXT_PUBLIC_SOCIAL_BEHANCE },
  { icon: <FaLinkedinIn />, href: "#" }
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
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-20 pt-16 pb-12">

        {/* Top Row: Logo & Icons */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center mb-16 gap-10">
          {/* Logo */}
          <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
            <Link href="/" className="flex items-center">
              <img src="/nav_logo.png" alt="Bindzo 8 Logo" className="h-[50px] md:h-[60px] object-contain" />
            </Link>
            <p className="text-[#f45c75] font-semibold text-[14px] md:text-[15px]">Bindzo 8 Pvt. Ltd.</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
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

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <h4 className="font-bold text-gray-900 text-[15px] mb-6 uppercase tracking-wider">Get Newsletter</h4>
            <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">
              Stay updated with our latest<br className="hidden lg:block" /> news and offers.
            </p>
            <div className="relative mx-auto sm:mx-0 max-w-[280px]">
              <MailOpen className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#d6335a] z-10" />
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full bg-[#f3f1ed] rounded-full py-3.5 pl-11 pr-4 text-[13px] placeholder:text-gray-400 font-medium border-none outline-none focus:ring-2 focus:ring-[#d6335a]/20 shadow-inner"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5 text-center sm:text-left">
            <h4 className="font-bold text-gray-900 text-[15px] mb-6 uppercase tracking-wider">Contact Us</h4>
            <div className="flex items-center sm:items-start justify-center sm:justify-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-[#d6335a] shrink-0" />
              <p className="text-[14px] text-gray-700 font-medium leading-relaxed">{process.env.NEXT_PUBLIC_LOCATION}</p>
            </div>
            <div className="flex items-center sm:items-start justify-center sm:justify-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-[#d6335a] shrink-0" />
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                className="text-[14px] text-gray-700 font-medium"
              >
                {process.env.NEXT_PUBLIC_PHONE_LABEL}
              </a>
            </div>
            <div className="flex items-center sm:items-start justify-center sm:justify-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-[#d6335a] shrink-0" />
              <div className="text-[14px] text-gray-700 font-medium space-y-1 break-all flex justify-center items-start flex-col">
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_1}`}>
                  {process.env.NEXT_PUBLIC_EMAIL_1}
                </a>

                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_2}`}>
                  {process.env.NEXT_PUBLIC_EMAIL_2}
                </a>

                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_3}`}>
                  {process.env.NEXT_PUBLIC_EMAIL_3}
                </a>
              </div>
            </div>
            <div className="pt-2">
              <button className="text-[13px] font-bold text-white bg-[#d6335a] rounded-full px-8 py-3 hover:bg-[#b52a4b] hover:shadow-lg transition-all active:scale-95 shadow-md">
                Get a Quote
              </button>
            </div>
          </div>

          {/* Social Icons - Integrated into grid */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center lg:items-end gap-6 text-center lg:text-right pt-8 lg:pt-0">
            <h4 className="font-bold text-gray-900 text-[15px] uppercase tracking-wider">Follow Us</h4>
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 max-w-[200px] lg:max-w-none">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700 font-bold text-sm hover:bg-[#d6335a] hover:text-white hover:shadow-md transition-all active:scale-90"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full py-6 text-center bg-[#d6335a]">
        <div className="max-w-[1500px] mx-auto px-6">
          <p className="text-white text-[12px] md:text-[13px] font-semibold tracking-wide opacity-90">
            Copyright © {new Date().getFullYear()}, Bindzo 8 Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

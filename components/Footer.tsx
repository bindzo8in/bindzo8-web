import Link from "next/link";
import { Marquee } from "./ui/marquee";
import Image from "next/image";
import { Mail, MailOpen, MapPin, Phone } from "lucide-react";


const icons = ["/footer_icons/1.svg", "/footer_icons/2.svg", "/footer_icons/3.svg", "/footer_icons/4.svg", "/footer_icons/5.svg",]

export default function Footer() {
  return (
    <footer className="w-full bg-[#fdf9f9] relative font-kumbh overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-8 md:px-12 lg:px-24 pt-16 pb-12 relative">
        
        {/* Top Row: Logo & Icons */}
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center mb-16">
          {/* Logo */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Bindzo 8 Logo" className="h-[60px] object-contain object-left" />
            </Link>
            <p className="text-[#f45c75] font-medium text-[15px]">Bindzo 8 Techno Solutions</p>
          </div>

          {/* Decorative 3D Icons (Placeholders) */}
          {/* <div className="flex items-center justify-center gap-6 mt-8 md:mt-0"> */}
            {/* {['💡', '💳', '📋', '💬', '📝', '🎯'].map((emoji, i) => (
              <div key={i} className="w-10 h-10 flex items-center justify-center text-3xl hover:scale-110 transition-transform cursor-pointer drop-shadow-md">
                {emoji}
              </div>
            ))} */}
            <div className="relative flex w-full max-w-md flex-col items-center justify-center overflow-hidden mx-auto">
            <Marquee pauseOnHover className="[--duration:20s]">
              {icons.map(icon =>
                <Image key={icon} className="w-10 h-10" width={40} height={40} alt="icon" src={icon} />
              )}
            </Marquee>
          </div>
        </div>

        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pr-32">
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-[15px] mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Products', 'Career', 'Contact'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-[14px] text-[#222222] font-medium hover:text-[#d6335a] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Features */}
          <div>
            <h4 className="font-bold text-gray-900 text-[15px] mb-6">Our Features</h4>
            <ul className="space-y-4">
              {['Why Choose Us', 'Who We Work', 'What We do', 'Our Achievements', 'Terms Of Services', 'Privacy Policy'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-[14px] text-[#222222] font-medium hover:text-[#d6335a] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 text-[15px] mb-6">Get Newsletter</h4>
            <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
              Never miss a deal or update.<br/>Stay connected with us!
            </p>
            <div className="relative mt-2 max-w-[240px]">
              {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-sm z-10">✉️</span> */}
              <MailOpen className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-sm z-10"/>
              <input 
                type="email" 
                placeholder="example@gmail.com" 
                className="w-full bg-[#e6e4df] rounded-full py-3 pl-10 pr-4 text-[13px] placeholder:text-[#a09d98] font-medium border-none outline-none focus:ring-2 focus:ring-[#d6335a]/30 shadow-inner"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-gray-800"/>
              {/* <span className="text-gray-800 mt-0.5">📍</span> */}
              <p className="text-[14px] text-[#222222] font-medium">Coimbatore</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-gray-800"/>
              {/* <span className="text-gray-800 mt-0.5">📱</span> */}
              <p className="text-[14px] text-[#222222] font-medium">+91 98843 44503</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-gray-800" />
              {/* <span className="text-gray-800 mt-0.5">✉️</span> */}
              <div className="text-[14px] text-[#222222] font-medium space-y-1">
                <p>bindzo8in@gmail.com</p>
                <p>info@bindzo8.com</p>
                <p>contact@bindzo8.com</p>
              </div>
            </div>
            <button className="text-[12px] font-semibold text-gray-800 border border-gray-300 rounded-full px-6 py-2 mt-4 hover:bg-white hover:shadow-sm transition-all bg-[#ffffff] shadow-sm">
              Get a Quote
            </button>
          </div>
        </div>

        {/* Social Icons Column (Fixed visually to the right side of the container) */}
        <div className="absolute right-8 md:right-16 lg:right-24 top-16 flex flex-col items-center gap-5">
          <h4 className="font-semibold text-[#222222] text-[15px] mb-2">Follow Us</h4>
          {['f', '𝕏', 'G', 'in', 'P', '📸'].map((icon, i) => (
            <a
              key={i}
              href="#"
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#222222] font-bold text-lg hover:scale-110 hover:text-[#d6335a] transition-all"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full py-4 text-center bg-[#d6335a]">
        <p className="text-white text-[13px] font-medium tracking-wide">
          Copyright © 2025, Bindzo 8 IT Solutions All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

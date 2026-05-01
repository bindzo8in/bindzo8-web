import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#fdf4f6] font-sans relative z-10 font-kumbh">
      <div className="px-6 md:px-10 py-10">

        {/* Top row: Brand + Icons + Follow Us label */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <div className="min-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-md bg-[#1f2937] flex items-center justify-center text-white text-[13px] font-extrabold">
                B
              </div>
              <span className="text-[18px] font-extrabold text-[#1f2937] tracking-[0.04em]">BINDZO 8</span>
            </div>
            <p className="text-[10px] text-[#9ca3af] mb-1 tracking-[0.08em] uppercase">TECHNO SOLUTIONS</p>
            <p className="text-[12px] text-[#e05a8a] m-0 font-medium">Bindzo 8 Techno Solutions</p>
          </div>

          <div className="flex flex-1 flex-wrap gap-4 md:gap-5 items-center md:justify-center pt-1">
            {['💡', '📋', '✅', '💬', '📱', '🎯'].map((icon, i) => (
              <span key={i} className="text-[28px] hover:scale-110 transition-transform cursor-pointer">{icon}</span>
            ))}
          </div>

          <div className="w-auto md:w-[80px] text-left md:text-center mt-2 md:mt-0">
            <p className="text-[13px] font-bold text-[#1f2937] m-0">Follow Us</p>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-center gap-10 lg:gap-8 xl:gap-12">

          {/* Quick Links */}
          <div className="lg:w-[140px]">
            <p className="text-[14px] font-bold text-[#1f2937] mb-4">Quick Links</p>
            {['Home', 'About', 'Services', 'Products', 'Career', 'Contact'].map(link => (
              <p key={link} className="text-[13px] text-[#6b7280] my-2 cursor-pointer hover:text-[#e05a8a] transition-colors">{link}</p>
            ))}
          </div>

          {/* Our Features */}
          <div className="lg:w-[160px]">
            <p className="text-[14px] font-bold text-[#1f2937] mb-4">Our Features</p>
            {['Why Choose Us', 'Who We Work', 'What We do', 'Our Achievements', 'Terms Of Services', 'Privacy Policy'].map(link => (
              <p key={link} className="text-[13px] text-[#6b7280] my-2 cursor-pointer hover:text-[#e05a8a] transition-colors">{link}</p>
            ))}
          </div>

          {/* Get Newsletter */}
          <div className="lg:w-[220px]">
            <p className="text-[14px] font-bold text-[#1f2937] mb-2">Get Newsletter</p>
            <p className="text-[12px] text-[#9ca3af] mb-4 leading-relaxed">
              Never miss a deal or update.<br />Stay connected with us!
            </p>
            <div className="flex items-center gap-2 border border-[#e5d5dc] rounded-lg px-3 py-2 bg-white focus-within:border-[#e05a8a] transition-colors">
              <span className="text-[14px]">✉️</span>
              <input
                placeholder="example@gmail.com"
                className="border-none outline-none text-[12px] text-[#4b5563] bg-transparent w-full"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:pl-6 lg:border-l lg:border-[#f3e1e6]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[14px]">📍</span>
              <span className="text-[13px] text-[#374151]">Coimbatore</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[14px]">📞</span>
              <span className="text-[13px] text-[#374151]">+91 98843 44503</span>
            </div>
            <div className="flex items-start gap-2 mb-4">
              <span className="text-[14px] mt-0.5">✉️</span>
              <div>
                <p className="text-[12px] text-[#6b7280] m-0 hover:text-[#e05a8a] cursor-pointer transition-colors">bindzo8in@gmail.com</p>
                <p className="text-[12px] text-[#6b7280] my-1 hover:text-[#e05a8a] cursor-pointer transition-colors">info@bindzo8.com</p>
                <p className="text-[12px] text-[#6b7280] m-0 hover:text-[#e05a8a] cursor-pointer transition-colors">contact@bindzo8.com</p>
              </div>
            </div>
            <button className="px-5 py-2 bg-transparent text-[#374151] text-[12px] font-semibold border border-[#d1d5db] rounded-md cursor-pointer hover:bg-[#e05a8a] hover:text-white hover:border-[#e05a8a] transition-all duration-300">
              Get a Quote
            </button>
          </div>

          {/* Social icons — aligned under "Follow Us" label */}
          <div className="flex flex-row sm:flex-col lg:flex-col gap-3 lg:items-center lg:w-[80px]">
            {[
              { icon: 'f', color: '#1877f2', hover: 'hover:bg-[#1877f2]' },
              { icon: 'X', color: '#1f2937', hover: 'hover:bg-[#1f2937]' },
              { icon: 'G', color: '#ea4335', hover: 'hover:bg-[#ea4335]' },
              { icon: 'in', color: '#0a66c2', hover: 'hover:bg-[#0a66c2]' },
              { icon: 'P', color: '#e60023', hover: 'hover:bg-[#e60023]' },
              { icon: '◎', color: '#c13584', hover: 'hover:bg-[#c13584]' },
            ].map(({ icon, color, hover }) => (
              <div key={icon} 
                className={`w-9 h-9 rounded-full border-[1.5px] border-[#e5d5dc] bg-white flex items-center justify-center text-[14px] font-bold cursor-pointer transition-all duration-300 ${hover} hover:text-white`}
                style={{ color }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = color}
              >
                {icon}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#e05a8a] text-center p-3 text-[12px] text-white tracking-[0.01em]">
        Copyright © 2025. Bindzo 8 IT Solutions All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
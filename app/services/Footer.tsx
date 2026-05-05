import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pl-0 lg:pl-[425px] bg-[#e6e4df] w-full relative">
      <div className="pt-16 pb-12 pr-28 pl-12 max-w-[1400px] mx-auto">
        {/* Top Row: Logo, Icons, Socials */}
        <div className="flex justify-between items-start mb-16 relative">
          {/* Logo */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Bindzo 8 Logo" className="h-[55px] object-contain object-left" />
            </Link>
            <p className="text-[#e3001b] font-medium text-[15px]">Bindzo 8 Techno Solutions</p>
          </div>

          {/* Decorative Icons (Placeholders for the 3D icons) */}
          <div className="flex items-center gap-6 mt-4">
            <div className="w-10 h-12 bg-white/50 rounded flex items-center justify-center text-xl shadow-sm border border-white">📋</div>
            <div className="w-12 h-10 bg-white/50 rounded-lg flex items-center justify-center text-xl shadow-sm border border-white">💬</div>
            <div className="w-10 h-12 bg-white/50 rounded flex items-center justify-center text-xl shadow-sm border border-white">📝</div>
            <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center text-xl shadow-sm border border-white">🎯</div>
            <div className="w-10 h-12 bg-white/50 rounded flex items-center justify-center text-xl shadow-sm border border-white">💡</div>
            <div className="w-14 h-10 bg-white/50 rounded flex items-center justify-center text-xl shadow-sm border border-white">💳</div>
            <div className="w-10 h-12 bg-white/50 rounded flex items-center justify-center text-xl shadow-sm border border-white">📋</div>
          </div>
          
          {/* Social Icons Column (Fixed visually to the right side) */}
          <div className="absolute right-0 top-0 flex flex-col items-center gap-4">
            <h4 className="font-semibold text-gray-800 text-[15px] mb-2">Follow Us</h4>
            {['f', '𝕏', 'G', 'in', 'P', '📸'].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-[#e8e5df] border border-gray-300 shadow-sm flex items-center justify-center text-gray-800 font-bold hover:bg-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pr-20">
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-[14px] mb-5">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Products', 'Career', 'Contact'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-[13px] text-gray-800 hover:text-[#e3001b] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Features */}
          <div>
            <h4 className="font-bold text-gray-900 text-[14px] mb-5">Our Features</h4>
            <ul className="space-y-4">
              {['Why Choose Us', 'Who We Work', 'What We do', 'Our Achievements', 'Terms Of Services', 'Privacy Policy'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-[13px] text-gray-800 hover:text-[#e3001b] transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 text-[14px] mb-5">Get Newsletter</h4>
            <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">
              Never miss a deal or update.<br/>Stay connected with us!
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="example@gmail.com" 
                className="w-full bg-[#d5d2cc] rounded-full py-2.5 px-4 text-[12px] placeholder:text-gray-500 border-none outline-none focus:ring-2 focus:ring-[#e3001b]/20"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-sm">✉️</span>
              <input type="email" placeholder="   example@gmail.com" className="w-full bg-[#d5d2cc] rounded-full py-2.5 pl-10 pr-4 text-[12px] placeholder:text-gray-500 border-none outline-none focus:ring-2 focus:ring-[#e3001b]/20 absolute inset-0 opacity-100" />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="text-gray-800 mt-1">📍</span>
              <p className="text-[13px] text-gray-800 font-medium">Coimbatore</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-800 mt-1">📱</span>
              <p className="text-[13px] text-gray-800 font-medium">+91 98843 44503</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-800 mt-1">✉️</span>
              <div className="text-[13px] text-gray-800 font-medium space-y-1">
                <p>bindzo8in@gmail.com</p>
                <p>{process.env.ADMIN_EMAIL}</p>
                <p>contact@bindzo8.com</p>
              </div>
            </div>
            <button className="text-[11px] font-medium border border-gray-300 rounded-full px-5 py-1.5 mt-2 hover:bg-white transition-colors bg-[#e6e4df]">
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="w-full py-4 text-center"
        style={{
          background: "linear-gradient(90deg, #b02741 0%, #9c336b 100%)",
        }}
      >
        <p className="text-white/80 text-[12px]">
          Copyright © 2025, Bindzo 8 IT Solutions All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
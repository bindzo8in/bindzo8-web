"use client";

import Image from "next/image";
import Whatsapp from "@/public/whatsapp.png";

type FloatingWhatsAppProps = {
  phoneNumber: string; // with country code, no + symbol
  message?: string;
};

export default function FloatingWhatsApp({
  phoneNumber,
  message = "Hi, I would like to know more about your services.",
}: FloatingWhatsAppProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed
        bottom-20 lg:bottom-5 left-5
        z-[9999]
        group
      "
    >
      <div className="relative flex items-center justify-center h-28 w-28 sm:h-32 sm:w-32">
        {/* Spinning Circular Text */}
        <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path
              id="whatsapp-text-path"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="transparent"
            />
            <text className="text-[10.5px] font-[var(--font-space-grotesk)] uppercase tracking-[0.18em] font-bold fill-[#f2efe9] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
              <textPath href="#whatsapp-text-path" startOffset="0%" textAnchor="middle">
                •
              </textPath>
              <textPath href="#whatsapp-text-path" startOffset="25%" textAnchor="middle">
                CHAT WITH US
              </textPath>
              <textPath href="#whatsapp-text-path" startOffset="50%" textAnchor="middle">
                •
              </textPath>
              <textPath href="#whatsapp-text-path" startOffset="75%" textAnchor="middle">
                SAY HELLO
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center Icon */}
        <div
          className="
            relative
            z-10
            h-14
            w-14
            rounded-full
            bg-transparent
            flex
            items-center
            justify-center
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          {/* A glowing effect on hover */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
          <Image src={Whatsapp} alt="WhatsApp" className="relative z-10 h-14 w-14" />
        </div>
      </div>
    </a>
  );
}
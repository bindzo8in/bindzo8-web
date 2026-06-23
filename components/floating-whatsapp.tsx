"use client";

import Image from "next/image";
// import { MessageCircle } from "lucide-react";
import Whatsapp from "@/public/whatsapp.png"

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
    // 919884344503
    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="
        fixed
        bottom-20 lg:bottom-5 right-5
        z-999999
        flex items-center justify-center
        bg-transparent
        w-14 h-14 sm:h-16 sm:w-16
      "
        >
            <Image src={Whatsapp} alt="WhatsApp" className="h-10 w-10" />
        </a>
    );
}
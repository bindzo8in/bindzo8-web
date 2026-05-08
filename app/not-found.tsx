import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center bg-white font-kumbh  pt-20 md:pt-24">
      <div className="relative mb-8 h-16 w-40">
        <Image
          src="/nav_logo.png"
          alt="Bindzo 8"
          fill
          className="object-contain opacity-20 grayscale"
        />
      </div>
      
      <h1 className="text-9xl font-black text-[#d6335a]/10 absolute select-none pointer-events-none">
        404
      </h1>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Lost in Space?
        </h2>
        <p className="text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been moved, deleted, or never existed in the first place.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#d6335a] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#b52a4b] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
        >
          Return to Home
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl w-full text-left">
        <div className="p-4 border-l-2 border-[#d6335a]/20">
          <h4 className="font-bold text-sm text-gray-900 mb-1 uppercase tracking-wider">Quick Links</h4>
          <Link href="/services" className="text-xs text-gray-500 hover:text-[#d6335a]">View Our Services</Link>
        </div>
        <div className="p-4 border-l-2 border-[#d6335a]/20">
          <h4 className="font-bold text-sm text-gray-900 mb-1 uppercase tracking-wider">Need Help?</h4>
          <Link href="/contact" className="text-xs text-gray-500 hover:text-[#d6335a]">Contact Support</Link>
        </div>
        <div className="p-4 border-l-2 border-[#d6335a]/20">
          <h4 className="font-bold text-sm text-gray-900 mb-1 uppercase tracking-wider">About Us</h4>
          <Link href="/about" className="text-xs text-gray-500 hover:text-[#d6335a]">Learn More</Link>
        </div>
      </div>
    </div>
  );
}

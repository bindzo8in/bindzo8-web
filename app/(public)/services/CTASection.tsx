import Link from "next/link";


export default function CTASection() {
  return (
    <section className="w-full overflow-hidden">
      <div
        className="flex w-full flex-col items-center justify-center px-5 py-12 text-center sm:px-8 sm:py-16 md:py-20 lg:py-24"
        style={{
          background:
            "linear-gradient(90deg, #c42b47 0%, #d85c3e 50%, #c42b47 100%)",
        }}
      >
        <h2 className="max-w-[1000px] text-[clamp(1.8rem,5vw,3.5rem)] font-semibold leading-[1.15] tracking-wide text-white">
          Growth shapes you. Evolution defines you.
        </h2>

        <p className="mt-4 max-w-[720px] font-raleway text-[clamp(1rem,3.5vw,1.8rem)] font-medium leading-[1.4] tracking-wide text-white/95 sm:mt-5">
          Start rewriting your story.
        </p>

        <Link href="/contact">
          <button className="mt-8 rounded-full bg-[#e8e5df] px-8 py-3 text-[14px] font-bold text-[#c0272d] shadow-md transition-colors hover:bg-white sm:mt-10 sm:px-10 sm:text-[16px]"
          >
            Contact Us
          </button>
        </Link>
      </div>
    </section>
  );
}
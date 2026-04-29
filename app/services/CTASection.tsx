export default function CTASection() {
  return (
    <section className="w-full">
      <div 
        className="w-full py-20 flex flex-col items-center justify-center text-center"
        style={{
          background: "linear-gradient(90deg, #c42b47 0%, #d85c3e 50%, #d9813b 100%)",
        }}
      >
        <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-white mb-4 tracking-wide">
          Growth shapes you. Evolution defines you.
        </h2>
        <p className="text-[clamp(1.2rem,2vw,1.8rem)] text-white/95 mb-10 tracking-wide font-raleway">
          Start rewriting your story.
        </p>
        <button className="bg-[#e8e5df] text-[#c0272d] text-[16px] font-bold px-10 py-3 rounded-full hover:bg-white transition-colors shadow-md">
          Contact Us
        </button>
      </div>
    </section>
  );
}
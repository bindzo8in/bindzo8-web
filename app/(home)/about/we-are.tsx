import React from 'react'

function WeAre() {
  return (
    <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-[#0b0b0c] text-[#f2efe9] overflow-hidden font-inter py-16 md:py-24 border-y border-[rgba(242,239,233,0.05)]">
      
      {/* Decorative background elements for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[600px] h-[300px] rounded-[100%] bg-gradient-to-r from-[#E7325C] to-[#EF8030] blur-[120px] opacity-40" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 md:px-12">
        <p className="text-lg md:text-2xl mb-4 font-[var(--font-space-grotesk)] tracking-[0.14em] text-[#EF8030] uppercase">
          We are
        </p>

        <h2 className="text-3xl md:text-6xl lg:text-7xl font-[var(--font-fraunces)] font-bold mb-6 tracking-tight leading-tight">
          Bindzo 8 <span className='hidden sm:inline'>Private Limited</span><span className='sm:hidden inline'>Pvt. Ltd.</span>
        </h2>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-8 md:w-12 bg-white/20" />
          <p className="text-base md:text-xl font-[var(--font-space-grotesk)] font-medium tracking-wider text-[#8b8985]">
            Tech · Design · Digital Marketing
          </p>
          <div className="h-[1px] w-8 md:w-12 bg-white/20" />
        </div>

        <p className="text-sm md:text-lg leading-relaxed text-[#8b8985] max-w-2xl mx-auto font-[var(--font-space-grotesk)] font-light">
          Our goal is to build visually stunning, high-performing websites backed by
          effective SEO and marketing strategies. By collaborating closely with our
          clients, we create digital experiences that truly deliver results.
        </p>
      </div>

    </section>
  )
}

export default WeAre
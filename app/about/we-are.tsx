import React from 'react'

function WeAre() {
  return (
    <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-gradient-to-r from-[#E7325C] to-[#EF8030] text-white overflow-hidden font-kumbh py-16 md:py-24">
      
      {/* Decorative background elements for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-white blur-3xl" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 md:px-12">
        <p className="text-lg md:text-2xl mb-4 font-light tracking-wide opacity-90 uppercase">
          We are
        </p>

        <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Bindzo 8 <span className='hidden sm:inline'>Private Limited</span><span className='sm:hidden inline'>Pvt. Ltd.</span>
        </h2>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-8 md:w-12 bg-white/50" />
          <p className="text-base md:text-2xl font-medium tracking-wider">
            Tech · Design · Digital Marketing
          </p>
          <div className="h-[1px] w-8 md:w-12 bg-white/50" />
        </div>

        <p className="text-sm md:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto font-light">
          Our goal is to build visually stunning, high-performing websites backed by
          effective SEO and marketing strategies. By collaborating closely with our
          clients, we create digital experiences that truly deliver results.
        </p>
      </div>

    </section>
  )
}

export default WeAre
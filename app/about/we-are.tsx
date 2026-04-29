import React from 'react'

function WeAre() {
  return (
    <section className="container relative w-full min-h-[485px] flex items-center justify-center bg-gradient-to-r from-[#E7325C] to-[#EF8030] text-white overflow-hidden font-kumbh">

  {/* Center Content */}
  <div className="text-center max-w-4xl px-6">
    <p className="text-xl mb-4">We are</p>

    <h1 className="text-4xl md:text-6xl font-bold mb-4">
      Bindzo 8 Techno Solutions
    </h1>

    <p className="text-lg md:text-xl mb-6">
      Tech · Design · Digital Marketing
    </p>

    <p className="text-sm md:text-base leading-relaxed opacity-90">
      Our goal is to build visually stunning, high-performing websites backed by
      effective SEO and marketing strategies. By collaborating closely with our
      clients, we create digital experiences that truly deliver results.
    </p>
  </div>

  {/* Right Vertical Text */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 origin-right text-sm tracking-widest">
    Get Quote
  </div>

</section>
  )
}

export default WeAre
import HorizontalSlide from '@/components/horizontal-scroll/HorizontalSlide'
import Image from 'next/image';
import React from 'react'

const services = [
  {
    title: "SMM (Social Media Marketing)",
    image: "/products/1.jpeg",
    text: (
      <>
        World is connected through Social Media. We create a brand identity
        of your business in all social media and reach{" "}
        <b>Potential Customers based on your preference to Increase Your Revenue.</b>
      </>
    ),
  },
  {
    title: "SEO (Search Engine Optimization)",
    image: "/products/1.jpeg",
    text: (
      <>
        To make your website top in google search engine result page organically
        which leads to come more <b>Business Conversion, High Visibility &amp; Higher Traffic.</b>
      </>
    ),
  },
  {
    title: "PPC (Pay Per Click)",
    image: "/products/1.jpeg",
    text: (
      <>
        Ads which focused on targeted peoples boost traffic, increased sales,
        <b> Brand Recognition of your business with a cost-effective method</b>
        <br />
        <b>(Only pay for the clicks)</b>
      </>
    ),
  },
]

function ServiceContent() {
  return (
    <HorizontalSlide className='flex items-center justify-center py-16 lg:py-[95px] bg-black'>
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-y-8 gap-x-20 px-6 md:grid-cols-2 lg:px-5">
        {/* left top image */}
        <ImageCard src={services[0].image} alt={services[0].title} />

        {/* right top text */}
        <TextCard title={services[1].title} text={services[1].text} />

        {/* left middle text */}
        <TextCard title={services[0].title} text={services[0].text} />

        {/* right middle image */}
        <ImageCard src={services[1].image} alt={services[1].title} />

        {/* left bottom image */}
        <ImageCard src={services[2].image} alt={services[2].title} />

        {/* right bottom text */}
        <TextCard title={services[2].title} text={services[2].text} />
      </div>
    </HorizontalSlide>
  )
}

export default ServiceContent

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[180px] w-full overflow-hidden rounded-2xl md:h-[200px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover grayscale"
      />
    </div>
  )
}

function TextCard({
  title,
  text,
}: {
  title: string
  text: React.ReactNode
}) {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="mb-3 text-xl lg:text-2xl font-bold text-orange-500">
        {title}
      </h3>
      <p className="max-w-xl text-[15px] leading-snug text-white">
        {text}
      </p>
    </div>
  )
}
import HorizontalSlide from '@/components/horizontal-scroll/HorizontalSlide'
import Image from 'next/image';
import React, { Fragment } from 'react'

const services = [
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

function ServiceContent({ services }: { services: { title: string, image: string, text: React.ReactNode }[] }) {
  return (
    <HorizontalSlide className='flex items-center justify-center py-16 lg:py-[95px] bg-transparent!'>
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-y-8 gap-x-20 px-6 md:grid-cols-2 lg:px-5">
        {services.map((service, index) => (
          <Fragment key={index}>
            {index % 2 == 0 ? (
              <>
                <ImageCard src={service.image} alt={service.title} />

                <TextCard title={service.title} text={service.text} />
              </>
            ) : (
              <>
                <TextCard title={service.title} text={service.text} />
                <ImageCard src={service.image} alt={service.title} />
              </>
            )}

          </Fragment>
        ))}
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
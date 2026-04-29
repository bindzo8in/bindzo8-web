"use client"
import React, { useState } from 'react'

const clients = [
  { name: 'GENESIS', sub: 'HEALTH AT HOME', logo: '/clients/genesis.png' },
  { name: 'Vrindhavana', sub: 'PROPERTIES', logo: '/clients/vrindhavana.png' },
  { name: 'SUPER SAFE', sub: 'An ISO Certified Company', logo: '/clients/supersafe.png' },
  { name: 'SUN-MAX', sub: '', logo: '/clients/sunmax.png' },
  { name: 'NoviTech', sub: 'The innovation partner', logo: '/clients/novitech.png' },
  { name: 'Get Direction', sub: 'GLOBAL', logo: '/clients/getdirection.png' },
  { name: 'VARI', sub: 'NEET-JEE | Foundations', logo: '/clients/vari.png' },
  { name: 'GOD VIBES', sub: '', logo: '/clients/godvibes.png' },
  { name: 'Pantech', sub: 'ProEd', logo: '/clients/pantech.png' },
  { name: 'Impruven', sub: '', logo: '/clients/impruven.png' },
]

const ClientCard = ({ client }: { client: any }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-full flex items-center justify-center">
      {!imgError ? (
        <img 
          src={client.logo} 
          alt={client.name} 
          className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-sm hover:drop-shadow-md cursor-pointer"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="bg-white rounded-md h-[105px] flex flex-col items-center justify-center p-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_-4px_rgba(200,36,51,0.12)] transition-shadow duration-300 w-full cursor-pointer">
          <span className="font-extrabold text-[#222222] text-[15px] leading-tight text-center">{client.name}</span>
          {client.sub && <span className="text-[9px] text-[#666666] font-bold tracking-widest mt-1 uppercase text-center">{client.sub}</span>}
        </div>
      )}
    </div>
  )
}

const HappyClients = () => {
  return (
    <section className="bg-gradient-to-b from-[#fdfbfb] to-[#f9f7f7] py-24 px-6 md:px-12 font-kumbh relative z-10 text-center">
      
      {/* Headings */}
      <h2 className="text-[#c82433] text-[16px] font-medium tracking-[0.1em] uppercase mb-3">
        OUR HAPPY CLIENTS
      </h2>
      <p className="text-[14px] font-bold text-[#111111] mb-14 tracking-wide">
        Supported by Leading Sponsors
      </p>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 xl:gap-8">
        {clients.map((client, idx) => (
          <ClientCard key={idx} client={client} />
        ))}
      </div>

    </section>
  )
}

export default HappyClients
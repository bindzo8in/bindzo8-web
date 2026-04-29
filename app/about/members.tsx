import React from "react";
import Image from "next/image";
import WaveBackground from "./background";

function Member() {
  const members = [
    { name: "Manikandan R", role: "Graphic Designer", image: "/binzo8_members/mani_bro.png" },
    { name: "Ranjani Rajkumar", role: "UI/UX Designer", image: "/binzo8_members/ranjani_mam.png" },
    { name: "Ranjani Rajkumar", role: "Developer", image: "/binzo8_members/m3.png" },
    { name: "Manikandan R", role: "Business Developer", image: "/binzo8_members/m4.png" },
    { name: "Ranjani Rajkumar", role: "Sales", image: "/binzo8_members/m5.png" },
    { name: "Ranjani Rajkumar", role: "Digital Marketing", image: "/binzo8_members/m6.png" },
  ];

  return (
    <section className="relative font-kumbh py-16 overflow-hidden min-h-screen bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WaveBackground />
      </div>

      {/* All content above background */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl mb-8 text-[#EF8030]">
            The Bindzo 8 Family
          </h3>

          <p className="text-xl text-white">
            Bindzo 8 is fortunate to be guided by some of the most skilled minds
            in the creative and technology space, supported by a team with decades
            of combined industry experience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto pt-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-10 justify-items-center">
            {members.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Member;

type MemberCardProps = {
  name: string;
  role: string;
  image: string;
};

export function MemberCard({ name, role, image }: MemberCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-[220px] h-[220px] mb-4">
        <Image
          src={image}
          alt={name}
          fill
          sizes="220px"
          className="object-contain"
        />
      </div>

      <h4 className="text-white text-lg tracking-wide">{name}</h4>
      <p className="text-gray-400 text-sm">{role}</p>
    </div>
  );
}
"use client";

import Image from "next/image";
import { use, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const slots = [
  {
    className: "left-[5%] top-[10%] w-[220px] lg:w-[300px] xl:w-[340px]",
    rotate: -5,
    dir: { x: -180, y: -120 },
    float: { x: -45, y: -35, rotate: -8 },
  },
  {
    className: "right-[6%] top-[9%] w-[220px] lg:w-[300px] xl:w-[340px]",
    rotate: 5,
    dir: { x: 180, y: -120 },
    float: { x: 55, y: -20, rotate: 8 },
  },
  {
    className: "bottom-[7%] right-[24%] w-[230px] lg:w-[310px] xl:w-[350px]",
    rotate: -3,
    dir: { x: -180, y: 140 },
    float: { x: -30, y: 35, rotate: 6 },
  },
  {
    className: "bottom-[7%] left-[27%] w-[230px] lg:w-[310px] xl:w-[350px]",
    rotate: 3,
    dir: { x: 180, y: 140 },
    float: { x: 35, y: 45, rotate: -6 },
  },
];

const team = [
  { name: "BALAJI", role: "CEO & Founder", image: "/img/team/1.webp" },
  { name: "SARAVANAN", role: "", image: "/img/team/8.webp" },
  { name: "MANIKANDAN", role: "Graphics Designer", image: "/img/team/2.png" },
  {
    name: "JEYAPANDI",
    role: "Full stack Developer",
    image: "/img/team/5.webp",
  },
  { name: "RANJANI", role: "UI/UX Developer", image: "/img/team/3.png" },
  {
    name: "GOKULAVANI",
    role: "Business Development Executive",
    image: "/img/team/4.webp",
  },
  { name: "NANDHINI", role: "Graphics Designer", image: "/img/team/6.webp" },
  { name: "Dhanesh", role: "Campaign Manager", image: "/img/team/7.webp" },
];

const BATCH_SIZE = 4;

export default function TeamSection({
  teams,
}: {
  teams: {
    position: string;
    id: string;
    name: string;
    mediaUrl: string;
  }[];
}) {
  const teamData = teams;
  const sectionRef = useRef<HTMLElement>(null);
  const batches = Array.from(
    { length: Math.ceil(teamData.length / BATCH_SIZE) },
    (_, i) => teamData.slice(i * BATCH_SIZE, i * BATCH_SIZE + BATCH_SIZE),
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const eyebrow = section.querySelector<HTMLElement>(".team-eyebrow");
        const heading = section.querySelector<HTMLElement>(".team-heading");
        const button = section.querySelector<HTMLElement>(".team-button");

        if (!eyebrow || !heading || !button) return;

        gsap.set(eyebrow, { opacity: 0, y: 20 });
        gsap.set(heading, { opacity: 0.15, scale: 0.92 });
        gsap.set(button, { opacity: 0, y: 20 });

        const SCROLL_PER_BATCH = 2200;
        const INTRO_SCROLL = 1300;
        const totalScroll = INTRO_SCROLL + batches.length * SCROLL_PER_BATCH;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalScroll}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        tl.to(
          heading,
          { opacity: 1, scale: 1, duration: 1, ease: "power4.out" },
          "-=0.4",
        );
        tl.to(
          button,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        );

        gsap.set(".team-card", {
          opacity: 0,
          scale: 0.8,
          filter: "blur(12px)",
        });

        batches.forEach((batch, batchIndex) => {
          const batchCards = batch.map((_, i) =>
            section.querySelector<HTMLElement>(
              `.team-card[data-batch="${batchIndex}"][data-slot="${i}"]`,
            ),
          );

          batchCards.forEach((card, index) => {
            if (!card) return;
            const slot = slots[index];
            const image = card.querySelector<HTMLElement>(".team-image");
            const info = card.querySelector<HTMLElement>(".team-info");

            gsap.set(card, {
              x: slot.dir.x,
              y: slot.dir.y,
              rotate: slot.rotate,
            });
            gsap.set(image, { scale: 1.15 });
            gsap.set(info, { opacity: 0, y: 15 });

            tl.to(
              card,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                rotate: slot.rotate,
                duration: 1.1,
                ease: "power4.out",
              },
              index === 0 ? "+=0.1" : "-=0.45",
            );
            tl.to(image, { scale: 1, duration: 1.2, ease: "power3.out" }, "<");
            tl.to(
              info,
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              "-=0.5",
            );
          });

          batchCards.forEach((card: HTMLElement | null, index) => {
            if (!card) return;
            const f = slots[index].float;
            tl.to(
              card,
              {
                x: f.x,
                y: f.y,
                rotate: f.rotate,
                duration: 1.4,
                ease: "sine.inOut",
              },
              index === 0 ? "+=0.2" : "<",
            );
          });

          if (batchIndex < batches.length - 1) {
            batchCards.forEach((card, index) => {
              if (!card) return;
              tl.to(
                card,
                {
                  opacity: 0,
                  scale: 0.8,
                  filter: "blur(12px)",
                  duration: 0.8,
                  ease: "power2.in",
                },
                index === 0 ? "+=0.3" : "<",
              );
            });
          } else {
            tl.to({}, { duration: 1 });
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".team-mobile-card");
        const heading = section.querySelector(".team-mobile-heading");
        const eyebrow = section.querySelector(".team-mobile-eyebrow");

        if (!cards.length || !heading || !eyebrow) return;

        gsap.set([heading, eyebrow], { opacity: 0, y: 30 });

        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        intro.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 });
        intro.to(
          heading,
          { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" },
          "-=0.2",
        );

        cards.forEach((card: HTMLElement) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="home-team"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <div className="hidden min-h-screen md:block">
        <div className="relative h-screen w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[10%] right-[8%] h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />
          </div>

          <div className="absolute left-8 top-1/2 text-4xl font-light text-white/50">
            +
          </div>
          <div className="absolute bottom-10 right-10 text-4xl font-light text-white/50">
            +
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            <p className="team-eyebrow mb-5 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Our Team
            </p>
            <h2 className="team-heading pointer-events-none text-center text-[clamp(5rem,11vw,12rem)] font-medium leading-[0.82] tracking-[-0.08em] text-white">
              CREATIVE
              <br />
              MINDS
            </h2>
            <a
              href="#contact"
              className="team-button mt-10 bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-transform duration-300 hover:scale-105"
            >
              Meet Team
            </a>
          </div>

          {batches.map((batch, batchIndex) => (
            <div key={batchIndex}>
              {batch.map((member, slotIndex) => (
                <article
                  key={member.name}
                  data-batch={batchIndex}
                  data-slot={slotIndex}
                  className={`team-card absolute z-20 ${slots[slotIndex].className}`}
                >
                  <div className="relative">
                    <span className="absolute -left-2 -top-2 h-5 w-5 border-l border-t border-white/70" />
                    <span className="absolute -right-2 -top-2 h-5 w-5 border-r border-t border-white/70" />

                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 shadow-2xl">
                      <Image
                        src={member.mediaUrl}
                        alt={member.name}
                        fill
                        className="team-image object-cover"
                        sizes="340px"
                      />

                      <div className="team-info absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/90 to-transparent px-4 pb-3 pt-10 backdrop-blur-sm">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-sm font-semibold tracking-wide">
                              {member.name}
                            </p>
                            <p className="mt-1 text-xs text-white/50">
                              {member.position}
                            </p>
                          </div>
                          <span className="text-lg text-white/40">
                            {"\u2197"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}

          <div className="absolute left-6 top-1/2 z-30 -translate-y-1/2">
            <span className="-rotate-90 whitespace-nowrap text-[10px] uppercase tracking-[0.35em] text-white/30">
              People behind great products
            </span>
          </div>
        </div>
      </div>

      <div className="block px-6 py-24 md:hidden">
        <div className="mb-16">
          <p className="team-mobile-eyebrow mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Our Team
          </p>
          <h2 className="team-mobile-heading text-6xl font-medium leading-[0.9] tracking-[-0.06em]">
            Creative
            <br />
            Minds
          </h2>
        </div>

        <div className="grid gap-8">
          {team.map((member) => (
            <article key={member.name} className="team-mobile-card">
              <div className="relative overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/70 to-transparent p-5 pt-16">
                  <p className="text-lg font-semibold">{member.name}</p>
                  <p className="mt-1 text-sm text-white/60">{member.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

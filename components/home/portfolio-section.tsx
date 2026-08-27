import { projects } from "@/lib/projects";
import React from "react";
import { WorkCard } from "../work-card";

const PortfolioSection = () => {
  return (
    <section
      id="home-portfolio"
      className="w-full overflow-hidden bg-[#0B0F19] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            Our Work
          </p>
          <h2 className="text-[clamp(4rem,8vw,8rem)] font-medium leading-[0.84] tracking-[-0.065em] text-white">
            Portfolio
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/55 md:text-lg">
            Every brand, website, and campaign we&apos;ve shipped — filtered
            down to nothing but the work itself.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700"
              style={{ animationDelay: `${(index % 6) * 90}ms` }}
            >
              <WorkCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

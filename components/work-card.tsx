"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

type WorkCardProps = {
  project: Project;
  className?: string;
};

export function WorkCard({ project, className }: WorkCardProps) {
  return (
    <Link href={project.href} className={cn("work-card group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white/[0.03]">
        {project.media.type === "video" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            src={project.media.src}
            poster={project.media.poster}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={project.media.src}
            alt={project.title}
            fill
            draggable={false}
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 55vw, 78vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {project.category}
        </span>
      </div>

      {/* caption sits below the media, not on top of it */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-1 truncate text-sm text-white/45">
              {project.subtitle}
            </p>
          )}
        </div>
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-linear-to-br group-hover:from-[#E7325C] group-hover:to-[#EF8030]">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
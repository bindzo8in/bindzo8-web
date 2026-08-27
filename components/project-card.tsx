"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  /** shows a large ghost index number (01, 02...) in the top corner */
  index?: number;
  className?: string;
  aspect?: string;
  imageSizes?: string;
};

export function ProjectCard({
  project,
  index,
  className,
  aspect = "aspect-[4/5]",
  imageSizes = "(min-width: 1024px) 25vw, 50vw",
}: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      className={cn(
        "group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        className,
      )}
    >
      <div className={cn("relative h-full w-full", aspect)}>
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
            sizes={imageSizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}

        {/* readability gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

        {/* ghost index number — signature detail carried through every tile */}
        {typeof index === "number" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-4 select-none bg-linear-to-br from-white/20 to-white/0 bg-clip-text text-6xl font-black leading-none text-transparent sm:text-7xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
          <div className="min-w-0">
            <p className="mb-1 truncate text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              {project.category}
            </p>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-300",
              "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-transparent",
              "group-hover:bg-linear-to-br group-hover:from-[#E7325C] group-hover:to-[#EF8030]",
            )}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

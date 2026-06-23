"use client";

import { useProjects } from "@/lib/hooks/use-projects";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PortfolioList({ services, defaultServiceId, tags = [], excludeServiceId }: { services: { id: string, name: string }[], defaultServiceId?: string, tags?: string[], excludeServiceId?: string }) {
  const [search, setSearch] = useState("");
  const [serviceId, setServiceId] = useState<string>(defaultServiceId || "");
  const [tag, setTag] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState<boolean | undefined>(undefined);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useProjects({
    search: search || undefined,
    serviceId: serviceId || undefined,
    excludeServiceId,
    tag: tag || undefined,
    status: "PUBLISHED",
    isFeatured,
    take: 9
  });

  const projects = data?.pages.flatMap(p => p.data) || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
        <div className="flex flex-1 w-full gap-4 max-w-xl">
          <Input 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          {services.length > 1 && (
            <select 
              className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option value="">All Services</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          )}
          {tags.length > 0 && (
            <select 
              className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="">All Tags</option>
              {tags.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={isFeatured === undefined ? "default" : "outline"}
            onClick={() => setIsFeatured(undefined)}
          >
            All Work
          </Button>
          <Button 
            variant={isFeatured === true ? "default" : "outline"}
            onClick={() => setIsFeatured(true)}
          >
            Featured
          </Button>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 aspect-[4/3] rounded-xl break-inside-avoid mb-8" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <>
          <Masonry
            breakpointCols={{ default: 3, 1024: 2, 768: 1 }}
            className="flex w-auto gap-8"
            columnClassName="bg-clip-padding flex flex-col gap-8"
          >
            {projects.map((project) => (
              <Link href={`/portfolio/${project.slug}`} key={project.id} className="group flex flex-col break-inside-avoid mb-8 w-full block">
                <div className="relative rounded-xl overflow-hidden mb-4 border border-gray-200">
                  {project.featuredMediaUrl ? (
                    project.featuredMediaUrl.match(/\.(mp4|webm)$/i) ? (
                      <video src={project.featuredMediaUrl} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" muted autoPlay loop />
                    ) : (
                      <Image 
                        src={project.featuredMediaUrl} 
                        alt={project.title} 
                        width={800} 
                        height={800} 
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    )
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400">No media</div>
                  )}
                  {project.service && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-sm shadow-sm">{project.service.name}</Badge>
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-gray-500 mt-2 line-clamp-2 text-sm">{project.shortDescription}</p>
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 3).map(t => (
                      <span key={t.id} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{t.name}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </Masonry>

          {hasNextPage && (
            <div className="mt-16 flex justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="w-full max-w-sm"
              >
                {isFetchingNextPage ? "Loading..." : "Load More Work"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No projects found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSearch(""); setServiceId(""); setIsFeatured(undefined); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

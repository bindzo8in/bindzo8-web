import { prisma } from "../prisma";
import { ProjectStatus, MediaType, Prisma } from "@/app/generated/prisma/client";

export type GetProjectsParams = {
  take?: number;
  cursor?: string;
  search?: string;
  serviceId?: string;
  status?: ProjectStatus;
  isFeatured?: boolean;
  mediaType?: MediaType;
  tag?: string;
  excludeServiceId?: string;
};

export async function getProjects(params: GetProjectsParams = {}) {
  const { take = 10, cursor, search, serviceId, status, isFeatured, mediaType, tag, excludeServiceId } = params;

  const where: Prisma.ProjectWhereInput = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { clientName: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(serviceId 
      ? { serviceId } 
      : (excludeServiceId ? { serviceId: { not: excludeServiceId } } : {})),
    ...(status && { status }),
    ...(isFeatured !== undefined && { isFeatured }),
    ...(tag && { tags: { has: tag } }),
    ...(mediaType && {
      media: {
        some: { type: mediaType },
      },
    }),
  };

  const projects = await prisma.project.findMany({
    take: take + 1, // Fetch one extra to determine if there are more
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1, // Skip the cursor itself
    }),
    where,
    orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    include: {
      service: true,
      media: true,
      technologies: true,
    },
  });

  let nextCursor: string | null = null;
  if (projects.length > take) {
    const nextItem = projects.pop(); // Remove the extra item
    nextCursor = nextItem!.id;
  }

  return {
    data: projects,
    nextCursor,
    hasMore: nextCursor !== null,
  };
}

export async function getProject(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      service: true,
      media: {
        orderBy: { sortOrder: "asc" },
      },
      technologies: true,
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      service: true,
      media: {
        orderBy: { sortOrder: "asc" },
      },
      technologies: true,
    },
  });
}

export async function createProject(data: Prisma.ProjectCreateInput) {
  return prisma.project.create({
    data,
    include: {
      service: true,
      media: true,
      technologies: true,
    },
  });
}

export async function updateProject(id: string, data: Prisma.ProjectUpdateInput) {
  return prisma.project.update({
    where: { id },
    data,
    include: {
      service: true,
      media: true,
      technologies: true,
    },
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}

export async function getRelatedProjects(projectId: string, serviceId?: string | null, take: number = 3) {
  if (!serviceId) return [];
  
  return prisma.project.findMany({
    where: {
      serviceId,
      id: { not: projectId },
      status: "PUBLISHED",
    },
    take,
    orderBy: { createdAt: "desc" },
    include: {
      service: true,
      technologies: true,
    },
  });
}

export async function getServices(filter?: { nameContains?: string }) {
  return prisma.service.findMany({
    where: filter?.nameContains ? {
      name: { contains: filter.nameContains, mode: "insensitive" }
    } : undefined,
    orderBy: { name: "asc" }
  });
}

export async function getAllTags() {
  const projects = await prisma.project.findMany({
    select: { tags: true },
  });
  const allTags = new Set<string>();
  for (const project of projects) {
    if (project.tags) {
      for (const tag of project.tags) {
        allTags.add(tag);
      }
    }
  }
  return Array.from(allTags).sort();
}

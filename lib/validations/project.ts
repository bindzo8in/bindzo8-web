import { z } from "zod";

export const MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
} as const;
export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export const ProjectStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
} as const;
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const projectMediaSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(MediaType),
  url: z.string().min(1, "URL is required"),
  publicId: z.string().min(1, "Public ID is required"),
  fileName: z.string().optional().nullable(),
  alt: z.string().optional().nullable(),
  sortOrder: z.number().default(0),
});

export const projectTechnologySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Technology name is required"),
});

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().optional().nullable(),
  overview: z.string().optional().nullable(),
  challenge: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  results: z.string().optional().nullable(),
  featuredMediaUrl: z.string().optional().nullable(),
  featuredMediaPublicId: z.string().optional().nullable(),
  clientName: z.string().optional().nullable(),
  projectUrl: z.string().optional().nullable(),
  serviceId: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.PUBLISHED),
  sortOrder: z.number().default(0),
  media: z.array(projectMediaSchema).default([]),
  technologies: z.array(projectTechnologySchema).default([]),
  tags: z.array(z.string()).default([]),
});

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string().min(1, "Project ID is required"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectMediaInput = z.infer<typeof projectMediaSchema>;
export type ProjectTechnologyInput = z.infer<typeof projectTechnologySchema>;

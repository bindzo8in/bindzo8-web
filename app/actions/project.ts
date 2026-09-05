"use server";

import { revalidatePath } from "next/cache";
import { createProject, updateProject, deleteProject, getProject, updateProjectSortOrders } from "@/lib/repositories/project";
import { createProjectSchema, updateProjectSchema } from "@/lib/validations/project";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function createProjectAction(formData: unknown) {
  try {
    const validatedData = createProjectSchema.parse(formData);
    const { serviceId, media, technologies, ...data } = validatedData;

    const project = await createProject({
      ...data,
      service: serviceId ? { connect: { id: serviceId } } : undefined,
      media: {
        create: media.map(m => ({
          type: m.type,
          url: m.url,
          publicId: m.publicId,
          fileName: m.fileName,
          alt: m.alt,
          sortOrder: m.sortOrder,
        })),
      },
      technologies: {
        create: technologies.map(t => ({
          name: t.name,
        })),
      },
    });

    revalidatePath("/portfolio");

    return { success: true, data: project };
  } catch (error: any) {
    console.error("Create Project Error:", error);
    return { success: false, error: error.message || "Failed to create project" };
  }
}

export async function updateProjectAction(formData: unknown) {
  try {
    const validatedData = updateProjectSchema.parse(formData);
    const { id, serviceId, media, technologies, ...data } = validatedData;

    // Get existing project to see what media/technologies need updating
    // For simplicity, we can delete existing related records and recreate them,
    // or use a more granular update approach. Let's delete and recreate for arrays.
    
    // Using Prisma update with deleteMany and create
    const project = await updateProject(id, {
      ...data,
      service: serviceId ? { connect: { id: serviceId } } : serviceId === "" || serviceId === null ? { disconnect: true } : undefined,
      media: {
        deleteMany: {},
        create: media.map(m => ({
          type: m.type,
          url: m.url,
          publicId: m.publicId,
          fileName: m.fileName,
          alt: m.alt,
          sortOrder: m.sortOrder,
        })),
      },
      technologies: {
        deleteMany: {},
        create: technologies.map(t => ({
          name: t.name,
        })),
      },
    });

    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${project.slug}`);

    return { success: true, data: project };
  } catch (error: any) {
    console.error("Update Project Error:", error);
    return { success: false, error: error.message || "Failed to update project" };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const project = await getProject(id);
    if (!project) {
      throw new Error("Project not found");
    }

    // 1. Delete featured media from Cloudinary
    if (project.featuredMediaPublicId) {
      // We don't know the resourceType strictly for featured media, usually image or video. 
      // Cloudinary delete without resource_type might fail if it's a video, so we might need to store type or guess.
      // Let's assume image by default, but it's best if we check extension or we try both if it fails.
      await deleteFromCloudinary(project.featuredMediaPublicId, "image").catch(() => 
        deleteFromCloudinary(project.featuredMediaPublicId!, "video")
      );
    }

    // 2. Delete all project media from Cloudinary
    for (const media of project.media) {
      if (media.publicId) {
        await deleteFromCloudinary(media.publicId, media.type.toLowerCase() as any);
      }
    }

    // 3. Delete project record (Cascades to media and technologies)
    await deleteProject(id);

    revalidatePath("/portfolio");

    return { success: true };
  } catch (error: any) {
    console.error("Delete Project Error:", error);
    return { success: false, error: error.message || "Failed to delete project" };
  }
}

export async function getProjectsAction(params: import("@/lib/repositories/project").GetProjectsParams = {}) {
  return import("@/lib/repositories/project").then(m => m.getProjects(params));
}

export async function getProjectAction(id: string) {
  return import("@/lib/repositories/project").then(m => m.getProject(id));
}

export async function getProjectBySlugAction(slug: string) {
  return import("@/lib/repositories/project").then(m => m.getProjectBySlug(slug));
}

export async function updateProjectSortOrdersAction(updates: { id: string, sortOrder: number }[]) {
  try {
    // Assuming validation is handled or we trust the caller for simplicity, 
    // or we can use a basic check.
    if (!Array.isArray(updates)) throw new Error("Invalid input");
    
    await updateProjectSortOrders(updates);

    revalidatePath("/portfolio");
    revalidatePath("/dashboard/projects");

    return { success: true };
  } catch (error: any) {
    console.error("Update Project Sort Orders Error:", error);
    return { success: false, error: error.message || "Failed to update sort orders" };
  }
}

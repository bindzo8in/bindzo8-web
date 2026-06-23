"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createServiceAction(name: string) {
  if (!name || name.trim() === "") {
    return { success: false, error: "Name is required" };
  }

  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  try {
    // Check if slug exists
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const service = await prisma.service.create({
      data: { name, slug },
    });
    
    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard/projects/create");
    return { success: true, data: service };
  } catch (error: any) {
    console.error("Create Service Error:", error);
    return { success: false, error: error.message || "Failed to create service" };
  }
}

export async function updateServiceAction(id: string, name: string) {
  if (!name || name.trim() === "") {
    return { success: false, error: "Name is required" };
  }

  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  try {
    const existing = await prisma.service.findFirst({
      where: { slug, id: { not: id } }
    });
    
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const service = await prisma.service.update({
      where: { id },
      data: { name, slug },
    });
    
    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard/projects/create");
    return { success: true, data: service };
  } catch (error: any) {
    console.error("Update Service Error:", error);
    return { success: false, error: error.message || "Failed to update service" };
  }
}

export async function deleteServiceAction(id: string) {
  try {
    // Check if any projects are using this service
    const count = await prisma.project.count({ where: { serviceId: id } });
    if (count > 0) {
      return { success: false, error: `Cannot delete service because it is used by ${count} project(s).` };
    }

    await prisma.service.delete({ where: { id } });
    
    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard/projects/create");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Service Error:", error);
    return { success: false, error: error.message || "Failed to delete service" };
  }
}

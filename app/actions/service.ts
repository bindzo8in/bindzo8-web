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

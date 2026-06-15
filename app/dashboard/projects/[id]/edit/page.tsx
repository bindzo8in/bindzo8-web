import { ProjectForm } from "@/components/dashboard/projects/project-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const [project, services] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        media: { orderBy: { sortOrder: "asc" } },
        technologies: true,
      }
    }),
    prisma.service.findMany({ orderBy: { name: "asc" } })
  ]);

  if (!project) return notFound();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Project: {project.title}</h1>
      <ProjectForm initialData={project} services={services} />
    </div>
  );
}

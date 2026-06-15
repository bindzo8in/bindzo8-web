import { ProjectForm } from "@/components/dashboard/projects/project-form";
import { prisma } from "@/lib/prisma";

export default async function CreateProjectPage() {
  const services = await prisma.service.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <ProjectForm services={services} />
    </div>
  );
}

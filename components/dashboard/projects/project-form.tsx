"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, CreateProjectInput, ProjectStatus, MediaType } from "@/lib/validations/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { uploadMediaAction } from "@/app/actions/upload";
import { createServiceAction } from "@/app/actions/service";
import { useCreateProject, useUpdateProject } from "@/lib/hooks/use-projects";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Trash, Plus, GripVertical } from "lucide-react";

type ProjectFormProps = {
  initialData?: any; // The fetched project data
  services?: { id: string; name: string }[];
};

export function ProjectForm({ initialData, services = [] }: ProjectFormProps) {
  const router = useRouter();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const [isUploading, setIsUploading] = useState(false);
  const [localServices, setLocalServices] = useState(services);
  const [newServiceName, setNewServiceName] = useState("");
  const [isCreatingService, setIsCreatingService] = useState(false);

  const handleCreateService = async () => {
    if (!newServiceName.trim()) return;
    setIsCreatingService(true);
    const result = await createServiceAction(newServiceName);
    setIsCreatingService(false);
    
    if (result.success && result.data) {
      setLocalServices([...localServices, result.data]);
      form.setValue("serviceId", result.data.id);
      setNewServiceName("");
      toast.success("Service created");
    } else {
      toast.error(result.error || "Failed to create service");
    }
  };

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      shortDescription: "",
      overview: "",
      challenge: "",
      solution: "",
      results: "",
      featuredMediaUrl: "",
      featuredMediaPublicId: "",
      clientName: "",
      projectUrl: "",
      serviceId: "",
      isFeatured: false,
      status: ProjectStatus.PUBLISHED,
      sortOrder: 0,
      media: [],
      technologies: [],
    },
  });

  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  const { fields: mediaFields, append: appendMedia, remove: removeMedia, move: moveMedia } = useFieldArray({
    control: form.control,
    name: "media",
  });

  const generateSlug = () => {
    const title = form.getValues("title");
    form.setValue("slug", title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFeaturedMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const base64 = await fileToBase64(file);
      const resourceType = file.type.startsWith("video") ? "video" : "image";
      const result = await uploadMediaAction(base64, "portfolio/featured", resourceType);
      
      if (result.success && result.data) {
        form.setValue("featuredMediaUrl", result.data.url);
        form.setValue("featuredMediaPublicId", result.data.publicId);
        toast.success("Featured media uploaded");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProjectMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setIsUploading(true);
    for (const file of files) {
      try {
        const base64 = await fileToBase64(file);
        let resourceType: "image" | "video" | "raw" = "raw";
        let mediaType: MediaType = MediaType.DOCUMENT;
        
        if (file.type.startsWith("image")) {
          resourceType = "image";
          mediaType = MediaType.IMAGE;
        } else if (file.type.startsWith("video")) {
          resourceType = "video";
          mediaType = MediaType.VIDEO;
        }

        const result = await uploadMediaAction(base64, "portfolio/gallery", resourceType);
        
        if (result.success && result.data) {
          appendMedia({
            type: mediaType,
            url: result.data.url,
            publicId: result.data.publicId,
            fileName: file.name,
            sortOrder: mediaFields.length,
          });
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    setIsUploading(false);
  };

  const onSubmit = async (data: CreateProjectInput) => {
    if (initialData?.id) {
      updateMutation.mutate({ ...data, id: initialData.id }, {
        onSuccess: () => router.push("/dashboard/projects")
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => router.push("/dashboard/projects")
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input {...form.register("title")} onBlur={generateSlug} />
            {form.formState.errors.title && <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input {...form.register("slug")} />
            {form.formState.errors.slug && <p className="text-red-500 text-sm">{form.formState.errors.slug.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Service</Label>
            <div className="flex gap-2">
              <select 
                {...form.register("serviceId")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a service...</option>
                {localServices.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-2">
              <Input 
                placeholder="Or create new service" 
                value={newServiceName} 
                onChange={(e) => setNewServiceName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateService();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleCreateService} disabled={isCreatingService || !newServiceName.trim()}>
                Add
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Client Name</Label>
            <Input {...form.register("clientName")} />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Project URL</Label>
          <Input {...form.register("projectUrl")} placeholder="https://" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-semibold">Case Study Content</h2>
        
        <div className="space-y-2">
          <Label>Short Description</Label>
          <Textarea {...form.register("shortDescription")} />
        </div>
        <div className="space-y-2">
          <Label>Overview</Label>
          <Textarea {...form.register("overview")} rows={4} />
        </div>
        <div className="space-y-2">
          <Label>Challenge</Label>
          <Textarea {...form.register("challenge")} rows={4} />
        </div>
        <div className="space-y-2">
          <Label>Solution</Label>
          <Textarea {...form.register("solution")} rows={4} />
        </div>
        <div className="space-y-2">
          <Label>Results</Label>
          <Textarea {...form.register("results")} rows={4} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Technologies</h2>
          <Button type="button" variant="outline" size="sm" onClick={() => appendTech({ name: "" })}>
            <Plus className="w-4 h-4 mr-2" /> Add Tech
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {techFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input {...form.register(`technologies.${index}.name`)} placeholder="e.g. Next.js" className="w-32" />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeTech(index)}>
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-semibold">Featured Media</h2>
        <Input type="file" accept="image/*,video/*" onChange={handleFeaturedMediaUpload} disabled={isUploading} />
        {form.watch("featuredMediaUrl") && (
          <div className="relative w-40 h-40 mt-4 rounded overflow-hidden border">
            {form.watch("featuredMediaUrl")?.match(/\.(mp4|webm)$/i) ? (
              <video src={form.watch("featuredMediaUrl")!} className="w-full h-full object-cover" muted autoPlay loop />
            ) : (
              <Image src={form.watch("featuredMediaUrl")!} alt="Featured" fill className="object-cover" />
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-semibold">Project Media Gallery</h2>
        <Input type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx" onChange={handleProjectMediaUpload} disabled={isUploading} />
        
        <div className="space-y-2 mt-4">
          {mediaFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 p-2 border rounded bg-gray-50">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
              <div className="flex-1 overflow-hidden text-sm truncate">{field.fileName || field.url}</div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeMedia(index)}>
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-semibold">Publishing</h2>
        
        <div className="flex items-center justify-between">
          <Label className="flex flex-col space-y-1">
            <span>Status</span>
            <span className="font-normal text-sm text-gray-500">Draft projects are hidden from public.</span>
          </Label>
          <select {...form.register("status")} className="rounded border px-3 py-2">
            <option value={ProjectStatus.PUBLISHED}>Published</option>
            <option value={ProjectStatus.DRAFT}>Draft</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="flex flex-col space-y-1">
            <span>Featured Project</span>
            <span className="font-normal text-sm text-gray-500">Show this project in featured sections.</span>
          </Label>
          <Switch 
            checked={form.watch("isFeatured")} 
            onCheckedChange={(val) => form.setValue("isFeatured", val)} 
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Sort Order</Label>
          <Input type="number" {...form.register("sortOrder", { valueAsNumber: true })} className="w-24" />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || isUploading}>
          {initialData ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}

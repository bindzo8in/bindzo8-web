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
import { createServiceAction, updateServiceAction, deleteServiceAction } from "@/app/actions/service";
import { useCreateProject, useUpdateProject } from "@/lib/hooks/use-projects";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Trash, Plus, GripVertical, Edit, Check, X } from "lucide-react";
import MediaUpload from "@/components/media-upload";

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
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingServiceName, setEditingServiceName] = useState("");

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

  const handleUpdateService = async (id: string) => {
    if (!editingServiceName.trim()) return;
    setIsCreatingService(true);
    const result = await updateServiceAction(id, editingServiceName);
    setIsCreatingService(false);
    
    if (result.success && result.data) {
      setLocalServices(localServices.map(s => s.id === id ? result.data! : s));
      setEditingServiceId(null);
      toast.success("Service updated");
    } else {
      toast.error(result.error || "Failed to update service");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setIsCreatingService(true);
    const result = await deleteServiceAction(id);
    setIsCreatingService(false);
    
    if (result.success) {
      setLocalServices(localServices.filter(s => s.id !== id));
      if (form.getValues("serviceId") === id) {
        form.setValue("serviceId", "");
      }
      toast.success("Service deleted");
    } else {
      toast.error(result.error || "Failed to delete service");
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
      tags: [],
    },
  });

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const currentTags = form.getValues("tags") || [];
    if (!currentTags.includes(tagInput.trim())) {
      form.setValue("tags", [...currentTags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue("tags", currentTags.filter(tag => tag !== tagToRemove));
  };

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



  const handleProjectMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setIsUploading(true);
    for (const file of files) {
      try {
        let resourceType: "image" | "video" | "raw" = "raw";
        let mediaType: MediaType = MediaType.DOCUMENT;
        
        if (file.type.startsWith("image")) {
          resourceType = "image";
          mediaType = MediaType.IMAGE;
        } else if (file.type.startsWith("video")) {
          resourceType = "video";
          mediaType = MediaType.VIDEO;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "portfolio/gallery");
        formData.append("resourceType", resourceType);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        
        if (res.ok && data.url) {
          appendMedia({
            type: mediaType,
            url: data.url,
            publicId: data.publicId,
            fileName: file.name,
            sortOrder: mediaFields.length,
          });
        } else {
          toast.error(data.error || `Failed to upload ${file.name}`);
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
            <div className="flex flex-col gap-2">
              <select 
                {...form.register("serviceId")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a service...</option>
                {localServices.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              
              {localServices.length > 0 && (
                <div className="mt-2 space-y-1 max-h-40 overflow-y-auto bg-gray-50 p-2 rounded-md border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Manage Services</p>
                  {localServices.map(s => (
                    <div key={s.id} className="flex items-center gap-2 text-sm p-1 hover:bg-white rounded border border-transparent hover:border-gray-200 transition-colors">
                      {editingServiceId === s.id ? (
                        <>
                          <Input 
                            value={editingServiceName}
                            onChange={e => setEditingServiceName(e.target.value)}
                            className="h-7 text-sm"
                          />
                          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => handleUpdateService(s.id)} disabled={isCreatingService}>
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setEditingServiceId(null)}>
                            <X className="w-4 h-4 text-gray-500" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 truncate pl-1">{s.name}</span>
                          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => { setEditingServiceId(s.id); setEditingServiceName(s.name); }}>
                            <Edit className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </Button>
                          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => handleDeleteService(s.id)} disabled={isCreatingService}>
                            <Trash className="w-4 h-4 text-red-400 hover:text-red-600" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Input 
                placeholder="New service name" 
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
        <MediaUpload
          value={form.watch("featuredMediaUrl") || undefined}
          folder="portfolio/featured"
          resourceType="image"
          onChange={(url, publicId) => {
            form.setValue("featuredMediaUrl", url);
            form.setValue("featuredMediaPublicId", publicId);
          }}
          onClear={() => {
            form.setValue("featuredMediaUrl", "");
            form.setValue("featuredMediaPublicId", "");
          }}
        />
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

      {/* Subcategories / Tags Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Subcategories / Tags</h2>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input 
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="e.g. Poster Design, Logo Design (press Enter)"
              className="max-w-md"
            />
            <Button type="button" variant="outline" onClick={handleAddTag}>
              Add Tag
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {(form.watch("tags") || []).map((tag, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                <span>{tag}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 rounded-full hover:bg-gray-200" 
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
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

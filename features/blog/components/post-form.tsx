"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { Tag, TagInput } from "emblor"
import { createPost, updatePost } from "@/lib/actions/blog-post-actions"
import { createCategory } from "@/lib/actions/blog-category-actions"
import { createTag } from "@/lib/actions/blog-tag-actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { TiptapEditor } from "./tiptap-editor"
import Image from "next/image"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().nullable().optional(),
  featuredImagePublicId: z.string().nullable().optional(),
  featuredImageAlt: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  readingTime: z.number().int().nullable().optional(),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  publishedAt: z.date().nullable().optional(),
  categoryId: z.string().min(1, "Category is required"),
  tagIds: z.array(z.string()).default([]),
})

interface PostFormProps {
  initialData?: z.infer<typeof formSchema> & { id: string }
  categories: { id: string; name: string }[]
  tags: { id: string; name: string }[]
}

export function PostForm({ initialData, categories, tags }: PostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(initialData?.featuredImage || null)

  const [localCategories, setLocalCategories] = useState(categories)
  const [localTags, setLocalTags] = useState(tags)

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategorySlug, setNewCategorySlug] = useState("")
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)

  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
  const [newTagName, setNewTagName] = useState("")
  const [newTagSlug, setNewTagSlug] = useState("")
  const [isCreatingTag, setIsCreatingTag] = useState(false)

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const [tagsState, setTagsState] = useState<Tag[]>(() => {
    return (initialData?.tagIds || []).map(id => {
      const tag = tags.find(t => t.id === id)
      return { id: tag?.id || id, text: tag?.name || id }
    })
  })

  const handleCreateCategory = async () => {
    if (!newCategoryName || !newCategorySlug) return;
    setIsCreatingCategory(true)
    try {
      const res = await createCategory({ name: newCategoryName, slug: newCategorySlug })
      if (res.error) {
        toast.error(res.error)
      } else if (res.category) {
        setLocalCategories((prev) => [...prev, { id: res.category.id, name: res.category.name }])
        form.setValue("categoryId", res.category.id)
        toast.success("Category created")
        setIsCategoryDialogOpen(false)
        setNewCategoryName("")
        setNewCategorySlug("")
      }
    } catch (error) {
      toast.error("Failed to create category")
    } finally {
      setIsCreatingCategory(false)
    }
  }

  const handleCreateTag = async () => {
    if (!newTagName || !newTagSlug) return;
    setIsCreatingTag(true)
    try {
      const res = await createTag({ name: newTagName, slug: newTagSlug })
      if (res.error) {
        toast.error(res.error)
      } else if (res.tag) {
        setLocalTags((prev) => [...prev, { id: res.tag.id, name: res.tag.name }])
        setTagsState((prev) => [...prev, { id: res.tag.id, text: res.tag.name }])
        const currentTags = form.getValues("tagIds") || []
        form.setValue("tagIds", [...currentTags, res.tag.id])
        toast.success("Tag created")
        setIsTagDialogOpen(false)
        setNewTagName("")
        setNewTagSlug("")
      }
    } catch (error) {
      toast.error("Failed to create tag")
    } finally {
      setIsCreatingTag(false)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      featuredImage: initialData?.featuredImage || null,
      featuredImagePublicId: initialData?.featuredImagePublicId || null,
      featuredImageAlt: initialData?.featuredImageAlt || "",
      status: initialData?.status || "DRAFT",
      readingTime: initialData?.readingTime || 0,
      isFeatured: initialData?.isFeatured || false,
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt) : new Date(),
      categoryId: initialData?.categoryId || "",
      tagIds: initialData?.tagIds || [],
    },
  })

  const content = form.watch("content")

  useEffect(() => {
    if (content) {
      const text = content.replace(/<[^>]+>/g, ' ')
      const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
      const readingTime = Math.ceil(wordCount / 200) || 1
      form.setValue("readingTime", readingTime)
    } else {
      form.setValue("readingTime", 0)
    }
  }, [content, form])

  useEffect(() => {
    form.setValue("tagIds", tagsState.map(t => t.id))
  }, [tagsState, form])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    form.setValue("title", value)
    if (!initialData) {
      form.setValue("slug", value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const loadingToast = toast.loading("Uploading image...")
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      const { url, publicId } = await res.json()
      setImageUrl(url)
      form.setValue("featuredImage", url)
      form.setValue("featuredImagePublicId", publicId)
      toast.success("Image uploaded", { id: loadingToast })
    } catch (error) {
      toast.error("Failed to upload image", { id: loadingToast })
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      let result;
      if (initialData) {
        result = await updatePost(initialData.id, values)
      } else {
        result = await createPost(values)
      }

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success)
        router.push("/dashboard/blog/posts")
        router.refresh()
      }
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title..." {...field} onChange={handleTitleChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="post-title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Category</FormLabel>
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="ghost" size="sm" className="h-6 text-xs px-2 text-[#d6335a]">
                      <Plus className="h-3 w-3 mr-1" /> New Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input 
                          placeholder="e.g. Technology" 
                          value={newCategoryName} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setNewCategoryName(val)
                            setNewCategorySlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
                          }} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <Input 
                          placeholder="e.g. technology" 
                          value={newCategorySlug} 
                          onChange={(e) => setNewCategorySlug(e.target.value)} 
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" onClick={handleCreateCategory} disabled={isCreatingCategory}>
                        {isCreatingCategory ? "Creating..." : "Create Category"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {localCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief summary of the post..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TiptapEditor content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Featured Image
          </label>
          {imageUrl && (
            <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden border">
              <Image src={imageUrl} alt="Featured" fill className="object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
            {imageUrl ? "Change Image" : "Upload Image"}
          </Button>
        </div>

        <FormField
          control={form.control}
          name="tagIds"
          render={() => (
            <FormItem>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <FormLabel className="text-base">Tags</FormLabel>
                  <FormDescription>Select tags for this post.</FormDescription>
                </div>
                <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="ghost" size="sm" className="h-6 text-xs px-2 text-[#d6335a]">
                      <Plus className="h-3 w-3 mr-1" /> New Tag
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Tag</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input 
                          placeholder="e.g. Next.js" 
                          value={newTagName} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setNewTagName(val)
                            setNewTagSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
                          }} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <Input 
                          placeholder="e.g. next-js" 
                          value={newTagSlug} 
                          onChange={(e) => setNewTagSlug(e.target.value)} 
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" onClick={handleCreateTag} disabled={isCreatingTag}>
                        {isCreatingTag ? "Creating..." : "Create Tag"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <FormControl>
                <TagInput
                  placeholder="Search and select tags"
                  tags={tagsState}
                  setTags={(newTags) => {
                    setTagsState(newTags);
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  autocompleteOptions={localTags.map(tag => ({ id: tag.id, text: tag.name }))}
                  enableAutocomplete={true}
                  restrictTagsToAutocompleteOptions={true}
                  className="w-full bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-lg bg-muted/50">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">SEO Settings</h3>
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="SEO Title" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="SEO Description" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Additional Details</h3>
            <FormField
              control={form.control}
              name="readingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reading Time (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      readOnly
                      className="bg-muted cursor-not-allowed"
                      placeholder="5"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Post</FormLabel>
                    <FormDescription>
                      Show this post in the featured section.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            type="button" 
            variant="outline" 
            size="lg" 
            disabled={isLoading} 
            className="w-full sm:w-auto"
            onClick={() => {
              form.setValue("status", "DRAFT")
              form.handleSubmit(onSubmit)()
            }}
          >
            Save as Draft
          </Button>
          <Button 
            type="button" 
            size="lg" 
            disabled={isLoading} 
            className="w-full sm:w-auto"
            onClick={() => {
              form.setValue("status", "PUBLISHED")
              form.handleSubmit(onSubmit)()
            }}
          >
            {isLoading ? "Saving..." : initialData?.status === "PUBLISHED" ? "Update Post" : "Publish"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
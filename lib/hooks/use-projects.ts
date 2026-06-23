import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { GetProjectsParams } from "../repositories/project";
import { 
  createProjectAction, 
  updateProjectAction, 
  deleteProjectAction,
  getProjectsAction,
  getProjectAction,
  getProjectBySlugAction
} from "../../app/actions/project";
import { toast } from "sonner";
import { CreateProjectInput, UpdateProjectInput } from "../validations/project";

export function useProjects(params: GetProjectsParams = {}) {
  return useInfiniteQuery({
    queryKey: ["projects", params],
    queryFn: async ({ pageParam }) => {
      return getProjectsAction({ ...params, cursor: pageParam as string | undefined });
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useProject(id?: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => id ? getProjectAction(id) : null,
    enabled: !!id,
  });
}

export function useProjectBySlug(slug?: string) {
  return useQuery({
    queryKey: ["project-slug", slug],
    queryFn: () => slug ? getProjectBySlugAction(slug) : null,
    enabled: !!slug,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectInput) => createProjectAction(JSON.parse(JSON.stringify(data))),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Project created successfully");
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      } else {
        toast.error(res.error || "Failed to create project");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    }
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProjectInput) => updateProjectAction(JSON.parse(JSON.stringify(data))),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Project updated successfully");
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["project", res.data?.id] });
      } else {
        toast.error(res.error || "Failed to update project");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    }
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProjectAction(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Project deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      } else {
        toast.error(res.error || "Failed to delete project");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    }
  });
}

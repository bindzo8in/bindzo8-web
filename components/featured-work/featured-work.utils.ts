import type { FeaturedWorkItem, FeaturedWorkProject } from "./featured-work.types";

export function normalizeProjectToFeaturedWorkItem(project: FeaturedWorkProject): FeaturedWorkItem {
  const sortedMedia = [...project.media].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  const firstMedia = sortedMedia[0];

  const mediaType = firstMedia?.type?.toLowerCase();

  let videoUrl = null;
  let imageUrl = null;

  if (mediaType === "video") {
    videoUrl = firstMedia?.url || null;
  } else if (/\.(mp4|webm|mov)$/i.test(project.featuredMediaUrl || "")) {
    videoUrl = project.featuredMediaUrl;
  } else {
    imageUrl = project.featuredMediaUrl || firstMedia?.url || null;
  }

  return {
    id: project.id,
    title: project.title,
    category:
      project.service?.name
        ?.toLowerCase()
        .replace(/\s+/g, "-") ||
      "other",
    categoryLabel:
      project.service?.name ||
      "Featured Work",
    image: imageUrl,
    video: videoUrl,
    projectUrl: project.projectUrl,
  };
}

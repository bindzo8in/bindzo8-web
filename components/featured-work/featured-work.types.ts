export type FeaturedWorkMedia = {
  type: string;
  url: string;
  sortOrder: number;
};

export type FeaturedWorkProject = {
  id: string;
  title: string;
  featuredMediaUrl: string | null;
  projectUrl: string | null;

  service: {
    name: string;
  } | null;

  media: FeaturedWorkMedia[];
};

/**
 * Normalized UI item
 * Used only after Prisma data is transformed
 */
export interface FeaturedWorkItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;

  image: string | null;
  video: string | null;

  projectUrl: string | null;
}

export type WorkFilter = string;

export interface WorkFilterItem {
  label: string;
  value: WorkFilter;
}

export interface WorkItem {
  id: number;
  category: string;
  size: string;
  image?: string;
  video?: string;
  poster?: string;
  alt: string;
  categoryLabel: string;
  title: string;
  year: string;
}
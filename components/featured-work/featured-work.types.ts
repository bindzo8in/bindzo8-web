export type WorkCategory =
  | "website"
  | "app"
  | "software"
  | "branding"
  | "marketing"
  | "video";

export type WorkFilter = "all" | WorkCategory;

export type WorkSize = "c4" | "c3" | "c2" | "c6";

export interface WorkItem {
  id: number;
  category: WorkCategory;
  size: WorkSize;

  title: string;
  categoryLabel: string;
  year: string;

  image?: string;
  video?: string;
  poster?: string;

  alt: string;
}

export interface WorkFilterItem {
  label: string;
  value: WorkFilter;
}
import type {
  WorkFilterItem,
  WorkItem,
} from "./featured-work.types";

export const WORK_FILTERS: WorkFilterItem[] = [
  {
    label: "All Work",
    value: "all",
  },
  {
    label: "Website",
    value: "website",
  },
  {
    label: "Mobile App",
    value: "app",
  },
  {
    label: "Software & CRM",
    value: "software",
  },
  {
    label: "Branding",
    value: "branding",
  },
  {
    label: "Marketing",
    value: "marketing",
  },
  {
    label: "Video Editing",
    value: "video",
  },
];

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 1,
    category: "website",
    size: "c4",
    image:
      "https://picsum.photos/seed/anndoctor-store/1200/820",
    alt: "Ann Doctor",
    categoryLabel: "Website · E-Commerce",
    title: "Ann Doctor",
    year: "2025",
  },

  {
    id: 2,
    category: "app",
    size: "c2",
    image:
      "https://picsum.photos/seed/wellness-app/700/900",
    alt: "Wellness app",
    categoryLabel: "Mobile App · Onboarding",
    title: "Wellness App",
    year: "2025",
  },

  {
    id: 3,
    category: "branding",
    size: "c2",
    image:
      "https://picsum.photos/seed/hospitality-rebrand/700/900",
    alt: "Hospitality rebrand",
    categoryLabel: "Branding · Identity",
    title: "Bayleaf Hotels",
    year: "2024",
  },

  {
    id: 4,
    category: "software",
    size: "c4",
    image:
      "https://picsum.photos/seed/crmplatform/1200/820",
    alt: "CRM Platform",
    categoryLabel: "Software & CRM",
    title: "CRM Platform",
    year: "2025",
  },

  {
    id: 5,
    category: "marketing",
    size: "c3",
    image:
      "https://picsum.photos/seed/fmcg-campaign/900/700",
    alt: "Marketing campaign",
    categoryLabel: "Digital Marketing",
    title: "Launch Campaign",
    year: "2024",
  },

  {
    id: 6,
    category: "website",
    size: "c3",
    image:
      "https://picsum.photos/seed/studiosite-agency/900/700",
    alt: "Studio site",
    categoryLabel: "Website · Studio Site",
    title: "Studio Site",
    year: "2024",
  },

  {
    id: 7,
    category: "video",
    size: "c6",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster:
      "https://picsum.photos/seed/showreel-bindzo8/1600/700",
    alt: "2025 Showreel",
    categoryLabel: "Video Editing · Showreel",
    title: "2025 Showreel",
    year: "Promo & Motion",
  },
];

export const MARQUEE_ITEMS = [
  "Website Development",
  "Mobile App Development",
  "Software & CRM",
  "Branding & Design",
  "Digital Marketing",
  "Video Editing",
];
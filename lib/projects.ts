export type Project = {
  id: string;
  title: string;
  /** short pill label shown over the media, e.g. "Website", "Branding, Logo" */
  category: string;
  /** secondary line under the title, e.g. client industry or location */
  subtitle?: string;
  href: string;
  /** shows in the homepage Featured Work gallery */
  featured?: boolean;
  media: {
    type: "image" | "video";
    src: string;
    /** poster frame shown while a video loads */
    poster?: string;
  };
};

// Replace `media.src` with your own asset paths (e.g. "/work/evocus.mp4" or
// an uploaded CDN URL). Placeholders below are just so the layout renders.
export const projects: Project[] = [
  {
    id: "evocus",
    title: "Evocus",
    category: "Branding & Packaging",
    subtitle: "Beverage · Coimbatore",
    href: "/portfolio/evocus",
    featured: true,
    media: {
      type: "video",
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster: "https://picsum.photos/seed/evocus/900/1100",
    },
  },
  {
    id: "classic-legacy",
    title: "Classic Legacy",
    category: "Web Development",
    subtitle: "Real Estate · Chennai",
    href: "/portfolio/classic-legacy",
    featured: true,
    media: { type: "image", src: "https://picsum.photos/seed/legacy/900/1100" },
  },
  {
    id: "camber",
    title: "Camber",
    category: "Branding & Web",
    subtitle: "Fintech · Bangalore",
    href: "/portfolio/camber",
    featured: true,
    media: { type: "image", src: "https://picsum.photos/seed/camber/900/1100" },
  },
  {
    id: "abiyam",
    title: "Abiyam",
    category: "Packaging & Social",
    subtitle: "FMCG · Coimbatore",
    href: "/portfolio/abiyam",
    featured: true,
    media: { type: "image", src: "https://picsum.photos/seed/abiyam/900/1100" },
  },
  {
    id: "shastik",
    title: "Shastik",
    category: "Branding & Web",
    subtitle: "F&B · Coimbatore",
    href: "/portfolio/shastik",
    featured: true,
    media: { type: "image", src: "https://picsum.photos/seed/shastik/900/1100" },
  },
  {
    id: "delhiwala",
    title: "Delhiwala",
    category: "Packaging Design",
    subtitle: "F&B · Delhi",
    href: "/portfolio/delhiwala",
    featured: true,
    media: { type: "image", src: "https://picsum.photos/seed/delhiwala/900/1100" },
  },
  {
    id: "crostello",
    title: "Crostello",
    category: "Packaging & Branding",
    subtitle: "F&B · Coimbatore",
    href: "/portfolio/crostello",
    media: { type: "image", src: "https://picsum.photos/seed/crostello/900/1100" },
  },
  {
    id: "haku-namah",
    title: "Haku Namah Tantra",
    category: "Shopify & Web Dev",
    subtitle: "E-commerce · Pan India",
    href: "/portfolio/haku-namah",
    media: { type: "image", src: "https://picsum.photos/seed/haku/900/1100" },
  },
];
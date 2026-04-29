import ServiceCard from "./ServiceCard";
import {
  DigitalMarketingIcon,
  WebDevIcon,
  MobileAppIcon,
  SEOIcon,
  GraphicDesignIcon,
  VideoEditingIcon,
} from "./ServiceIcons";

const services = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: <DigitalMarketingIcon />,
    items: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Search Engine Marketing",
      "Content Marketing",
      "Influencer Marketing",
    ],
  },
  {
    id: "website-development",
    title: "Website Development",
    icon: <WebDevIcon />,
    items: [
      "Website Development",
      "Website Design & Development",
      "E-Commerce Development",
      "Mobile Application",
      "SEO Services",
      "CRM Development",
    ],
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    icon: <MobileAppIcon />,
    items: [
      "Android & iOS App Development",
      "Custom App UI/UX",
      "App Testing & Performance Optimization",
      "App Launch, Deployment & Maintenance",
    ],
  },
  {
    id: "seo",
    title: "SEO (Search Engine Optimization)",
    icon: <SEOIcon />,
    items: [
      "On-Page SEO",
      "Off-Page SEO",
      "Technical SEO",
      "Local SEO",
      "Keyword Research & Analysis",
    ],
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: <GraphicDesignIcon />,
    items: [
      "Logo Design",
      "Brand Identity",
      "UI/UX Design",
      "Print & Digital Media",
      "Social Media Graphics",
    ],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: <VideoEditingIcon />,
    items: [
      "Corporate Video Production",
      "Promotional Videos",
      "Motion Graphics",
      "Social Media Reels",
      "Animation & VFX",
    ],
  },
];

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 max-w-[1080px] mx-auto">
      {services.map((s) => (
        <ServiceCard key={s.id} title={s.title} items={s.items} icon={s.icon} />
      ))}
    </div>
  );
}

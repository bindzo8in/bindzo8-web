const faqs = [
  {
    q: "What services does Bindzo 8 Techno Solutions offer?",
    a: "Bindzo 8 Techno Solutions delivers complete digital solutions including Website Development, Mobile App Development, Custom Software & ERP Solutions, UI/UX Design, Graphic Design, SEO, Digital Marketing, and Video Editing Services.",
  },
  {
    q: "Which industries do you support with custom software and CRM solutions?",
    a: "We build CRM, ERP, and tailored software solutions for industries such as retail, education, real estate, healthcare, logistics, hospitality, B2B, e-commerce, service sectors, and startups.",
  },
  {
    q: "What types of websites do you develop?",
    a: "Our team creates business websites, e-commerce stores, portfolio sites, corporate websites, CMS/WordPress platforms, landing pages, and custom UI/UX-based websites with full responsiveness and maintenance support.",
  },
  {
    q: "Do you build both native and cross-platform mobile apps?",
    a: "Yes. We develop Android, iOS, and cross-platform apps using modern frameworks like Flutter, React Native, Kotlin, and Swift—ensuring smooth performance and a seamless user experience.",
  },
  {
    q: "How does your software development process work?",
    a: "We follow a streamlined workflow: Discovery → Requirement Analysis → Wireframing & UI/UX → Agile/Scrum Development → Testing → Deployment → Ongoing Support & Updates.",
  },
  {
    q: "What graphic and branding design services do you offer?",
    a: "Bindzo 8 designs logos, brand identity systems, marketing creatives, brochures, packaging, labels, social media designs, advertisements, UI elements, and promotional materials.",
  },
  {
    q: "What digital marketing and SEO services are provided?",
    a: "Our marketing services include on-page/off-page SEO, technical SEO, content strategies, PPC Ads (Google & Social Media), lead generation, social media management, performance optimization, and online reputation management.",
  },
  {
    q: "Do you offer video editing or promotional video creation?",
    a: "Yes, we create professional promo videos, reels, ads, explainer videos, motion graphics, product videos, and corporate videos with high-quality editing and color grading.",
  },
  {
    q: "What makes Bindzo 8 Techno Solutions unique?",
    a: "We combine creativity, modern technology, and business-focused strategies. With an experienced team, transparent process, fast delivery, customized solutions, and strong client support, we ensure high-quality results for every project.",
  },
  {
    q: "Where is Bindzo 8 Techno Solutions located?",
    a: "Bindzo 8 Techno Solutions is based in Coimbatore, Tamil Nadu, and provides services to clients across India and internationally through remote and hybrid project collaboration.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative w-full bg-white font-kumbh py-20 px-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-[#B40000] text-3xl md:text-3xl mb-20">
          Frequently Asked Questions:
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-28 gap-y-12">
          {faqs.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg md:text-md font-bold mb-6">
                {index + 1}. {item.q}
              </h3>

              <p className="text-base md:text-md leading-snug max-w-2xl">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
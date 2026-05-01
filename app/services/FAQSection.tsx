"use client";

const faqs = [
  {
    q: "What services does Bindzo 8 Techno Solutions offer?",
    a: "Bindzo 8 Techno Solutions delivers complete digital solutions including Website Development, Mobile App Development, Custom Software & ERP Solutions, UI/UX Design, Graphic Design, SEO, Digital Marketing, and Video Editing Services.",
  },
  {
    q: "Which industries do you support with custom software and CRM solutions?",
    a: "We build CRM, ERP, and tailored software solutions for industries including retail, healthcare, education, logistics, real estate, and manufacturing.",
  },
  {
    q: "What types of websites do you develop?",
    a: "Our team creates business websites, e-commerce stores, portfolio sites, corporate websites, CMS/WordPress platforms, landing pages, and custom UI/UX-based websites with full responsiveness and maintenance support.",
  },
  {
    q: "Do you build both native and cross-platform mobile apps?",
    a: "Yes. We develop Android, iOS, and cross-platform apps using modern frameworks like Flutter, React Native, Kotlin, and Swift — ensuring smooth performance and a seamless user experience.",
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
    a: "Our services include on-page/off-page SEO, technical SEO, Google Ads, Meta Ads, social media marketing, content marketing, email campaigns, and analytics-based performance tracking.",
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
    <section className="mx-4 sm:mx-8 px-4 sm:px-8 py-10 sm:py-14 bg-[#e8e5df] rounded-2xl"
    style={{background: "linear-gradient(180deg, rgba(232, 229, 223, 1) 0%, rgba(255, 255, 255, 1) 100%)"}}>
      <div className="max-w-[1000px] mx-auto">
        {/* Heading */}
        <h2 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-[#c0272d] mb-10">
          Frequently Asked Questions:
        </h2>

        {/* FAQ Grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <p className="text-[13px] font-bold text-gray-900 mb-1.5 leading-snug">
                {i + 1}. {faq.q}
              </p>
              <p className="text-[12.5px] text-gray-600 leading-relaxed pl-4">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import WaveBackground from "./background";

const faqs = [
  {
    q: "What services does Bindzo 8 Private Limited offer?",
    a: "Bindzo 8 Private Limited delivers complete digital solutions including Website Development, Mobile App Development, Custom Software & ERP Solutions, UI/UX Design, Graphic Design, SEO, Digital Marketing, and Video Editing Services.",
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
    q: "What makes Bindzo 8 Private Limited unique?",
    a: "We combine creativity, modern technology, and business-focused strategies. With an experienced team, transparent process, fast delivery, customized solutions, and strong client support, we ensure high-quality results for every project.",
  },
  {
    q: "Where is Bindzo 8 Private Limited located?",
    a: "Bindzo 8 Private Limited is based in Coimbatore, Tamil Nadu, and provides services to clients across India and internationally through remote and hybrid project collaboration.",
  },
];

export default function FAQSection() {
  return (
     <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-8 overflow-hidden font-kumbh">

       {/* 🔵 Background */}
       <div className="absolute inset-0 z-0 pointer-events-none">
         <WaveBackground />
       </div>

       {/* 🟡 Content */}
       <div className="relative z-10 max-w-6xl mx-auto">
         <div className="bg-white/90 backdrop-blur-md px-6 sm:px-10 py-12 md:py-16 rounded-3xl shadow-2xl border border-white/20">

           {/* Heading */}
           <h2 className="text-3xl md:text-4xl font-bold text-[#c0272d] mb-10 md:mb-16 text-center md:text-left tracking-tight">
             Frequently Asked Questions
           </h2>

           {/* FAQ Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 md:gap-y-14">
             {faqs.map((faq, i) => (
               <div key={i} className="group">
                 <p className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex gap-3">
                   <span className="text-[#c0272d]">{i + 1}.</span>
                   <span>{faq.q}</span>
                 </p>

                 <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-8 border-l-2 border-gray-100 group-hover:border-[#c0272d] transition-colors duration-300">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>

         </div>
       </div>

     </section>
  );
}
import React from "react";
import ContactForm from "./form";

function Page() {
  return (
    <main className="font-kumbh bg-[#FFF5F4]">
      <header></header>

      <section className="py-10">
        <ContactForm />
      </section>

      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832.516115684343!2d76.95919829357906!3d11.019254899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859b3d51d070d%3A0x9facd5c3639bffc2!2sDesign%20Hub!5e0!3m2!1sen!2sin!4v1777458087079!5m2!1sen!2sin"
          className="h-[280px] w-full border-0 md:h-[360px] lg:h-[420px]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}

export default Page;
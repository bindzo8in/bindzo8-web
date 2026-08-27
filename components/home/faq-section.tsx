"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What kind of projects do you work on?",
    answer:
      "We work with ambitious businesses on high-performance websites, custom software, digital products, and scalable marketing experiences. Every project is shaped around the business goals, audience, and growth stage.",
  },
  {
    question: "How do you approach a new project?",
    answer:
      "We start by understanding the business, the problem we are solving, and what success looks like. From there, we define the strategy, structure the experience, design the interface, and move into development with a clear roadmap.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the scope and complexity. A focused website can move relatively quickly, while a custom software product or larger digital platform naturally requires more time. We establish a realistic timeline before development begins.",
  },
  {
    question: "Can you work with an existing brand or website?",
    answer:
      "Absolutely. We can work within an existing brand system or help evolve it when the current identity no longer reflects the business. We also improve and rebuild existing websites when the foundation needs a stronger technical or visual direction.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Launch is not the end of the relationship. We can continue supporting your website or product with improvements, maintenance, performance optimisation, new features, and ongoing growth initiatives.",
  },
  {
    question: "How do we get started?",
    answer:
      "Simply tell us what you are building, what you want to improve, and where you want to go next. We will review the opportunity and figure out the best way to move forward together.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36">
      {/* ========================================
          BACKGROUND DECORATION
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-96
          w-96
          rounded-full
          bg-[#E7325C]/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-[#EF8030]/5
          blur-3xl
        "
      />

      {/* ========================================
          CONTAINER
      ========================================= */}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================
            HEADER
        ========================================= */}

        <div className="mb-14 max-w-3xl lg:mb-20">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#E7325C]
              "
            />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-neutral-500
              "
            >
              FAQ
            </span>
          </div>

          <h2
            className="
              text-4xl
              font-semibold
              leading-[1.05]
              tracking-[-0.04em]
              text-neutral-950
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Questions,
            <br />

            <span
              className="
                bg-gradient-to-r
                from-[#E7325C]
                to-[#EF8030]
                bg-clip-text
                text-transparent
              "
            >
              answered clearly.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-relaxed
              text-neutral-500
              sm:text-lg
            "
          >
            Everything you need to know before starting a project with us.
            If you still have questions, we are always happy to talk.
          </p>
        </div>

        {/* ========================================
            FAQ GRID
        ========================================= */}

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* ======================================
              LEFT — VISUAL / MESSAGE CARD
          ====================================== */}

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                bg-neutral-950
                p-7
                sm:p-9
                lg:min-h-[440px]
                lg:p-10
              "
            >
              {/* Gradient glow */}

              <div
                className="
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-[#E7325C]/25
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  bg-[#EF8030]/20
                  blur-3xl
                "
              />

              {/* Decorative rings */}

              <div
                className="
                  absolute
                  right-8
                  top-8
                  h-20
                  w-20
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                className="
                  absolute
                  right-14
                  top-14
                  h-8
                  w-8
                  rounded-full
                  bg-gradient-to-br
                  from-[#E7325C]
                  to-[#EF8030]
                "
              />

              {/* Content */}

              <div className="relative flex min-h-[380px] flex-col justify-between">
                <div>
                  <span
                    className="
                      inline-flex
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white/70
                    "
                  >
                    Let&apos;s build something
                  </span>

                  <h3
                    className="
                      mt-8
                      max-w-sm
                      text-3xl
                      font-medium
                      leading-tight
                      tracking-[-0.03em]
                      text-white
                      sm:text-4xl
                    "
                  >
                    Still have a question?
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-sm
                      text-sm
                      leading-relaxed
                      text-white/50
                      sm:text-base
                    "
                  >
                    Every project is different. Tell us what you are trying
                    to achieve and we&apos;ll help you find the right path.
                  </p>
                </div>

                {/* Bottom */}

                <div className="mt-12">
                  <div
                    className="
                      mb-4
                      h-px
                      w-full
                      bg-white/10
                    "
                  />

                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-white/30">
                        Start a conversation
                      </p>

                      <p className="mt-2 text-sm font-medium text-white">
                        Your next idea starts here.
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-neutral-950
                        transition-transform
                        duration-300
                        hover:rotate-45
                      "
                    >
                      ↗
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================
              RIGHT — FAQ
          ====================================== */}

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.question} className="group">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-6
                      py-6
                      text-left
                      sm:py-7
                    "
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className={`
                          mt-1
                          text-xs
                          font-medium
                          transition-colors
                          duration-300
                          ${
                            isOpen
                              ? "text-[#E7325C]"
                              : "text-neutral-400"
                          }
                        `}
                      >
                        0{index + 1}
                      </span>

                      <span
                        className={`
                          text-lg
                          font-medium
                          tracking-[-0.02em]
                          transition-colors
                          duration-300
                          sm:text-xl
                          ${
                            isOpen
                              ? "text-neutral-950"
                              : "text-neutral-700"
                          }
                        `}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Plus / minus */}

                    <span
                      className={`
                        relative
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-300
                        ${
                          isOpen
                            ? "border-neutral-950 bg-neutral-950 text-white"
                            : "border-neutral-200 bg-white text-neutral-500 group-hover:border-neutral-400"
                        }
                      `}
                    >
                      <span className="absolute h-px w-3 bg-current" />

                      <span
                        className={`
                          absolute
                          h-3
                          w-px
                          bg-current
                          transition-transform
                          duration-300
                          ${
                            isOpen
                              ? "rotate-90"
                              : "rotate-0"
                          }
                        `}
                      />
                    </span>
                  </button>

                  {/* Answer */}

                  <div
                    className={`
                      grid
                      transition-[grid-template-rows]
                      duration-400
                      ease-out
                      ${
                        isOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-7 pl-10 pr-10 sm:pb-8 sm:pl-[3.25rem]">
                        <p
                          className="
                            max-w-2xl
                            text-sm
                            leading-7
                            text-neutral-500
                            sm:text-base
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
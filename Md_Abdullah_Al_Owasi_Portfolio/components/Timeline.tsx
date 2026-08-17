"use client";

import { timeline } from "@/data/portfolio";
import siteCopy from "@/data/site-copy.json";
import { ScrollFocusSection, SideSlideCard } from "./ScrollFocusSection";

/**
 * OPERATING THESIS / EDUCATION
 * ============================
 * Education is factual and intentionally lower in the page. The visible wording
 * states that the Bachelor of Computer Science (Hons) program is being studied
 * at SEGi University with AI & Cybersecurity specialization; it never implies
 * the degree has already been awarded.
 */
export default function Timeline() {
  return (
    <ScrollFocusSection id="trajectory" eyebrow={siteCopy.about.eyebrow} title={siteCopy.about.title} copy={siteCopy.about.body}>
      <div className="relative ml-2 border-l border-white/[0.08] pl-7 sm:ml-4 sm:pl-10">
        {timeline.map((item, index) => (
          <SideSlideCard key={item.title} index={index} side={index % 2 === 0 ? "left" : "right"}>
            <article className="relative grid gap-5 border-b border-white/[0.07] py-8 last:border-0 md:grid-cols-[185px_1fr]">
              <span className="absolute -left-[2.03rem] top-10 size-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,.06)] sm:-left-[2.73rem]" />
              <p className="type-label text-[10px] text-emerald-300">{item.year}</p>
              <div>
                <h3 className="text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-3xl leading-7 text-slate-400">{item.copy}</p>
                <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] text-slate-500">{tag}</span>)}</div>
              </div>
            </article>
          </SideSlideCard>
        ))}
      </div>
    </ScrollFocusSection>
  );
}

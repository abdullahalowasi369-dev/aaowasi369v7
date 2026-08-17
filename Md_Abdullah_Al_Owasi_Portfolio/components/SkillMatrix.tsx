"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { skillCategories, skills, type SkillCategory } from "@/data/portfolio";
import siteCopy from "@/data/site-copy.json";
import { ScrollFocusSection, SideSlideCard } from "./ScrollFocusSection";

export default function SkillMatrix() {
  const [active, setActive] = useState<SkillCategory>("All");
  const visible = useMemo(() => active === "All" ? skills : skills.filter((skill) => skill.category === active), [active]);

  return (
    <ScrollFocusSection id="capabilities" eyebrow={siteCopy.capabilities.eyebrow} title={siteCopy.capabilities.title} copy={siteCopy.capabilities.body} contentClassName="space-y-7">
      <SideSlideCard index={0} side="left">
        <div className="flex flex-wrap gap-2">
          {skillCategories.map((category) => <button key={category} type="button" onClick={() => setActive(category)} aria-pressed={active === category} className={`rounded-full border px-3.5 py-2 text-xs transition ${active === category ? "border-cyan-300/20 bg-cyan-300/[0.06] text-cyan-100" : "border-white/[0.08] bg-white/[0.025] text-slate-500 hover:text-white"}`}>{category}</button>)}
        </div>
      </SideSlideCard>
      <motion.div layout className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((skill, index) => (
          <SideSlideCard key={skill.name} index={index + 1} className="h-full">
            <motion.article layout className="luxury-glass h-full rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4"><h3 className="text-base font-semibold text-white">{skill.name}</h3><span className="rounded-full border border-white/[0.07] px-2 py-1 type-label text-[8px] text-slate-600">{skill.category}</span></div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{skill.context}</p>
              <p className="mt-5 border-t border-white/[0.07] pt-3 type-label text-[9px] text-emerald-300">Applied in · {skill.evidence}</p>
            </motion.article>
          </SideSlideCard>
        ))}
      </motion.div>
    </ScrollFocusSection>
  );
}

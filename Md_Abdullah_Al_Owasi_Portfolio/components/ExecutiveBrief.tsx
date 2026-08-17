"use client";

import { CheckCircle2 } from "lucide-react";
import { executiveValue } from "@/data/portfolio";
import siteCopy from "@/data/site-copy.json";
import AssuranceTelemetryBar from "./AssuranceTelemetryBar";
import ExecutiveRiskPanel from "./ExecutiveRiskPanel";
import GovernanceLineageDiagram from "./GovernanceLineageDiagram";
import PortfolioDomainDonut from "./PortfolioDomainDonut";
import { ScrollFocusSection, SideSlideCard } from "./ScrollFocusSection";

/**
 * EXECUTIVE VALUE SECTION
 * =======================
 * This section is the first scroll-linked evidence zone after the hero.
 * Its job is to translate governance mechanics into executive/business relevance
 * and then immediately prove the portfolio has inspectable structure.
 */
export default function ExecutiveBrief() {
  return (
    <ScrollFocusSection
      id="value"
      eyebrow={siteCopy.executiveValue.eyebrow}
      title={siteCopy.executiveValue.title}
      copy={siteCopy.executiveValue.body}
      contentClassName="space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {executiveValue.map((item, index) => (
          <SideSlideCard key={item.title} index={index}>
            <article className="luxury-glass h-full rounded-[1.6rem] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="type-label text-[9px] text-emerald-300">{item.label}</span>
                <CheckCircle2 size={15} className="text-emerald-400" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.copy}</p>
            </article>
          </SideSlideCard>
        ))}
      </div>

      <SideSlideCard index={4} side="left">
        <GovernanceLineageDiagram />
      </SideSlideCard>

      <div className="grid gap-5 xl:grid-cols-2">
        <SideSlideCard index={5} side="left"><AssuranceTelemetryBar /></SideSlideCard>
        <SideSlideCard index={6} side="right"><PortfolioDomainDonut /></SideSlideCard>
      </div>

      <SideSlideCard index={7} side="right">
        <ExecutiveRiskPanel />
      </SideSlideCard>
    </ScrollFocusSection>
  );
}

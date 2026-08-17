"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail, MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import siteCopy from "@/data/site-copy.json";
import { ScrollFocusSection, SideSlideCard } from "./ScrollFocusSection";

/**
 * CONTACT / CONVERSION
 * ====================
 * Social networks intentionally do not repeat here. Per the portfolio design,
 * LinkedIn, GitHub, X, Instagram, Facebook and WhatsApp status live only inside
 * the AAO profile control in the fixed header. This section keeps the hiring
 * action focused on email, resume, portfolio and evidence.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  return (
    <ScrollFocusSection id="contact" eyebrow={siteCopy.contact.eyebrow} title={siteCopy.contact.title} copy={siteCopy.contact.body}>
      <SideSlideCard index={0} side="left">
        <div className="contact-shell relative overflow-hidden rounded-3xl p-6 sm:rounded-[2.35rem] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-emerald-400/10 blur-3xl sm:size-96" aria-hidden="true" />
          <div className="relative grid gap-8 xl:grid-cols-[1.1fr_.9fr] xl:items-end">
            <div>
              <p className="type-label text-[10px] text-emerald-300">Direct path</p>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Role, context, hard problem.</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">The fastest useful conversation starts with the mandate and the unresolved risk decision. The evidence behind the work is already available below.</p>
              <div className="mt-7 flex flex-col flex-wrap gap-3 sm:flex-row">
                <a href={`mailto:${siteConfig.email}?subject=Technology%20Risk%20%26%20GRC%20opportunity&body=Hi%20Abdullah%2C%0A%0ARole%3A%20%0ACompany%3A%20%0AThe%20risk%20or%20governance%20problem%20we%20need%20solved%3A%20%0A`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#07110f] transition-colors hover:bg-slate-200"><Mail size={16} /><span>{siteCopy.contact.primaryCta}</span></a>
                <a href="/career-assets/Md_Abdullah_Al_Owasi_Resume.docx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-bold text-[#04110d] transition-colors hover:bg-emerald-400"><Download size={16} /><span>{siteCopy.contact.resumeCta}</span></a>
                <button type="button" onClick={copyEmail} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm text-white transition-colors hover:bg-white/10">{copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}<span>{copied ? "Copied" : "Copy email"}</span></button>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/[0.08] bg-black/40 p-5 backdrop-blur-sm sm:p-6">
              <p className="type-label text-[9px] text-slate-400 sm:text-[10px]">{siteCopy.contact.mandateLabel}</p>
              <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{siteCopy.contact.mandate}</h3>
              <div className="mt-5 space-y-3 text-xs text-slate-400 sm:text-sm">
                <p className="flex items-start gap-2"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-400" /> Control-to-evidence architecture · TPRM decisioning · AI risk operations</p>
                <p className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-emerald-400" /> {siteCopy.contact.locationLine}</p>
                <p className="flex items-start gap-2"><Check size={15} className="mt-0.5 shrink-0 text-emerald-400" /> {siteCopy.contact.assetLine}</p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
            <a href="/career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"><span className="type-label text-[9px] text-emerald-300">Portfolio</span><span className="mt-1 block">Governance architecture and case studies</span></a>
            <a href="/artifacts/Governance_Evidence_Workbook.xlsx" className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"><span className="type-label text-[9px] text-emerald-300">Workbook</span><span className="mt-1 block">Detailed controls, risks and evidence models</span></a>
            <a href="/artifacts/Governance_Evidence_Matrix.xlsx" className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"><span className="type-label text-[9px] text-emerald-300">Evidence matrix</span><span className="mt-1 block">Requirement-to-evidence traceability</span></a>
          </div>
        </div>
      </SideSlideCard>
    </ScrollFocusSection>
  );
}

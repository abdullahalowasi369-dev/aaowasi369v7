"use client";

import { ArrowUp, Mail, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import siteCopy from "@/data/site-copy.json";

/**
 * FOOTER
 * ======
 * Social links intentionally do not repeat here. The AAO header profile is the
 * single social-network location, reducing noise and keeping the footer focused
 * on proof, navigation and contact.
 */
const footerLinks = [
  { name: "Executive value", href: "#value" },
  { name: "Architecture", href: "#proof" },
  { name: "Decision systems", href: "#projects" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Frameworks", href: "#frameworks" },
  { name: "Contact", href: "#contact" },
] as const;

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-white/[0.08] pb-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2"><span className="rounded bg-emerald-400 px-2 py-0.5 text-xs font-black text-slate-950 shadow-sm">AAO</span><span className="text-base font-bold text-white">{siteConfig.name}</span></div>
            <p className="type-label text-xs text-emerald-400">{siteCopy.footer.roleLine}</p>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">{siteCopy.footer.signature}</p>
          </div>

          <div>
            <h3 className="mb-4 type-label text-xs font-semibold text-slate-200">Navigation</h3>
            <ul className="space-y-2.5 text-xs">{footerLinks.map((link) => <li key={link.name}><a href={link.href} className="inline-block transition-colors hover:text-emerald-400">{link.name}</a></li>)}</ul>
          </div>

          <div>
            <h3 className="mb-4 type-label text-xs font-semibold text-slate-200">Evidence</h3>
            <ul className="space-y-2.5 text-xs">
              <li><a href="/career-assets/Md_Abdullah_Al_Owasi_Resume.docx" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-400">Resume</a></li>
              <li><a href="/career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-400">Portfolio</a></li>
              <li><a href="/artifacts/Governance_Evidence_Matrix.xlsx" className="transition-colors hover:text-emerald-400">Governance evidence matrix</a></li>
              <li><a href="/artifacts/Governance_Evidence_Workbook.xlsx" className="transition-colors hover:text-emerald-400">Governance evidence workbook</a></li>
            </ul>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h3 className="mb-4 type-label text-xs font-semibold text-slate-200">Direct contact</h3>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 break-all type-label text-xs text-emerald-400 transition-colors hover:text-emerald-300"><Mail size={14} className="shrink-0" /><span>{siteConfig.email}</span></a>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded border border-white/5 bg-white/[0.03] px-2.5 py-1 type-label text-[10px] text-slate-500"><ShieldCheck size={12} className="text-emerald-400" /><span>Evidence-led portfolio</span></div>
            </div>
            <button type="button" onClick={scrollToTop} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-slate-300 transition-all hover:bg-white/[0.1] hover:text-white"><span>Back to top</span><ArrowUp size={14} /></button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center type-label text-xs text-slate-500 sm:flex-row sm:text-left"><p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p><p className="text-[11px]">Next.js · TypeScript · Motion</p></div>
      </div>
    </footer>
  );
}

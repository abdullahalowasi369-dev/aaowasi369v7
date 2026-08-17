"use client";

import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  Globe as Github, // Maps Github to Globe
  Share2 as Facebook, // Maps Facebook to Share2
  Instagram, // Imported directly without shadowing MessageCircle
  Briefcase as Linkedin, // Maps Linkedin to Briefcase
  Menu,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";
import { siteConfig } from "@/data/portfolio";

/*
 * NAVIGATION / AAO PROFILE
 * ========================
 * This is the ONLY location where social-network links are displayed.
 * Edit URLs in data/portfolio.ts. Do not duplicate social links in Contact/Footer.
 * All six profile URLs are centralized in data/portfolio.ts and are published only in this AAO profile menu.
 */
const navLinks = [
  { name: "Overview", href: "#top" },
  { name: "Value", href: "#value" },
  { name: "Architecture", href: "#proof" },
  { name: "Systems", href: "#projects" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Contact", href: "#contact" },
];

const professionalLinks = [
  { name: "LinkedIn", href: siteConfig.social.linkedin, detail: "Professional profile", icon: Linkedin },
  { name: "GitHub", href: siteConfig.social.github, detail: "Code & repositories", icon: Github },
  { name: "X", href: siteConfig.social.x, detail: "Updates & writing", icon: X },
  { name: "WhatsApp", href: siteConfig.social.whatsapp, detail: "Direct message", icon: MessageCircle },
  { name: "Instagram", href: siteConfig.social.instagram, detail: "Personal profile", icon: Instagram },
  { name: "Facebook", href: siteConfig.social.facebook, detail: "Personal profile", icon: Facebook },
] as const;

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    const initialFrame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/85 font-sans backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              className="group flex items-center space-x-3 text-left focus:outline-none"
              aria-expanded={profileOpen}
              aria-controls="candidate-profile"
            >
              <div className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 text-xs font-black text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all group-hover:bg-emerald-300">
                  AAO
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" aria-hidden="true" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center space-x-1 text-sm font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300">
                  <span>{siteConfig.name}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180 text-emerald-400" : ""}`} />
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[10px] text-emerald-400">
                  <CheckCircle2 size={10} />
                  <span>Technology Risk · GRC · TPRM · AI Governance</span>
                </div>
              </div>
            </button>

            {profileOpen && (
              <div id="candidate-profile" className="absolute left-0 z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-white/15 bg-slate-950 p-5 shadow-2xl backdrop-blur-xl">
                <div className="border-b border-white/10 pb-3">
                  <p className="type-label text-xs font-bold text-emerald-400">Technology Risk & AI Governance</p>
                  <h4 className="mt-1 text-sm font-bold text-white">{siteConfig.name}</h4>
                  <p className="text-xs text-slate-400">Enterprise Assurance · Third-Party Risk · AI Governance</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{siteConfig.location} · evidence-led governance portfolio</p>
                </div>

                <div className="my-3.5 grid grid-cols-2 gap-2">
                  <a
                    href="/career-assets/Md_Abdullah_Al_Owasi_Resume.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1.5 rounded-lg bg-emerald-400 py-2 text-xs font-bold text-slate-950 transition-colors hover:bg-emerald-300"
                  >
                    <FileText size={13} />
                    <span>Resume</span>
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center justify-center space-x-1.5 rounded-lg border border-white/10 bg-white/10 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    <MessageSquare size={13} />
                    <span>Contact</span>
                  </a>
                </div>

                <p className="type-label mb-2 text-[10px] font-semibold text-slate-500">Profiles</p>
                <div className="space-y-1">
                  {professionalLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg p-2 text-xs text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <Icon size={13} className="text-emerald-400" />
                          {link.name}
                        </span>
                        <span className="type-label inline-flex items-center gap-1 text-[10px] text-slate-500">
                          {link.detail}
                          <ExternalLink size={10} />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <nav className="hidden items-center space-x-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`rounded-full px-2.5 py-1.5 text-xs font-medium transition-all duration-200 lg:px-3.5 ${
                    isActive ? "bg-emerald-400 font-bold text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.3)]" : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center space-x-3 lg:flex">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]"
            >
              <Briefcase size={14} />
              <span>Discuss a role</span>
            </a>
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="space-y-4 border-b border-white/10 bg-slate-950/95 px-4 pb-6 pt-4 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/5 hover:text-emerald-400"
              >
                <span>{link.name}</span>
                <span className="type-label text-[10px] text-slate-500">→</span>
              </a>
            ))}
          </div>
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="type-label flex items-center justify-between px-1 text-xs text-emerald-400">
              <span className="flex items-center space-x-1">
                <ShieldCheck size={14} />
                <span>Open to opportunities</span>
              </span>
              <span className="text-slate-400">Remote · Relocation</span>
            </div>
            <a
              href="/career-assets/Md_Abdullah_Al_Owasi_Resume.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-emerald-400 py-3 text-xs font-bold text-slate-950 transition-colors hover:bg-emerald-300"
            >
              <FileText size={15} />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

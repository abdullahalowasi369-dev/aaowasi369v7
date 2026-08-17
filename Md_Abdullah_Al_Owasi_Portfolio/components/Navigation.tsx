"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/portfolio";

/* Inline SVG Components — No external library dependencies */
function IconLinkedin({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function IconGithub({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function IconX({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconWhatsapp({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.81 9.81 0 0 0 12.04 2zm.01 16.5c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23z" />
    </svg>
  );
}

function IconInstagram({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconFacebook({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconChevronDown({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function IconCheckCircle({ className = "w-2.5 h-2.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconExternalLink({ className = "w-2.5 h-2.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18.75m0 0v5.25m0-5.25L10.5 13.5M9 6H6.75C5.784 6 5 6.784 5 7.75v10.5C5 19.216 5.784 20 6.75 20h10.5c.966 0 1.75-.784 1.75-1.75V15" />
    </svg>
  );
}

function IconMenu({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function IconClose({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

const navLinks = [
  { name: "Overview", href: "#top" },
  { name: "Value", href: "#value" },
  { name: "Architecture", href: "#proof" },
  { name: "Systems", href: "#projects" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Contact", href: "#contact" },
];

const professionalLinks = [
  { name: "LinkedIn", href: siteConfig.social.linkedin, detail: "Professional profile", icon: IconLinkedin },
  { name: "GitHub", href: siteConfig.social.github, detail: "Code & repositories", icon: IconGithub },
  { name: "X", href: siteConfig.social.x, detail: "Updates & writing", icon: IconX },
  { name: "WhatsApp", href: siteConfig.social.whatsapp, detail: "Direct message", icon: IconWhatsapp },
  { name: "Instagram", href: siteConfig.social.instagram, detail: "Personal profile", icon: IconInstagram },
  { name: "Facebook", href: siteConfig.social.facebook, detail: "Personal profile", icon: IconFacebook },
];

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
                  <IconChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180 text-emerald-400" : ""}`} />
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[10px] text-emerald-400">
                  <IconCheckCircle className="h-2.5 w-2.5" />
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
                    <span>Resume</span>
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center justify-center space-x-1.5 rounded-lg border border-white/10 bg-white/10 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    <span>Contact</span>
                  </a>
                </div>

                <p className="type-label mb-2 text-[10px] font-semibold text-slate-500">Profiles</p>
                <div className="space-y-1">
                  {professionalLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg p-2 text-xs text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <IconComponent className="h-3.5 w-3.5 text-emerald-400" />
                          {link.name}
                        </span>
                        <span className="type-label inline-flex items-center gap-1 text-[10px] text-slate-500">
                          {link.detail}
                          <IconExternalLink className="h-2.5 w-2.5" />
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
              {mobileMenuOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
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
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

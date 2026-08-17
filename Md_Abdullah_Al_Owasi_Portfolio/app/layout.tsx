import type { Metadata, Viewport } from "next";
import MotionProvider from "@/components/MotionProvider";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";

/**
 * LAYOUT / SEO EDITING GUIDE
 * Purpose: global metadata, viewport behavior and structured professional identity.
 * Edit siteConfig in data/portfolio.ts for canonical URL/name; keep metadata claims aligned with visible page copy.
 * Do not add unsupported credentials, employers, years or outcomes to metadata/JSON-LD: search surfaces can expose them.
 */
export const viewport: Viewport = {
  themeColor: "#07100e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  title: {
    default: `${siteConfig.name} — Technology Risk, GRC & AI Governance`,
    template: `%s · ${siteConfig.name}`,
  },
  description: "Technology Risk and AI Governance architecture across control assurance, third-party risk, evidence operations, AI risk and decision-grade reporting.",
  keywords: [
    "Technology GRC",
    "Technology Risk",
    "AI Governance",
    "Third-Party Risk",
    "TPRM",
    "SOC 2",
    "ISO 27001",
    "NIST AI RMF",
    "EU AI Act",
    "Security Compliance",
    "Enterprise Assurance",
    "Control Testing",
    "Audit Readiness",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.social.linkedin }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Technology Risk, GRC & AI Governance`,
    description: "Technology Risk, TPRM and AI governance systems designed around evidence lineage, accountable ownership, exceptions, residual risk and decision quality.",
    url: siteConfig.canonicalUrl,
    siteName: `${siteConfig.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Technology Risk, GRC & AI Governance`,
    description: "Evidence architecture and decision systems across enterprise assurance, third-party risk and AI governance.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.canonicalUrl,
    email: `mailto:${siteConfig.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.x, siteConfig.social.instagram, siteConfig.social.facebook],
    knowsAbout: [
      "Technology GRC",
      "Technology Risk",
      "Third-Party Risk Management",
      "AI Governance",
      "SOC 2",
      "ISO/IEC 27001",
      "NIST AI RMF",
      "EU AI Act Article 50",
      "Enterprise Assurance",
    ],
  };

  return (
    <html lang="en" className="dark">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

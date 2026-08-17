import Contact from "@/components/Contact";
import CursorGlow from "@/components/CursorGlow";
import Flagship from "@/components/Flagship";
import Footer from "@/components/Footer";
import ExecutiveBrief from "@/components/ExecutiveBrief";
import Frameworks from "@/components/Frameworks";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import ProjectShowcase from "@/components/ProjectShowcase";
import ScrollProgress from "@/components/ScrollProgress";
import SkillMatrix from "@/components/SkillMatrix";
import Timeline from "@/components/Timeline";

/**
 * PAGE ORDER EDITING GUIDE
 * This file controls section order only. Section copy belongs in data/site-copy.json / data/portfolio.ts.
 * Current conversion order: Hero → Executive Value → Flagship Proof → Project Systems → Capabilities → Operating Thesis → Frameworks → Contact.
 * Reorder only when a target audience clearly benefits; keep proof ahead of long background/detail sections.
 */
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <CursorGlow />
      <Navigation />
      <main id="main-content">
        <Hero />
        <ExecutiveBrief />
        <Flagship />
        <ProjectShowcase />
        <SkillMatrix />
        <Timeline />
        <Frameworks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

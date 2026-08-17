/*
 * SECTION HEADING EDITING GUIDE
 * Shared typography for section title/copy. Premium feel comes from the global display-font token in app/globals.css.
 */

export default function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[1fr_1.05fr] md:items-end md:gap-12 lg:mb-14">
      <div>
        <p className="mb-3 type-label text-[10px] text-emerald-300 sm:text-xs">{eyebrow}</p>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">{title}</h2>
      </div>
      {copy ? <p className="max-w-2xl text-base leading-7 text-slate-400 md:justify-self-end lg:text-lg lg:leading-8">{copy}</p> : null}
    </div>
  );
}

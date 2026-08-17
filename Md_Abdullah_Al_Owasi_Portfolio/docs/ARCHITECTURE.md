# Website Architecture & Editing Map

## Conversion model

The homepage answers five questions in order:

1. Who is this candidate?
2. What problems can he work on?
3. What evidence exists?
4. How does he reason from requirement to decision?
5. How do I inspect more or contact him?

The signature operating model is:

`Requirement → Control → Evidence → Exception → Residual Risk → Decision`

## Content control layers

### Layer 1 — Word-controlled high-impact copy

`career-assets/Website_Content_Guide.docx`

Run `scripts/sync_content_from_docx.py` to update existing keys in `data/site-copy.json`. Unknown keys are rejected and a timestamped backup is made before changes.

### Layer 2 — Structural/evidence content

`data/portfolio.ts`

Controls factual identity fields, professional URLs, verified portfolio counts, flagship modules, project cards, capability evidence and framework source links.

### Layer 3 — Components

`components/*.tsx`

Controls layout, interaction and presentation. High-impact components contain comments explaining their role, edit zones and claim guardrails.

### Layer 4 — Typography and visual tokens

`app/globals.css`

The existing emerald/cyan brand remains primary. The `TYPOGRAPHY CONTROL PANEL` controls native system font stacks, optical sizing, tracking, heading weights and rendering behavior.

## Main components

- `Navigation.tsx` — navigation, AAO profile, professional social links and resume access.
- `Hero.tsx` — first-screen identity, positioning, frameworks, CTAs and verified counts.
- `ExecutiveBrief.tsx` — employer-value translation and decision chain.
- `Flagship.tsx` — deep assurance/TPRM/AI-governance architecture.
- `ProjectShowcase.tsx` — ten system cards, filtering, evidence links and modal details.
- `SkillMatrix.tsx` — capability-to-evidence mapping.
- `Timeline.tsx` — operating thesis and technical/education foundation.
- `Frameworks.tsx` — framework operating logic and primary sources.
- `Contact.tsx` — role discussion, email, resume, portfolio and evidence assets.
- `Footer.tsx` — restrained secondary navigation and evidence-asset links; social links stay in the AAO header only.

## Accessibility and machine readability

- semantic headings and selectable HTML text;
- visible keyboard focus;
- reduced-motion handling;
- skip link;
- no essential text rendered only inside graphics;
- accessible project modal;
- descriptive document and workbook link text.

## Static assets

Website downloads must exist under:

- `public/career-assets/`
- `public/artifacts/`

After replacing a career document or workbook, copy the final file into the matching public directory and re-run the build/link checks.

# Md. Abdullah Al Owasi — Portfolio

Technology Risk, GRC, Third-Party Risk and AI Governance portfolio built with Next.js, React, TypeScript, Tailwind CSS and Motion for React.

## Build

The project is a pure static export. A successful production build creates the complete deployable website in `out/`.

```bash
npm install --no-audit --no-fund
npm run check
npm run lint
npm run build
npm start
```

`npm run build` automatically executes source/asset preflight validation before Next.js and static-export verification afterward.

## Cloudflare Pages

```text
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Output directory: out
Node.js: 22.16.0 / 22.x
```

## Vercel

```text
Framework preset: Next.js
Build command: npm run build
Node.js: 22.x
```

See `docs/DEPLOYMENT.md` for full deployment and failure-diagnosis instructions.

## Central configuration

- `data/portfolio.ts` — professional facts, social URLs, project/framework data and canonical URL.
- `data/site-copy.json` — centralized editable website copy.
- `career-assets/Website_Content_Guide.docx` — Word interface for controlled copy fields.

After editing supported Word fields:

```bash
npm run sync:copy
```

## Social profiles

The AAO header profile is the single visible social-network surface:

- LinkedIn: https://www.linkedin.com/in/md-abdullah-al-owasi/
- GitHub: https://github.com/abdullahalowasi369-dev
- X: https://x.com/aaowasi369
- WhatsApp: https://wa.me/601163994321
- Instagram: https://www.instagram.com/_aaowasi_
- Facebook: https://www.facebook.com/abdullah.prannoy.7

## Candidate assets

- `career-assets/Md_Abdullah_Al_Owasi_Resume.docx`
- `career-assets/Md_Abdullah_Al_Owasi_Cover_Letter.docx`
- `career-assets/Md_Abdullah_Al_Owasi_Portfolio.docx`
- `career-assets/Governance_Evidence_Matrix.xlsx`
- `career-assets/Governance_Evidence_Workbook.xlsx`

Public website downloads are mirrored under `public/`. The prebuild checker rejects stale mismatches between the source and public copies.

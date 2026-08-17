# Maintenance Scripts

## Production checks

`preflight.mjs` runs automatically before `next build` and can also be run directly:

```bash
npm run check
```

It validates the portable static-export contract, required files, social URLs, navigation targets and public candidate assets before Next.js starts.

`verify-static-export.mjs` runs automatically after a successful `next build`. It validates `out/`, generated HTML/chunks, downloadable assets, local references and rendered profile links.

`serve-static.mjs` powers `npm start` after a build. It is a zero-dependency preview server for the generated `out/` directory.

## Word -> website copy sync

`sync_content_from_docx.py` reads controlled fields from `career-assets/Website_Content_Guide.docx`, backs up `data/site-copy.json`, rejects unknown keys and updates the centralized website copy.

```bash
npm run sync:copy
```

The `.bat` and `.sh` wrappers remain available for direct desktop use.

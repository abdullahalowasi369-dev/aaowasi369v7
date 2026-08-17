# Deployment

This portfolio is intentionally built as a **pure Next.js static export**. `next.config.ts` sets `output: "export"`; a successful `npm run build` writes the deployable site to `out/`. There are no API routes, middleware, request-time cookies/headers, Server Actions, databases, Edge Functions or platform-specific Next.js adapters.

## Production gate

Use Node 22.16.0 (the repository includes `.nvmrc` and `.node-version`), then run:

```bash
npm install --no-audit --no-fund
npm run check
npm run lint
npm run build
```

The build now has two automatic gates:

- `prebuild` runs `scripts/preflight.mjs` before Next.js. It checks deployment configuration, required public downloads, source/public asset parity, all six social URLs, static-export hazards and navigation targets.
- `postbuild` runs `scripts/verify-static-export.mjs` after Next.js. It checks `out/`, HTML, JS/CSS chunks, required downloads, local references and rendered social/profile links.

Do not approve a deployment if either gate fails.

## Cloudflare Pages

Use the static Pages path, not a full-stack/SSR Next.js adapter.

```text
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: folder containing package.json
Node.js: 22.16.0 / 22.x
```

`public/_headers` is copied to `out/_headers` by the static export and can be consumed by Cloudflare Pages.

If an existing Pages project previously used `.next` as its output or a full-stack/Workers adapter, correct the project to the settings above and clear a stale build cache before redeploying.

## Vercel

```text
Framework preset: Next.js
Root directory: folder containing package.json
Build command: npm run build
Node.js: 22.x
```

Do not override the output directory in Vercel. Its Next.js integration reads the application configuration; this project itself emits a static export.

`vercel.json` contains security headers only. It does not create functions or a server runtime.

## Ordinary static hosting

After a successful build, upload the **contents of `out/`** to the site root. Because the website is a static export with `trailingSlash: true`, it does not require Node.js on the destination server.

## Local production preview

After `npm run build`:

```bash
npm start
```

The repository includes a zero-dependency static preview server for `out/` at `http://localhost:3000`.

## Canonical URL

The canonical production URL is centralized as `siteConfig.canonicalUrl` in `data/portfolio.ts`. It currently targets the Cloudflare Pages production URL. If you later change the public domain, that value must match the real public URL because it drives canonical metadata, structured data, robots and sitemap output.

## Failure diagnosis

Read the first failing stage:

- dependency installation fails -> registry/network/runtime problem before application compilation;
- `prebuild` fails -> source/configuration/asset contract problem, with an explicit message;
- `lint` fails -> lint/code-quality problem;
- `next build` fails -> TypeScript, React, Next.js or bundling problem;
- `postbuild` fails -> Next exported, but the generated static site is incomplete/broken;
- upload/deploy fails after a verified `out/` -> hosting project/configuration issue.

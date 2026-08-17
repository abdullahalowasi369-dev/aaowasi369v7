# QA Record

## Deployment architecture

- Static export: `output: "export"`.
- Static-host route portability: `trailingSlash: true`.
- Node target: 22.16.0 / 22.x.
- No Cloudflare/Vercel runtime adapter required.
- No request-time server feature intentionally used.

## Source validation

- Required source/configuration/public files: PASS.
- Six exact social URLs: PASS.
- Candidate asset/public-download byte parity: PASS.
- Navigation targets: PASS.
- Static-export incompatible API scan: PASS.
- Local candidate asset link scan: PASS.
- JavaScript/MJS syntax checks: PASS.
- Python sync script bytecode compilation: PASS.
- TypeScript/TSX syntax transpilation: 29 files, 0 failures.
- Strict internal type simulation: PASS.
- CSS parse: PASS.

## Material build defect fixed

`AIRiskHeatmap.tsx` previously initialized state from the first item of an `as const` tuple without an explicit union type. Strict TypeScript can narrow that state to the first literal ID and reject subsequent use-case IDs. The state is now explicitly typed from the union of all valid heatmap IDs.

## Device/performance hardening

- desktop/ultrawide spatial motion remains bounded;
- tablet/foldable transforms are reduced;
- mobile uses vertical micro-motion instead of page-width lateral travel;
- coarse/touch devices avoid the large cursor glow;
- pointer glow runs only on fine hover-capable pointers;
- safe-area insets are supported;
- horizontal overflow has both modern `clip` and `hidden` fallback;
- old MediaQueryList listener fallback is retained for older Safari/WebViews;
- reduced-motion users avoid large spatial transforms;
- globally visible keyboard focus remains enabled.

## Automatic production gates

`scripts/preflight.mjs` runs before every Next build. `scripts/verify-static-export.mjs` runs after every successful Next build. Both are dependency-free Node scripts so they provide direct diagnostic failures.

## Environment limitation during packaging

The packaging container could not resolve/reach the public npm registry, so dependency installation could not be completed here. This QA record therefore does **not** claim that `npm install`, the real ESLint package, or the real Next.js bundler ran in this container.

The repository compensates by pinning verified package versions, performing source/type/static checks locally, and including a CI/build gate that runs the actual dependency-backed sequence on an internet-connected builder:

```bash
npm install --no-audit --no-fund
npm run check
npm run lint
npm run build
```

A production deployment is approved only when that external dependency-backed build succeeds.

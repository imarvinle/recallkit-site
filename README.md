# Recallkit · Marketing Site

> Public landing page at [recallkit.org](https://recallkit.org/) for the
> **Archive — ChatGPT Backup & Export** browser extension.

Stack: Vite + React 18 + TypeScript + Tailwind CSS. Static output, deploys
to anywhere that serves files (Vercel / Netlify / Cloudflare Pages /
GitHub Pages / your own nginx).

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:5174
pnpm build        # static bundle in dist/
pnpm preview      # serve dist/ locally
```

## Deploy

The output is a vanilla static site — `dist/` after `pnpm build`.

### Vercel / Netlify
Point at this repo, no special config. Output dir: `dist`.

### Cloudflare Pages
Build cmd: `pnpm build` · Output dir: `dist`

### Self-hosted nginx
Just rsync `dist/` somewhere and serve. Make sure `/privacy`, `/terms`
fall back to the SPA's `index.html` if you add subroutes later (currently
single page so no fallback needed).

## Structure

```
index.html             SEO meta + OG + JSON-LD schema
src/
  main.tsx             React entry
  App.tsx              Routes home only for now
  pages/Home.tsx       The landing page itself
  index.css            Tailwind base + utility classes (btn, card, …)
public/
  favicon.svg          Sage-deep logomark (matches the extension)
  robots.txt           Allow all, sitemap pointer
  sitemap.xml          Single URL — extend when adding pages
```

## Roadmap

- [ ] `/privacy` page (render `docs/privacy-en.md` from the extension repo)
- [ ] `/changelog` page (mirrors the extension's release notes)
- [ ] og-image.png — render a hero card to PNG for OpenGraph previews
- [ ] i18n route `/en` for English-first audiences
- [ ] Anchor links from extension popup → recallkit.org/<feature>

## Brand

- Primary: `#496A48` (sage-deep)
- Soft accent: `#E9EFE8` (sage-soft)
- Neutral grays: zinc ramp
- Display font: Fraunces (italic for emotional accents)
- Body font: Inter

Same palette as the extension itself, intentionally.

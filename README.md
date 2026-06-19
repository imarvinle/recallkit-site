# KeepChat AI · Website

> Public landing page at [keepchatai.com](https://keepchatai.com/) for the
> **KeepChat AI — ChatGPT Backup, Search & Degrade Detection** browser extension.

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
Just rsync `dist/` somewhere and serve. Make sure `/privacy`, `/library`,
`/changelog`, `/degraded`, `/install`, and `/c/:id` fall back to the SPA's
`index.html`.

## Structure

```
index.html             SEO meta + OG + JSON-LD schema
src/
  main.tsx             React entry
  App.tsx              Tiny pathname router
  pages/Home.tsx       Landing page
  pages/Privacy.tsx    Privacy policy
  pages/Library.tsx    Extension-backed archive reader shell
  pages/Reader.tsx     Single conversation reader
  pages/Changelog.tsx  Release notes
  pages/Degraded.tsx   ChatGPT model degradation explainer
  pages/Install.tsx    Chrome installation guide
  index.css            Tailwind base + utility classes (btn, card, …)
public/
  favicon.svg          Sage-deep logomark (matches the extension)
  robots.txt           Allow all, sitemap pointer
  sitemap.xml          Public route list
```

## Roadmap

- [ ] og-image.png — render a hero card to PNG for OpenGraph previews
- [ ] i18n route `/en` for English-first audiences
- [ ] Anchor links from extension popup → keepchatai.com/<feature>

## Brand

- Primary: `#496A48` (sage-deep)
- Soft accent: `#E9EFE8` (sage-soft)
- Neutral grays: zinc ramp
- Display font: Fraunces (italic for emotional accents)
- Body font: Inter

Same palette as the extension itself, intentionally.

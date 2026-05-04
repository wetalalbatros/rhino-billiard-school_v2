# Rhino Billiard School · React + Vite + TypeScript

Single-page site + blog for the Rhino billiard school in Kyiv.

## Stack
- **Vite 5** — fast dev server, HMR
- **React 18 + TypeScript**
- **react-router-dom v6** — `/`, `/blog`, `/blog/:slug`
- **Plain CSS** with CSS variables (one global `styles.css`)

## Setup

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # serve dist/ locally
```

## Project structure

```
src/
├── main.tsx                    # entry, React root + BrowserRouter
├── App.tsx                     # route table
├── styles.css                  # global design system (tokens, components)
├── data/
│   └── blog.ts                 # blog posts + videos
├── components/
│   ├── Icon.tsx                # SVG icon set
│   ├── PoolTableHero.tsx       # interactive pool-table hero (drag cue)
│   ├── Nav.tsx                 # top nav
│   ├── Hero.tsx                # hero section
│   ├── Ticker.tsx              # marquee
│   ├── Stats.tsx               # 4-column stats
│   ├── Program.tsx             # 4-row program ladder
│   ├── Coach.tsx               # coach card
│   ├── Pricing.tsx             # 3 price tiers
│   ├── Schedule.tsx            # interactive 7×12 grid
│   ├── Features.tsx            # 6-up "why us" grid
│   ├── Glossary.tsx            # interactive term explorer
│   ├── BlogVideos.tsx          # homepage blog teaser
│   ├── Reviews.tsx             # testimonial cards
│   ├── FAQ.tsx                 # accordion
│   ├── Contact.tsx             # location + map iframe
│   ├── FinalCTA.tsx            # closing CTA
│   ├── Footer.tsx              # footer
│   ├── BookingModal.tsx        # 2-step booking form
│   ├── BlogNav.tsx             # blog top nav (links to homepage anchors)
│   └── BlogFooter.tsx          # blog footer
└── pages/
    ├── Home.tsx                # combines all home sections
    ├── BlogIndex.tsx           # /blog — list view
    └── BlogPost.tsx            # /blog/:slug — article reader
```

## Routes

| Path             | Page             |
|------------------|------------------|
| `/`              | `Home`           |
| `/blog`          | `BlogIndex`      |
| `/blog/:slug`    | `BlogPost`       |

## Design tokens

All design tokens live in `src/styles.css` under `:root`. Brand felt-green hue
is `--felt`, brass accent is `--brass`, fonts are loaded from Google Fonts at
the top of the file.

## Deploying

The build output is a static SPA in `dist/`. Drop it on Netlify, Vercel, GitHub
Pages, or any static host. **Important:** for SPA routing (so `/blog/:slug`
deep-links work on refresh), configure your host to fall back to `index.html`
on 404. Examples:

- **Netlify** — add `_redirects` file to `public/`:
  ```
  /*  /index.html  200
  ```
- **Vercel** — works out of the box with Vite preset
- **Apache** — `.htaccess` rewrite to `index.html`

## What was preserved from the static HTML version

- All Ukrainian copy, prices, contacts
- The interactive pool-table hero with drag-to-aim physics
- Blog posts with full content
- All design tokens, layouts, and animations
- The 2-step booking modal

## What was removed

- The `Tweaks` panel (was a runtime tool for the design environment)
- `EDITMODE-BEGIN/END` markers (no longer needed)
- The bundler-thumbnail templates (no longer needed)

Feel free to edit, split components, swap CSS for CSS Modules / Tailwind,
add ESLint/Prettier, or extend the routing.

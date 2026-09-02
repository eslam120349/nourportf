# Nour Youssef — Portfolio

A comic-book / manga inspired portfolio site, black and white with a single red accent, built with React + Vite.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The production build is output to `dist/`, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc).

## Structure

This is a real multi-page site built with `react-router-dom`, not a single scrolling page.

- `src/App.jsx` — route definitions (`/`, `/work`, `/about`, `/contact`)
- `src/components/Layout.jsx` — persistent nav tabs + footer, and the page-flip transition between routes
- `src/pages/` — one file per page: `Home.jsx`, `Work.jsx`, `About.jsx`, `Contact.jsx`
- `src/components/Panel.jsx` — the scroll-reveal wrapper used across pages
- `src/components/SEO.jsx` — reusable per-page SEO/meta component (see below)
- `src/data.js` — shared content (`PROJECTS`, `PROCESS`, `QUOTES`)
- `src/styles/global.css` — the whole visual system (comic panel borders, halftones, nav tabs, book-flip stage)
- `src/main.jsx` — entry point: wraps the app in `HelmetProvider` and `BrowserRouter`

## Page-flip transition

`src/components/Layout.jsx` wraps the routed page in a `framer-motion` `AnimatePresence`. Each page rotates in on the Y axis with `perspective` applied on the parent (`.book-stage` / `.book-page` in `global.css`) so switching tabs feels like turning a page in a comic book, rather than a flat crossfade. Direction (page turning "forward" vs "back") is derived from each route's position in the `ORDER` array at the top of `Layout.jsx` — reorder that array if you reorder the nav tabs.

## Adding a new page

1. Create `src/pages/NewPage.jsx`, following the pattern in the other pages (start with an `<SEO .../>` at the top).
2. Add a `<Route path="/new-page" element={<NewPage />} />` inside `src/App.jsx`.
3. Add `{ to: "/new-page", label: "New Page" }` to the `TABS` array and `/new-page` to the `ORDER` array in `src/components/Layout.jsx`.

## Editing content

Project entries, process steps, and testimonials live in `src/data.js` (`PROJECTS`, `PROCESS`, `QUOTES`) — edit those to update the site's content across pages.

## Opening intro

`src/components/Intro.jsx` (styled by `src/styles/intro.css`) is a full-screen preloader that plays once per browser session on first load. It's built as a comic title-card beat, not a quiet logo reveal: a halftone speed-line burst kicks in behind the wordmark, "NOUR YOUSSEF" slams into place with a spring overshoot, a comic caption box types out a line, and a "POW!" sticker pops in the corner. On exit, the whole page tears apart down a red gutter line and the two halves swing off screen in opposite directions — a panel splitting open, echoing the panel-bordered language used across the rest of the site.

It's gated by `sessionStorage` in `src/App.jsx` (`INTRO_KEY = "nour-intro-shown"`) so it won't replay on in-app navigation or a refresh later in the same session — only a fresh session shows it again. To preview it again while developing, clear that key from your browser's session storage (DevTools → Application → Session Storage) or open an incognito window.

To adjust timing, edit `HOLD_MS` (how long the page holds before tearing open) and `EXIT_MS` (the tear/exit duration) at the top of `Intro.jsx`.

## SEO

`src/components/SEO.jsx` is a reusable component that sets the page `<title>`, meta description, canonical URL, Open Graph tags, Twitter card tags, and (optionally) JSON-LD structured data. Drop it at the top of any page and pass page-specific props — every prop besides `title` has a fallback, so a new page can start minimal:

```jsx
import SEO from "./components/SEO.jsx";

<SEO
  title="Selected work"
  description="Brand identity, editorial, and product design by Nour Youssef."
  path="/work"
  keywords="portfolio, brand identity, packaging design"
/>
```

If you add routing later (e.g. `react-router-dom`), place an `<SEO ... />` at the top of each route/page component with that page's own `title`, `description`, and `path` — the component updates the document head automatically on navigation via `react-helmet-async`.

Also included:
- `public/robots.txt` — points crawlers to the sitemap
- `public/sitemap.xml` — add a `<url>` entry per page as the site grows
- `index.html` — static fallback title/description/theme-color, overridden at runtime by `SEO`

## Deploying (client-side routing)

Since this uses `react-router-dom`, static hosts need to be told to serve `index.html` for every route (e.g. a direct visit to `/work`), or those URLs 404. This is already set up for the two most common hosts:
- **Netlify** — `public/_redirects`
- **Vercel** — `vercel.json`

For GitHub Pages or another static host, add an equivalent rewrite/fallback rule for your platform.

Before deploying, update the placeholder domain (`https://www.nouryoussef.design`) and social links inside `src/components/SEO.jsx` and `public/sitemap.xml` to the real ones.

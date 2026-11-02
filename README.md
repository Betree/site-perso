# Benjamin Piouffle

Personal website for [Benjamin Piouffle](https://benjamin.piouffle.com).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Content

- **Blog posts:** `src/content/blog/` (Markdown + co-located images)
- **Site copy & links:** `src/data/site.ts`

## Deploy

Static output is in `dist/`. `public/CNAME` targets GitHub Pages. `public/_redirects` provides Netlify/Cloudflare 301 rules for legacy blog paths.

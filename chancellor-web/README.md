# Chancellor Hotel Boracay Website Prototype

Vite-ready static multi-page prototype prepared for Vercel deployment.

## Pages
- `index.html` — Homepage
- `rooms.html` — Room listing page
- `dining.html` — Dining page
- `facilities.html` — Facilities page
- `offers.html` — Offers page with category filters
- `nearby-places.html` — Nearby places / area guide page
- `contact.html` — Contact page with form validation

## Project structure
- `src/styles.css` — Shared CHB design tokens, layout, components, responsive rules
- `src/main.js` — Mobile navigation, reveal animation, booking/contact validation, offer filters
- `vite.config.js` — Multi-page Vite build entries
- `vercel.json` — Vercel build/output settings

## Local setup
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Vercel deployment settings
Vercel should detect the Vite framework automatically. If you configure it manually, use:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Notes
This prototype uses Google Fonts and remote Unsplash image URLs for preview purposes. Replace image URLs and placeholder contact details with final brand-approved assets and operational information before production.

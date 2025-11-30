# Susie Booking App

Modern React app for a photo/booth booking experience with availability checks, rich gallery/album views, FAQs, and contact flow. Built with Vite, TypeScript, Tailwind CSS, and shadcn-ui components.

## Tech Stack

- React 18 + TypeScript (Vite)
- React Router 6
- Tailwind CSS + tailwind-merge + tailwindcss-animate
- shadcn-ui (Radix primitives)
- TanStack Query
- Recharts, Embla Carousel, LightGallery, React Photo Album

## Prerequisites

- Node.js 18+ and npm
- Git

## Getting Started

```sh
# 1) Clone
git clone <REPO_URL>
cd susie-booking-app

# 2) Install dependencies
npm i

# 3) Start dev server
npm run dev
```

By default Vite serves at http://localhost:5173.

## Scripts

- dev: Start the Vite dev server
- build: Production build
- build:dev: Development-mode build (useful for debugging prod-like build)
- preview: Preview the production build locally
- lint: Run ESLint across the project

```sh
npm run dev
npm run build
npm run build:dev
npm run preview
npm run lint
```

## Project Structure

```
src/
  pages/               # Route components (Home, Gallery, Album, FAQ, etc.)
  components/          # UI blocks and shadcn-ui wrappers
  components/ui/       # Generated shadcn-ui primitives
  hooks/               # Reusable hooks
  lib/                 # Utilities (e.g., className helpers)
  assets/              # Images
  App.tsx              # Router configuration
  main.tsx             # App bootstrap
```

Key routes are configured in `src/App.tsx` using `react-router-dom`.

## Environment Variables

This project runs without required environment variables. All booking availability features use mock data for demonstration purposes. If you add APIs (email, analytics, etc.), place variables in a `.env` file at the project root per Vite's `import.meta.env` conventions.

Restart the dev server after changing env values.

## Development Notes

- UI is built with shadcn-ui; add new primitives via the generator pattern if needed.
- State fetching/caching uses TanStack Query; create a `QueryClient` and use hooks for server data.
- Tailwind is the primary styling system. Keep styles utility-first; prefer component variants where appropriate.

## Build & Deploy

1. Build the app:
   ```sh
   npm run build
   ```
2. Preview locally (optional):
   ```sh
   npm run preview
   ```
3. Deploy the contents of the `dist/` directory to your hosting provider (e.g., Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host).

For SPA routing on static hosts, ensure all unmatched routes fallback to `index.html`.

## Troubleshooting

- Port in use: start Vite on another port: `npm run dev -- --port 5174`.
- Type errors or lint issues: run `npm run lint` and address reported items.
- Missing images or 404s in the gallery: confirm assets exist in `src/assets` and routes match `src/pages` components.

## License

This project is proprietary to its owner. If you need a license file added or changed, update this section accordingly.

# Ashish Kumar — Portfolio

A single portfolio that speaks to two roles: **Full-Stack Developer** and **Data Analyst**.
A mode toggle in the nav (`</> dev` / `▤ data`) switches the headline, hero visual, project
metrics, and highlighted skills — same content, framed for whoever's reading it.

Built with React 19, Vite, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/        UI sections (Nav, Hero, Projects, Experience, Skills, Education, Footer)
  context/            ModeContext — the dev/data toggle state, consumed by every section
  data/content.js     All copy, project metrics, and links live here — edit this file
                       to update the site content, no need to touch components
```

## Before you deploy — things to fill in

- [ ] `src/data/content.js` → `profile.linkedin` — currently a placeholder `#`
- [ ] `src/data/content.js` → `profile.resumeDev` / `profile.resumeData` — drop the matching
      resume PDFs into `public/` (e.g. `public/resume-fullstack.pdf`) and update the paths
- [ ] `src/data/content.js` → `projects[].link` — point each project at its own GitHub repo
      instead of the profile URL
- [ ] `public/favicon.svg` — swap for your own mark if you want

## Deploying

Any static host works since this is a Vite SPA (`npm run build` outputs to `dist/`):

- **GitHub Pages**: run `npm run build`, then deploy `dist/` via the `gh-pages` package or a
  GitHub Actions workflow
- **Vercel / Netlify**: connect the repo, framework preset "Vite", build command
  `npm run build`, output directory `dist`

## Design notes

- Two accent colors (`--color-dev` teal, `--color-data` amber) swap based on mode — see the
  `@theme` block in `src/index.css`
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code/data figures)
- Reduced-motion is respected; all custom animation is disabled under
  `prefers-reduced-motion: reduce`

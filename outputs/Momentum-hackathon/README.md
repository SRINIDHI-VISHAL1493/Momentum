# Momentum

A frontend-first study planning dashboard built for the Frontend Web Development Hackathon 2026.

## The problem

Students often manage fragmented deadlines, study plans, and focus time across several tools. Momentum brings a daily task queue, light prioritisation, meaningful progress feedback, and a distraction-free focus timer into one fast, browser-based experience.

## Features

- Add, complete, filter, and delete tasks
- Persistent local storage — no account or backend required
- Smart high-priority and today filters
- 25-minute focus timer with pause/resume
- Responsive, keyboard-friendly interface for desktop and mobile
- Clear visual hierarchy, semantic markup, accessible labels, and reduced visual clutter

## What's inside

| Section | What it does |
|---|---|
| **Overview** | Today's intention, daily progress meter, focus-time stats, and weekly goal at a glance |
| **My tasks** | Add tasks with a due date, priority (high / medium / low), and estimated focus time; complete or delete them in one click |
| **Filters** | All / Today / High priority views to decide what deserves attention right now |
| **Focus room** | A 25-minute Pomodoro-style timer with start, pause, and resume — one task, no distractions |
| **Insights** | Weekly completed-task chart and progress notes that keep the streak alive |

## Technology

Vanilla JavaScript, semantic HTML, and modern CSS. No framework, no runtime dependencies, no backend, no account — the whole app ships as three files, so it loads fast and stays maintainable.

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 (`<dialog>`, `aria-live` regions, labelled controls) |
| Logic | Vanilla JavaScript (ES modules) |
| Styling | Modern CSS — custom properties, grid, flexbox |
| State | `localStorage` persistence, fully client-side |
| Build | Plain Node script that bundles `index.html` + `src/` into `dist/` |

## Getting started

No install step — the app runs from any static file server.

```bash
# dev server → http://localhost:5173
npm run dev

# production bundle → dist/
npm run build

# preview the production build → http://localhost:4173
npm run preview
```

The generated `dist/` folder is a plain static site: host it on GitHub Pages, Netlify, Vercel, or Cloudflare Pages with no environment variables or server configuration.

## Project structure

```
.
├── index.html          # single-page dashboard markup
├── src/
│   ├── main.js         # task state, rendering, filters, focus timer
│   └── style.css       # design system + responsive layout
├── scripts/
│   └── build.mjs       # static build (index.html + src/ → dist/)
└── dist/               # production bundle (generated)
```

## Browser support

Built for evergreen Chrome, Edge, Firefox, and Safari. Uses the native `<dialog>` element for the task form and standard grid/flexbox layout — no polyfills, no transpilation.

## Team

WebFascinators — Srinidhi Vishal Chejarla (Team Lead)

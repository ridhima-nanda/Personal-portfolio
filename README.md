# Portfolio

A personal portfolio site built with React 18, TypeScript, Vite, Tailwind CSS,
Framer Motion, and lucide-react. Every piece of content — profile, skills,
experience, services, projects, education, testimonials — lives in one JSON
file, so updating the site is a content edit, not a code change.

## Install

```bash
npm install
```

## Scripts

| Command           | What it does                                    |
| ------------------ | ------------------------------------------------ |
| `npm run dev`     | Starts the Vite dev server with hot reload       |
| `npm run build`   | Type-checks (`tsc -b`) and builds for production |
| `npm run preview` | Serves the production build locally              |
| `npm run lint`    | Runs oxlint                                       |

## Project structure

```
src/
  data/
    portfolio.json        <- ALL content lives here (see below)
  types/
    portfolio.ts           <- TypeScript types for the data shape
  hooks/
    usePortfolio.ts         <- typed hook that returns the JSON data
  components/
    Navbar.tsx
    SocialLinks.tsx
    HeroSection.tsx
    AboutSection.tsx
    SkillsSection.tsx        <- not in the original spec, added so the nav's
                                  #skills link and skills.categories[] data
                                  aren't dead ends (see note below)
    ExperienceSection.tsx
    ServicesSection.tsx
    ProjectsSection.tsx
    ProjectCard.tsx
    TestimonialsSection.tsx
    Footer.tsx
  App.tsx                    <- composes the sections in order
  index.css                  <- Tailwind directives, Kanit import, hero
                                  gradient, marquee keyframes, reduced-motion
tailwind.config.js            <- color tokens, font family, marquee keyframes
```

## Editing content

Open `src/data/portfolio.json`. Everything the site displays — except
static UI labels like "About" or "Projects" — comes from this file:

- **`profile`** — name, tagline, bio, avatar (inline SVG string), and
  `social` links. Leave a social field as an empty string (`""`) to hide
  that icon/link everywhere it's used — the Hero, Footer, and
  `SocialLinks` component all filter empty entries automatically.
  - **`resumeUrl`** — used by the Hero's "Download Resume" button. Leave
    it `""` and the button links to `#` as a placeholder; set it to a PDF
    URL (or an uploaded file's path) and the button opens it in a new tab.
  - **`availabilityBadge`** — the small pill above the headline (e.g.
    "Open to new opportunities"). Leave it `""` to hide the badge
    entirely.
- **`skills.categories[]`** — each category has a `name` and an `items[]`
  array of skill labels.
- **`experience[]`** — each entry renders with the first 3 items of
  `highlights[]`; add more and they won't show until the component is
  changed to show them.
- **`services[]`** — each entry is a `{ name, description }` row rendered
  in order; add, remove, or reorder rows freely, the numbering (`01`,
  `02`, ...) is derived from array position.
- **`projects[]`** — set `highlight: true` to have a project sort to the
  front of the Projects section and get the "Featured" badge. Leave
  `link` empty to hide the "Live project" button; leave `image` empty to
  fall back to a dark gradient placeholder with the title overlaid.
- **`education[]`** — not currently rendered in a dedicated section (the
  spec didn't include one); the data is typed and available via
  `usePortfolio()` if you want to add one.
- **`testimonials[]`** — `avatarColor` is any CSS color, used as the
  background of the initial-letter avatar circle.

No component file needs to change for ordinary content updates — edit the
JSON, save, and the dev server hot-reloads.

## Notes on deviations from the original spec

- **React 18 / Tailwind v3, pinned explicitly.** `npm create vite` now
  defaults to React 19 and Tailwind v4; both were downgraded to match the
  brief.
- **`lucide-react` pinned to `0.499.0`, not latest.** lucide-react's
  current major version (1.x) removed all brand icons (`Github`,
  `Linkedin`, `Instagram`) outright. The last 0.x release still has them.
  If you'd rather not carry a pinned legacy dependency long-term, swapping
  those three icons for custom inline SVGs and moving the rest of the
  icon set to latest is a reasonable follow-up.
- **`SkillsSection.tsx` was added.** The nav has a `SKILLS` link and the
  data schema defines `skills.categories[]`, but neither the "sections to
  build" list nor the component list included a Skills section. Without
  one, `#skills` pointed at nothing and the skills data was unused. It's
  a small, self-contained addition — remove it and the `#skills` nav
  link/data field if it wasn't meant to be there.
- **All profile/experience/services/project/testimonial content is
  placeholder.** ("Kabir Sethi," a fictional senior engineer) — replace it
  with real content in `portfolio.json` before shipping.
- **Hero redesign.** The hero now has a grid/noise background, glow blobs,
  a hero-scoped custom cursor (real cursor everywhere else on the site), a
  spinning avatar ring, an availability badge, a scrolling tech ticker
  (flattened from `skills.categories`), and a "Featured project" teaser
  card (pulled from the first `highlight: true` project, or `projects[0]`
  if none are flagged). All of it reads from `usePortfolio()` — nothing
  hardcoded. The old multi-icon social row was intentionally replaced with
  a single "Get in Touch" button that scrolls to the footer, where every
  contact method (email, phone, socials) already lives together.

## Hero headline sizing (`whitespace: nowrap` constraint)

The `Hi, I'm {shortName}` headline uses
`font-size: clamp(3rem, 13vw, 14rem)` with `white-space: nowrap`, and the
hero `<section>` has `overflow: hidden` as a fallback if the line is too
wide. This was measured against the real Kanit SemiBold font metrics at
375 / 768 / 1280 / 1920px:

- `shortName: "Kabir"` (5 characters) fits at all four breakpoints with
  comfortable margin.
- Names longer than ~8 characters (e.g. "Alexander", "Christopher") will
  overflow the available width at 375px, 768px, and 1280px, and get
  silently clipped by `overflow: hidden` rather than wrapping or
  shrinking further. Only the 1920px breakpoint has enough margin to
  absorb longer names, because the `14rem` clamp ceiling caps growth
  there.

If `shortName` ends up being longer than "Kabir," re-check this before
shipping — either accept the clipping, tighten the clamp's minimum/vw
values to buy more margin, or replace the fixed clamp with a JS-measured
auto-fit approach.

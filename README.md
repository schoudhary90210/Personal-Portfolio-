# Personal Portfolio

Siddhant Choudhary's personal site: **[siddhant-choudhary.vercel.app](https://siddhant-choudhary.vercel.app)**

A content-first portfolio covering experience, projects with case studies, education, skills and contact details. It's dark by default with a red accent and a light-mode toggle.

The previous Batman Arkham–style "Batcomputer" version still runs at [`/batcomputer`](https://siddhant-choudhary.vercel.app/batcomputer).

## Pages

| Route | What's there |
|---|---|
| `/` | Hero, experience timeline, featured projects, education, skills, contact |
| `/about` | Longer story, experience, leadership and hackathons, education, skills, interests |
| `/projects` | All projects |
| `/projects/[slug]` | Case study: problem, what was built, a key decision, results and limits |
| `/batcomputer` | The original Batman-themed experience |

Every page is statically generated.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| Fonts | Geist Sans and Geist Mono via `next/font` |
| Icons | lucide-react |
| Batcomputer | GSAP, Framer Motion, Howler.js, Canvas 2D |
| Hosting | Vercel |

## Editing content

All copy lives in typed modules under `src/content/`, so no component changes are needed to update the site:

| File | Contents |
|---|---|
| `site.ts` | Name, URL, email, GitHub, LinkedIn, resume path, location, graduation |
| `profile.ts` | Hero intro, current role line, About paragraphs |
| `experience.ts` | Work and research roles, earlier experience, leadership |
| `projects.ts` | Project case studies. `featured: true` puts a project on the home page |
| `education.ts`, `skills.ts`, `interests.ts` | Education, skill groups, hobbies |

The resume is served from `public/resume/Siddhant_Choudhary_Resume.pdf`.

## Project structure

```
src/
├── app/
│   ├── (site)/            # Main site: root layout, pages, OG image
│   ├── (batcomputer)/     # Batcomputer: its own root layout and CSS
│   ├── global-not-found.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/            # Navbar, Footer, Section, SiteShell
│   ├── sections/          # Hero, Experience, Projects, Education, Skills, Contact…
│   └── ui/                # Buttons, tags, cards, timeline, theme toggle, reveal
├── content/               # All site copy
├── lib/                   # Fonts, theme script, class helper
└── batcomputer/           # Batman experience components, hooks, data
```

The two route groups are separate root layouts. Batman fonts, global CSS and the custom cursor can't leak into the main site, and moving between the two is a full page load.

## Run locally

```bash
git clone https://github.com/schoudhary90210/Personal-Portfolio.git
cd Personal-Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

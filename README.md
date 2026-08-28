# AURATECH Studio — Visionary Architecture & Interior Luxury with CMS

[![Deploy to GitHub Pages](https://github.com/kuch278a/interior-web-with-CMS/actions/workflows/pages.yml/badge.svg)](https://github.com/kuch278a/interior-web-with-CMS/actions/workflows/pages.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-purple.svg)]()

> **Live Production Website**: **[https://kuch278a.github.io/interior-web-with-CMS](https://kuch278a.github.io/interior-web-with-CMS)**

An award-winning, luxury architectural and interior design studio web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. Features a powerful headless CMS control plane, live dynamic content bindings, interactive spatial cost estimators, multi-project featured selectors, and ultra-fast 50ms–100ms reaction speeds.

---

## 🌐 Live Production Deployments

| Platform | Status | URL |
|---|---|---|
| **GitHub Pages (Active)** | 🟢 Live & Automated | [https://kuch278a.github.io/interior-web-with-CMS](https://kuch278a.github.io/interior-web-with-CMS) |
| **CMS Admin Control Plane** | 🔒 Authenticated | [https://kuch278a.github.io/interior-web-with-CMS/admin](https://kuch278a.github.io/interior-web-with-CMS/admin) |
| **Vercel (Optional)** | ⚡ Ready for Import | [Deploy on Vercel](https://vercel.com/new) |

---

## ✨ Key Features & Architecture

- **🏛️ High-End Aesthetics & Glassmorphism**: Tailored luxury dark/light mode with glowing ambient orbs, micro-interactions, and smooth cubic-bezier transitions.
- **⚡ Ultra-Fast 50ms–100ms Reaction Engine**:
  - **Instant Theme Switching (50ms)**: Seamless color transitions between dark and light modes.
  - **Tactile Tap & Click Feedback (75ms)**: Snappy scale pops and active micro-animations on interactive controls.
  - **Glassmorphism Hover Reactions (80ms)**: Immediate visual elevation on cards and navigation items.
  - **Image Crossfades & Zooms (100ms)**: Ultra-responsive dual-image crossfades and portfolio card hover scaling.
- **🛠️ Full-Featured CMS Control Plane (`/admin`)**:
  - **🏠 Main Page Editor**: Customize hero titles, prefixes, accents, subtitles, metrics, and multi-project featured landmark selections.
  - **📁 Projects Manager**: Full CRUD for architectural landmarks (create, edit, delete, upload imagery, and toggle home features).
  - **📝 Blogs & Journal Manager**: Write, edit, publish, and manage editorial architectural treatises.
  - **⭐ Testimonials & Reviews**: Curate client endorsements, ratings, and press reviews.
  - **👥 Principals & Partners**: Add, edit, and manage leadership profiles, biographies, and partner portraits.
  - **🏢 Company & Socials**: Edit phone numbers, concierge email, physical atelier addresses, and social media URLs (Instagram, LinkedIn, Facebook).
  - **Seamless Multi-Layer Fallback**: Auto-initializes with persistent store data and syncs with `localStorage` across any computer or mobile browser.
- **📱 Fully Responsive Design**: Fluid layouts optimized across mobile phones (`<640px`), tablets (`640px–1024px`), laptops (`1024px–1280px`), and 4K desktop screens.
- **📐 Interactive Spatial Estimator (`/services`)**: Real-time project cost and timeline calculator based on square footage, classification, and finish tiers.
- **📝 Private Commissions Concierge (`/contact`)**: Multi-step project inquiry form with budget brackets, global atelier directories, and vector SVG social links.
- **🚀 100% Type-Safe & Zero Lint Errors**: Strict TypeScript models and full ESLint compliance.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Tokens |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **CMS / Backend** | Custom Headless REST API (`/api/cms`) + Local Store (`cms/data/store.json`) + Strapi Integration |
| **Hosting & CI/CD** | GitHub Pages + GitHub Actions (`.github/workflows/pages.yml`) |

---

## 📂 Project Structure

```text
├── .github/
│   └── workflows/
│       ├── pages.yml           # Automated GitHub Pages CI/CD workflow
│       └── deploy.yml          # Continuous integration build & lint check
├── cms/
│   ├── client.ts               # Universal CMS client with SSR & static fallback
│   ├── config.ts               # Strapi API config & endpoints
│   ├── types.ts                # TypeScript interfaces for all data models
│   ├── data/
│   │   └── store.json          # Persistent JSON store for CMS data
│   ├── models/                 # Strapi content type schemas (JSON)
│   └── strapi/                 # Strapi Docker Compose setup
├── src/
│   ├── app/
│   │   ├── page.tsx            # Main Homepage
│   │   ├── layout.tsx          # Global Root Layout & Viewport config
│   │   ├── globals.css         # Design system, glassmorphism, & theme tokens
│   │   ├── about/page.tsx      # Studio ethos, leadership team, & awards
│   │   ├── admin/              # CMS Control Plane & Login
│   │   ├── api/cms/route.ts    # REST API Route for CMS store
│   │   ├── api/upload/route.ts # File upload API route
│   │   ├── blog/page.tsx       # Editorial architectural blogs & journal
│   │   ├── contact/page.tsx    # Inquiry form, atelier directory, & socials
│   │   ├── projects/page.tsx   # Portfolio archive & case study modals
│   │   ├── services/page.tsx   # Capabilities, 4-phase roadmap, & estimator
│   │   └── testimonials/page.tsx # Client reviews & press mentions
│   └── components/
│       └── ui/                 # Reusable UI components
│           ├── DarkModeToggle.tsx # Ultra-reactive theme switcher
│           └── Navbar.tsx         # Responsive glassmorphism header navigation
├── next.config.ts              # Next.js configuration (static export + basePath)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- **Node.js**: v18.18.0 or later (v20+ recommended)
- **npm** (or `pnpm` / `yarn` / `bun`)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/kuch278a/interior-web-with-CMS.git
cd interior-web-with-CMS
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Verification
```bash
# Run ESLint check
npm run lint

# Create production build
npm run build

# Start production server
npm run start
```

---

## 🔐 CMS Control Plane (`/admin`)

Access the studio control plane to manage homepage copy, projects, blogs, testimonials, leadership partners, and company contact details:

- **Local Admin**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Live Admin**: [https://kuch278a.github.io/interior-web-with-CMS/admin](https://kuch278a.github.io/interior-web-with-CMS/admin)
- **Login Credentials**: `admin@auratech.design` / `admin123`

---

## 🤖 Automated CI/CD & Deployment

Every commit pushed to `master` automatically triggers the **[GitHub Pages Workflow](.github/workflows/pages.yml)**:
1. Installs dependencies and runs ESLint.
2. Compiles and exports the Next.js static site to `./out`.
3. Deploys the latest build directly to [https://kuch278a.github.io/interior-web-with-CMS](https://kuch278a.github.io/interior-web-with-CMS).

---

## 📄 License

This project is private and proprietary to AURATECH Studio LLC. All rights reserved.

# AURATECH Studio — Visionary Architecture & Interior Luxury with CMS

[![Deploy to GitHub Pages](https://github.com/kuch278a/interior-web-with-CMS/actions/workflows/pages.yml/badge.svg)](https://github.com/kuch278a/interior-web-with-CMS/actions/workflows/pages.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-purple.svg)]()

> **Live Production Website**: **[https://kuch278a.github.io/interior-web-with-CMS/](https://kuch278a.github.io/interior-web-with-CMS/)**

An award-winning, luxury architectural studio web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**, featuring a headless CMS control plane, live dynamic content bindings, interactive spatial cost estimators, and case study modals.

---

## 🌐 Live Deployments

| Platform | Status | URL |
|---|---|---|
| **GitHub Pages (Active)** | 🟢 Live & Automated | [https://kuch278a.github.io/interior-web-with-CMS/](https://kuch278a.github.io/interior-web-with-CMS/) |
| **Vercel (Optional)** | ⚡ Ready for Import | [Deploy on Vercel](https://vercel.com/new) |

---

## ✨ Key Features

- **🏛️ High-End Aesthetics & Glassmorphism**: Tailored luxury dark/light mode with glowing ambient orbs, micro-interactions, and smooth cubic-bezier transitions.
- **⚡ Next.js 16 & React 19 Engine**: Ultra-fast Server-Side Rendering (SSR) with Static Site Generation (SSG), Turbopack, and automatic image optimization.
- **🛠️ Integrated CMS Control Plane (`/admin`)**:
  - Live homepage editor (headlines, badge text, metrics, and featured spotlight project).
  - Portfolio project management (create, publish/unpublish, delete, set featured).
  - Editorial blog articles & client review collections.
  - Seamless fallback between Strapi API and local persistent JSON store (`cms/data/store.json`).
- **📁 Dynamic Portfolio & Case Study Modals (`/projects`)**: Filter by Residential, Commercial, Hospitality, and Sustainable categories with deep-dive technical architectural specifications.
- **📐 Interactive Spatial Estimator (`/services`)**: Real-time project cost and timeline calculator based on square footage, classification, and finish tiers.
- **📝 Private Commissions Concierge (`/contact`)**: Multi-step project inquiry form with budget brackets, global atelier directories, and validation.
- **🌓 Flawless Dark/Light Mode**: Hydration-safe theme switching powered by `useSyncExternalStore`.
- **🚀 100% Type-Safe & Zero Lint Errors**: Strict TypeScript models and ESLint compliance.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Tokens |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **CMS / Backend** | Custom Headless REST API (`/api/cms`) + Strapi Integration |
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
│   │   ├── layout.tsx          # Global Root Layout & Font config
│   │   ├── globals.css         # Design system, glassmorphism, & theme tokens
│   │   ├── about/page.tsx      # Studio ethos, team, & awards
│   │   ├── admin/              # CMS Control Plane & Login
│   │   ├── api/cms/route.ts    # REST API Route for CMS store
│   │   ├── blog/page.tsx       # Editorial articles & journal
│   │   ├── contact/page.tsx    # Inquiry form & global atelier directory
│   │   ├── projects/page.tsx   # Portfolio & case study modals
│   │   ├── services/page.tsx   # Disciplines, 4-phase roadmap & estimator
│   │   └── testimonials/page.tsx # Client reviews & press mentions
│   └── components/
│       └── ui/                 # Reusable UI components (.tsx)
│           ├── AnimatedButton.tsx
│           ├── ConsultationForm.tsx
│           ├── DarkModeToggle.tsx
│           ├── GlassCard.tsx
│           ├── HeroSection.tsx
│           ├── Navbar.tsx
│           └── TestimonialCard.tsx
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

Access the studio control plane to edit homepage copy, manage portfolio items, or review schemas in real time.

- **Local URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Live URL**: [https://kuch278a.github.io/interior-web-with-CMS/admin/](https://kuch278a.github.io/interior-web-with-CMS/admin/)
- **Demo Admin Email**: `admin@auratech.design`
- **Demo Password**: `admin123`

---

## 🤖 Automated CI/CD & Deployment

Every commit pushed to `master` automatically triggers the **[GitHub Pages Workflow](.github/workflows/pages.yml)**:
1. Installs dependencies and runs ESLint.
2. Compiles and exports the Next.js static site to `./out`.
3. Deploys the latest artifact to [https://kuch278a.github.io/interior-web-with-CMS/](https://kuch278a.github.io/interior-web-with-CMS/).

---

## 📄 License

This project is private and proprietary to AURATECH Studio LLC. All rights reserved.

# AURATECH Studio — Visionary Architecture & Interior Luxury with CMS

An award-winning, luxury architectural studio website built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**, featuring a headless CMS control plane, live dynamic content bindings, interactive spatial cost estimators, and case study modals.

---

## ✨ Features

- **🏛️ High-End Aesthetics & Glassmorphism**: Tailored luxury dark/light mode with glowing ambient orbs, micro-interactions, and smooth cubic-bezier transitions.
- **⚡ Next.js 16 & React 19 Engine**: Ultra-fast Server-Side Rendering (SSR) with Static Site Generation (SSG) and Turbopack.
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
| **Image Optimization**| Next.js Image with Unsplash Remote Patterns |
| **CI / CD** | GitHub Actions (`.github/workflows/deploy.yml`) |

---

## 📂 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── cms/
│   ├── client.ts               # Universal CMS client with SSR fallback
│   ├── config.ts               # Strapi API config & endpoints
│   ├── types.ts                # TypeScript interfaces for all data models
│   ├── data/
│   │   └── store.json          # Persistent JSON store for CMS data
│   ├── models/                 # Strapi content type schemas (JSON)
│   └── strapi/                 # Strapi Docker Compose setup
├── src/
│   ├── app/
│   │   ├── page.tsx            # Main Homepage (Dynamic SSR)
│   │   ├── layout.tsx          # Global Root Layout & Font config
│   │   ├── globals.css         # Design system, glassmorphism, & theme vars
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
├── next.config.ts              # Next.js configuration
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

### 4. Build & Typecheck
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

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Demo Admin Email**: `admin@auratech.design`
- **Demo Password**: `admin123`

Any updates made in the admin dashboard immediately update `cms/data/store.json` and sync across the live application.

---

## 🌐 How to Deploy Using GitHub

You can deploy this project directly from your GitHub repository using any of the following methods:

### Method 1: Deploy with Vercel (Recommended — 2 Minutes)

Vercel is the native hosting platform for Next.js and provides automatic deployments on every `git push`.

1. **Push your latest changes to GitHub**:
   ```bash
   git add .
   git commit -m "Update codebase and configurations"
   git push origin master
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** > **"Project"**.
   - Select your repository: `kuch278a/interior-web-with-CMS`.
   - Vercel will automatically detect **Next.js**.

3. **Configure Environment Variables (Optional)**:
   If connecting to an external Strapi instance, add:
   - `NEXT_PUBLIC_STRAPI_URL` = `https://your-strapi-instance.com`
   - `STRAPI_API_TOKEN` = `your_strapi_api_token`

4. **Deploy**:
   - Click **"Deploy"**.
   - Your site will be live on a `*.vercel.app` domain with free SSL and global CDN.
   - Any future commits pushed to `master` or `main` will automatically trigger a new production deployment.

---

### Method 2: Automated Deployment via GitHub Actions

The repository includes a ready-to-use CI/CD workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that:
- Automatically runs on every push and pull request to `master` and `main`.
- Runs `npm ci`, `npm run lint`, and `npm run build` to verify code integrity.
- Optionally deploys to Vercel if repository secrets are configured.

To enable automated deployment in GitHub Actions:
1. In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
2. Add the following repository secrets:
   - `VERCEL_TOKEN`: Your Vercel Personal Access Token ([Generate here](https://vercel.com/account/tokens)).
   - `VERCEL_ORG_ID`: Found in your project settings or `.vercel/project.json`.
   - `VERCEL_PROJECT_ID`: Found in your project settings or `.vercel/project.json`.

---

### Method 3: Deploy to Netlify

1. Go to [netlify.com](https://www.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
2. Select **GitHub** and authorize `kuch278a/interior-web-with-CMS`.
3. Set the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Click **"Deploy Site"**.

---

### Method 4: Deploy with Docker / Self-Hosted VPS

If deploying to a VPS (Ubuntu/Debian, Railway, or DigitalOcean):

```bash
# 1. Build the production application
npm run build

# 2. Start using PM2 or Node.js process manager
npm install -g pm2
pm2 start npm --name "auratech-studio" -- start -- -p 3000
```

---

## 📄 License

This project is private and proprietary to AURATECH Studio LLC. All rights reserved.

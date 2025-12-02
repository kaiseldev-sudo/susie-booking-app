# ✨ Magical Memories Photo Booth

A modern, elegant booking website for **Magical Memories Photo Booth Services** — featuring premium photo booth experiences, dynamic content management, and a beautiful user interface.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Content Management System](#-content-management-system)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🌟 Features

### Customer-Facing Website
- **Hero Section** — Eye-catching landing with animated elements and social proof
- **Photo Booth Catalog** — Detailed pages for each booth type (Mirror Booth, 360 Video Booth, Open-Air Booth, Micro Booth)
- **Services Overview** — Showcase signature services with pricing
- **Testimonials** — Customer reviews carousel with star ratings
- **FAQ Section** — Organized by categories with accordion-style answers
- **Contact Form** — Email integration via Maileroo API
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop

### Admin Dashboard
- **Real-time Content Editing** — Update all website content without code changes
- **SEO Management** — Edit meta titles, descriptions, and Open Graph tags
- **Photo Booth Management** — Add, edit, or remove booth products
- **Testimonial Manager** — Manage customer reviews
- **FAQ Editor** — Organize questions by category
- **Session-based Authentication** — Secure admin access

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript** | Type safety and developer experience |
| **Vite** | Fast build tool and dev server |
| **React Router 6** | Client-side routing |
| **TanStack Query** | Data fetching and caching |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Pre-built accessible components |
| **Radix UI** | Headless UI primitives |
| **Lucide React** | Icon library |
| **Embla Carousel** | Touch-friendly carousels |
| **LightGallery** | Image gallery lightbox |
| **React Photo Album** | Photo grid layouts |
| **React Hook Form + Zod** | Form handling and validation |
| **Sonner** | Toast notifications |

### Backend (Content API Server)
| Technology | Purpose |
|------------|---------|
| **Express.js** | REST API server |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment configuration |
| **Maileroo** | Transactional email service |

---

## 📌 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** 18.0 or higher
- **npm** 9.0+ or **bun** 1.0+
- **Git** for version control

---

## 📁 Project Structure

```
frontend/
├── public/                    # Static assets
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── placeholder.svg
│   └── robots.txt
├── server/                    # Backend API server
│   ├── index.js              # Express server with admin dashboard
│   ├── content.json          # CMS data store
│   └── package.json
├── src/
│   ├── assets/               # Images and media
│   │   ├── 360-booth.jpg
│   │   ├── backdrops.jpg
│   │   ├── hero-image.jpg
│   │   └── photo-booth.jpg
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui primitives
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   └── ... (40+ components)
│   │   ├── About.tsx
│   │   ├── CTA.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── MetaHead.tsx
│   │   ├── Navbar.tsx
│   │   ├── Services.tsx
│   │   └── Testimonials.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useContent.ts    # Content API hook
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn helper)
│   ├── pages/               # Route pages
│   │   ├── AboutUs.tsx
│   │   ├── BoothDetail.tsx  # Dynamic booth detail page
│   │   ├── CheckAvailability.tsx
│   │   ├── Contact.tsx
│   │   ├── FAQ.tsx
│   │   ├── Index.tsx        # Homepage
│   │   ├── NotFound.tsx
│   │   └── PhotoBooth.tsx   # Booth listing page
│   ├── types/               # TypeScript declarations
│   ├── App.tsx              # Router configuration
│   ├── index.css            # Global styles
│   └── main.tsx             # App entry point
├── components.json           # shadcn/ui configuration
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json              # Vercel deployment config
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd susie-booking-app/frontend
```

### 2. Install Frontend Dependencies

```bash
npm install
# or
bun install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=3001

# Admin Dashboard Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Service (Maileroo)
MAILEROO_API_KEY=your_maileroo_api_key
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=contact@yourdomain.com
```

### 5. Start the Development Servers

**Terminal 1 — Backend API Server:**
```bash
cd server
npm run dev
```
The API server runs at `http://localhost:3001`

**Terminal 2 — Frontend Dev Server:**
```bash
npm run dev
```
The frontend runs at `http://localhost:5173`

### 6. Access the Application

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Customer-facing website |
| `http://localhost:3001/admin` | Admin dashboard |
| `http://localhost:3001/api/health` | API health check |

---

## 📜 Available Scripts

### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run build:dev` | Development mode build for debugging |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all files |

### Backend Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Express server |
| `npm run dev` | Start with `--watch` for auto-reload |

---

## 📝 Content Management System

All website content is managed through the **Admin Dashboard** or by directly editing the `server/content.json` file.

### Accessing the Admin Dashboard

1. Navigate to `http://localhost:3001/admin`
2. Log in with your admin credentials (configured in `.env`)
3. Edit any section and click **Save Changes**

### Content Sections

| Section | Description |
|---------|-------------|
| **Metadata** | SEO titles, descriptions, Open Graph tags |
| **Branding** | Site name, company name, tagline, logo |
| **Hero** | Homepage hero text, CTA button, ratings |
| **About** | About section content and statistics |
| **Stats** | Achievement counters (events, reviews, etc.) |
| **Services** | Homepage service cards with pricing |
| **Photo Booths** | Full product catalog with details |
| **Testimonials** | Customer reviews with ratings |
| **FAQ** | Organized by categories with Q&A pairs |
| **CTA** | Call-to-action section content |
| **Contact** | Email, phone, address, business hours |
| **Social** | Social media profile links |

### Content Structure Example

```json
{
  "hero": {
    "tagline": "Magic starts here",
    "titleLine1": "Susie's",
    "titleLine2": "Photography",
    "titleLine3": "Magical Memories",
    "description": "Transform your moments into unforgettable memories...",
    "ctaText": "Inquire Now",
    "rating": "5.0",
    "reviewCount": "373+"
  },
  "photoBooths": [
    {
      "id": "mirror-booth",
      "slug": "mirror-booth",
      "title": "Mirror Booth",
      "tagline": "The Ultimate Interactive Photo Experience",
      "description": "Sleek, modern, and interactive...",
      "badge": "Most Popular",
      "setupTime": "45 mins",
      "capacity": "1-4 guests",
      "inclusions": "Professional setup, Touch-screen interface...",
      "features": "Interactive Touch Screen: Engage guests with fun animations|..."
    }
  ]
}
```

---

## 🔌 API Reference

### Base URL
```
http://localhost:3001/api
```

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health check |
| `GET` | `/content` | Get all content |
| `GET` | `/content/:section` | Get specific section (e.g., `/content/hero`) |
| `POST` | `/send-email` | Submit contact form |

### Protected Endpoints (Require `X-Session-Id` header)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/content/:section` | Update entire section |
| `PUT` | `/content/:section/:id` | Update item in array section |
| `POST` | `/content/:section` | Add item to array section |
| `DELETE` | `/content/:section/:id` | Delete item from array |

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/admin/login` | Login with username/password |
| `POST` | `/admin/logout` | End session |
| `GET` | `/admin/check-session` | Validate session |

### Example: Fetching Content

```javascript
// Get all content
const response = await fetch('http://localhost:3001/api/content');
const content = await response.json();

// Get specific section
const heroResponse = await fetch('http://localhost:3001/api/content/hero');
const hero = await heroResponse.json();
```

### Example: Updating Content (Protected)

```javascript
await fetch('http://localhost:3001/api/content/hero', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Session-Id': sessionId
  },
  body: JSON.stringify({
    tagline: 'New tagline',
    titleLine1: 'Updated Title'
  })
});
```

---

## 🔐 Environment Variables

### Frontend (Vite)

Create a `.env` file in the project root if you need custom variables:

```env
VITE_API_URL=http://localhost:3001
```

Access in code: `import.meta.env.VITE_API_URL`

### Backend (`server/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3001) |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `FRONTEND_URL` | Yes | Frontend URL for CORS |
| `MAILEROO_API_KEY` | Yes | Maileroo API key for emails |
| `FROM_EMAIL` | Yes | Sender email address |
| `TO_EMAIL` | Yes | Recipient email for contact form |

---

## 🌐 Deployment

### Frontend (Static Hosting)

The frontend builds to a static site that can be deployed anywhere:

```bash
npm run build
```

Deploy the `dist/` folder to:
- **Vercel** (recommended — includes `vercel.json`)
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages**
- Any static file host

> **Important:** For SPA routing, configure your host to serve `index.html` for all routes.

### Backend (Node.js Hosting)

The Express server can be deployed to:
- **Railway**
- **Render**
- **Fly.io**
- **Heroku**
- **DigitalOcean App Platform**
- Any Node.js hosting

#### Environment Setup for Production

1. Set all required environment variables
2. Ensure `FRONTEND_URL` matches your deployed frontend URL
3. The `content.json` file stores data — use persistent storage

### Vercel Configuration

The included `vercel.json` handles SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Port already in use** | Run on different port: `npm run dev -- --port 5174` |
| **CORS errors** | Verify `FRONTEND_URL` in server `.env` matches your frontend URL |
| **API connection failed** | Ensure the backend server is running on port 3001 |
| **Content not updating** | Clear browser cache or check network tab for errors |
| **Email not sending** | Verify Maileroo API key and email configuration |
| **Admin login fails** | Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env` |

### Type Errors

```bash
npm run lint
```

Fix reported issues or check `tsconfig.json` for path alias configuration.

### Missing Images

Ensure assets exist in `src/assets/` and are imported correctly in components.

### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## 📄 License

This project is proprietary to **Magical Memories Photo Booth Services LLC**.

All rights reserved. Unauthorized copying, modification, or distribution is prohibited.

---

<div align="center">

**Built with ❤️ for Magical Memories Photo Booth**

[Website](http://localhost:5173) · [Admin Dashboard](http://localhost:3001/admin)

</div>

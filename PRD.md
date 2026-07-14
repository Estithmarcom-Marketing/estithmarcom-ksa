# Product Requirements Document (PRD) — Estithmarcom

## 1. Product Overview

**Estithmarcom** is a bilingual (Arabic/English) corporate website for a Saudi Arabian business services company. It serves as a digital storefront and information hub, showcasing the company's full range of services — including business setup, residency processing, free zone registration, and consulting — across multiple countries.

The platform provides prospective clients with detailed service information, company blog content, contact/lead generation forms, and a chatbot for real-time inquiries. It is built as a **Next.js 16** application with **SSR/SSG**, delivering fast page loads, SEO optimization, and a smooth user experience in both **RTL (Arabic)** and **LTR (English)** orientations.

---

## 2. Goals & Objectives

### Business Goals
- **Generate qualified leads** through contact forms, residency inquiry forms, and newsletter subscriptions.
- **Establish credibility** by showcasing company stats (years in business, projects completed, clients served), partner logos, and expert blog content.
- **Educate visitors** on complex topics like business setup procedures, residency options, and free zone benefits across Saudi Arabia and other countries.
- **Enable self-service** so visitors can browse services, read detailed guides, and find answers via FAQ before reaching out.

### Technical Goals
- **SEO-optimized** — Server-rendered pages with proper meta tags, sitemap, and semantic HTML.
- **Fast Core Web Vitals** — Leverage Next.js SSR, image optimization, and code splitting.
- **Fully responsive** — Mobile-first design using Tailwind CSS, working across all screen sizes.
- **Bilingual (AR/EN)** — Seamless RTL/LTR switching with localized content throughout.
- **Maintainable** — Modular architecture with TypeScript, typed APIs, Zod validation, and Shadcn UI components.

---

## 3. Target Audience

| Persona | Description | Needs |
|---|---|---|
| **Entrepreneur / Business Owner** | Saudi or foreign individual looking to register a company in KSA or a free zone. | Clear service breakdown, pricing visibility, step-by-step process. |
| **Expat / Foreign Investor** | Individual seeking residency (iqama) or investor visa in Saudi Arabia. | Residency options, eligibility criteria, application process. |
| **Corporate Decision Maker** | Company representative evaluating business setup consultants. | Credibility signals (stats, partners, case studies), comparison of services. |
| **General Visitor** | Anyone seeking business information or industry insights. | Blog articles, FAQ, ability to contact the company. |

---

## 4. Functional Requirements

### 4.1 Core Pages & Content

| Page | Route | Key Elements |
|---|---|---|
| **Homepage** | `/[locale]` | Banner/carousel showcasing countries, featured services, stats/highlights, video section, partner logos, blog preview, free zones overview, FAQ. |
| **Services** | `/[locale]/services` | Filterable/searchable service listing with pagination ("Load More"). |
| **Service Detail** | `/[locale]/services/[slug]` | Full service description, dynamic content shapes (4 variants), CTA. |
| **About Us** | `/[locale]/about-us` | Company stats/highlights, mission/vision. |
| **Contact Us** | `/[locale]/contact-us` | Lead generation form (name, email, phone, message, country), validation with Zod + Formik. |
| **Blog** | `/[locale]/blog` | Filterable/searchable blog listing with categories and "Load More" pagination. |
| **Blog Detail** | `/[locale]/blog/[slug]` | Full article with sidebar (categories, recent posts). |
| **Residencies** | `/[locale]/residencies` | Filterable residency programs by country with "Load More" pagination. |
| **Residency Detail** | `/[locale]/residencies/[slug]` | Residency program details with inquiry form. |
| **Free Zone Detail** | `/[locale]/free-zones/[slug]` | Free zone information and benefits. |
| **Static Pages** | `/[locale]/pages/[slug]` | CMS-managed content pages rendered via `RichTextViewer`. |
| **404 / Not Found** | `/[locale]/[...not-found]` | Custom 404 page. |

### 4.2 Global Features

| Feature | Description |
|---|---|
| **Navigation Bar** | Sticky navbar with logo, main menu (Services, About, Blog, Contact), language toggle (AR/EN), and chatbot trigger. |
| **Footer** | Multi-column footer with links to all major pages, social media, newsletter subscription form, and company info. |
| **Language Switcher** | Toggle between Arabic (RTL) and English (LTR), persisted via cookie (`estithmarcom_ksa`). |
| **Chatbot** | Floating chatbot widget for real-time visitor inquiries. |
| **Newsletter Subscription** | Email capture form in footer with Zod validation. |
| **FAQ Section** | Accordion-style FAQ with localized questions/answers. |
| **Search** | Search input on listing pages (services, blog, residencies). |
| **Phone Input** | International phone number input with country code selection, using `libphonenumber-js` validation. |

### 4.3 Data Models (Key Entities)

| Entity | Key Fields |
|---|---|
| **Service** | `id`, `slug`, `title`, `description`, `image`, `country`, `shape` (1-4 variants), features list. |
| **Blog Post** | `id`, `slug`, `title`, `content`, `excerpt`, `image`, `category`, `author`, `publishedAt`. |
| **Residency** | `id`, `slug`, `title`, `description`, `country`, `image`, requirements, benefits. |
| **Country** | `id`, `name`, `flag`, `slug`. |
| **Category** | `id`, `name`, `slug`. |
| **FAQ** | `id`, `question`, `answer`. |
| **Partner** | `id`, `name`, `logo`, `url`. |
| **Stat** | `id`, `label`, `value` (e.g., "15+ Years", "500+ Clients"). |
| **Free Zone** | `id`, `slug`, `title`, `description`, `image`, benefits. |
| **Settings** | Site-wide configuration (social links, contact info, branding). |
| **Static Page** | `id`, `slug`, `title`, `content` (rich text). |

### 4.4 API Integration

All data is fetched from a REST API (`api.estithmarcom.com`) via two patterns:

- **Server-side (SSR):** `fetch-server.ts` — reads locale cookie, prefetches data in server components for SEO.
- **Client-side:** Axios hook (`use-axios.ts`) — auto-sets `Accept-Language` header, used for dynamic filtering, pagination, and form submissions.
- **Caching:** React Query manages caching, background refetching, and optimistic updates.
- **Endpoints:** Services, blog, categories, countries, FAQ, partners, stats, residencies, zones, settings, static pages, contact form submission, newsletter subscription, chatbot.

---

## 5. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| **Performance** | < 3s LCP, < 100ms FID, Google Lighthouse score > 85. |
| **SEO** | Server-rendered pages, semantic HTML, dynamic sitemap, robots.txt, proper `<head>` meta. |
| **Responsiveness** | Mobile, tablet, desktop — tested at 320px, 768px, 1024px, 1440px+ breakpoints. |
| **Accessibility** | Keyboard navigation, screen reader support (aria labels), sufficient color contrast. |
| **Internationalization** | Full RTL/LTR support, locale-prefixed routes (`/ar/`, `/en/`), translated JSON files (380+ keys each). |
| **Reliability** | Graceful error boundaries, `notFound()` for missing resources, loading states. |
| **Security** | XSS prevention (React JSX escaping), form validation (Zod), environment variables for secrets. |
| **Deployment** | Dockerized (multi-stage, Alpine), CI/CD via GitHub Actions, standalone Next.js output. |

---

## 6. Technical Architecture

### Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript 5)
- **Styling:** Tailwind CSS 4 + Shadcn UI (Radix primitives)
- **State Management:** TanStack React Query 5 (server + client)
- **Forms:** Formik + Zod + `zod-formik-adapter`
- **HTTP:** Axios (client), custom fetch (server)
- **Internationalization:** Custom i18n system with JSON locale files
- **Animation:** GSAP, Embla Carousel, Swiper
- **Notifications:** Sonner toasts
- **Icons:** Lucide React

### Routing Structure
```
/[locale]                     → Homepage
/[locale]/services            → Services listing
/[locale]/services/[slug]     → Service detail
/[locale]/about-us            → About page
/[locale]/contact-us          → Contact form
/[locale]/blog                → Blog listing
/[locale]/blog/[slug]         → Blog detail
/[locale]/residencies         → Residency listing
/[locale]/residencies/[slug]  → Residency detail
/[locale]/free-zones/[slug]   → Free zone detail
/[locale]/pages/[slug]        → Static CMS pages
/[locale]/[...not-found]      → 404 catch-all
```

### Component Architecture
- **Server Components:** Pages, layouts, data fetching.
- **Client Components:** Interactive elements (forms, carousels, filters, load-more buttons, chatbot).
- **Hydration Boundary:** `<HydrationBoundary>` wraps client components with prefetched data from React Query.

### Data Flow
1. Server Component prefetches data via `prefetchQuery` and passes dehydrated state.
2. Client component hydrates with same query key and renders cached data instantly.
3. User interactions (filter, search, load more) trigger client-side queries via React Query.
4. Form submissions use `useMutation` with success/error toasts via Sonner.

---

## 7. User Stories

| ID | Story |
|---|---|
| US-01 | As a visitor, I want to browse services by country so I can find relevant business setup options. |
| US-02 | As a visitor, I want to read detailed service pages so I can understand what is included. |
| US-03 | As a potential client, I want to contact the company via a form so I can request a consultation. |
| US-04 | As an expat, I want to explore residency programs so I can find the right visa option. |
| US-05 | As a visitor, I want to search for content so I can quickly find what I need. |
| US-06 | As a reader, I want to browse blog articles by category so I can follow relevant topics. |
| US-07 | As a visitor, I want to switch between Arabic and English so I can view the site in my preferred language. |
| US-08 | As a visitor, I want to subscribe to a newsletter so I can receive updates. |
| US-09 | As a visitor, I want to chat with a representative so I can get quick answers. |
| US-10 | As an SEO crawler, I want all pages indexed with proper meta so the site ranks in search results. |

---

## 8. Future Scope

- **User Dashboard** — Allow logged-in clients to track application status.
- **Payment Integration** — Enable online payment for selected services.
- **Live Chat (Real-time)** — Upgrade chatbot to a real-time human agent system.
- **Case Studies / Success Stories** — Detailed project showcases with client testimonials.
- **Appointment Booking** — Calendar-based consultation booking.
- **PWA Support** — Offline access and installable web app.
- **Multi-language Expansion** — Add Turkish, Urdu, or other languages.

---

## 9. Glossary

| Term | Definition |
|---|---|
| **KSA** | Kingdom of Saudi Arabia. |
| **RTL / LTR** | Right-to-left / Left-to-right text direction. |
| **SSR** | Server-Side Rendering. |
| **Free Zone** | A designated economic area with special tax and trade regulations. |
| **Iqama** | Saudi Arabian residency permit for foreign nationals. |
| **Shadcn UI** | A collection of re-usable React components built on Radix UI primitives. |

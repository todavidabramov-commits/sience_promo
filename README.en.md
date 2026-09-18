# SanEpidExpert — corporate site of an inspection body

[Русский](README.md) · [English](README.en.md)

B2B website of the **SanEpidExpert** centre: sanitary-epidemiological review, sanitary protection zones, public health risk assessment. Public frontend, Payload CMS and enquiries that land in the admin panel.

Repository: [todavidabramov-commits/sience_promo](https://github.com/todavidabramov-commits/sience_promo)

---

## Why this site exists

It answers the industrial and development client’s request: understand the centre’s competence, pick a service, review delivered projects and regulations, send a design brief. Page catalogues are laid out from the mock-up and read immediately; content can later be moved into Payload without changing the layout.

---

## Capabilities

### Public site

- **Home** — cinematic 3D molecule (React Three Fiber), counters, practice areas, industries, projects and an enquiry form.
- **About** — scientific foundation, centre history, accreditations; a decorative mark that copies the logo exactly.
- **Services** — 9 practice areas with dedicated pages: substance, scope of work, a four-step sequence (including the expected outcome).
- **Projects** — industry filter and detailed materials on SPZ / risk / AVT.
- **Experts** — the staff board in typography without stock portraits, and a scenario for assembling a working group.
- **Publications** — featured paper, search, badge filters, article cards and a digest.
- **Documents** — a register of standards with search, filters and file download.
- **Contacts** — communication channels, company details, a Yandex Map with a pulsing logo-coloured pin.

### Interaction and enquiries

- Phone mask `+7 (___) ___-__-__` and form validation with **yup + react-hook-form**.
- Cost, document and digest enquiries go to Payload (`form-submissions` + file upload to `media`).
- Search across publications and documents with match highlighting.
- Scroll-reveal, section ring animations, responsive behaviour: 3D on desktop, a simplified hero on mobile.

### CMS

- **Payload 3** with a Russian and English admin: services, projects, experts, publications, documents, enquiries, media, site settings, header and footer. Language is switched by a single site switcher (cookie `payload-lng`) and immediately applies to `/admin`.
- Starter content lives in `src/lib/content.ts` — the site is filled before import into the database.
- Production-ready on **Vercel Postgres (Neon)** and **Vercel Blob**.

---

## Why the project is stronger than a template landing page

- **Not “a showcase of ten blocks”**, but a full industry site with inner pages for services, articles and documents.
- **Scientific tone and legal accuracy** of the copy: SPZ, SEC, Rospotrebnadzor, USRRE — without filler and stock phrasing.
- **CMS out of the box**: content and enquiries can be managed without editing code.
- **Design as a product**: a unique 3D hero, glass navigation, a unified token system, animations that do not get in the way of reading.
- **Working scenarios from day one**: search, masks, map, forms — not postponed to a second stage.
- **Modern stack** Next.js 16 + Payload 3 + Postgres, without legacy admin panels and a homemade backend.

---

## Stack

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js 16, React 19, CSS, Motion |
| 3D | React Three Fiber, Drei, Three.js |
| CMS | Payload 3.89, Lexical, Russian and English admin |
| Data | Vercel Postgres / Neon |
| Files | Vercel Blob (prod), disk locally |
| Forms | yup, react-hook-form, react-imask |
| Deploy | Vercel |

---

## Pages

| Route | Content |
| --- | --- |
| `/` | Home |
| `/o-kompanii` | About |
| `/uslugi` | Service catalogue |
| `/uslugi/[slug]` | Practice card |
| `/proekty` | Projects |
| `/eksperty` | Expert board |
| `/publikacii` | Publications |
| `/publikacii/[slug]` | Article |
| `/dokumenty` | Regulatory base |
| `/kontakty` | Contacts and map |
| `/admin` | Payload admin |

---

## Local run

Node.js 20+ and PostgreSQL (local or Neon) are required.

```bash
cd sience-promo
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin](http://localhost:3000/admin).

In `.env` set at least:

```env
PAYLOAD_SECRET=a-long-random-secret
POSTGRES_URL=postgresql://...
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Optional:

- `BLOB_READ_WRITE_TOKEN` — uploads to Vercel Blob;
- `NEXT_PUBLIC_YANDEX_MAPS_API_KEY` — Maps JS API key (without a key the contacts map still tries to load).

---

## Deploy to Vercel

1. The repository is connected to Vercel (root directory — the application root).
2. In the Vercel project: **Postgres** (Neon) and **Blob**.
3. Variables: `PAYLOAD_SECRET`, `POSTGRES_URL`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_SERVER_URL`.
4. Build: `npm run ci` (`payload migrate` + `next build`).

After deploy check the home page, inner service pages, form submission and `/admin`.

---

## Languages

The site has a single **RU / EN** switcher. It writes the `payload-lng` cookie (the same one Payload admin reads), so the public site and `/admin` switch together. If the cookie is not set yet, the language is taken from the browser `Accept-Language`: Russian and CIS countries — Russian, otherwise English.

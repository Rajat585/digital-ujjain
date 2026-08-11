# Digital Ujjain

Ujjain aur Simhastha 2028 ka digital sahayak — live dashboard, VR experience,
verified hotel/Sathi bookings, multilingual (Hindi/English) support, aur ek
chatbot (Mahakal Mitra) jo yatriyo ke sawaalon ke jawab deta hai.

## Project Structure

```
digital-ujjain/
├── src/app/              → Next.js frontend (App Router)
│   ├── sections/          → Page sections (Hero, LiveDashboard, HotelBooking, etc.)
│   ├── components/        → Shared components (Navbar, Footer, MahakalMitra chatbot, etc.)
│   └── lib/api.js         → Frontend API client — talks to the backend below
├── backend/               → Express API server
│   └── index.js           → Bookings, reports, feedback, Sathi applications
└── public/                → Static assets, PWA manifest, service worker
```

## Running Locally

You need **two servers running at the same time**: the backend (data/API)
and the frontend (Next.js).

### 1. Backend

```bash
cd backend
npm install
```

Open `backend/.env` and set your own values:
```
ANTHROPIC_API_KEY=yahan_apni_key_paste_karo   # only needed if you later wire AI features
PORT=5000
ADMIN_KEY=apna_ek_secret_admin_key_yahan_daalo # protects the /api/admin/* routes
```

Then start it:
```bash
node index.js
```
You should see: `Digital Ujjain backend running on http://localhost:5000`

Bookings, reports, and feedback are saved as JSON files inside `backend/data/`
(created automatically on first run) — no database setup needed to get started.

### 2. Frontend

In a **new terminal**:
```bash
npm install
npm run dev
```
Open http://localhost:3000

The frontend reads the backend URL from `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Change this when you deploy the backend somewhere else (e.g. a Render/Railway URL).

## What's Wired Up

- **Hotel & Sathi bookings** → saved to the backend (`/api/bookings/hotel`,
  `/api/bookings/sathi`), with a QR-code receipt shown to the user.
- **Fraud/overcharging reports** → `/api/reports`, visible via
  `/api/admin/reports` (send header `x-admin-key: <your ADMIN_KEY>`).
- **Citizen feedback form** → `/api/feedback`.
- **Sathi ("become a guide") applications** → `/api/sathi-applications`.
- **PWA** → installable, works offline for the app shell (see `public/sw.js`,
  `public/manifest.json`, `public/offline.html`).
- **"Find Nearest to Me"** in the Simhastha Zone section uses the browser's
  geolocation API — no extra setup needed, just allow location access.

## Viewing Saved Data (Admin)

```bash
curl http://localhost:5000/api/admin/hotel-bookings -H "x-admin-key: YOUR_ADMIN_KEY"
curl http://localhost:5000/api/admin/reports -H "x-admin-key: YOUR_ADMIN_KEY"
```

## Deploying

- **Frontend**: works well on Vercel (vercel.com/new) — just set
  `NEXT_PUBLIC_API_URL` as an environment variable pointing to your deployed
  backend.
- **Backend**: any Node host works (Render, Railway, a VPS). Remember to set
  `PORT` and `ADMIN_KEY` as environment variables there, and to persist the
  `backend/data/` folder (or swap the JSON-file storage for a real database
  like MongoDB/Postgres once traffic grows).

## Notes for Production

- The current storage is simple JSON files — fine for getting started, but
  swap for a real database before handling serious traffic or multiple
  server instances.
- The `/api/admin/*` routes are protected by a single shared `ADMIN_KEY` —
  good enough for one or two trusted admins; use proper per-user auth if
  more people need access.
- Fonts are self-hosted (via the `geist` package) instead of fetched from
  Google Fonts, so the site builds and loads even without external font
  requests.

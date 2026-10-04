# 📡 CampusRadar

> **Find what's happening on campus — right now.** Tap-only event discovery with a student profile.

**Stack:** React 18 + Vite · Tailwind CSS · Framer Motion · Express · **MongoDB (Mongoose)**

## ✨ Features

- ⭐ **CuriousParc** featured event pinned at the top (poster, dates, prizes, tracks, registration status)
- 🔥 Live / Soon / Today counters and 3-axis tap filters (category × time window × time of day)
- 👤 **Student profile** — photo upload or avatar, name, college, PRN, department, year, skill level, interests, goals. Shown as a digital ID card
- ⌨️ **Zero system typing** — even name entry uses a built-in on-screen tap keyboard
- ❤️ Save events (stored in MongoDB per browser session, no login)
- 📴 Demo mode: if the API/MongoDB is down the UI still works with built-in data
- 📱 Responsive: bottom nav on phones, floating tab bar on desktop

## 🗂️ Structure

```
campusradar/
├── client/   React app (Vite)
└── server/   Express API + MongoDB models + seed data
```

## 🚀 Run locally

Requirements: **Node.js 18+** and **MongoDB** (local install *or* a free MongoDB Atlas cluster).

```bash
npm install          # installs root + server + client
npm run dev          # starts API (5000) and website (5173)
```

Open http://localhost:5173

### Database setup

**Option A – Local MongoDB:** install MongoDB Community, make sure it is running. `server/.env` already points to `mongodb://127.0.0.1:27017/campusradar`.

**Option B – MongoDB Atlas (free, no install):** create a free cluster → Database Access (add a user) → Network Access (allow your IP) → Connect → Drivers → copy the string into `server/.env`:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/campusradar?retryWrites=true&w=majority
```

On first start the server creates the collections and inserts **CuriousParc + sample events** automatically. To reset events any time: `npm run seed`.

## 🗄️ MongoDB collections

| Collection | Purpose | Key fields |
|---|---|---|
| `events` | All events | title, category, date, end_date, start_time, end_time, location, featured, prize, tracks, registration_deadline … |
| `saveds` | Saved events per session | sessionId, eventId (unique pair) |
| `profiles` | Student profile per session | sessionId (unique), name, prn, college, department, year, skill_level, interests, looking_for, avatar, photo |

## 🔌 API

| Method | Route | |
|---|---|---|
| GET | `/api/health` | DB status |
| GET | `/api/events` | Events (featured first) |
| GET | `/api/saved/:sessionId` | Saved event ids |
| POST | `/api/saved` | `{ sessionId, eventId }` |
| DELETE | `/api/saved/:sessionId/:eventId` | Unsave |
| GET / PUT | `/api/profile/:sessionId` | Read / save profile |

## ☁️ Deploy (single service, e.g. Render)

```bash
npm install && npm run build   # builds client/dist
npm start                      # Express serves API + built website
```
Set `MONGODB_URI` (Atlas) and `PORT` as environment variables.

## ⚠️ Known limitations

- No login: profile and saved events are tied to a browser session id (clearing browser data starts a new session)
- No push notifications, no admin panel (add events directly in MongoDB / Atlas)

## 🧪 Testing & 🤖 AI usage

> TODO: write your own real notes — who you tested with, what you changed, which AI tools you used and what you fixed yourself.

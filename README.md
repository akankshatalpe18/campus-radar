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

## 🚀 Run 

Demo: http://localhost:5173

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


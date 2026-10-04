import { Router } from 'express'
import mongoose from 'mongoose'
import { Event, Saved, Profile } from './models.js'

const router = Router()

/* ---------- helpers ---------- */
const clean = (doc) => {
  if (!doc) return doc
  const { _id, __v, createdAt, updatedAt, ...rest } = doc
  return { id: String(_id), ...rest }
}

const SESSION_RE = /^[A-Za-z0-9-]{8,64}$/
const validSession = (s) => typeof s === 'string' && SESSION_RE.test(s)

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const list = (v, maxItems, maxLen) =>
  Array.isArray(v)
    ? v.filter((x) => typeof x === 'string').map((x) => x.trim().slice(0, maxLen)).filter(Boolean).slice(0, maxItems)
    : []
const photo = (v) => (typeof v === 'string' && v.startsWith('data:image/') && v.length < 400_000 ? v : '')

const PROFILE_FIELDS = 'name prn college department year skill_level interests looking_for avatar photo'
const publicProfile = (p) => {
  if (!p) return null
  const out = {}
  for (const k of PROFILE_FIELDS.split(' ')) out[k] = p[k]
  return out
}

// Return 503 while MongoDB is not connected (the web app then falls back to demo data)
router.use((req, res, next) => {
  if (req.path === '/health') return next()
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database not connected' })
  }
  next()
})

router.get('/health', (req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

/* ---------- Events ---------- */
router.get('/events', async (req, res, next) => {
  try {
    const events = await Event.find().sort({ featured: -1, date: 1, start_time: 1 }).lean()
    res.json(events.map(clean))
  } catch (err) { next(err) }
})

/* ---------- Saved ---------- */
router.get('/saved/:sessionId', async (req, res, next) => {
  try {
    if (!validSession(req.params.sessionId)) return res.status(400).json({ error: 'Bad session id' })
    const rows = await Saved.find({ sessionId: req.params.sessionId }).lean()
    res.json(rows.map((r) => r.eventId))
  } catch (err) { next(err) }
})

router.post('/saved', async (req, res, next) => {
  try {
    const { sessionId, eventId } = req.body || {}
    if (!validSession(sessionId) || typeof eventId !== 'string' || !eventId) {
      return res.status(400).json({ error: 'sessionId and eventId required' })
    }
    await Saved.updateOne({ sessionId, eventId }, { $setOnInsert: { sessionId, eventId } }, { upsert: true })
    res.status(201).json({ ok: true })
  } catch (err) { next(err) }
})

router.delete('/saved/:sessionId/:eventId', async (req, res, next) => {
  try {
    if (!validSession(req.params.sessionId)) return res.status(400).json({ error: 'Bad session id' })
    await Saved.deleteOne({ sessionId: req.params.sessionId, eventId: req.params.eventId })
    res.json({ ok: true })
  } catch (err) { next(err) }
})

/* ---------- Profile ---------- */
router.get('/profile/:sessionId', async (req, res, next) => {
  try {
    if (!validSession(req.params.sessionId)) return res.status(400).json({ error: 'Bad session id' })
    const p = await Profile.findOne({ sessionId: req.params.sessionId }).lean()
    res.json(publicProfile(p))
  } catch (err) { next(err) }
})

router.put('/profile/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params
    if (!validSession(sessionId)) return res.status(400).json({ error: 'Bad session id' })
    const b = req.body || {}
    const data = {
      name: str(b.name, 60),
      prn: str(b.prn, 20),
      college: str(b.college, 80),
      department: str(b.department, 60),
      year: str(b.year, 20),
      skill_level: str(b.skill_level, 20),
      interests: list(b.interests, 10, 30),
      looking_for: list(b.looking_for, 10, 30),
      avatar: str(b.avatar, 20),
      photo: photo(b.photo)
    }
    const saved = await Profile.findOneAndUpdate(
      { sessionId },
      { $set: data, $setOnInsert: { sessionId } },
      { upsert: true, new: true, lean: true }
    )
    res.json(publicProfile(saved))
  } catch (err) { next(err) }
})

export default router

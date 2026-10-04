import mongoose from 'mongoose'

const { Schema, model } = mongoose

/* ---------- Events ---------- */
const eventSchema = new Schema(
  {
    slug: { type: String, unique: true, sparse: true },
    featured: { type: Boolean, default: false },
    title: { type: String, required: true },
    tagline: String,
    category: { type: String, required: true },
    description: String,
    date: { type: String, required: true },      // YYYY-MM-DD
    end_date: String,                            // YYYY-MM-DD (multi-day events)
    start_time: { type: String, required: true }, // HH:mm
    end_time: { type: String, required: true },
    all_day: { type: Boolean, default: false },
    location: { type: String, required: true },
    duration: { type: Number, default: 60 },
    capacity: { type: Number, default: 0 },
    registered: { type: Number, default: 0 },
    image_url: String,
    mode: String,
    prize: String,
    team_size: String,
    skill_note: String,
    registration_deadline: String,               // YYYY-MM-DD
    register_url: String,
    tracks: [String]
  },
  { timestamps: true }
)
eventSchema.index({ date: 1, start_time: 1 })
eventSchema.index({ category: 1 })

/* ---------- Saved events (per browser session, no login) ---------- */
const savedSchema = new Schema(
  {
    sessionId: { type: String, required: true, index: true },
    eventId: { type: String, required: true }
  },
  { timestamps: true }
)
savedSchema.index({ sessionId: 1, eventId: 1 }, { unique: true })

/* ---------- Student profile ---------- */
const profileSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    name: { type: String, default: '' },
    prn: { type: String, default: '' },
    college: { type: String, default: '' },
    department: { type: String, default: '' },
    year: { type: String, default: '' },
    skill_level: { type: String, default: '' },
    interests: { type: [String], default: [] },
    looking_for: { type: [String], default: [] },
    avatar: { type: String, default: '' },  // preset avatar key
    photo: { type: String, default: '' }    // small base64 JPEG (resized in the browser)
  },
  { timestamps: true }
)

export const Event = model('Event', eventSchema)
export const Saved = model('Saved', savedSchema)
export const Profile = model('Profile', profileSchema)

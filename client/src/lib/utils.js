/* ---------- Static option lists (everything is tap-selectable) ---------- */
export const CATEGORIES = {
  Tech:        { emoji: '💻', grad: 'from-indigo-500 to-cyan-400' },
  Cultural:    { emoji: '🎨', grad: 'from-pink-500 to-fuchsia-500' },
  Competition: { emoji: '🏆', grad: 'from-amber-500 to-orange-500' },
  Academic:    { emoji: '📚', grad: 'from-emerald-500 to-teal-500' },
  Workshop:    { emoji: '🎤', grad: 'from-violet-500 to-purple-500' },
  Social:      { emoji: '🎉', grad: 'from-rose-500 to-pink-500' }
}

export const TIME_FILTERS = [
  { key: 'now',   label: '🔥 Happening Now',  mins: 0 },
  { key: '15',    label: '⏱ Next 15 min',     mins: 15 },
  { key: '30',    label: '⏱ Next 30 min',     mins: 30 },
  { key: '60',    label: '⏱ Next 1 hour',     mins: 60 },
  { key: '120',   label: '⏱ Next 2 hours',    mins: 120 },
  { key: 'today', label: '📅 Today',          mins: 24 * 60 },
  { key: 'all',   label: '✨ All upcoming',   mins: Infinity }
]

export const TIME_SLOTS = ['Morning', 'Afternoon', 'Evening', 'Night']

export const DEPARTMENTS = [
  'Computer Engineering', 'Information Technology', 'AI & Data Science',
  'Electronics & Telecom', 'Mechanical', 'Electrical', 'Civil', 'Other'
]
export const YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year']
export const SKILLS = ['Beginner', 'Intermediate', 'Advanced']
export const LOOKING_FOR = ['Internships', 'Hackathons', 'Workshops', 'Networking', 'Placements']

export const AVATARS = [
  { key: 'rocket', emoji: '🚀', grad: 'from-indigo-500 to-cyan-400' },
  { key: 'robot',  emoji: '🤖', grad: 'from-violet-500 to-purple-500' },
  { key: 'bulb',   emoji: '💡', grad: 'from-amber-500 to-orange-500' },
  { key: 'game',   emoji: '🎮', grad: 'from-pink-500 to-fuchsia-500' },
  { key: 'chip',   emoji: '🧠', grad: 'from-emerald-500 to-teal-500' },
  { key: 'code',   emoji: '👨‍💻', grad: 'from-sky-500 to-indigo-500' },
  { key: 'vr',     emoji: '🥽', grad: 'from-rose-500 to-pink-500' },
  { key: 'star',   emoji: '⭐', grad: 'from-yellow-400 to-amber-500' }
]

/* ---------- Dates & times ---------- */
const pad = (n) => String(n).padStart(2, '0')

// Local YYYY-MM-DD (toISOString() is UTC and gives the wrong day in India early morning)
export function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function getTimeSlot(timeStr) {
  const h = parseInt(timeStr.split(':')[0], 10)
  if (h < 12) return 'Morning'
  if (h < 17) return 'Afternoon'
  if (h < 21) return 'Evening'
  return 'Night'
}

export function eventStartDate(event) {
  const [h, m] = event.start_time.split(':').map(Number)
  const d = new Date(event.date + 'T00:00:00')
  d.setHours(h, m, 0, 0)
  return d
}

export function eventEndDate(event) {
  const [h, m] = event.end_time.split(':').map(Number)
  const d = new Date((event.end_date || event.date) + 'T00:00:00')
  d.setHours(h, m, 0, 0)
  // Handles events crossing midnight
  if (d < eventStartDate(event)) d.setDate(d.getDate() + 1)
  return d
}

export function minutesUntilStart(event) {
  return Math.round((eventStartDate(event) - Date.now()) / 60000)
}

export function isLive(event) {
  const now = Date.now()
  return now >= eventStartDate(event).getTime() && now <= eventEndDate(event).getTime()
}

export function isEnded(event) {
  return eventEndDate(event).getTime() < Date.now()
}

export function isUpcoming(event) {
  return eventStartDate(event).getTime() > Date.now()
}

export function timeAgoLabel(event) {
  if (isLive(event)) return '🟢 Live now'
  const m = minutesUntilStart(event)
  if (m < 0) return 'Ended'
  if (m < 60) return `in ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `in ${h}h ${m % 60}m`
  return `in ${Math.floor(h / 24)}d`
}

export function isRegistrationClosed(event) {
  if (!event.registration_deadline) return false
  return new Date(event.registration_deadline + 'T23:59:59').getTime() < Date.now()
}

export function formatTime(t) {
  const [hh, mm] = t.split(':').map(Number)
  const ampm = hh >= 12 ? 'PM' : 'AM'
  const h12 = ((hh + 11) % 12) + 1
  return `${h12}:${String(mm).padStart(2, '0')} ${ampm}`
}

export function formatDate(d) {
  const date = new Date(d + 'T00:00:00')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const diff = Math.round((date - today) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function formatDateRange(event) {
  if (!event.end_date || event.end_date === event.date) return formatDate(event.date)
  const a = new Date(event.date + 'T00:00:00')
  const b = new Date(event.end_date + 'T00:00:00')
  const mon = (d) => d.toLocaleDateString('en-US', { month: 'short' })
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
    return `${a.getDate()}–${b.getDate()} ${mon(b)} ${b.getFullYear()}`
  }
  return `${a.getDate()} ${mon(a)} – ${b.getDate()} ${mon(b)} ${b.getFullYear()}`
}

export function formatDeadline(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const timeLabel = (e) => (e.all_day ? 'All day' : formatTime(e.start_time))
export const timeRangeLabel = (e) => (e.all_day ? 'All day' : `${formatTime(e.start_time)} – ${formatTime(e.end_time)}`)

export function eventDays(e) {
  if (!e.end_date) return 1
  return Math.round((new Date(e.end_date) - new Date(e.date)) / 86400000) + 1
}

/* ---------- Session / profile helpers ---------- */
export function getSessionId() {
  let id = null
  try { id = localStorage.getItem('cr_session_id') } catch { /* ignore */ }
  if (!id) {
    id = crypto.randomUUID()
    try { localStorage.setItem('cr_session_id', id) } catch { /* ignore */ }
  }
  return id
}

export const PROFILE_FIELDS = ['name', 'prn', 'college', 'department', 'year', 'skill_level', 'interests', 'looking_for', 'avatar', 'photo']

export const EMPTY_PROFILE = {
  name: '', prn: '', college: '', department: '', year: '', skill_level: '',
  interests: [], looking_for: [], avatar: '', photo: ''
}

export function normalizeProfile(p) {
  const out = {}
  PROFILE_FIELDS.forEach((k) => { out[k] = p && p[k] !== undefined && p[k] !== null ? p[k] : EMPTY_PROFILE[k] })
  return out
}

export function initials(name) {
  return (name || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
}

export function profileCompletion(p) {
  const checks = [p.name, p.prn, p.college, p.department, p.year, p.skill_level, p.interests.length > 0, p.photo || p.avatar]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

// Center-crops and shrinks a photo to a small square JPEG so it stays tiny in the database
export function resizeImage(file, size = 320) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const s = Math.min(img.width, img.height)
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = size
      canvas.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Bad image')) }
    img.src = url
  })
}

export function cn(...a) { return a.filter(Boolean).join(' ') }

// "Today" / "Tomorrow" / "Mon, Oct 5"  — or "5–6 Oct 2026" for multi-day events
export const dateLabelFor = (e) => (e.end_date && e.end_date !== e.date ? formatDateRange(e) : formatDate(e.date))

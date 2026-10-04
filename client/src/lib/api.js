const BASE = (import.meta.env.VITE_API_URL || '') + '/api'

async function req(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

export const api = {
  events: () => req('/events'),
  saved: (sid) => req(`/saved/${sid}`),
  save: (sid, eventId) => req('/saved', { method: 'POST', body: JSON.stringify({ sessionId: sid, eventId }) }),
  unsave: (sid, eventId) => req(`/saved/${sid}/${encodeURIComponent(eventId)}`, { method: 'DELETE' }),
  profile: (sid) => req(`/profile/${sid}`),
  saveProfile: (sid, data) => req(`/profile/${sid}`, { method: 'PUT', body: JSON.stringify(data) })
}

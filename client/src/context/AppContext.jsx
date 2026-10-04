import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../lib/api'
import { SEED_EVENTS } from '../lib/seed'
import { getSessionId, normalizeProfile } from '../lib/utils'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const LS_SAVED = 'cr_saved_ids'
const LS_PROFILE = 'cr_profile'
const readLS = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
const writeLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }

export function AppProvider({ children }) {
  const sessionId = useMemo(getSessionId, [])

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(false)       // true when Express + MongoDB answered
  const [usingSeed, setUsingSeed] = useState(false)
  const [savedIds, setSavedIds] = useState(() => readLS(LS_SAVED, []))
  const [profile, setProfile] = useState(() => {
    const p = readLS(LS_PROFILE, null)
    return p ? normalizeProfile(p) : null
  })
  const [toast, setToast] = useState(null)
  const [modalEvent, setModalEvent] = useState(null)
  const toastTimer = useRef(null)

  /* initial load from the API (MongoDB) with offline fallback */
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const [ev, sv, pr] = await Promise.all([api.events(), api.saved(sessionId), api.profile(sessionId)])
        if (!alive) return
        setOnline(true)
        setEvents(ev.length ? ev : SEED_EVENTS)
        setUsingSeed(!ev.length)
        setSavedIds(sv); writeLS(LS_SAVED, sv)
        if (pr) { const n = normalizeProfile(pr); setProfile(n); writeLS(LS_PROFILE, n) }
      } catch (err) {
        console.warn('API unavailable → using demo data', err)
        if (!alive) return
        setOnline(false); setUsingSeed(true); setEvents(SEED_EVENTS)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [sessionId])

  const showToast = useCallback((msg, icon = '✨') => {
    setToast({ msg, icon })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 1800)
  }, [])

  const toggleSave = useCallback(async (eventId) => {
    const was = savedIds.includes(eventId)
    const next = was ? savedIds.filter((i) => i !== eventId) : [...savedIds, eventId]
    setSavedIds(next); writeLS(LS_SAVED, next)
    showToast(was ? 'Removed from saved' : 'Saved to your events', was ? '🤍' : '❤️')
    if (online) {
      try { was ? await api.unsave(sessionId, eventId) : await api.save(sessionId, eventId) }
      catch (err) { console.warn('Save sync failed', err) }
    }
  }, [savedIds, online, sessionId, showToast])

  const saveProfile = useCallback(async (data) => {
    const n = normalizeProfile(data)
    setProfile(n); writeLS(LS_PROFILE, n)
    if (online) {
      try {
        const saved = await api.saveProfile(sessionId, n)
        const server = normalizeProfile(saved)
        setProfile(server); writeLS(LS_PROFILE, server)
      } catch (err) { console.warn('Profile sync failed', err); return false }
    }
    return true
  }, [online, sessionId])

  const value = {
    events, loading, online, usingSeed,
    savedIds, isSaved: (id) => savedIds.includes(id), toggleSave,
    profile, saveProfile,
    toast, showToast,
    modalEvent, openEvent: setModalEvent, closeEvent: () => setModalEvent(null)
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { CATEGORIES, dateLabelFor, formatDate, timeLabel, isLive } from '../lib/utils'

export default function Calendar() {
  const { events, openEvent } = useApp()

  const grouped = useMemo(() => {
    const map = {}
    events.forEach((e) => { (map[e.date] ||= []).push(e) })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [events])

  return (
    <>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold">Campus Calendar</h2>
        <p className="text-white/50 text-sm">Upcoming events, grouped by date.</p>
      </div>

      <div className="space-y-6">
        {grouped.map(([date, evs], gi) => (
          <motion.div key={date} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(gi * 0.05, 0.4) }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 grid place-items-center shadow-glow">
                <div className="text-center leading-none">
                  <div className="text-[9px] uppercase font-bold opacity-80">
                    {new Date(date + 'T00:00:00').toLocaleDateString('en', { month: 'short' })}
                  </div>
                  <div className="text-base font-bold">{new Date(date + 'T00:00:00').getDate()}</div>
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold">{formatDate(date)}</h3>
                <p className="text-xs text-white/45">{evs.length} event{evs.length !== 1 && 's'}</p>
              </div>
            </div>

            <div className="space-y-2 pl-2 border-l-2 border-white/10 ml-6">
              {evs.map((e) => {
                const c = CATEGORIES[e.category]
                return (
                  <button
                    key={e.id}
                    onClick={() => openEvent(e)}
                    className="w-full text-left glass rounded-2xl p-3.5 flex items-center gap-3 hover:bg-white/10 transition"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c?.grad} grid place-items-center text-sm`}>{c?.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">
                        {e.featured && '⭐ '}{e.title}
                      </div>
                      <div className="text-xs text-white/50">
                        {e.end_date && e.end_date !== e.date ? dateLabelFor(e) : timeLabel(e)} · {e.location}
                        {isLive(e) && <span className="ml-2 text-emerald-300 font-bold">● LIVE</span>}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

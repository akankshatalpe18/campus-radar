import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Heart, Sparkles } from 'lucide-react'
import { CATEGORIES, dateLabelFor, timeLabel, timeAgoLabel, isLive } from '../lib/utils'

export default function EventCard({ event, onOpen, onToggleSave, saved, index = 0 }) {
  const cat = CATEGORIES[event.category] || { emoji: '📌', grad: 'from-slate-500 to-slate-700' }
  const live = isLive(event)
  const hasSeats = (event.capacity || 0) > 0
  const seatsLeft = (event.capacity || 0) - (event.registered || 0)
  const fillPct = Math.min(100, ((event.registered || 0) / (event.capacity || 1)) * 100)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -4 }}
      className="group relative glass rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-card"
      onClick={() => onOpen(event)}
    >
      <div className={`h-1.5 bg-gradient-to-r ${cat.grad}`} />

      {live && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          LIVE
        </div>
      )}

      <div className="p-5 pb-7">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className={`w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br ${cat.grad} grid place-items-center text-xl shadow-lg`}>
            {cat.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-white/45 font-semibold flex items-center gap-1.5">
              {event.category}
              {event.featured && <span className="inline-flex items-center gap-1 text-amber-300"><Sparkles className="w-3 h-3" />Featured</span>}
            </div>
            <h3 className="font-display font-bold text-base leading-tight mt-0.5 line-clamp-2">{event.title}</h3>
          </div>
        </div>

        <p className="text-sm text-white/55 line-clamp-2 mb-4">{event.description}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/65 mb-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            {dateLabelFor(event)} · {timeLabel(event)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent-400" />
            {event.location}
          </span>
        </div>

        {hasSeats && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-white/50 flex items-center gap-1">
                <Users className="w-3 h-3" /> {event.registered}/{event.capacity}
              </span>
              <span className={seatsLeft < 10 ? 'text-rose-300 font-semibold' : 'text-emerald-300 font-semibold'}>
                {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Full'}
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fillPct}%` }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`h-full bg-gradient-to-r ${cat.grad}`}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave(event.id) }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              saved
                ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                : 'glass border border-white/10 hover:bg-white/10 text-white/85'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button className="rounded-xl py-2.5 px-4 text-sm font-semibold bg-white text-ink-900 hover:bg-white/90 transition">
            Details
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-tl-2xl bg-white/5 text-white/50">
        {timeAgoLabel(event)}
      </div>
    </motion.div>
  )
}

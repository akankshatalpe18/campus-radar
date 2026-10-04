import { AnimatePresence, motion } from 'framer-motion'
import { X, MapPin, Clock, Users, Calendar, Heart, Trophy, Radio, Hourglass } from 'lucide-react'
import {
  CATEGORIES, dateLabelFor, timeRangeLabel, timeAgoLabel, getTimeSlot, eventDays,
  formatDeadline, isRegistrationClosed
} from '../lib/utils'

export default function EventModal({ event, onClose, onToggleSave, saved }) {
  const cat = event ? CATEGORIES[event.category] : null
  const hasSeats = event && (event.capacity || 0) > 0
  const days = event ? eventDays(event) : 1

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink-900/70 backdrop-blur-md grid place-items-end md:place-items-center p-0 md:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-ink-800 rounded-t-3xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className={`h-2 bg-gradient-to-r ${cat?.grad || 'from-slate-500 to-slate-700'}`} />

            <div className="p-6 max-h-[85vh] overflow-y-auto">
              {event.featured && event.image_url && (
                <div className="relative -mx-6 -mt-6 mb-5 h-44 overflow-hidden">
                  <img src={event.image_url} alt="" className="w-full h-full object-cover object-[50%_40%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-800 to-transparent" />
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat?.grad || 'from-slate-500 to-slate-700'} grid place-items-center text-2xl`}>
                    {cat?.emoji || '📌'}
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-white/45 font-bold">{event.category}</div>
                    <div className="text-xs text-accent-300 font-semibold">{timeAgoLabel(event)}</div>
                  </div>
                </div>
                <button onClick={onClose} className="glass p-2 rounded-xl hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="font-display text-2xl font-bold leading-tight">{event.title}</h2>
              {event.tagline && <p className="text-brand-300 text-sm font-semibold mt-1">{event.tagline}</p>}
              <p className="text-white/70 leading-relaxed mt-3 mb-6">{event.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <InfoTile icon={<Calendar className="w-4 h-4" />} label="Date" value={dateLabelFor(event)} />
                <InfoTile icon={<Clock className="w-4 h-4" />} label="Time" value={timeRangeLabel(event)} />
                <InfoTile icon={<MapPin className="w-4 h-4" />} label="Location" value={event.location} />
                {hasSeats
                  ? <InfoTile icon={<Users className="w-4 h-4" />} label="Seats" value={`${event.registered}/${event.capacity}`} />
                  : event.team_size
                    ? <InfoTile icon={<Users className="w-4 h-4" />} label="Team size" value={event.team_size.replace('Teams of ', '')} />
                    : null}
                <InfoTile
                  icon={<Hourglass className="w-4 h-4" />}
                  label="Duration"
                  value={days > 1 ? `${days} days` : `${event.duration} min`}
                />
                {event.all_day
                  ? <InfoTile icon={<Radio className="w-4 h-4" />} label="Mode" value={event.mode || '—'} />
                  : <InfoTile icon={<Calendar className="w-4 h-4" />} label="Slot" value={getTimeSlot(event.start_time)} />}
              </div>

              {event.prize && (
                <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-amber-300 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/45 font-semibold">Prizes</div>
                    <div className="font-bold">{event.prize}</div>
                  </div>
                </div>
              )}

              {event.tracks?.length > 0 && (
                <div className="mb-5">
                  <div className="text-[10px] uppercase tracking-wider text-white/45 font-semibold mb-2">Tracks</div>
                  <div className="flex flex-wrap gap-1.5">
                    {event.tracks.map((t) => (
                      <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/75">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {event.registration_deadline && (
                <p className={`text-xs font-semibold mb-4 ${isRegistrationClosed(event) ? 'text-amber-300' : 'text-emerald-300'}`}>
                  {isRegistrationClosed(event) ? 'Registrations closed' : 'Register by'} · {formatDeadline(event.registration_deadline)}
                  {event.skill_note ? ` · ${event.skill_note}` : ''}
                </p>
              )}

              <button
                onClick={() => onToggleSave(event.id)}
                className={`w-full rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-all ${
                  saved
                    ? 'bg-accent-500 text-white shadow-glow'
                    : 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-glow hover:opacity-95'
                }`}
              >
                <Heart className={`w-5 h-5 ${saved ? 'fill-white' : ''}`} />
                {saved ? 'Saved to my events' : 'Save this event'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="glass rounded-2xl p-3">
      <div className="flex items-center gap-1.5 text-white/45 text-[10px] uppercase tracking-wider font-semibold mb-1">
        {icon} {label}
      </div>
      <div className="text-sm font-semibold text-white/90">{value}</div>
    </div>
  )
}

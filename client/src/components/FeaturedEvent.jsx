import { motion } from 'framer-motion'
import { MapPin, CalendarDays, Trophy, Users, Heart, Sparkles, Radio, ExternalLink } from 'lucide-react'
import { formatDateRange, formatDeadline, isLive, isEnded, isRegistrationClosed, timeAgoLabel } from '../lib/utils'

export default function FeaturedEvent({ event, saved, onOpen, onToggleSave }) {
  const live = isLive(event)
  const ended = isEnded(event)
  const closed = isRegistrationClosed(event)

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl mb-6 border border-white/15 bg-ink-800 shadow-glow"
    >
      <div className="absolute inset-0 bg-mesh opacity-70" />
      <div className={`relative grid ${event.image_url ? 'md:grid-cols-[300px_1fr]' : ''}`}>
        {event.image_url && (
          <button onClick={() => onOpen(event)} className="relative h-64 md:h-auto block text-left" aria-label="Open CuriousParc details">
            <img
              src={event.image_url}
              alt={`${event.title} poster`}
              className="absolute inset-0 w-full h-full object-cover object-[50%_42%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink-800 via-ink-800/10 to-transparent" />
          </button>
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-ink-900"><Sparkles className="w-3 h-3" /> FEATURED</Badge>
            {event.mode && <Badge className="glass text-white/80">{event.mode}</Badge>}
            {live ? (
              <Badge className="bg-emerald-500/90 text-white"><Radio className="w-3 h-3 animate-pulse" /> LIVE NOW</Badge>
            ) : ended ? (
              <Badge className="glass text-white/60">Ended</Badge>
            ) : (
              <Badge className="glass text-brand-300">Starts {timeAgoLabel(event)}</Badge>
            )}
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-none">{event.title}</h2>
          {event.tagline && <p className="text-brand-300 font-semibold mt-2 text-sm md:text-base">{event.tagline}</p>}
          <p className="text-white/60 text-sm mt-3 max-w-xl line-clamp-3">{event.description}</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80 mt-5">
            <Meta icon={<CalendarDays className="w-4 h-4 text-brand-400" />}>{formatDateRange(event)}</Meta>
            <Meta icon={<MapPin className="w-4 h-4 text-accent-400" />}>{event.location}</Meta>
            {event.team_size && <Meta icon={<Users className="w-4 h-4 text-emerald-300" />}>{event.team_size}</Meta>}
          </div>

          {event.prize && (
            <div className="inline-flex items-center gap-2.5 mt-4 glass rounded-2xl px-4 py-2.5">
              <Trophy className="w-5 h-5 text-amber-300" />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-white/45 font-semibold">Prizes</div>
                <div className="font-bold text-sm">{event.prize}</div>
              </div>
            </div>
          )}

          {event.tracks?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {event.tracks.map((t) => (
                <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">{t}</span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 mt-6">
            <button
              onClick={() => onOpen(event)}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-white text-ink-900 hover:bg-white/90 transition"
            >
              View details
            </button>
            <button
              onClick={() => onToggleSave(event.id)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 transition-all ${
                saved ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30' : 'glass border border-white/10 hover:bg-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
              {saved ? 'Saved' : 'Save'}
            </button>
            {event.register_url && !closed && !ended && (
              <a
                href={event.register_url} target="_blank" rel="noreferrer"
                className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-500 to-accent-500 shadow-glow flex items-center gap-2"
              >
                Register now <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {event.registration_deadline && (
              <span className={`text-xs font-semibold ${closed ? 'text-amber-300' : 'text-emerald-300'}`}>
                {closed ? 'Registrations closed' : 'Register by'} · {formatDeadline(event.registration_deadline)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${className}`}>
      {children}
    </span>
  )
}
function Meta({ icon, children }) {
  return <span className="flex items-center gap-2">{icon}{children}</span>
}

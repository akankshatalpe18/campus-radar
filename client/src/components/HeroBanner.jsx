import { motion } from 'framer-motion'
import { Clock, Flame, CalendarHeart } from 'lucide-react'

export default function HeroBanner({ liveCount, soonCount, todayCount, name }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="relative overflow-hidden rounded-3xl mb-6 bg-mesh border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900/40 via-ink-900/20 to-ink-900/60" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-500/30 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-500/30 blur-3xl"
      />

      <div className="relative p-6 md:p-9">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white/60 text-sm mb-1">
          {greeting}{name ? `, ${name}` : ''} 👋
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-1"
        >
          What's happening on campus?
        </motion.h2>
        <p className="text-white/50 text-sm mb-6 max-w-md">
          Tap your vibe. We'll radar in what's live, soon, and today.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <Stat icon={<Flame className="w-4 h-4" />} label="Live now" value={liveCount} accent="text-emerald-300" />
          <Stat icon={<Clock className="w-4 h-4" />} label="Starting soon" value={soonCount} accent="text-amber-300" />
          <Stat icon={<CalendarHeart className="w-4 h-4" />} label="Today" value={todayCount} accent="text-brand-300" />
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, label, value, accent }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5">
      <span className={accent}>{icon}</span>
      <div className="leading-tight">
        <div className="font-bold text-lg">{value}</div>
        <div className="text-[10px] uppercase tracking-wider text-white/50">{label}</div>
      </div>
    </motion.div>
  )
}

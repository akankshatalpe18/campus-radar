import { motion } from 'framer-motion'
import { Home, CalendarDays, Heart, User } from 'lucide-react'

export default function BottomNav({ tab, setTab, savedCount }) {
  const items = [
    { key: 'home',     icon: Home,         label: 'Discover' },
    { key: 'calendar', icon: CalendarDays, label: 'Calendar' },
    { key: 'saved',    icon: Heart,        label: 'Saved', badge: savedCount },
    { key: 'profile',  icon: User,         label: 'Profile' }
  ]
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10">
      <div className="grid grid-cols-4 h-16">
        {items.map((it) => {
          const Icon = it.icon
          const active = tab === it.key
          return (
            <button key={it.key} onClick={() => setTab(it.key)} className="relative flex flex-col items-center justify-center gap-0.5">
              {active && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-x-4 top-1.5 h-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                />
              )}
              <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-white/45'}`} />
              <span className={`text-[10px] font-semibold ${active ? 'text-white' : 'text-white/45'}`}>{it.label}</span>
              {it.badge > 0 && (
                <span className="absolute top-2 right-[22%] bg-accent-500 text-white text-[9px] font-bold px-1.5 rounded-full">
                  {it.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

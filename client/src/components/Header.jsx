import { motion } from 'framer-motion'
import { Radar, Sparkles } from 'lucide-react'
import Avatar from './Avatar'

export default function Header({ savedCount, onOpenSaved, onOpenProfile, online, profile }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="glass border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 grid place-items-center shadow-glow">
                <Radar className="w-5 h-5 text-white" strokeWidth={2.4} />
              </div>
              <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-ink-900 animate-pulse ${online ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            </div>
            <div className="leading-tight">
              <h1 className="font-display font-bold text-lg tracking-tight">CampusRadar</h1>
              <p className="text-[11px] text-white/50 -mt-0.5">{online ? 'live' : 'demo mode · offline data'}</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-white/60 glass px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-accent-400" />
              <span></span>
            </div>

            <button
              onClick={onOpenSaved}
              className="relative glass hover:bg-white/10 transition-colors rounded-xl px-3.5 py-2 flex items-center gap-2 text-sm font-medium"
            >
              ❤️ <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="bg-accent-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenProfile}
              className="glass hover:bg-white/10 transition-colors rounded-full pl-1 pr-3 py-1 flex items-center gap-2 text-sm font-medium"
              aria-label="Open profile"
            >
              <Avatar profile={profile} size={30} />
              <span className="hidden sm:inline max-w-[110px] truncate">
                {profile?.name ? profile.name.split(' ')[0] : 'Profile'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

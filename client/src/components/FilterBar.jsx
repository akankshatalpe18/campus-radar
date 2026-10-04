import { motion } from 'framer-motion'
import { CATEGORIES, TIME_FILTERS, TIME_SLOTS } from '../lib/utils'

export default function FilterBar({
  activeCategory, setActiveCategory,
  activeTime, setActiveTime,
  activeSlot, setActiveSlot
}) {
  return (
    <div className="space-y-4 mb-6">
      {/* Categories */}
      <div>
        <SectionLabel>Vibe</SectionLabel>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          <Chip active={activeCategory === 'All'} onClick={() => setActiveCategory('All')}>
            ✨ All
          </Chip>
          {Object.entries(CATEGORIES).map(([name, { emoji }]) => (
            <Chip key={name} active={activeCategory === name} onClick={() => setActiveCategory(name)}>
              {emoji} {name}
            </Chip>
          ))}
        </div>
      </div>

      {/* Time */}
      <div>
        <SectionLabel>When</SectionLabel>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          {TIME_FILTERS.map(f => (
            <Chip key={f.key} active={activeTime === f.key} onClick={() => setActiveTime(f.key)}>
              {f.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* Time of day */}
      <div>
        <SectionLabel>Time of day</SectionLabel>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          <Chip active={activeSlot === 'Any'} onClick={() => setActiveSlot('Any')}>🕐 Any</Chip>
          {TIME_SLOTS.map(s => (
            <Chip key={s} active={activeSlot === s} onClick={() => setActiveSlot(s)}>{s}</Chip>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-2 px-1">
      {children}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`chip shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-all border ${
        active
          ? 'bg-gradient-to-r from-brand-500 to-accent-500 border-transparent text-white shadow-glow'
          : 'glass border-white/10 text-white/75 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </motion.button>
  )
}

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeroBanner from '../components/HeroBanner'
import FeaturedEvent from '../components/FeaturedEvent'
import FilterBar from '../components/FilterBar'
import EventCard from '../components/EventCard'
import SkeletonCard from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'
import { useApp } from '../context/AppContext'
import { TIME_FILTERS, minutesUntilStart, isLive, getTimeSlot, todayStr } from '../lib/utils'

export default function Home() {
  const { events, loading, isSaved, toggleSave, openEvent, profile } = useApp()

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTime, setActiveTime] = useState('all')
  const [activeSlot, setActiveSlot] = useState('Any')

  const filtersActive = activeCategory !== 'All' || activeTime !== 'all' || activeSlot !== 'Any'

  const filtered = useMemo(() => {
    const tf = TIME_FILTERS.find((t) => t.key === activeTime)
    const today = todayStr()
    return events.filter((e) => {
      if (activeCategory !== 'All' && e.category !== activeCategory) return false
      if (activeSlot !== 'Any' && getTimeSlot(e.start_time) !== activeSlot) return false
      if (tf && tf.mins !== Infinity) {
        const m = minutesUntilStart(e)
        if (activeTime === 'now') {
          if (!isLive(e)) return false
        } else if (activeTime === 'today') {
          if (e.date !== today && !isLive(e)) return false
        } else if (m < -5 || m > tf.mins) return false
      }
      return true
    })
  }, [events, activeCategory, activeTime, activeSlot])

  // Featured events (CuriousParc) sit on top; they join the grid only when filters are used
  const featured = !filtersActive ? events.filter((e) => e.featured) : []
  const gridEvents = filtersActive ? filtered : filtered.filter((e) => !e.featured)

  const today = todayStr()
  const liveCount = events.filter(isLive).length
  const soonCount = events.filter((e) => { const m = minutesUntilStart(e); return m > 0 && m <= 120 }).length
  const todayCount = events.filter((e) => e.date === today).length

  const resetFilters = () => { setActiveCategory('All'); setActiveTime('all'); setActiveSlot('Any') }
  const firstName = profile?.name ? profile.name.split(' ')[0] : ''

  return (
    <>
      {featured.map((f) => (
        <FeaturedEvent key={f.id} event={f} saved={isSaved(f.id)} onOpen={openEvent} onToggleSave={toggleSave} />
      ))}

      <HeroBanner liveCount={liveCount} soonCount={soonCount} todayCount={todayCount} name={firstName} />

      <FilterBar
        activeCategory={activeCategory} setActiveCategory={setActiveCategory}
        activeTime={activeTime} setActiveTime={setActiveTime}
        activeSlot={activeSlot} setActiveSlot={setActiveSlot}
      />

      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-display font-bold text-lg">
          {gridEvents.length} event{gridEvents.length !== 1 && 's'}
        </h3>
        {filtersActive && (
          <button onClick={resetFilters} className="text-xs text-brand-400 hover:text-brand-300 font-semibold">
            Clear all
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : gridEvents.length === 0 ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {gridEvents.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} saved={isSaved(e.id)} onOpen={openEvent} onToggleSave={toggleSave} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  )
}

import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EventCard from '../components/EventCard'
import { useApp } from '../context/AppContext'

export default function Saved() {
  const { events, savedIds, toggleSave, openEvent } = useApp()
  const savedEvents = useMemo(() => events.filter((e) => savedIds.includes(e.id)), [events, savedIds])

  return (
    <>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold">My Events</h2>
        <p className="text-white/50 text-sm">Everything you've ❤️ saved, in one place.</p>
      </div>

      {savedEvents.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🤍</div>
          <h3 className="font-display text-xl font-bold mb-1.5">No saved events yet</h3>
          <p className="text-white/50 text-sm">Tap the ❤️ on any event to keep it here.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {savedEvents.map((e, i) => (
              <EventCard key={e.id} event={e} index={i} saved onOpen={openEvent} onToggleSave={toggleSave} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  )
}

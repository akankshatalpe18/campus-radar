import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20 px-4"
    >
      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 grid place-items-center mb-5 border border-white/10">
        <Search className="w-9 h-9 text-white/40" />
      </div>
      <h3 className="font-display text-xl font-bold mb-1.5">Nothing on the radar</h3>
      <p className="text-white/50 text-sm mb-5">Try clearing a filter or widening your time window.</p>
      <button
        onClick={onReset}
        className="rounded-xl px-5 py-2.5 bg-gradient-to-r from-brand-500 to-accent-500 font-semibold text-sm shadow-glow"
      >
        Reset filters
      </button>
    </motion.div>
  )
}

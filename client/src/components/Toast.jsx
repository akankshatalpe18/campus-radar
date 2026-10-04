import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ toast }) {
  return (
    <div className="fixed bottom-24 md:bottom-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="glass rounded-2xl px-5 py-3 flex items-center gap-3 shadow-glow"
          >
            <span className="text-xl">{toast.icon}</span>
            <span className="font-medium text-sm">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Delete, X } from 'lucide-react'

const LETTERS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']
const NUMPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const titleCase = (s) => s.toLowerCase().replace(/(^|[\s.\-])([a-z])/g, (m, p, c) => p + c.toUpperCase())

// On-screen keyboard so even typing is done by tapping — no system keyboard, no <input>.
export default function TapKeyboard({ open, title, value, mode = 'text', maxLength = 40, onClose, onDone }) {
  const [draft, setDraft] = useState('')
  const [caps, setCaps] = useState(false)

  useEffect(() => {
    if (open) { setDraft(value || ''); setCaps(false) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const add = (ch) => {
    setDraft((d) => {
      if (d.length >= maxLength) return d
      const next = d + ch
      if (mode !== 'text') return next
      return caps ? next.toUpperCase() : titleCase(next)
    })
  }
  const back = () => setDraft((d) => d.slice(0, -1))
  const done = () => { onDone(draft.trim()); onClose() }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-ink-900/80 backdrop-blur-md grid place-items-end md:place-items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-ink-800 border border-white/10 rounded-t-3xl md:rounded-3xl p-4 pb-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-display font-bold">{title}</h3>
              <button onClick={onClose} className="glass p-1.5 rounded-lg hover:bg-white/10"><X className="w-4 h-4" /></button>
            </div>

            <div className="glass rounded-2xl px-4 py-3 mb-4 min-h-[56px] flex items-center text-lg font-semibold break-all">
              {draft || <span className="text-white/30 font-medium">Tap keys below…</span>}
              <span className="ml-0.5 w-0.5 h-6 bg-accent-400 animate-pulse" />
            </div>

            {mode === 'text' ? (
              <div className="space-y-2">
                {LETTERS.map((row, i) => (
                  <div key={row} className="flex justify-center gap-1.5">
                    {i === 2 && (
                      <Key wide active={caps} onClick={() => setCaps((c) => !c)}>{caps ? 'AA' : 'Aa'}</Key>
                    )}
                    {row.split('').map((ch) => <Key key={ch} onClick={() => add(ch)}>{ch}</Key>)}
                    {i === 2 && <Key wide onClick={back}><Delete className="w-5 h-5" /></Key>}
                  </div>
                ))}
                <div className="flex justify-center gap-1.5">
                  <Key onClick={() => add('.')}>.</Key>
                  <Key onClick={() => add('-')}>-</Key>
                  <Key grow onClick={() => add(' ')}>space</Key>
                  <Key primary wide onClick={done}>Done</Key>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {NUMPAD.map((n) => <Key key={n} big onClick={() => add(n)}>{n}</Key>)}
                <Key big onClick={back}><Delete className="w-5 h-5" /></Key>
                <Key big onClick={() => add('0')}>0</Key>
                <Key big primary onClick={done}>Done</Key>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Key({ children, onClick, wide, grow, big, primary, active }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      className={[
        'chip rounded-xl font-semibold grid place-items-center transition-colors',
        big ? 'h-14 text-xl' : 'h-11 text-sm',
        grow ? 'flex-1' : wide ? 'px-4 min-w-[56px]' : 'w-[9%] min-w-[30px]',
        primary
          ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-glow'
          : active ? 'bg-brand-500/40 border border-brand-400 text-white' : 'glass hover:bg-white/10 text-white/90'
      ].join(' ')}
    >
      {children}
    </motion.button>
  )
}

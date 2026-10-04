import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import EventModal from './components/EventModal'
import Toast from './components/Toast'
import Home from './pages/Home'
import Saved from './pages/Saved'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'
import { useApp } from './context/AppContext'

export default function App() {
  const [tab, setTab] = useState('home')
  const { savedIds, online, profile, toast, modalEvent, closeEvent, toggleSave, isSaved } = useApp()

  const go = (t) => { setTab(t); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="min-h-screen bg-ink-900 bg-mesh bg-fixed">
      <Header
        savedCount={savedIds.length}
        online={online}
        profile={profile}
        onOpenSaved={() => go('saved')}
        onOpenProfile={() => go('profile')}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 pb-28 md:pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === 'home' && <Home />}
            {tab === 'calendar' && <Calendar />}
            {tab === 'saved' && <Saved />}
            {tab === 'profile' && <Profile />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Desktop tab switcher (mobile uses the bottom bar) */}
      <DesktopTabs tab={tab} setTab={go} />
      <BottomNav tab={tab} setTab={go} savedCount={savedIds.length} />

      <EventModal
        event={modalEvent}
        onClose={closeEvent}
        onToggleSave={toggleSave}
        saved={modalEvent ? isSaved(modalEvent.id) : false}
      />
      <Toast toast={toast} />
    </div>
  )
}

function DesktopTabs({ tab, setTab }) {
  const items = [['home', '🏠 Discover'], ['calendar', '🗓 Calendar'], ['saved', '❤️ Saved'], ['profile', '👤 Profile']]
  return (
    <div className="hidden md:flex fixed left-1/2 -translate-x-1/2 bottom-6 z-40 glass rounded-full p-1.5 gap-1 shadow-card">
      {items.map(([key, label]) => (
        <button
          key={key}
          onClick={() => setTab(key)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            tab === key ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-glow' : 'text-white/60 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Trash2, Keyboard, GraduationCap, BadgeCheck, Building2, Check, Heart, Save } from 'lucide-react'
import Avatar from '../components/Avatar'
import TapKeyboard from '../components/TapKeyboard'
import { useApp } from '../context/AppContext'
import {
  AVATARS, CATEGORIES, DEPARTMENTS, YEARS, SKILLS, LOOKING_FOR,
  EMPTY_PROFILE, PROFILE_FIELDS, normalizeProfile, profileCompletion, resizeImage
} from '../lib/utils'

const same = (a, b) => PROFILE_FIELDS.every((k) => JSON.stringify(a[k]) === JSON.stringify(b[k]))

export default function Profile() {
  const { profile, saveProfile, savedIds, showToast, online } = useApp()
  const stored = normalizeProfile(profile || EMPTY_PROFILE)

  const [draft, setDraft] = useState(stored)
  const [kb, setKb] = useState(null) // { field, title, mode, max }
  const [saving, setSaving] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => { setDraft(normalizeProfile(profile || EMPTY_PROFILE)) }, [profile])

  const dirty = !same(draft, stored)
  const pct = profileCompletion(draft)
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }))
  const toggleIn = (k, v) => setDraft((d) => ({ ...d, [k]: d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v] }))

  async function onPhoto(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const url = await resizeImage(file, 320)
      setDraft((d) => ({ ...d, photo: url, avatar: '' }))
    } catch {
      showToast('Could not read that image', '⚠️')
    }
  }

  async function onSave() {
    setSaving(true)
    const ok = await saveProfile(draft)
    setSaving(false)
    showToast(ok ? 'Profile saved' : 'Saved on this device only', ok ? '✅' : '⚠️')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold">My Profile</h2>
        <p className="text-white/50 text-sm">Your campus ID card. Everything here is set with taps.</p>
      </div>

      {/* ---------- ID card ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-400 via-brand-600 to-accent-500 shadow-glow mb-6"
      >
        <div className="relative rounded-[calc(1.5rem-1.5px)] bg-ink-800 overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-70" />
          <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="relative p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <BadgeCheck className="w-4 h-4 text-brand-300" /> CampusRadar · Student
              </div>
              <div className="text-[11px] font-bold px-2.5 py-1 rounded-full glass text-emerald-300">{pct}% complete</div>
            </div>

            <div className="flex items-center gap-5">
              <Avatar profile={draft} size={96} className="ring-4 ring-white/20 shadow-xl" />
              <div className="min-w-0">
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight truncate">
                  {draft.name || <span className="text-white/30">Your name</span>}
                </h3>
                <p className="text-brand-300 font-semibold text-sm mt-1">
                  {[draft.department, draft.year].filter(Boolean).join(' · ') || 'Add department & year'}
                </p>
                {draft.skill_level && (
                  <span className="inline-block mt-2 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500">
                    {draft.skill_level}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <CardInfo icon={<Building2 className="w-4 h-4" />} label="College" value={draft.college} />
              <CardInfo icon={<BadgeCheck className="w-4 h-4" />} label="PRN / Roll no." value={draft.prn} />
            </div>

            {(draft.interests.length > 0 || draft.looking_for.length > 0) && (
              <div className="flex flex-wrap gap-1.5 mt-5">
                {draft.interests.map((i) => (
                  <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                    {CATEGORIES[i]?.emoji} {i}
                  </span>
                ))}
                {draft.looking_for.map((i) => (
                  <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-300">
                    {i}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-accent-400" /> {savedIds.length} saved events</span>
              <span>{online ? 'Synced to MongoDB' : 'Stored on this device'}</span>
            </div>

            <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-brand-400 to-accent-500"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------- Photo ---------- */}
      <Section title="Profile photo" icon={<Camera className="w-4 h-4" />}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-500 to-accent-500 shadow-glow flex items-center gap-2"
          >
            <Camera className="w-4 h-4" /> Upload photo
          </button>
          {draft.photo && (
            <button
              onClick={() => set('photo', '')}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold glass hover:bg-white/10 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
        </div>
        <div className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-2">…or pick an avatar</div>
        <div className="flex flex-wrap gap-2.5">
          {AVATARS.map((a) => {
            const active = !draft.photo && draft.avatar === a.key
            return (
              <motion.button
                key={a.key} whileTap={{ scale: 0.9 }}
                onClick={() => setDraft((d) => ({ ...d, avatar: a.key, photo: '' }))}
                className={`relative w-12 h-12 rounded-full grid place-items-center text-xl bg-gradient-to-br ${a.grad} ${active ? 'ring-2 ring-white ring-offset-2 ring-offset-ink-800' : 'opacity-80 hover:opacity-100'}`}
              >
                {a.emoji}
              </motion.button>
            )
          })}
        </div>
      </Section>

      {/* ---------- Basics ---------- */}
      <Section title="Basic details" icon={<BadgeCheck className="w-4 h-4" />}>
        <div className="space-y-2.5">
          <TapField label="Full name" value={draft.name} placeholder="Tap to add your name"
            onClick={() => setKb({ field: 'name', title: 'Your full name', mode: 'text', max: 40 })} />
          <TapField label="College / Institute" value={draft.college} placeholder="Tap to add your college"
            onClick={() => setKb({ field: 'college', title: 'College / Institute', mode: 'text', max: 60 })} />
          <TapField label="PRN / Roll number" value={draft.prn} placeholder="Tap to add number"
            onClick={() => setKb({ field: 'prn', title: 'PRN / Roll number', mode: 'number', max: 15 })} />
        </div>
      </Section>

      <Section title="Department" icon={<GraduationCap className="w-4 h-4" />}>
        <ChipGroup options={DEPARTMENTS} isActive={(o) => draft.department === o} onPick={(o) => set('department', draft.department === o ? '' : o)} />
      </Section>

      <Section title="Year" icon={<GraduationCap className="w-4 h-4" />}>
        <ChipGroup options={YEARS} isActive={(o) => draft.year === o} onPick={(o) => set('year', draft.year === o ? '' : o)} />
      </Section>

      <Section title="Skill level" icon={<GraduationCap className="w-4 h-4" />}>
        <ChipGroup options={SKILLS} isActive={(o) => draft.skill_level === o} onPick={(o) => set('skill_level', draft.skill_level === o ? '' : o)} />
      </Section>

      <Section title="Interests" hint="Pick all that apply">
        <ChipGroup
          options={Object.keys(CATEGORIES)}
          label={(o) => `${CATEGORIES[o].emoji} ${o}`}
          isActive={(o) => draft.interests.includes(o)}
          onPick={(o) => toggleIn('interests', o)}
        />
      </Section>

      <Section title="Looking for" hint="Pick all that apply">
        <ChipGroup options={LOOKING_FOR} isActive={(o) => draft.looking_for.includes(o)} onPick={(o) => toggleIn('looking_for', o)} />
      </Section>

      {/* ---------- Save bar ---------- */}
      <div className="sticky bottom-20 md:bottom-20 z-30 mt-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={!dirty || saving}
          onClick={onSave}
          className={`w-full rounded-2xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-all ${
            dirty ? 'bg-gradient-to-r from-brand-500 to-accent-500 shadow-glow' : 'glass text-white/40'
          }`}
        >
          {dirty ? <Save className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          {saving ? 'Saving…' : dirty ? 'Save profile' : 'All changes saved'}
        </motion.button>
      </div>

      <TapKeyboard
        open={!!kb}
        title={kb?.title}
        mode={kb?.mode}
        maxLength={kb?.max}
        value={kb ? draft[kb.field] : ''}
        onClose={() => setKb(null)}
        onDone={(v) => kb && set(kb.field, v)}
      />
    </div>
  )
}

function Section({ title, hint, icon, children }) {
  return (
    <div className="glass rounded-3xl p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display font-bold flex items-center gap-2">
          {icon && <span className="text-brand-400">{icon}</span>}{title}
        </h4>
        {hint && <span className="text-[11px] text-white/40">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

function TapField({ label, value, placeholder, onClick }) {
  return (
    <button onClick={onClick} className="w-full text-left rounded-2xl px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">{label}</div>
        <div className={`font-semibold truncate ${value ? 'text-white' : 'text-white/30'}`}>{value || placeholder}</div>
      </div>
      <Keyboard className="w-5 h-5 text-white/40 shrink-0" />
    </button>
  )
}

function ChipGroup({ options, isActive, onPick, label = (o) => o }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <motion.button
          key={o} whileTap={{ scale: 0.94 }} onClick={() => onPick(o)}
          className={`chip rounded-full px-3.5 py-2 text-sm font-medium border transition-all ${
            isActive(o)
              ? 'bg-gradient-to-r from-brand-500 to-accent-500 border-transparent text-white shadow-glow'
              : 'glass border-white/10 text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          {label(o)}
        </motion.button>
      ))}
    </div>
  )
}

function CardInfo({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-3 min-w-0">
      <div className="flex items-center gap-1.5 text-white/45 text-[10px] uppercase tracking-wider font-semibold mb-1">{icon} {label}</div>
      <div className={`text-sm font-semibold truncate ${value ? 'text-white/90' : 'text-white/25'}`}>{value || '—'}</div>
    </div>
  )
}

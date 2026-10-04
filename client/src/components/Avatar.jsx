import { User } from 'lucide-react'
import { AVATARS, initials } from '../lib/utils'

export default function Avatar({ profile, size = 40, className = '' }) {
  const style = { width: size, height: size, fontSize: size * 0.42 }
  const base = `shrink-0 rounded-full overflow-hidden grid place-items-center font-bold text-white select-none ${className}`

  if (profile?.photo) {
    return (
      <div style={style} className={base}>
        <img src={profile.photo} alt="" className="w-full h-full object-cover" />
      </div>
    )
  }
  const preset = AVATARS.find((a) => a.key === profile?.avatar)
  if (preset) {
    return <div style={style} className={`${base} bg-gradient-to-br ${preset.grad}`}>{preset.emoji}</div>
  }
  const ini = initials(profile?.name)
  return (
    <div style={style} className={`${base} bg-gradient-to-br from-brand-500 to-accent-500`}>
      {ini || <User style={{ width: size * 0.5, height: size * 0.5 }} />}
    </div>
  )
}

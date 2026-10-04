export default function SkeletonCard() {
  return (
    <div className="glass rounded-3xl overflow-hidden animate-pulse">
      <div className="h-1.5 bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="flex gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-16 bg-white/10 rounded" />
            <div className="h-4 w-3/4 bg-white/10 rounded" />
          </div>
        </div>
        <div className="h-3 w-full bg-white/10 rounded" />
        <div className="h-3 w-2/3 bg-white/10 rounded" />
        <div className="h-9 bg-white/10 rounded-xl" />
      </div>
    </div>
  )
}

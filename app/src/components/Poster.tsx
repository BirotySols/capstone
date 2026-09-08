type PosterProps = {
  hue: number
  title: string
  live?: boolean
  progress?: number
}

export function Poster({ hue, title, live, progress }: PosterProps) {
  return (
    <div
      className="relative h-32 w-28 shrink-0 overflow-hidden"
      style={{
        background: `linear-gradient(145deg, hsl(${hue} 35% 22%), hsl(${hue + 24} 28% 12%))`,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 20%, hsl(${hue} 50% 50%), transparent 55%)`,
        }}
      />
      <span className="absolute bottom-2 left-2 right-2 text-left text-xs font-semibold leading-tight text-white/90">
        {title}
      </span>
      {live ? (
        <span
          aria-hidden="true"
          className="absolute top-2 left-2 bg-red-600 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white"
        >
          LIVE
        </span>
      ) : null}
      {progress != null ? (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
          <div className="h-full bg-white/80" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      ) : null}
    </div>
  )
}

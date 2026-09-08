import { Link } from 'react-router'
import { Poster } from '@/components/Poster.tsx'
import type { CatalogTitle } from '@/lib/types.ts'

type TitleTileProps = {
  title: CatalogTitle
  progress?: number
}

export function TitleTile({ title, progress }: TitleTileProps) {
  return (
    <Link
      to={`/watch/${title.id}`}
      aria-label={title.title}
      className="rounded-xl focus-visible:outline-steel"
    >
      <Poster
        hue={title.hue}
        title={title.title}
        live={title.kind === 'live'}
        progress={progress}
      />
    </Link>
  )
}

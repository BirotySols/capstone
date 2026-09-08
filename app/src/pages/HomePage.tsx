import { useMemo } from 'react'
import { Link } from 'react-router'
import { CatalogRegion } from '@/components/CatalogRegion.tsx'
import { TitleTile } from '@/components/TitleTile.tsx'
import { loadLiveCatalog, loadVodTitles } from '@/lib/catalogApi.ts'
import {
  loadContinueWatching,
  selectResumeRail,
} from '@/lib/continueWatching.ts'
import type { CatalogTitle } from '@/lib/types.ts'
import { useLoad } from '@/lib/useLoad.ts'

const SECOND_ROW_LABEL = 'Night shift'
const SECOND_ROW_OFFSET = 6

export function HomePage() {
  const continueWatching = useLoad(loadContinueWatching)
  const live = useLoad(loadLiveCatalog)
  const vod = useLoad(loadVodTitles)

  const resumeEntries = useMemo(() => {
    if (continueWatching.state.status !== 'ready') {
      return []
    }
    return selectResumeRail(continueWatching.state.data)
  }, [continueWatching.state])

  const vodById = useMemo(() => {
    const map = new Map<string, CatalogTitle>()
    if (vod.state.status === 'ready') {
      for (const title of vod.state.data) {
        map.set(title.id, title)
      }
    }
    return map
  }, [vod.state])

  const nightShift =
    vod.state.status === 'ready' ? vod.state.data.slice(SECOND_ROW_OFFSET) : []

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold">Home</h1>

      <CatalogRegion
        heading="Continue Watching"
        status={continueWatching.state.status}
        errorMessage="couldn't load progress"
        onRetry={continueWatching.retry}
      >
        {resumeEntries.length === 0 ? (
          <p>Nothing to resume</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto">
            {resumeEntries.map((entry) => {
              const title = vodById.get(entry.assetId)
              if (title) {
                return (
                  <TitleTile
                    key={entry.assetId}
                    title={title}
                    progress={
                      title.durationSec > 0 ? entry.positionSec / title.durationSec : undefined
                    }
                  />
                )
              }
              return (
                <Link
                  key={entry.assetId}
                  to={`/watch/${entry.assetId}`}
                  className="rounded-xl px-4 py-6 bg-graphite"
                >
                  {entry.assetId}
                </Link>
              )
            })}
          </div>
        )}
      </CatalogRegion>

      {live.state.status === 'ready' && live.state.data.channel == null ? null : (
        <CatalogRegion
          heading="Live"
          status={live.state.status}
          errorMessage="Live couldn’t load"
          onRetry={live.retry}
        >
          {live.state.status === 'ready' && live.state.data.channel ? (
            <TitleTile title={live.state.data.channel} />
          ) : null}
        </CatalogRegion>
      )}

      <CatalogRegion
        heading="Catalog"
        status={vod.state.status}
        errorMessage="Titles couldn’t load"
        onRetry={vod.retry}
      >
        {vod.state.status === 'ready' && vod.state.data.length === 0 ? (
          <p>No titles</p>
        ) : vod.state.status === 'ready' ? (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
            {vod.state.data.map((title) => (
              <TitleTile key={title.id} title={title} />
            ))}
          </div>
        ) : null}
      </CatalogRegion>

      {vod.state.status === 'ready' && nightShift.length > 0 ? (
        <section aria-label={SECOND_ROW_LABEL}>
          <h2 className="mb-4 font-display text-sm font-bold tracking-[0.2em] text-steel">
            {SECOND_ROW_LABEL}
          </h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
            {nightShift.map((title) => (
              <TitleTile key={title.id} title={title} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { TitleTile } from '@/components/TitleTile.tsx'
import { loadLiveCatalog, loadVodTitles } from '@/lib/catalogApi.ts'
import { filterTitles } from '@/lib/searchTitles.ts'
import { useLoad } from '@/lib/useLoad.ts'

const SEARCH_DEBOUNCE_MS = 300

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const urlQuery = params.get('q') ?? ''
  const [draft, setDraft] = useState(urlQuery)
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery)
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery)
    setDraft(urlQuery)
  }
  const vod = useLoad(loadVodTitles)
  const live = useLoad(loadLiveCatalog)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = draft.trim()
      const current = urlQuery.trim()
      if (next === current) {
        return
      }
      if (next === '') {
        setParams({}, { replace: true })
        return
      }
      setParams({ q: draft }, { replace: true })
    }, SEARCH_DEBOUNCE_MS)
    return () => {
      window.clearTimeout(timer)
    }
  }, [draft, setParams, urlQuery])

  const catalogStatus =
    vod.state.status === 'error' || live.state.status === 'error'
      ? 'error'
      : vod.state.status === 'loading' || live.state.status === 'loading'
        ? 'loading'
        : 'ready'

  const titles =
    vod.state.status === 'ready' && live.state.status === 'ready'
      ? [
          ...vod.state.data,
          ...(live.state.data.channel ? [live.state.data.channel] : []),
        ]
      : []
  const results = filterTitles(titles, urlQuery)
  const trimmedQuery = urlQuery.trim()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Search</h1>
      <label className="mt-6 block">
        <span className="sr-only">Search titles</span>
        <input
          className="w-full rounded-2xl bg-white/10 px-4 py-3 text-lg"
          placeholder="Substring search"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value)
          }}
        />
      </label>
      <div className="mt-6">
        {catalogStatus === 'loading' ? <p>Loading</p> : null}
        {catalogStatus === 'error' ? (
          <div>
            <p>Search couldn’t load</p>
            <button
              type="button"
              className="mt-2 rounded-xl bg-white/10 px-4 py-2"
              onClick={() => {
                vod.retry()
                live.retry()
              }}
            >
              Retry
            </button>
          </div>
        ) : null}
        {catalogStatus === 'ready' && trimmedQuery === '' ? <p>Empty query</p> : null}
        {catalogStatus === 'ready' && trimmedQuery !== '' && results.length === 0 ? (
          <p>No results</p>
        ) : null}
        {catalogStatus === 'ready' && results.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {results.map((title) => (
              <TitleTile key={title.id} title={title} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

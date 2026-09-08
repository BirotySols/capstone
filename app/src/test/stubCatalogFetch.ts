import { afterEach, beforeEach, vi } from 'vitest'
import fixtureAccountJson from '../../public/data/account.json'
import fixtureLiveJson from '../../public/data/live.json'
import fixtureVodJson from '../../public/data/vod.json'
import type { AccountProfile, CatalogTitle, LiveCatalog } from '@/lib/types.ts'

export const fixtureVod = fixtureVodJson as CatalogTitle[]
export const fixtureLive = fixtureLiveJson as LiveCatalog
export const fixtureAccount = fixtureAccountJson as AccountProfile

type FetchStub = {
  vod?: CatalogTitle[] | 'error' | 'pending'
  live?: LiveCatalog | 'error' | 'pending' | 'missing'
  account?: AccountProfile | 'error' | 'pending'
}

const pending = () => new Promise<Response>(() => {})

function jsonResponse(body: unknown): Promise<Response> {
  return Promise.resolve(
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  )
}

function errorResponse(path: string): Promise<Response> {
  return Promise.resolve(new Response(`Failed ${path}`, { status: 500 }))
}

export function stubCatalogFetch(overrides: FetchStub = {}): void {
  const vod = overrides.vod ?? fixtureVod
  const live = overrides.live ?? fixtureLive
  const account = overrides.account ?? fixtureAccount

  vi.stubGlobal('fetch', (input: RequestInfo | URL) => {
    const url = String(input)
    if (url.includes('/data/vod.json')) {
      if (vod === 'pending') return pending()
      if (vod === 'error') return errorResponse(url)
      return jsonResponse(vod)
    }
    if (url.includes('/data/live.json')) {
      if (live === 'pending') return pending()
      if (live === 'error') return errorResponse(url)
      if (live === 'missing') {
        return Promise.resolve(new Response('Not found', { status: 404 }))
      }
      return jsonResponse(live)
    }
    if (url.includes('/data/account.json')) {
      if (account === 'pending') return pending()
      if (account === 'error') return errorResponse(url)
      return jsonResponse(account)
    }
    return errorResponse(url)
  })
}

export function installDefaultCatalogFetch(): void {
  beforeEach(() => {
    stubCatalogFetch()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })
}

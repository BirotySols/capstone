import { fetchJson } from '@/lib/fetchJson.ts'
import type { AccountProfile, CatalogTitle, LiveCatalog } from '@/lib/types.ts'

export function loadVodTitles(): Promise<CatalogTitle[]> {
  return fetchJson<CatalogTitle[]>('/data/vod.json')
}

export function loadLiveCatalog(): Promise<LiveCatalog> {
  return fetchJson<LiveCatalog>('/data/live.json', { missing: { channel: null } })
}

export function loadAccountProfile(): Promise<AccountProfile> {
  return fetchJson<AccountProfile>('/data/account.json')
}

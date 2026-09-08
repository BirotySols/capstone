export type TitleKind = 'vod' | 'live'

export type CatalogTitle = {
  id: string
  title: string
  description: string
  kind: TitleKind
  durationSec: number
  hue: number
}

export type LiveCatalog = {
  channel: CatalogTitle | null
}

export type AccountProfile = {
  displayName: string
  avatarHue: number
  blurb: string
}

export type ContinueWatchingEntry = {
  assetId: string
  positionSec: number
  durationSec: number
  updatedAt: string
}

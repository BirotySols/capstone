import type { CatalogTitle } from '@/lib/types.ts'

export function filterTitles(titles: CatalogTitle[], query: string): CatalogTitle[] {
  const needle = query.trim().toLowerCase()
  if (!needle) {
    return []
  }
  return titles.filter((title) => {
    return (
      title.title.toLowerCase().includes(needle) ||
      title.description.toLowerCase().includes(needle)
    )
  })
}

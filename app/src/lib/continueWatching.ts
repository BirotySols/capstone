import type { ContinueWatchingEntry } from '@/lib/types.ts'

export const CONTINUE_WATCHING_STORAGE_KEY = 'night-reel.continue-watching'
export const CONTINUE_WATCHING_CAP = 8
export const RESUME_MIN_POSITION_SEC = 10
export const RESUME_MAX_FRACTION = 0.9

export function isResumable(entry: ContinueWatchingEntry): boolean {
  if (entry.durationSec <= 0) {
    return false
  }
  return (
    entry.positionSec > RESUME_MIN_POSITION_SEC &&
    entry.positionSec < entry.durationSec * RESUME_MAX_FRACTION
  )
}

export function readContinueWatching(): ContinueWatchingEntry[] {
  const raw = localStorage.getItem(CONTINUE_WATCHING_STORAGE_KEY)
  if (!raw) {
    return []
  }
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) {
    throw new Error('Continue watching data is not a list')
  }
  return parsed.filter(isContinueWatchingEntry)
}

export async function loadContinueWatching(): Promise<ContinueWatchingEntry[]> {
  return readContinueWatching()
}

export function resetContinueWatching(): void {
  localStorage.removeItem(CONTINUE_WATCHING_STORAGE_KEY)
}

export function selectResumeRail(entries: ContinueWatchingEntry[]): ContinueWatchingEntry[] {
  return entries
    .filter(isResumable)
    .slice()
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, CONTINUE_WATCHING_CAP)
}

function isContinueWatchingEntry(value: unknown): value is ContinueWatchingEntry {
  if (!value || typeof value !== 'object') {
    return false
  }
  const entry = value as ContinueWatchingEntry
  return (
    typeof entry.assetId === 'string' &&
    typeof entry.positionSec === 'number' &&
    typeof entry.durationSec === 'number' &&
    typeof entry.updatedAt === 'string'
  )
}

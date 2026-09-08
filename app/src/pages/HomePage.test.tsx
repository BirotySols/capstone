import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it } from 'vitest'
import App from '@/App.tsx'
import { CONTINUE_WATCHING_STORAGE_KEY, resetContinueWatching } from '@/lib/continueWatching.ts'
import { stubCatalogFetch } from '@/test/stubCatalogFetch.ts'

afterEach(() => {
  resetContinueWatching()
})

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('Home chrome', () => {
  it('shows Continue Watching empty copy, live tile, and catalog from fixtures', async () => {
    renderAt('/')

    const continueWatching = screen.getByRole('region', { name: 'Continue Watching' })
    await waitFor(() => {
      expect(within(continueWatching).getByText('Nothing to resume')).toBeInTheDocument()
    })

    expect(await screen.findByRole('link', { name: 'Harbor cam — live' })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'Night ferry' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Night shift' })).toBeInTheDocument()
  })

  it('hides the live row when the live fixture channel is missing', async () => {
    stubCatalogFetch({ live: { channel: null } })
    renderAt('/')

    await screen.findByRole('link', { name: 'Night ferry' })
    expect(screen.queryByRole('region', { name: 'Live' })).not.toBeInTheDocument()
  })

  it('hides the live row when the live fixture file is missing', async () => {
    stubCatalogFetch({ live: 'missing' })
    renderAt('/')

    await screen.findByRole('link', { name: 'Night ferry' })
    expect(screen.queryByRole('region', { name: 'Live' })).not.toBeInTheDocument()
  })

  it('keeps catalog visible when live fails, and retry restores the live tile', async () => {
    stubCatalogFetch({ live: 'error' })
    renderAt('/')

    const live = await screen.findByRole('region', { name: 'Live' })
    expect(within(live).getByText('Live couldn’t load')).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'Night ferry' })).toBeInTheDocument()

    stubCatalogFetch()
    fireEvent.click(within(live).getByRole('button', { name: 'Retry' }))
    expect(await screen.findByRole('link', { name: 'Harbor cam — live' })).toBeInTheDocument()
  })

  it('shows No titles when the VOD list is empty', async () => {
    stubCatalogFetch({ vod: [] })
    renderAt('/')

    const catalog = await screen.findByRole('region', { name: 'Catalog' })
    expect(within(catalog).getByText('No titles')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Night shift' })).not.toBeInTheDocument()
  })

  it('shows a catalog loading state before titles arrive', () => {
    stubCatalogFetch({ vod: 'pending' })
    renderAt('/')

    const catalog = screen.getByRole('region', { name: 'Catalog' })
    expect(catalog).toHaveAttribute('aria-busy', 'true')
    expect(within(catalog).getByText('Loading')).toBeInTheDocument()
  })

  it('shows continue-watching error copy without hiding catalog', async () => {
    localStorage.setItem(CONTINUE_WATCHING_STORAGE_KEY, '{not-json')
    renderAt('/')

    const continueWatching = await screen.findByRole('region', { name: 'Continue Watching' })
    expect(within(continueWatching).getByText("couldn't load progress")).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'Night ferry' })).toBeInTheDocument()
  })

  it('opens Watch from a catalog tile', async () => {
    renderAt('/')

    fireEvent.click(await screen.findByRole('link', { name: 'Night ferry' }))
    expect(screen.getByRole('heading', { name: 'Watch' })).toBeInTheDocument()
    expect(screen.getByText('vod-01')).toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: 'Destinations' })).not.toBeInTheDocument()
  })

  it('shows a resumable title on Continue Watching', async () => {
    localStorage.setItem(
      CONTINUE_WATCHING_STORAGE_KEY,
      JSON.stringify([
        {
          assetId: 'vod-08',
          positionSec: 1840,
          durationSec: 7200,
          updatedAt: '2026-09-01T00:00:00.000Z',
        },
      ]),
    )
    renderAt('/')

    const continueWatching = await screen.findByRole('region', { name: 'Continue Watching' })
    expect(
      within(continueWatching).getByRole('link', { name: 'Quay lights' }),
    ).toBeInTheDocument()
    expect(within(continueWatching).queryByText('Nothing to resume')).not.toBeInTheDocument()
  })
})

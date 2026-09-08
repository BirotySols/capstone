import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '@/App.tsx'
import { stubCatalogFetch } from '@/test/stubCatalogFetch.ts'

afterEach(() => {
  vi.useRealTimers()
})

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('Search chrome', () => {
  it('shows empty-query copy when q is missing', async () => {
    renderAt('/search')
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument()
    expect(await screen.findByText('Empty query')).toBeInTheDocument()
  })

  it('filters titles from the q param including live', async () => {
    renderAt('/search?q=harbor')
    expect(await screen.findByRole('link', { name: 'Harbor cam — live' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Night ferry' })).not.toBeInTheDocument()
  })

  it('matches a case-insensitive title substring', async () => {
    renderAt('/search?q=FeRrY')
    expect(await screen.findByRole('link', { name: 'Night ferry' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Glassworks' })).not.toBeInTheDocument()
  })

  it('shows no-results when nothing matches', async () => {
    renderAt('/search?q=zzzz-not-a-title')
    expect(await screen.findByText('No results')).toBeInTheDocument()
  })

  it('shows loading while catalog is in flight', () => {
    stubCatalogFetch({ vod: 'pending', live: 'pending' })
    renderAt('/search?q=night')
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('writes the typed query into the URL after debounce', async () => {
    renderAt('/search')
    expect(await screen.findByText('Empty query')).toBeInTheDocument()

    vi.useFakeTimers()
    fireEvent.change(screen.getByRole('textbox', { name: 'Search titles' }), {
      target: { value: 'ferry' },
    })
    expect(screen.getByText('Empty query')).toBeInTheDocument()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300)
    })
    vi.useRealTimers()

    expect(await screen.findByRole('link', { name: 'Night ferry' })).toBeInTheDocument()
    expect(screen.queryByText('Empty query')).not.toBeInTheDocument()
  })
})

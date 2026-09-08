import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '@/App.tsx'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('app routes', () => {
  it('renders Home with left destinations', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Destinations' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Account' })).toBeInTheDocument()
  })

  it('renders Search with left destinations', () => {
    renderAt('/search')
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Destinations' })).toBeInTheDocument()
  })

  it('renders Account with left destinations', () => {
    renderAt('/account')
    expect(screen.getByRole('heading', { name: 'Account' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Destinations' })).toBeInTheDocument()
  })

  it('renders Watch without left destinations', () => {
    renderAt('/watch/clear-1')
    expect(screen.getByRole('heading', { name: 'Watch' })).toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: 'Destinations' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Search' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Account' })).not.toBeInTheDocument()
  })
})

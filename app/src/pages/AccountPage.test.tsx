import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '@/App.tsx'
import { stubCatalogFetch } from '@/test/stubCatalogFetch.ts'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('Account chrome', () => {
  it('shows the stub profile from the fixture', async () => {
    renderAt('/account')
    expect(await screen.findByText('Alex Harbor')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Alex Harbor' })).toBeInTheDocument()
    expect(
      screen.getByText('Read-only stub. No billing, PIN, or devices.'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument()
  })

  it('retries after an account load error', async () => {
    stubCatalogFetch({ account: 'error' })
    renderAt('/account')
    expect(await screen.findByText('Account couldn’t load')).toBeInTheDocument()

    stubCatalogFetch()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(await screen.findByText('Alex Harbor')).toBeInTheDocument()
  })
})

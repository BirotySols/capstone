import { NavLink, Outlet } from 'react-router'

const destinations = [
  { to: '/', label: 'Home', end: true },
  { to: '/search', label: 'Search', end: false },
  { to: '/account', label: 'Account', end: false },
] as const

export function BrowseShell() {
  return (
    <div className="flex min-h-screen gap-6 bg-canvas px-4 py-4 text-ink">
      <aside className="flex w-48 shrink-0 flex-col gap-2">
        <p className="mb-6 px-4 font-display text-sm font-bold tracking-[0.25em] text-steel">
          NIGHT REEL
        </p>
        <nav aria-label="Destinations" className="flex flex-col gap-2">
          {destinations.map((destination) => (
            <NavLink
              key={destination.to}
              to={destination.to}
              end={destination.end}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-4 text-left text-lg font-semibold ${
                  isActive ? 'bg-white/10' : ''
                }`
              }
            >
              {destination.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}

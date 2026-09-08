import type { ReactNode } from 'react'

type CatalogRegionProps = {
  heading: string
  status: 'loading' | 'error' | 'ready'
  errorMessage: string
  onRetry: () => void
  children: ReactNode
}

export function CatalogRegion({
  heading,
  status,
  errorMessage,
  onRetry,
  children,
}: CatalogRegionProps) {
  return (
    <section aria-label={heading} aria-busy={status === 'loading'}>
      <h2 className="mb-4 font-display text-sm font-bold tracking-[0.2em] text-steel">
        {heading}
      </h2>
      {status === 'loading' ? <p>Loading</p> : null}
      {status === 'error' ? (
        <div>
          <p>{errorMessage}</p>
          <button
            type="button"
            className="mt-2 rounded-xl bg-white/10 px-4 py-2"
            onClick={onRetry}
          >
            Retry
          </button>
        </div>
      ) : null}
      {status === 'ready' ? children : null}
    </section>
  )
}

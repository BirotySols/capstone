import { useCallback, useEffect, useState } from 'react'

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: T }

export function useLoad<T>(loader: () => Promise<T>): {
  state: LoadState<T>
  retry: () => void
} {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<LoadState<T>>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    loader()
      .then((data) => {
        if (!cancelled) {
          setState({ status: 'ready', data })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Something went wrong',
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [attempt, loader])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((current) => current + 1)
  }, [])

  return { state, retry }
}

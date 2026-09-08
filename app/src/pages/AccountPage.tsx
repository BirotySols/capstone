import { loadAccountProfile } from '@/lib/catalogApi.ts'
import { useLoad } from '@/lib/useLoad.ts'

export function AccountPage() {
  const { state, retry } = useLoad(loadAccountProfile)

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Account</h1>
      {state.status === 'loading' ? <p className="mt-6">Loading</p> : null}
      {state.status === 'error' ? (
        <div className="mt-6">
          <p>Account couldn’t load</p>
          <button
            type="button"
            className="mt-2 rounded-xl bg-white/10 px-4 py-2"
            onClick={retry}
          >
            Retry
          </button>
        </div>
      ) : null}
      {state.status === 'ready' ? (
        <div className="mt-6 rounded-2xl bg-white/5 p-8">
          <div
            role="img"
            aria-label={state.data.displayName}
            className="h-20 w-20 rounded-full"
            style={{
              background: `linear-gradient(145deg, hsl(${state.data.avatarHue} 35% 22%), hsl(${state.data.avatarHue + 24} 28% 12%))`,
            }}
          />
          <p className="mt-4 font-display text-3xl font-bold">{state.data.displayName}</p>
          <p className="mt-2 text-ink/70">{state.data.blurb}</p>
        </div>
      ) : null}
    </div>
  )
}

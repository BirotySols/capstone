import { useParams } from 'react-router'

export function WatchPage() {
  const { id } = useParams()

  return (
    <div className="flex min-h-screen flex-col bg-canvas p-4 text-ink">
      <main className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-graphite">
        <h1 className="font-display text-5xl font-bold">Watch</h1>
        <p className="mt-2 text-steel">{id}</p>
      </main>
    </div>
  )
}

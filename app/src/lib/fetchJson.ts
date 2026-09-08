export async function fetchJson<T>(path: string, options?: { missing?: T }): Promise<T> {
  const response = await fetch(path)
  if (response.status === 404 && options && 'missing' in options) {
    return options.missing as T
  }
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`)
  }
  return (await response.json()) as T
}

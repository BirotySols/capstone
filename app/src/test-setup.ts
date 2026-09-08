import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { installDefaultCatalogFetch } from '@/test/stubCatalogFetch.ts'
import { resetContinueWatching } from '@/lib/continueWatching.ts'

installDefaultCatalogFetch()

afterEach(() => {
  resetContinueWatching()
  cleanup()
})

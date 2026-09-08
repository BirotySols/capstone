import { Route, Routes } from 'react-router'
import { BrowseShell } from '@/components/BrowseShell.tsx'
import { AccountPage } from '@/pages/AccountPage.tsx'
import { HomePage } from '@/pages/HomePage.tsx'
import { SearchPage } from '@/pages/SearchPage.tsx'
import { WatchPage } from '@/pages/WatchPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<BrowseShell />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="account" element={<AccountPage />} />
      </Route>
      <Route path="watch/:id" element={<WatchPage />} />
    </Routes>
  )
}

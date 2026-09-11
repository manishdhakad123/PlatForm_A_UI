import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import PlaceholderPage from './components/PlaceholderPage'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { routePaths } from './data/navigation'

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Topbar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        <section className="content-wrap">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboards" replace />} />
            <Route element={<Dashboard />} path="/dashboards" />
            {routePaths.map((path) => <Route element={<PlaceholderPage />} key={path} path={path} />)}
            <Route path="*" element={<Navigate to="/dashboards" replace />} />
          </Routes>
        </section>
      </main>
    </div>
  )
}

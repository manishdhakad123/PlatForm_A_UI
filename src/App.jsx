import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import DashboardDetail from './components/DashboardDetail'
import DashboardHub from './components/DashboardHub'

import PlaceholderPage from './components/PlaceholderPage'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

import { normalizeTrafficData, parseTrafficCsv, sampleTrafficData } from './data/dashboardData'
import { routePaths } from './data/navigation'

export default function App() {

  const [searchOpen, setSearchOpen] = useState(false)

  const [trafficData, setTrafficData] = useState(sampleTrafficData)
  const [fileName, setFileName] = useState('Sample traffic data')
  const [importError, setImportError] = useState('')

  async function handleImport(event) {
    const [file] = event.target.files || []
    if (!file) return

    try {
      const importedRows = await parseTrafficCsv(file)
      setTrafficData(normalizeTrafficData(importedRows))
      setFileName(file.name)
      setImportError('')
    } catch (error) {
      setImportError(error.message || 'Unable to import this CSV file.')
    } finally {
      event.target.value = ''
    }
  }

  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <Topbar
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />

        <section className="content-wrap">

          <Routes>

            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />

            {/* DASHBOARD CENTER */}

            <Route
              path="/dashboards"
              element={
                <DashboardHub
                  fileName={fileName}
                  importError={importError}
                  onImport={handleImport}
                  rows={trafficData}
                />
              }
            />

            <Route
              path="/dashboards/:kind"
              element={
                <DashboardDetail
                  fileName={fileName}
                  importError={importError}
                  onImport={handleImport}
                  rows={trafficData}
                />
              }
            />

            {/* OTHER PLATFORM PAGES */}

            {routePaths
              .filter((path) => path !== '/dashboards')
              .map((path) => (
                <Route
                  element={<PlaceholderPage />}
                  key={path}
                  path={path}
                />
              ))}

            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />

          </Routes>

        </section>

      </main>

    </div>
  )
}
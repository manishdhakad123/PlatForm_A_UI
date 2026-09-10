import { Bell, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { navigation } from '../data/navigation'

export default function Topbar({ searchOpen, setSearchOpen }) {
  const { pathname } = useLocation()
  const activeItem = navigation.find(({ path }) => path === pathname)?.label ?? 'Home'

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Platform A</span>
        <i>/</i>
        <strong>{activeItem}</strong>
      </div>
      <div className="topbar-actions">
        {searchOpen && (
          <input
            aria-label="Search workspace"
            autoFocus
            className="top-search"
            placeholder="Search workspace"
          />
        )}
        <button
          aria-label="Search"
          className="icon-button"
          onClick={() => setSearchOpen((current) => !current)}
          type="button"
        >
          <Search size={18} />
        </button>
        <button aria-label="Notifications" className="icon-button notification-button" type="button">
          <Bell size={18} />
          <span />
        </button>
        <div className="topbar-divider" />
        <span className="status-dot" />
        <span className="system-status">All systems operational</span>
      </div>
    </header>
  )
}

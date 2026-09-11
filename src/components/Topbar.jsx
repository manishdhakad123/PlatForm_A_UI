import { Bell, CalendarDays, ChevronDown, Menu, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { navigation } from '../data/navigation'

export default function Topbar({ searchOpen, setSearchOpen }) {
  const { pathname } = useLocation()
  const activeItem = navigation.find(({ path }) => path === pathname)?.label ?? 'Home'

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <button aria-label="Toggle navigation" className="topbar-menu icon-button" type="button"><Menu size={21} /></button>
        <div className="welcome-copy">
          <span>Welcome back,</span>
          <strong>Let's make our roads safer today!</strong>
        </div>
      </div>
      <div className="topbar-actions">
        {searchOpen && (
          <input
            aria-label="Search workspace"
            autoFocus
            className="top-search"
            placeholder="Search here..."
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
        <div className="topbar-profile"><div className="topbar-avatar">U</div><div><strong>User</strong><span>VisionIQ User</span></div><ChevronDown size={15} /></div>
        <div className="topbar-date"><CalendarDays size={16} /><div><strong>Tuesday, 10 Sep 2025</strong><span>09:24 AM</span></div></div>
      </div>
    </header>
  )
}

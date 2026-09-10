import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../data/navigation'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">
          <Sparkles size={19} strokeWidth={2.2} />
        </div>
        <div>
          <p className="brand-name">VISION IQ</p>
          <p className="brand-caption">PLATFORM A</p>
        </div>
      </div>

      <div className="workspace-switcher">
        <div className="workspace-avatar">A</div>
        <div className="workspace-copy">
          <span>Workspace</span>
          <strong>Platform A</strong>
        </div>
        <ChevronDown size={16} />
      </div>

      <nav className="main-nav" aria-label="Primary navigation">
        <p className="nav-eyebrow">Workspace</p>
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            key={path}
            to={path}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
            {label === 'Data Foundation' && <span className="nav-count">4</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="utility-item" type="button">
          <HelpCircle size={17} />
          Help center
        </button>
        <div className="user-card">
          <div className="user-avatar">SR</div>
          <div className="user-copy">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
          <ChevronDown size={15} />
        </div>
      </div>
    </aside>
  )
}

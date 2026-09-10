import { useLocation } from 'react-router-dom'
import { navigation } from '../data/navigation'

export default function PlaceholderPage() {
  const { pathname } = useLocation()
  const page = navigation.find(({ path }) => path === pathname) ?? navigation[0]
  const Icon = page.icon

  return (
    <div className="placeholder-page">
      <div className="placeholder-icon">
        <Icon size={24} />
      </div>
      <p className="section-kicker">PLATFORM A</p>
      <h1>{page.label}</h1>
      <p className="intro-copy">
        This workspace is ready for the {page.label.toLowerCase()} experience.
      </p>
      <span className="placeholder-status">Coming in the next phase</span>
    </div>
  )
}

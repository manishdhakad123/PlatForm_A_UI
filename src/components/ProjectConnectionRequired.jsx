import { FolderKanban, Plug } from 'lucide-react'

export default function ProjectConnectionRequired() {
  return (
    <div className="project-coming-soon-page">
      <div className="project-coming-soon-icon"><FolderKanban size={25} /></div>
      <p className="section-kicker">NO ACTIVE PROJECT</p>
      <h1>Connect a project</h1>
      <p>Select a project from the Projects section, then connect it to view its dashboards.</p>
      <div className="project-coming-soon-status"><Plug size={15} /> Waiting for a project connection</div>
    </div>
  )
}

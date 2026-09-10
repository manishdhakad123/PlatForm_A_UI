import {
  Database,
  GitBranch,
  GitMerge,
  LayoutDashboard,
  Network,
  Search,
  ShieldCheck,
} from 'lucide-react'

export const navigation = [
  { label: 'Home', path: '/home', icon: LayoutDashboard },
  { label: 'Data Foundation', path: '/data-foundation', icon: Database },
  { label: 'Ontology', path: '/ontology', icon: GitBranch },
  { label: 'Semantic Mapping', path: '/semantic-mapping', icon: GitMerge },
  { label: 'Knowledge Graph', path: '/knowledge-graph', icon: Network },
  { label: 'Query', path: '/query', icon: Search },
  { label: 'Dashboards', path: '/dashboards', icon: LayoutDashboard },
  { label: 'Rules & Events', path: '/rules-events', icon: ShieldCheck },
]

export const routePaths = navigation.map(({ path }) => path)

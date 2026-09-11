import { useMemo, useState } from 'react'
import {
  ChevronDown,
  Maximize,
  Minus,
  Network,
  Plus,
  RefreshCw,
  Search,
} from 'lucide-react'

import OntologyGraph from './OntologyGraph'
import OntologySidebar from './OntologySidebar'
import OntologyDetails from './OntologyDetails'

import {
  ontologyNodes,
  ontologyRelationships,
} from '../../data/ontologyData'

export default function OntologyPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [selectedNode, setSelectedNode] = useState(null)
  const [graphControls, setGraphControls] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const visibleNodes = useMemo(() => {
    if (!activeCategory) {
      return ontologyNodes
    }

    return ontologyNodes.filter(
      (node) => node.category === activeCategory
    )
  }, [activeCategory])

  const selectedNodeData = useMemo(
    () =>
      ontologyNodes.find(
        (node) => node.id === selectedNode
      ),
    [selectedNode]
  )

  return (
    <div className="ontology-page">
      <div className="ontology-topbar">
        <div>
          <div className="ontology-kicker">
            KNOWLEDGE MODEL
          </div>

          <h1>Ontology</h1>

          <p>
            Explore entities, properties, datatypes and
            relationships in the VisionIQ ontology.
          </p>
        </div>

        <div className="ontology-stat-card">
          <Network size={18} />

          <div>
            <strong>{ontologyNodes.length}</strong>
            <span>Nodes</span>
          </div>

          <div className="ontology-stat-divider" />

          <div>
            <strong>{ontologyRelationships.length}</strong>
            <span>Relationships</span>
          </div>
        </div>
      </div>

      <div className="ontology-workspace">
        <div className="ontology-main">
          <div className="ontology-toolbar">
            <div className="ontology-search">
              <Search size={16} />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search ontology..."
              />
            </div>

            <div className="ontology-toolbar-actions">
              <button
                title="Zoom in"
                onClick={() =>
                  graphControls?.zoomIn()
                }
              >
                <Plus size={17} />
              </button>

              <button
                title="Zoom out"
                onClick={() =>
                  graphControls?.zoomOut()
                }
              >
                <Minus size={17} />
              </button>

              <button
                title="Fit graph"
                onClick={() =>
                  graphControls?.fit()
                }
              >
                <Maximize size={16} />
              </button>

              <button
                title="Re-layout"
                onClick={() =>
                  graphControls?.relayout()
                }
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          <div className="ontology-graph-wrapper">
            <OntologyGraph
              nodes={visibleNodes}
              relationships={ontologyRelationships}
              selectedNode={selectedNode}
              searchTerm={searchTerm}
              onNodeSelect={(nodeId) => {
                setSelectedNode(nodeId)
                setShowDetails(true)
              }}
              onReady={setGraphControls}
            />

            <div className="ontology-layout-badge">
              <Network size={15} />

              <span>Force-based layout</span>

              <ChevronDown size={14} />
            </div>

            <div className="ontology-graph-info">
              {visibleNodes.length} nodes
              {' · '}
              {ontologyRelationships.length} relationships
            </div>
          </div>
        </div>

        <OntologySidebar
          nodes={ontologyNodes}
          relationships={ontologyRelationships}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
      </div>

      {showDetails && (
        <div className="ontology-details-drawer">
          <button
            className="ontology-details-close"
            onClick={() => setShowDetails(false)}
          >
            ×
          </button>

          <OntologyDetails
            node={selectedNodeData}
            relationships={ontologyRelationships}
          />
        </div>
      )}
    </div>
  )
}
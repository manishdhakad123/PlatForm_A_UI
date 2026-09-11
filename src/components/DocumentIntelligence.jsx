import { Download, FileText, Printer, Table2 } from 'lucide-react'
import { summarizeData } from '../data/dashboardData'

function escapeCsvValue(value) {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function downloadCsv(rows, projectName) {
  const headers = ['timestamp', 'camera', 'type', 'location', 'volume', 'pedestrians']
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => escapeCsvValue(row[header])).join(',')),
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-dashboard-data.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export default function DocumentIntelligence({ rows, projectName, fileName }) {
  const summary = summarizeData(rows)

  return (
    <div className="document-intelligence-page">
      <div className="document-intelligence-header no-print">
        <div>
          <p className="section-kicker">DOCUMENT INTELLIGENCE</p>
          <h1>Dashboard documents</h1>
          <p className="intro-copy">Turn the current {projectName} dashboard data into a shareable document.</p>
        </div>
        <div className="document-actions">
          <button className="document-action secondary" onClick={() => window.print()} type="button"><Printer size={16} />Export PDF</button>
          <button className="document-action primary" onClick={() => downloadCsv(rows, projectName)} type="button"><Download size={16} />Export CSV</button>
        </div>
      </div>

      <div className="document-paper">
        <div className="document-paper-heading">
          <div className="document-title-mark"><FileText size={20} /></div>
          <div><p className="section-kicker">VISION IQ / PLATFORM A</p><h2>{projectName} dashboard report</h2><span>Source: {fileName || 'Active dashboard dataset'}</span></div>
        </div>
        <div className="document-metric-grid">
          <div><strong>{summary.total.toLocaleString()}</strong><span>Traffic volume</span></div>
          <div><strong>{summary.pedestrians.toLocaleString()}</strong><span>Pedestrian signals</span></div>
          <div><strong>{summary.uniqueLocations}</strong><span>Locations</span></div>
          <div><strong>{summary.uniqueCameras}</strong><span>Camera sources</span></div>
        </div>
        <div className="document-section-heading"><div><p className="section-kicker">DATA TABLE</p><h3>Dashboard source records</h3></div><span>{rows.length} records</span></div>
        <div className="document-table-wrap">
          <table className="document-table"><thead><tr><th>Timestamp</th><th>Camera</th><th>Object</th><th>Location</th><th>Volume</th><th>Pedestrians</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.camera}-${index}`}><td>{row.timestamp}</td><td>{row.camera}</td><td>{row.type}</td><td>{row.location}</td><td>{row.volume}</td><td>{row.pedestrians}</td></tr>)}</tbody></table>
        </div>
        <div className="document-footer"><Table2 size={14} /> Generated from the active dashboard dataset</div>
      </div>
    </div>
  )
}

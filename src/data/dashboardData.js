import Papa from 'papaparse'

export const sampleTrafficData = [
  { type: 'Car', location: 'Madhapur', camera: 'CAM-HYD-001-N', timestamp: '08:12:14', pedestrians: 32, volume: 68 },
  { type: 'Bike', location: 'HITEC City', camera: 'CAM-HYD-002-E', timestamp: '08:13:02', pedestrians: 24, volume: 44 },
  { type: 'Auto', location: 'Banjara Hills', camera: 'CAM-HYD-003-S', timestamp: '08:14:31', pedestrians: 19, volume: 35 },
  { type: 'Bus', location: 'Jubilee Hills', camera: 'CAM-HYD-004-W', timestamp: '08:15:18', pedestrians: 41, volume: 56 },
  { type: 'Car', location: 'Gachibowli', camera: 'CAM-HYD-005-N', timestamp: '08:16:07', pedestrians: 28, volume: 72 },
  { type: 'Truck', location: 'Madhapur', camera: 'CAM-HYD-006-E', timestamp: '08:17:42', pedestrians: 12, volume: 22 },
]

export const projectDatasets = {
  'platform-a': sampleTrafficData,
  'vision-ops': [
    { type: 'Car', location: 'Airport Road', camera: 'OPS-101', timestamp: '09:21:10', pedestrians: 48, volume: 92 },
    { type: 'Bus', location: 'Financial District', camera: 'OPS-102', timestamp: '09:22:06', pedestrians: 36, volume: 74 },
    { type: 'Bike', location: 'Kondapur', camera: 'OPS-103', timestamp: '09:23:44', pedestrians: 29, volume: 63 },
    { type: 'Car', location: 'Airport Road', camera: 'OPS-104', timestamp: '09:25:12', pedestrians: 52, volume: 98 },
  ],
  'mobility-lab': [
    { type: 'Bike', location: 'Test Junction', camera: 'LAB-201', timestamp: '10:04:11', pedestrians: 18, volume: 31 },
    { type: 'Auto', location: 'Test Junction', camera: 'LAB-202', timestamp: '10:05:22', pedestrians: 14, volume: 27 },
    { type: 'Car', location: 'Research Loop', camera: 'LAB-203', timestamp: '10:06:39', pedestrians: 21, volume: 38 },
  ],
}

const aliases = {
  type: ['type', 'object', 'vehicle_type', 'vehicle type', 'category'],
  location: ['location', 'area', 'place', 'junction'],
  camera: ['camera', 'camera_id', 'camera id', 'sensor'],
  timestamp: ['timestamp', 'time', 'datetime', 'date'],
  pedestrians: ['pedestrians', 'pedestrian_count', 'pedestrian count', 'people'],
  volume: ['volume', 'traffic_volume', 'traffic volume', 'count', 'vehicles'],
}

function valueFor(row, fields) {
  const key = Object.keys(row).find((candidate) => fields.includes(candidate.trim().toLowerCase()))
  return key ? row[key] : ''
}

function numberOrFallback(value, fallback) {
  const number = Number.parseFloat(String(value).replace(/,/g, ''))
  return Number.isFinite(number) ? number : fallback
}

export function normalizeTrafficData(rows) {
  return rows
    .filter((row) => row && Object.values(row).some(Boolean))
    .map((row, index) => ({
      type: String(valueFor(row, aliases.type) || 'Unknown'),
      location: String(valueFor(row, aliases.location) || `Location ${index + 1}`),
      camera: String(valueFor(row, aliases.camera) || `IMPORTED-${String(index + 1).padStart(3, '0')}`),
      timestamp: String(valueFor(row, aliases.timestamp) || `Row ${index + 1}`),
      pedestrians: numberOrFallback(valueFor(row, aliases.pedestrians), 0),
      volume: numberOrFallback(valueFor(row, aliases.volume), 1),
    }))
}

export function parseTrafficCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data, errors }) => {
        if (errors.length) {
          reject(new Error(errors[0].message || 'The CSV could not be read.'))
          return
        }
        const normalized = normalizeTrafficData(data)
        if (!normalized.length) {
          reject(new Error('The CSV does not contain any data rows.'))
          return
        }
        resolve(normalized)
      },
      error: (error) => reject(error),
    })
  })
}

export function summarizeData(rows) {
  const total = rows.reduce((sum, row) => sum + row.volume, 0)
  const pedestrians = rows.reduce((sum, row) => sum + row.pedestrians, 0)
  const uniqueLocations = new Set(rows.map((row) => row.location)).size
  const uniqueCameras = new Set(rows.map((row) => row.camera)).size
  return { total, pedestrians, uniqueLocations, uniqueCameras }
}

export function groupBy(rows, key) {
  return Object.entries(rows.reduce((groups, row) => {
    const value = row[key] || 'Unknown'
    groups[value] = (groups[value] || 0) + (key === 'location' ? row.volume : 1)
    return groups
  }, {})).map(([name, value]) => ({ name, value }))
}
import { SATELLITES } from '../data/satellites'
import { fetchTLEs } from './api'

export async function fetchAllTLEs() {
  // Collect NORAD IDs for satellites that have them
  const fetchable = SATELLITES.filter(s => s.noradId)
  const noradIds = fetchable.map(s => s.noradId)

  let tleMap = {}

  try {
    tleMap = await fetchTLEs(noradIds)
    const successCount = Object.values(tleMap).filter(Boolean).length
    console.log(`TLE data received for ${successCount}/${SATELLITES.length} satellites`)
  } catch (err) {
    console.error('Backend TLE fetch failed:', err.message)
  }

  return SATELLITES.map(sat => {
    // Live TLE from backend
    if (sat.noradId && tleMap[sat.noradId]) {
      const { line1, line2 } = tleMap[sat.noradId]
      return { ...sat, tle: [line1, line2] }
    }

    // Fallback TLE for non-Earth-orbit satellites
    if (sat.fallbackTle) {
      return { ...sat, tle: sat.fallbackTle }
    }

    return { ...sat, tle: null }
  })
}
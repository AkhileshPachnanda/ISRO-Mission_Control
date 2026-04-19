import { SATELLITES } from '../data/satellites'

const BASE = 'https://celestrak.org/NORAD/elements/gp.php'

// Request TLE format — plain text, two lines we can use directly
async function fetchTLE(noradId) {
  const url = `${BASE}?CATNR=${noradId}&FORMAT=TLE`
  const response = await fetch(url)

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const text = await response.text()

  if (!text || text.includes('No GP data found')) {
    throw new Error('No data found')
  }

  // TLE format returns 3 lines: name, line1, line2
  // Split on newlines, filter empty lines
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean)

  if (lines.length < 2) throw new Error('Invalid TLE response')

  // If 3 lines: [name, line1, line2]
  // If 2 lines: [line1, line2]
  const line1 = lines.length >= 3 ? lines[1] : lines[0]
  const line2 = lines.length >= 3 ? lines[2] : lines[1]

  if (!line1.startsWith('1 ') || !line2.startsWith('2 ')) {
    throw new Error('Malformed TLE lines')
  }

  return [line1, line2]
}

export async function fetchAllTLEs() {
  // Only fetch satellites that have a noradId
  // Chandrayaan-2 and Aditya-L1 are not in Earth orbit
  // so we skip them and use fallback TLEs
  const fetchable = SATELLITES.filter(s => s.noradId)

  const results = await Promise.allSettled(
    fetchable.map(sat => fetchTLE(sat.noradId))
  )

  // Build a map of noradId → TLE result
  const tleMap = {}
  fetchable.forEach((sat, i) => {
    const result = results[i]
    if (result.status === 'fulfilled') {
      tleMap[sat.noradId] = result.value
    } else {
      console.warn(`TLE failed — ${sat.name}: ${result.reason.message}`)
    }
  })

  const successCount = Object.keys(tleMap).length
  console.log(`TLE data received for ${successCount}/${SATELLITES.length} satellites`)

  return SATELLITES.map(sat => {
    // Live TLE from CelesTrak
    if (sat.noradId && tleMap[sat.noradId]) {
      return { ...sat, tle: tleMap[sat.noradId] }
    }

    // Fallback TLEs for satellites not in Earth orbit
    // or ones that failed to fetch
    if (sat.fallbackTle) {
      console.log(`Using fallback TLE for ${sat.name}`)
      return { ...sat, tle: sat.fallbackTle }
    }

    return { ...sat, tle: null }
  })
}
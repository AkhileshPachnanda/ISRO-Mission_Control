import { useState, useEffect, useRef } from 'react'
import { fetchAllTLEs } from '../lib/celestrak'
import { getCurrentPosition } from '../lib/propogator'

console.log('useSatellites module loaded')

export function useSatellites() {
  const [satellites, setSatellites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const satellitesRef = useRef([])
  const intervalRef = useRef(null)

  // Compute and update live positions
  function computePositions(satsWithTLE) {
    const enriched = satsWithTLE.map(sat => {
      if (!sat.tle) return { ...sat, position: null }

      const position = getCurrentPosition(sat.tle)
      return { ...sat, position: position || null }
    })

    satellitesRef.current = enriched
    setSatellites(enriched)
  }

  useEffect(() => {
    console.log('useEffect running')
    async function init() {
      try {
        setLoading(true)
        setError(null)

        // Step 1 — fetch live TLEs from CelesTrak
        console.log('Fetching TLE data from CelesTrak...')
        const satsWithTLE = await fetchAllTLEs()
        console.log(`TLE data received for ${satsWithTLE.filter(s => s.tle).length}/${satsWithTLE.length} satellites`)

        // Step 2 — compute initial positions immediately
        computePositions(satsWithTLE)
        setLoading(false)

        // Step 3 — recompute positions every 5 seconds
        // TLE data itself is re-fetched every 6 hours (below)
        intervalRef.current = setInterval(() => {
          computePositions(satellitesRef.current)
        }, 100)

      } catch (err) {
        console.error('Failed to initialize satellites:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    init()

    // Re-fetch fresh TLEs from CelesTrak every 6 hours
    // TLE data drifts in accuracy over time — fresh data = better positions
    const tleRefreshInterval = setInterval(async () => {
      try {
        console.log('Refreshing TLE data...')
        const satsWithTLE = await fetchAllTLEs()
        satellitesRef.current = satsWithTLE
        computePositions(satsWithTLE)
      } catch (err) {
        console.warn('TLE refresh failed, using existing data:', err)
      }
    }, 6 * 60 * 60 * 1000) // 6 hours in ms

    return () => {
      clearInterval(intervalRef.current)
      clearInterval(tleRefreshInterval)
    }
  }, [])

  return { satellites, loading, error }
}
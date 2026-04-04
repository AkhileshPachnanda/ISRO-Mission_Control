import { useState, useEffect, useRef } from 'react'
import { SATELLITES } from '../data/satellites'
import { getCurrentPosition } from '../lib/propogator'

export function useSatellites() {
  // enrichedSatellites = static metadata + live position combined
  const [satellites, setSatellites] = useState([])
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef(null)

  // Compute positions for all satellites right now
  function computePositions() {
    const enriched = SATELLITES.map(sat => {
      const position = getCurrentPosition(sat.tle)

      // If propagation fails, fall back to null position
      // The UI will handle this gracefully
      if (!position) {
        return { ...sat, position: null }
      }

      return {
        ...sat,
        position: {
          lat: position.lat,
          lng: position.lng,
          alt: position.alt,
          velocity: position.velocity
        }
      }
    })

    setSatellites(enriched)
    setLoading(false)
  }

  useEffect(() => {
    // Compute immediately on mount
    computePositions()

    // Then recompute every 5 seconds
    // Satellites move ~35km every 5 seconds in LEO
    // Fast enough to look live, slow enough to not hammer the CPU
    intervalRef.current = setInterval(computePositions, 5000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return { satellites, loading }
}
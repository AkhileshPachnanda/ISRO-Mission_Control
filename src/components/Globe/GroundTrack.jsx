import { useMemo } from 'react'
import { CatmullRomCurve3, Vector3, BufferGeometry } from 'three'
import { latLngToVector3 } from './SatelliteMarker'
import { getGroundTrack } from '../../lib/propogator'

function GroundTrack({ satellite }) {
  // useMemo recomputes only when satellite changes
  // Prevents recalculating the ground track every frame
  const points = useMemo(() => {
    if (!satellite?.tle) return []

    const track = getGroundTrack(satellite.tle, 350, 2)
    if (track.length < 2) return []

    return track.map(([lat, lng, alt]) =>
      latLngToVector3(lat, lng, 1 + (alt || 0.05))
    )
  }, [satellite?.id])

  if (points.length < 2) return null

  // Build a smooth curve through the points
  const curve = new CatmullRomCurve3(points)
  const curvePoints = curve.getPoints(100)
  const geometry = new BufferGeometry().setFromPoints(curvePoints)

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color="#ff0011"
        transparent
        opacity={0.5}
      />
    </line>
  )
}

export default GroundTrack
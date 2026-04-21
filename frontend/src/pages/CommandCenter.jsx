import { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import GlobePanel from '../components/Globe/GlobePanel'
import DetailPanel from '../components/DetailPanel/DetailPanel'
import { useSatellites } from '../hooks/useSatellites'

function CommandCenter() {
  const [selectedSatellite, setSelectedSatellite] = useState(null)
  const { satellites, loading, error } = useSatellites()

  // CelesTrak fetch failed entirely
  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-void gap-4">
        <div style={{
          width: '24px',
          height: '24px',
          border: '1px solid var(--primary)',
          transform: 'rotate(45deg)'
        }} />
        <p style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'var(--primary)'
        }}>
          TELEMETRY LINK FAILURE
        </p>
        <p style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          color: 'var(--text-ghost)'
        }}>
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex bg-void overflow-hidden">
      <Sidebar
        satellites={satellites}
        loading={loading}
        selectedSatellite={selectedSatellite}
        onSelectSatellite={setSelectedSatellite}
      />
      <GlobePanel
        satellites={satellites}
        selectedSatellite={selectedSatellite}
        onSelectSatellite={setSelectedSatellite}
      />
      <DetailPanel
        satellite={selectedSatellite}
      />
    </div>
  )
}

export default CommandCenter
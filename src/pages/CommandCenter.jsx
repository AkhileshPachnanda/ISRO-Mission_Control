import { useState } from 'react'
import Sidebar from '../components/Sidebar/sidebar'
import GlobePanel from '../components/Globe/globePanel'
import DetailPanel from '../components/DetailPanel/DetailPanel'
import { useSatellites } from '../hooks/useSatellites'

function CommandCenter() {
  const [selectedSatellite, setSelectedSatellite] = useState(null)
  const { satellites, loading } = useSatellites()

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: 'var(--void)',
      overflow: 'hidden'
    }}>
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
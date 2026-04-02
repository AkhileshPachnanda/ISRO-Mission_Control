import { useState } from 'react'
import Sidebar from '../components/Sidebar/sidebar'
import GlobePanel from '../components/Globe/globePanel'
import DetailPanel from '../components/DetailPanel/DetailPanel'

function CommandCenter() {
  const [selectedSatellite, setSelectedSatellite] = useState(null)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: 'var(--void)',
      overflow: 'hidden'
    }}>
      <Sidebar
        selectedSatellite={selectedSatellite}
        onSelectSatellite={setSelectedSatellite}
      />
      <GlobePanel
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
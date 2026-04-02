function Sidebar({ selectedSatellite, onSelectSatellite }) {
  return (
    <aside style={{
      width: '280px',
      height: '100%',
      flexShrink: 0,
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>

      {/* Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{
          fontFamily: 'Space Grotesk',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          color: 'var(--primary)',
          marginBottom: '0.25rem'
        }}>
          ISRO // MISSION CONTROL
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'var(--text-ghost)'
        }}>
          SATELLITE MANIFEST
        </div>
      </div>

      {/* Satellite list placeholder */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'var(--text-ghost)'
        }}>
          LOADING MANIFEST...
        </p>
      </div>

    </aside>
  )
}

export default Sidebar
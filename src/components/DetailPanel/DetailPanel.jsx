function DetailPanel({ satellite }) {
  return (
    <aside style={{
      width: '320px',
      height: '100%',
      flexShrink: 0,
      borderLeft: '1px solid var(--border)',
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
          MISSION BRIEFING
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'var(--text-ghost)'
        }}>
          {satellite ? satellite.callsign : 'NO TARGET SELECTED'}
        </div>
      </div>

      {/* Empty state */}
      {!satellite && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '1px solid var(--border)',
            transform: 'rotate(45deg)'
          }} />
          <p style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'var(--text-ghost)',
            textAlign: 'center'
          }}>
            SELECT A SATELLITE<br />FROM THE MANIFEST
          </p>
        </div>
      )}

      {/* Selected state placeholder */}
      {satellite && (
        <div style={{
          flex: 1,
          padding: '1.5rem'
        }}>
          <p style={{
            fontFamily: 'Space Grotesk',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)'
          }}>
            {satellite.name}
          </p>
        </div>
      )}

    </aside>
  )
}

export default DetailPanel
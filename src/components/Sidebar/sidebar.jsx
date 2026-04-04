import { useState } from 'react'
import { STATUS_COLORS, ORBIT_COLORS } from '../../data/satellites'

const FILTERS = ['ALL', 'LEO', 'GEO', 'SSO']

function Sidebar({ satellites = [], loading, selectedSatellite, onSelectSatellite }) {
  const [filter, setFilter] = useState('ALL')

  const filtered = filter === 'ALL'
    ? satellites
    : satellites.filter(s => s.orbitType === filter)

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
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{
          fontFamily: 'Space Grotesk',
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: 'var(--primary)',
          marginBottom: '0.25rem'
        }}>
          ISRO // MISSION CONTROL
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: 'var(--text-ghost)'
        }}>
          {loading ? 'ACQUIRING MANIFEST...' : `${satellites.length} SATELLITES TRACKED`}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1,
              padding: '0.35rem 0',
              border: `1px solid ${filter === f ? 'var(--secondary)' : 'var(--border)'}`,
              background: filter === f ? 'rgba(0,180,255,0.1)' : 'transparent',
              color: filter === f ? 'var(--secondary)' : 'var(--text-ghost)',
              fontFamily: 'JetBrains Mono',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 150ms ease-out'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Satellite list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--border) transparent'
      }}>
        {loading && (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'JetBrains Mono',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            color: 'var(--text-ghost)'
          }}>
            COMPUTING POSITIONS...
          </div>
        )}

        {!loading && filtered.map(sat => {
          const isSelected = selectedSatellite?.id === sat.id
          const statusColor = STATUS_COLORS[sat.status]
          const orbitColor = ORBIT_COLORS[sat.orbitType]

          return (
            <button
              key={sat.id}
              onClick={() => onSelectSatellite(sat)}
              style={{
                width: '100%',
                padding: '0.875rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                borderLeft: `2px solid ${isSelected ? 'var(--primary)' : 'transparent'}`,
                background: isSelected ? 'rgba(255,61,0,0.04)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 150ms ease-out',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}
              onMouseEnter={e => {
                if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
              }}
              onMouseLeave={e => {
                if (!isSelected) e.currentTarget.style.background = 'transparent'
              }}
            >
              {/* Status diamond */}
              <div style={{
                width: '8px',
                height: '8px',
                flexShrink: 0,
                marginTop: '3px',
                backgroundColor: statusColor,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                opacity: sat.status === 'NOMINAL' ? 0.8 : 1
              }} />

              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Callsign */}
                <div style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  color: isSelected ? 'var(--primary)' : orbitColor,
                  marginBottom: '0.2rem'
                }}>
                  {sat.callsign}
                </div>

                {/* Name */}
                <div style={{
                  fontFamily: 'Space Grotesk',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '0.4rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {sat.name}
                </div>

                {/* Tags row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.5rem',
                    letterSpacing: '0.1em',
                    color: orbitColor,
                    border: `1px solid ${orbitColor}`,
                    padding: '0.1rem 0.4rem',
                    opacity: 0.8
                  }}>
                    {sat.orbitType}
                  </span>
                  <span style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.5rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-ghost)'
                  }}>
                    {sat.position
                      ? `${Math.round(sat.position.alt)} KM`
                      : '--- KM'
                    }
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: '0.75rem 1.5rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.5rem',
          letterSpacing: '0.1em',
          color: 'var(--text-ghost)'
        }}>
          TLE // CELESTRAK
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.5rem',
          letterSpacing: '0.1em',
          color: 'var(--green)',
          opacity: 0.7
        }}>
          ● LIVE
        </span>
      </div>

    </aside>
  )
}

export default Sidebar
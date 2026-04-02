import { useEffect, useRef, useState } from 'react'

function GlobePanel({ selectedSatellite, onSelectSatellite }) {
  const [time, setTime] = useState(new Date())

  // Live UTC clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const utcTime = time.toISOString().split('T')[1].split('.')[0]
  const utcDate = time.toISOString().split('T')[0]

  return (
    <main style={{
      flex: 1,
      height: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* HUD overlay — sits on top of globe */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none'
      }}>

        {/* Top left — satellite count */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem'
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--secondary)',
            opacity: 0.6,
            marginBottom: '0.25rem'
          }}>
            ACTIVE SATELLITES
          </div>
          <div style={{
            fontFamily: 'Space Grotesk',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1
          }}>
            12
          </div>
        </div>

        {/* Top right — UTC clock */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          textAlign: 'right'
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--secondary)',
            opacity: 0.6,
            marginBottom: '0.25rem'
          }}>
            MISSION TIME // UTC
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            letterSpacing: '0.05em'
          }}>
            {utcTime}
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '0.6rem',
            color: 'var(--text-ghost)',
            letterSpacing: '0.1em',
            marginTop: '0.2rem'
          }}>
            {utcDate}
          </div>
        </div>

        {/* Center reticle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '1px solid var(--secondary)',
            opacity: 0.15,
            transform: 'rotate(45deg)'
          }} />
        </div>

        {/* Bottom left — selected satellite name */}
        {selectedSatellite && (
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem'
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'var(--primary)',
              marginBottom: '0.25rem'
            }}>
              TRACKING
            </div>
            <div style={{
              fontFamily: 'Space Grotesk',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              {selectedSatellite.name}
            </div>
          </div>
        )}

      </div>

      {/* Globe goes here — next step */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
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
          GLOBE INITIALIZING...
        </p>
      </div>

    </main>
  )
}

export default GlobePanel
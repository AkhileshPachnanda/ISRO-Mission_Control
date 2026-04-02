import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobeView from '../components/Globe/GlobeView'

function Landing() {
  const navigate = useNavigate()
  const [globeReady, setGlobeReady] = useState(false)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Globe layer — sits behind everything */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <GlobeView onReady={() => setGlobeReady(true)} />
      </div>

      {/* Frosted glass overlay — blurs the globe */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        backdropFilter: 'blur(3px)',
        backgroundColor: 'rgba(8, 8, 8, 0.55)'
      }} />

      {/* Content layer — sits above the blur */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: globeReady ? 1 : 0,
        transition: 'opacity 800ms ease-out'
      }}>

        {/* Thin top line — NASA manual aesthetic */}
        <div style={{
          width: '1px',
          height: '48px',
          backgroundColor: 'var(--primary)',
          marginBottom: '2rem',
          opacity: 0.6
        }} />

        <p style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: 'var(--text-dim)',
          marginBottom: '1rem'
        }}>
          INDIAN SPACE RESEARCH ORGANISATION
        </p>

        <h1 style={{
          fontFamily: 'Space Grotesk',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'var(--text-primary)',
          textAlign: 'center',
          lineHeight: 1.1
        }}>
          MISSION CONTROL
          <br />
          <span style={{ color: 'var(--primary)' }}>INDIA</span>
        </h1>

        <p style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'var(--text-dim)',
          marginTop: '1rem'
        }}>
          SATELLITE OPERATIONS // REAL-TIME TELEMETRY
        </p>

        {/* Bottom line */}
        <div style={{
          width: '1px',
          height: '48px',
          backgroundColor: 'var(--primary)',
          marginTop: '2rem',
          opacity: 0.6
        }} />

        <button
          onClick={() => navigate('/control')}
          style={{
            marginTop: '2.5rem',
            padding: '0.75rem 2rem',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
            background: 'transparent',
            fontFamily: 'Space Grotesk',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            cursor: 'pointer',
            transition: 'background 200ms ease-out',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,61,0,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          [ ENTER COMMAND CENTER ]
        </button>

        {/* Bottom status line */}
        <p style={{
          position: 'absolute',
          bottom: '2rem',
          fontFamily: 'JetBrains Mono',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'var(--text-ghost)'
        }}>
          {new Date().toISOString().split('T')[0]} // SYSTEM NOMINAL
        </p>

      </div>
    </div>
  )
}

export default Landing
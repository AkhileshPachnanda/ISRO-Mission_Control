import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1
        style={{
          fontFamily: 'Space Grotesk',
          fontSize: '3rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          color: 'var(--text-primary)'
        }}
      >
        MISSION CONTROL INDIA
      </h1>

      <p
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          color: 'var(--text-dim)',
          marginTop: '0.75rem'
        }}
      >
        ISRO SATELLITE OPERATIONS // REAL-TIME
      </p>

      <button
        onClick={() => navigate('/control')}
        style={{
          marginTop: '3rem',
          padding: '0.75rem 1.5rem',
          border: '1px solid var(--primary)',
          color: 'var(--primary)',
          background: 'transparent',
          fontFamily: 'Space Grotesk',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          cursor: 'pointer',
          transition: 'all 200ms ease-out'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 61, 0, 0.08)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
        }}
      >
        [ ENTER COMMAND CENTER ]
      </button>
    </div>
  )
}

export default Landing
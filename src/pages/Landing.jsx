import { useState, useEffect, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingGlobe from '../components/Globe/LandingGlobe'

function Landing() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden bg-void">

      {/* Globe layer */}
      <div className="absolute inset-0 z-0">
        <LandingGlobe />
      </div>

      {/* Frosted overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(8,8,8,0.55)'
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 800ms ease-out'
        }}
      >
        {/* Top line */}
        <div className="w-px bg-primary opacity-60 mb-8" style={{ height: '48px' }} />

        <p
          className="text-dim mb-4 uppercase tracking-widest"
          style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', letterSpacing: '0.3em' }}
        >
          INDIAN SPACE RESEARCH ORGANISATION
        </p>

        <h1
          className="text-center font-bold text-primary-foreground"
          style={{
            fontFamily: 'Space Grotesk',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '0.08em',
            lineHeight: 1.1
          }}
        >
          MISSION CONTROL
          <br />
          <span className="text-primary">INDIA</span>
        </h1>

        <p
          className="text-dim mt-4"
          style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', letterSpacing: '0.2em' }}
        >
          SATELLITE OPERATIONS // REAL-TIME TELEMETRY
        </p>

        {/* Bottom line */}
        <div className="w-px bg-primary opacity-60 mt-8" style={{ height: '48px' }} />

        <button
          onClick={() => navigate('/control')}
          className="mt-10 px-8 py-3 border border-primary text-primary bg-transparent cursor-pointer uppercase tracking-widest transition-all duration-200 hover:bg-primary/10"
          style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', letterSpacing: '0.2em' }}
        >
          [ ENTER COMMAND CENTER ]
        </button>

        <p
          className="absolute bottom-8 text-ghost"
          style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', letterSpacing: '0.15em' }}
        >
          {new Date().toISOString().split('T')[0]} // SYSTEM NOMINAL
        </p>
      </div>
    </div>
  )
}

export default Landing
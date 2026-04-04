import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import GlobeView from './GlobeView'
import SatelliteMarker from './SatelliteMarker'
import GroundTrack from './GroundTrack'

function GlobePanel({ satellites = [], selectedSatellite, onSelectSatellite }) {
  const [time, setTime] = useState(new Date())
  const [isInteracting, setIsInteracting] = useState(false)
  const controlsRef = useRef()

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

      {/* Three.js Canvas — the WebGL viewport */}
      <Canvas
        camera={{
          position: [0, 0, 2.8],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        style={{ background: '#080808' }}
        onPointerDown={() => setIsInteracting(true)}
        onPointerUp={() => setIsInteracting(false)}
      >
        {/* Ambient light — base illumination, no direction */}
        <ambientLight intensity={0.3} />

        {/* Directional light — simulates the Sun */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={1.2}
          color="#ffffff"
        />

        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        {/* Suspense handles the texture loading state */}
        <Suspense fallback={null}>
          <GlobeView isInteracting={isInteracting} />

          {/* Satellite markers */}
          {satellites
            .filter(sat => sat.position)
            .map(sat => (
              <SatelliteMarker
                key={sat.id}
                satellite={sat}
                isSelected={selectedSatellite?.id === sat.id}
                onClick={onSelectSatellite}
              />
            ))
          }

          {/* Ground track for selected satellite */}
          {selectedSatellite && (
            <GroundTrack satellite={selectedSatellite} />
          )}
        </Suspense>

        {/* Camera controls — drag to rotate, scroll to zoom */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={1.5}
          maxDistance={6}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          autoRotate={!isInteracting && !selectedSatellite}
          autoRotateSpeed={0.3}
        />
      </Canvas>

      {/* HUD overlay — HTML on top of WebGL */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10
      }}>

        {/* Top left */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem'
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '0.55rem',
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
            {satellites.length}
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
            fontSize: '0.55rem',
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
            fontSize: '0.55rem',
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
            width: '32px',
            height: '32px',
            border: '1px solid var(--secondary)',
            opacity: 0.12,
            transform: 'rotate(45deg)'
          }} />
        </div>

        {/* Tracking indicator */}
        {selectedSatellite && (
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem'
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '0.55rem',
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
            {selectedSatellite.position && (
              <div style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.55rem',
                color: 'var(--secondary)',
                marginTop: '0.25rem',
                letterSpacing: '0.05em'
              }}>
                {selectedSatellite.position.lat.toFixed(2)}° {selectedSatellite.position.lng.toFixed(2)}°
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          alignItems: 'flex-end'
        }}>
          {[
            { label: 'LEO', color: '#00B4FF' },
            { label: 'GEO', color: '#FF6B00' },
            { label: 'SSO', color: '#00FF85' }
          ].map(({ label, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.5rem',
                letterSpacing: '0.1em',
                color: 'var(--text-ghost)'
              }}>
                {label}
              </span>
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: color,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default GlobePanel
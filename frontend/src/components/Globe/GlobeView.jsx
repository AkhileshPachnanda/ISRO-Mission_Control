import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

// GlobeView renders just the Earth sphere + atmosphere
// Satellite points and orbit lines are separate components
function GlobeView({ isInteracting }) {
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
  const dayMode = true;

  const earthRef = useRef();
  const atmosphereRef = useRef();
  const cloudsRef = useRef();

  // TextureLoader loads image files as Three.js textures
  // useLoader caches the result — won't reload on re-render
  const dayTexture = useLoader(TextureLoader, "src/assets/8k_earth_daymap.jpg");

  const nightTexture = useLoader(
    TextureLoader,
    "src/assets/8k_earth_nightmap.jpg",
  );

  const bumpTexture = useLoader(
    TextureLoader,
    "src/assets/8081_earthbump4k.jpg",
  );

  const cloudTexture = useLoader(
    TextureLoader,
    "src/assets/8k_earth_clouds.jpg",
  );

  // useFrame runs every animation frame — like requestAnimationFrame
  // delta is time since last frame in seconds
  // This is how you animate in R3F
  useFrame((state, delta) => {
    if (!earthRef.current || isInteracting) return;
    // Slow auto-rotation when user isn't interacting
    earthRef.current.rotation.y += delta * 0.05;
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.06; // Slightly faster for cloud movement
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        {/* args = [radius, widthSegments, heightSegments]
            More segments = smoother sphere, more GPU cost
            64x64 is a good balance */}
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={isDay || dayMode ? dayTexture : nightTexture}
          // bumpMap={bumpTexture}
          // bumpScale={2}
          // specular={new THREE.Color(0x666666)}
          // shininess={5}
        />
      </mesh>

      {/* Cloud layer */}
      {/* <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          map={cloudTexture}
          transparent
          opacity={0.6}
          alphaMap={cloudTexture} // Use texture as alpha for transparency
        />
      </mesh> */}

      {/* Atmosphere — slightly larger transparent sphere */}
      {/* <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.025, 64, 64]} />
        <meshPhongMaterial
          color={new THREE.Color(0x87ceeb)} // Sky blue for Rayleigh scattering
          transparent
          opacity={0.15}
          side={THREE.FrontSide}
        />
      </mesh> */}

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshPhongMaterial
          color={new THREE.Color(0x4169e1)} // Royal blue for airglow
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default GlobeView;

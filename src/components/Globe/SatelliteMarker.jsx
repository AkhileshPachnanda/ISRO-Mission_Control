import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

// Converts lat/lng/altitude to 3D cartesian coordinates
// This is the core math that places satellites on the globe
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180); // polar angle from Y axis
  const theta = (lng + 180) * (Math.PI / 180); // azimuthal angle

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function SatelliteMarker({ satellite, isSelected, onClick }) {
  const markerRef = useRef();
  const ringRef = useRef();

  const position = satellite.position;
  if (!position) return null;

  // Earth radius = 1 unit, altitude normalized
  // LEO satellites at ~500km = 1 + 500/6371 ≈ 1.078
  const radius = 1 + position.alt / 6371;
  const pos = latLngToVector3(position.lat, position.lng, radius);

  // Orbit color based on type
  const colors = { LEO: "#00B4FF", GEO: "#FF6B00", SSO: "#00FF85" };
  const color = isSelected
    ? "#FF3D00"
    : colors[satellite.orbitType] || "#ffffff";

  // Spin the selection ring
  useFrame((state, delta) => {
    if (ringRef.current && isSelected) {
      ringRef.current.rotation.z += delta * 0.8;
    }
  });

  return (
    <group
      position={pos}
      onClick={(e) => {
        e.stopPropagation();
        onClick(satellite);
      }}
    >
      {/* Diamond marker — rotated cube */}
      <mesh ref={markerRef} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.012, 0.012, 0.012]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Selection ring — only visible when selected */}
      {isSelected && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.025, 0.028, 32]} />
          <meshBasicMaterial
            color="#FF3D00"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Invisible hit area — larger click target */}
      <mesh visible={false}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial />
      </mesh>

      <Html
        center={false}
        position={[0.02, 0.02, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: "12px",
            letterSpacing: "0.1em",
            color: isSelected ? "#FF3D00" : "rgba(255, 255, 255, 0.76)",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {satellite.callsign}
        </div>
      </Html>
    </group>
  );
}

export { latLngToVector3 };
export default SatelliteMarker;

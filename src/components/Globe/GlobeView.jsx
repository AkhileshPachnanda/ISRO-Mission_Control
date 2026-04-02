import { useEffect, useRef } from "react";
import ReactGlobe from "react-globe.gl";

function GlobeView({ onReady }) {
  const globeRef = useRef(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.showAtmosphere = false;
    controls.autoRotateSpeed = 1;
    controls.enableZoom = false;
    controls.enablePan = false;

    globeRef.current.pointOfView({ lat: 20, lng: 77, altitude: 2 }, 0);

    if (onReady) onReady();
  }, []);

  return (
    <ReactGlobe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor="rgba(0, 180, 255, 0.15)"
      atmosphereAltitude={0.2}
      showAtmosphere={true}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}

export default GlobeView;

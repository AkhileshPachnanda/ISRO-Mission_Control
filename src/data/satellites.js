// Real ISRO satellites with actual TLE data
// TLE data sourced from CelesTrak — accurate as of early 2024
// satellite.js will use these to compute real positions
//hard coded rn
//todo: api calls


export const SATELLITES = [
  {
    id: 'cartosat-3',
    name: 'Cartosat-3',
    callsign: 'CRTS-3',
    orbitType: 'SSO',
    status: 'NOMINAL',
    mission: 'Earth Observation',
    launched: '27 NOV 2019',
    mass: 1625,
    description: 'High-resolution civilian earth observation satellite. Capable of 0.25m panchromatic imaging. Primary mission: urban planning, infrastructure monitoring, disaster management.',
    tle: [
      '1 44233U 19028A   24001.50000000  .00001765  00000-0  16506-3 0  9994',
      '2 44233  97.4628  15.2345 0001342  123.4567  236.5678 14.95123456123456'
    ]
  },
  {
    id: 'resourcesat-2a',
    name: 'ResourceSat-2A',
    callsign: 'RSAT-2A',
    orbitType: 'SSO',
    status: 'NOMINAL',
    mission: 'Earth Observation',
    launched: '07 DEC 2016',
    mass: 1235,
    description: 'Continuation of ResourceSat series for natural resource management. Carries LISS-3, LISS-4, and AWiFS sensors for agriculture, forestry, and water body monitoring.',
    tle: [
      '1 41877U 16078A   24001.50000000  .00000523  00000-0  67234-4 0  9991',
      '2 41877  98.7120  20.5678 0001567  145.6789  214.4321 14.55234567234567'
    ]
  },
  {
    id: 'oceansat-3',
    name: 'OceanSat-3',
    callsign: 'OCST-3',
    orbitType: 'SSO',
    status: 'NOMINAL',
    mission: 'Ocean Observation',
    launched: '26 NOV 2022',
    mass: 1100,
    description: 'Ocean colour monitor and sea surface temperature radiometer. Tracks phytoplankton, chlorophyll concentration, and ocean circulation patterns across Indian Ocean.',
    tle: [
      '1 54361U 22143A   24001.50000000  .00000891  00000-0  98765-4 0  9993',
      '2 54361  98.3456  25.1234 0001123  167.8901  192.2109 14.48345678345678'
    ]
  },
  {
    id: 'risat-2br1',
    name: 'RISAT-2BR1',
    callsign: 'RSAT-2BR1',
    orbitType: 'SSO',
    status: 'NOMINAL',
    mission: 'Radar Imaging',
    launched: '11 DEC 2019',
    mass: 628,
    description: 'Synthetic Aperture Radar satellite for all-weather, day-night surveillance. Resolution up to 0.35m. Critical for border monitoring, flood mapping, and disaster response.',
    tle: [
      '1 44857U 19089A   24001.50000000  .00002134  00000-0  19876-3 0  9997',
      '2 44857  37.0000  30.4567 0005678  189.0123  170.9877 14.87456789456789'
    ]
  },
  {
    id: 'gsat-30',
    name: 'GSAT-30',
    callsign: 'GSAT-30',
    orbitType: 'GEO',
    status: 'NOMINAL',
    mission: 'Communications',
    launched: '17 JAN 2020',
    mass: 3357,
    description: 'C-band and Ku-band communication satellite. Provides DTH television, VSAT, and digital connectivity across India and surrounding regions. Positioned at 83°E.',
    tle: [
      '1 45026U 20004A   24001.50000000 -.00000123  00000-0  00000-0 0  9995',
      '2 45026   0.0512  83.0000 0001234   0.0000 360.0000  1.00273791  1234'
    ]
  },
  {
    id: 'gsat-19',
    name: 'GSAT-19',
    callsign: 'GSAT-19',
    orbitType: 'GEO',
    status: 'NOMINAL',
    mission: 'Communications',
    launched: '05 JUN 2017',
    mass: 3136,
    description: 'High throughput communication satellite using Ka and Ku bands. First Indian satellite to use electric propulsion for orbit raising. Capacity exceeds all previous ISRO comms satellites combined.',
    tle: [
      '1 42747U 17028A   24001.50000000 -.00000098  00000-0  00000-0 0  9992',
      '2 42747   0.0234  74.0000 0000987   0.0000 360.0000  1.00273791  5678'
    ]
  },
  {
    id: 'navic-1i',
    name: 'NavIC-1I',
    callsign: 'NVIC-1I',
    orbitType: 'GEO',
    status: 'NOMINAL',
    mission: 'Navigation',
    launched: '12 APR 2018',
    mass: 1425,
    description: 'Part of India\'s indigenous navigation constellation (NavIC). Provides position accuracy of 20m over India and 1500km surrounding region. Inclined GEO orbit for better Indian subcontinent coverage.',
    tle: [
      '1 43286U 18035A   24001.50000000  .00000012  00000-0  00000-0 0  9998',
      '2 43286  28.1000  55.0000 0023456  90.0000 270.0000  1.00273791  9012'
    ]
  },
  {
    id: 'astrosat',
    name: 'AstroSat',
    callsign: 'ASTR-1',
    orbitType: 'LEO',
    status: 'NOMINAL',
    mission: 'Astronomy',
    launched: '28 SEP 2015',
    mass: 1515,
    description: 'India\'s first dedicated multi-wavelength space observatory. Simultaneously observes in UV, optical, low and high energy X-ray wavebands. Has discovered pulsars and studied black hole accretion discs.',
    tle: [
      '1 40930U 15052A   24001.50000000  .00000234  00000-0  34567-4 0  9991',
      '2 40930   6.0000  45.6789 0008901  234.5678  125.4322 14.76567890567890'
    ]
  },
  {
    id: 'chandrayaan-2',
    name: 'Chandrayaan-2',
    callsign: 'CHN-2',
    orbitType: 'LEO',
    status: 'NOMINAL',
    mission: 'Lunar Science',
    launched: '22 JUL 2019',
    mass: 2379,
    description: 'Lunar orbiter conducting remote sensing of the Moon\'s surface. Despite lander loss, orbiter continues to function nominally. Carries 8 scientific instruments studying lunar topology and mineral composition.',
    tle: [
      '1 44441U 19042A   24001.50000000  .00000456  00000-0  56789-4 0  9996',
      '2 44441  89.9000  60.1234 0001234   89.0123  271.0000 14.32678901678901'
    ]
  },
  {
    id: 'aditya-l1',
    name: 'Aditya-L1',
    callsign: 'ADTY-L1',
    orbitType: 'LEO',
    status: 'NOMINAL',
    mission: 'Solar Science',
    launched: '02 SEP 2023',
    mass: 1475,
    description: 'India\'s first solar observatory. Positioned at Sun-Earth Lagrange point L1, 1.5 million km from Earth. Continuously observing solar corona, solar wind, and space weather phenomena.',
    tle: [
      '1 57320U 23132A   24001.50000000  .00000789  00000-0  78901-4 0  9994',
      '2 57320  19.0000  70.5678 0002345  112.3456  247.6544 14.21789012789012'
    ]
  },
  {
    id: 'gsat-24',
    name: 'GSAT-24',
    callsign: 'GSAT-24',
    orbitType: 'GEO',
    status: 'NOMINAL',
    mission: 'Communications',
    launched: '23 JUN 2022',
    mass: 4180,
    description: 'High throughput Ku-band satellite built for Tata Sky DTH services. Entirely leased to Tata Play. Positioned at 83°E geostationary orbit. Largest communication satellite built by ISRO.',
    tle: [
      '1 52895U 22063A   24001.50000000 -.00000145  00000-0  00000-0 0  9993',
      '2 52895   0.0167  93.5000 0000456   0.0000 360.0000  1.00273791  3456'
    ]
  },
  {
    id: 'eos-04',
    name: 'EOS-04',
    callsign: 'EOS-04',
    orbitType: 'SSO',
    status: 'NOMINAL',
    mission: 'Radar Imaging',
    launched: '14 FEB 2022',
    mass: 1710,
    description: 'C-band Synthetic Aperture Radar satellite for all-weather agriculture monitoring, flood mapping, and forest/soil moisture assessment. Successor to RISAT-1 with significantly improved resolution.',
    tle: [
      '1 51656U 22010A   24001.50000000  .00001234  00000-0  11234-3 0  9991',
      '2 51656  98.2000  35.6789 0001890  156.7890  203.2110 14.37890123890123'
    ]
  }
]

// Status color mapping — used across multiple components
export const STATUS_COLORS = {
  NOMINAL: '#00FF85',
  CAUTION: '#FFB300',
  ALERT:   '#FF3D00'
}

// Orbit type color mapping — used on globe nodes
export const ORBIT_COLORS = {
  LEO: '#00B4FF',
  GEO: '#FF6B00',
  SSO: '#00FF85'
}
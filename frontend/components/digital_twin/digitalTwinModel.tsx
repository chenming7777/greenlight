'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';

import Papa from 'papaparse';


interface PanelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  isBroken: boolean;
  onClick: () => void; // Add this line
}

// Data Item component with explicit type annotations
interface DataItemProps {
  label: string;
  value: string | number; // Allow both string and number values
}

// Define SensorData type
interface SensorData {
  temperature: number;
  humidity: number;
  irradiance: number;
  windSpeed: number;
  pressure: number;
  rain: number;
  cloud: number;
}

interface SolarDataEntry {
  energy: number;
  Time: string;
  GHI: number;
  temp: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  rain_1h: number;
  clouds_all: number;
}

export const parseCSV = (csvData: string): SolarDataEntry[] => {
  const parsed = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => {
      if (header === 'Energy delta_Wh') return 'energy'; // Create alias
      return header.replace(/ /g, '_');
    }
  });
  return parsed.data as SolarDataEntry[];
};



// Solar Data Simulator
const SolarDataSimulator = ({
  setSolarData,
  isActive,
  isBroken,
  historicalData,
  currentIndex,
  setCurrentIndex,
  selectedPanel // Add this prop
}: {
  setSolarData: React.Dispatch<React.SetStateAction<any>>;
  isActive: boolean;
  isBroken: boolean;
  historicalData: SolarDataEntry[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedPanel: { // Add this type
    position: [number, number, number];
    isBroken: boolean;
  } | null;
}) => {
  useEffect(() => {
    if (!isActive || !historicalData.length || !selectedPanel) return;

    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % historicalData.length;
      setCurrentIndex(newIndex);
      setSolarData({
        generatedEnergy: isBroken ? 0 : historicalData[newIndex].energy,
        position: selectedPanel.position // Now properly referenced
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [
    isActive,
    historicalData,
    currentIndex,
    isBroken,
    selectedPanel
  ]);

  return null;
};



// Data Item component
const DataItem = ({ label, value }: DataItemProps) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ color: 'black' }}>{label}</span>
    <span style={{ fontWeight: 600, color: 'black' }}>
      {typeof value === 'number' ? value.toFixed(1) : value}
    </span>
  </div>
);

// Sensor Data Simulator
const DataSimulator = ({
  setSensorData,
  isActive,
  historicalData,
  currentIndex,
  setCurrentIndex,
  setCurrentTime
}: {
  setSensorData: React.Dispatch<React.SetStateAction<SensorData>>;
  isActive: boolean;
  historicalData: SolarDataEntry[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  useEffect(() => {
    if (!isActive || !historicalData.length) return;

    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % historicalData.length;
      setCurrentIndex(newIndex);
      const entry = historicalData[newIndex];

      setSensorData({
        temperature: entry.temp,
        humidity: entry.humidity,
        irradiance: entry.GHI,
        windSpeed: entry.wind_speed,
        pressure: entry.pressure,
        rain: entry.rain_1h,
        cloud: entry.clouds_all
      });

      // Set current time from dataset
      setCurrentTime(entry.Time ? new Date(entry.Time) : null);

    }, 2000);

    return () => clearInterval(interval);
  }, [isActive, historicalData, currentIndex, setCurrentTime]);
  return null;
};

// HDRI Environment component
export const HDRIEnvironment = () => {
  return (
    <Environment
      files="/digital_twins/hdr/kloofendal_48d_partly_cloudy_puresky_2k.hdr" // Path to your HDRI file
      background // Sets the HDRI as the scene background
    />
  );
};


// Solar Panel component
const SolarPanel: React.FC<PanelProps & { onClick: () => void }> = ({
  position,
  rotation,
  color,
  isBroken,
  onClick
}) => {
  const [
    colorMap,
    displacementMap,
    metalnessMap,
    normalGLMap,
    roughnessMap
  ] = useTexture([
    '/digital_twins/textures/solar_panel/SolarPanel002_2K-JPG_Color.jpg',
    '/digital_twins/textures/solar_panel/SolarPanel002_2K-JPG_Displacement.jpg',
    '/digital_twins/textures/solar_panel/SolarPanel002_2K-JPG_Metalness.jpg',
    '/digital_twins/textures/solar_panel/SolarPanel002_2K-JPG_NormalGL.jpg',
    '/digital_twins/textures/solar_panel/SolarPanel002_2K-JPG_Roughness.jpg'
  ]);
  // Improve texture sharpness
  colorMap.anisotropy = 16;
  colorMap.generateMipmaps = false;

  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <planeGeometry args={[4, 4]} />
      <meshPhysicalMaterial
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={0.05}
        normalMap={normalGLMap}
        normalScale={new THREE.Vector2(2, -2)}
        metalnessMap={metalnessMap}
        roughnessMap={roughnessMap}
        metalness={0.7}
        roughness={0.3}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        transmission={0.95}
        thickness={0.3}
        ior={1.5}
        envMapIntensity={2}
        color={color} // Apply shading color
        transparent={isBroken} // Enable transparency for broken panels
        opacity={isBroken ? 0.8 : 1}
      />
    </mesh>
  );
};


// Grass terrain component
const GrassTerrain = () => {
  const [grassColor, grassNormal, grassDisplacement] = useTexture([
    '/digital_twins/textures/grass/Grass005_1K-JPG_Color.jpg',
    '/digital_twins/textures/grass/Grass005_1K-JPG_NormalGL.jpg',
    '/digital_twins/textures/grass/Grass005_1K-JPG_Displacement.jpg'
  ]);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.1, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50, 100, 100]} />
      <meshStandardMaterial
        map={grassColor}
        normalMap={grassNormal}
        displacementMap={grassDisplacement}
        displacementScale={0.1}
        roughness={0.8}
        metalness={0.1}
        normalScale={new THREE.Vector2(2, 2)}
      />
    </mesh>
  );
};




// Sensor Stand component
const SensorStand = ({
  onClick // No event parameter needed
}: {
  onClick: () => void // Simplified type
}) => {
  const poleRef = useRef<THREE.Mesh>(null);



  return (
    <group position={[15, 0, -10]}>
      {/* Base plate */}
      <mesh position={[0, 0.5, 0]} receiveShadow>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Interactive pole with event handler */}
      <mesh
        ref={poleRef}
        position={[0, 3, 0]}
        castShadow
        onClick={onClick} // Directly use the handler
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <cylinderGeometry args={[0.2, 0.2, 6, 32]} />
        <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Sensor components */}
      <mesh position={[0, 6.5, 0]} castShadow>
        <boxGeometry args={[1.5, 1, 1]} />
        <meshPhysicalMaterial
          color="#2a2a2a"
          metalness={0.7}
          roughness={0.1}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          transmission={0.8}
          thickness={0.1}
        />
      </mesh>
      <mesh position={[0, 7.2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
};



// The main digital twins component
const DigitalTwinsModel: React.FC = () => {
  // Inside DigitalTwinsModel component:
  // For panel
  const panelGroupRef = useRef<THREE.Group>(null);
  // Configuration panel
  const panelConfig = {
    rows: 5,
    columns: 6,
    panelWidth: 2, // Doubled size
    panelHeight: 2,
    spacing: 2.5 // Increased spacing
  };

  const [currentTime, setCurrentTime] = useState<Date | null>(null);



  // NEW STATE DECLARATIONS - Add here
  const [selectedPanel, setSelectedPanel] = useState<{
    position: [number, number, number];
    isBroken: boolean;
  } | null>(null);

  const [solarData, setSolarData] = useState<{
    generatedEnergy: number;
    position: [number, number, number];
  } | null>(null);


  const handlePanelClick = (position: [number, number, number], isBroken: boolean) => {
    setSelectedPanel({ position, isBroken });
  };


  // For light and sun
  const lightRef = useRef<THREE.DirectionalLight>(null);



  // Generate panels with varying shading colors
  const generatePanels = (): React.ReactElement[] => {
    const panels: React.ReactElement[] = [];
    const brokenPositions = new Set(['0-0', '1-2', '3-4']); // Add your desired positions

    for (let row = 0; row < panelConfig.rows; row++) {
      for (let col = 0; col < panelConfig.columns; col++) {
        // Add this line to define broken status
        const isBroken = brokenPositions.has(`${row}-${col}`);
        const color = isBroken ? '#FF0000' : 'white';
        const panelPosition: [number, number, number] = [
          col * (panelConfig.panelWidth + panelConfig.spacing),
          0,
          row * (panelConfig.panelHeight + panelConfig.spacing)
        ];

        panels.push(
          <SolarPanel
            key={`panel-${row}-${col}`}
            position={panelPosition}
            rotation={[-Math.PI / 2, 0, 0]}
            color={color}
            isBroken={isBroken} // Now this is defined
            onClick={() => handlePanelClick(panelPosition, isBroken)}
          />
        );
      }
    }
    return panels;
  };


  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    irradiance: 0,
    windSpeed: 0,
    pressure: 0,
    rain: 0,
    cloud: 0
  });

  const [showPanel, setShowPanel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [historicalData, setHistoricalData] = useState<SolarDataEntry[]>([]);

  useEffect(() => {
    fetch('/data/solar_weather_demo_0607.csv')
      .then(response => response.text())
      .then(data => {
        const parsedData = parseCSV(data);
        setHistoricalData(parsedData);
      });
  }, []);




  return (
    <div style={{ width: '100%', height: '700px', position: 'relative' }}>
      <Suspense fallback={<div>Loading Solar Digital Twins...</div>}>
        <Canvas
          camera={{
            position: [0, 8, 15], // Adjusted position
            fov: 45
          }}
          style={{ background: '#87CEEB' }}
        >

          {/* Add HDRI Environment */}
          <HDRIEnvironment />

          {/* Directional light with ref */}
          <ambientLight intensity={0.6} />

          <directionalLight
            castShadow
            position={[15, 20, 10]}
            intensity={3}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.001}
            ref={lightRef}
          />






          {/* Realistic Grass Terrain */}
          <GrassTerrain />

          {/* Solar Array */}
          <group ref={panelGroupRef} position={[-10, 0, -5]}>
            {generatePanels()}
          </group>

          {/* Controls */}
          <OrbitControls
            target={panelGroupRef.current?.position.toArray() ?? [0, 0, 0]}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.2}
            enableDamping
            dampingFactor={0.05}
          />

          <DataSimulator
            setSensorData={setSensorData}
            isActive={true}
            historicalData={historicalData}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setCurrentTime={setCurrentTime} // Add this prop
          />

          <SolarDataSimulator
            setSolarData={setSolarData}
            isActive={historicalData.length > 0} // CHANGED: Use data presence instead of solarData
            isBroken={selectedPanel?.isBroken || false}
            historicalData={historicalData}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            selectedPanel={selectedPanel} // Pass the state here
          />

          {/* Environment sensor */}

          <SensorStand onClick={() => setShowPanel(!showPanel)} />
        </Canvas>
      </Suspense>

      {/* Data Panel (DOM element) */}
      {showPanel && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '2%',
            width: '250px',
            background: 'white',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s',
            zIndex: 10
          }}
        >
          {/* Add exit button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}
          >
            <h3 style={{ margin: '0 0 15px', color: 'black' }}>Sensor Data</h3>
            <button
              onClick={() => setShowPanel(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2em',
                cursor: 'pointer',
                color: 'red'
              }}
            >
              X
            </button>
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <DataItem label="Temperature" value={`${sensorData.temperature.toFixed(1)}°C`} />
            <DataItem label="Humidity" value={`${sensorData.humidity.toFixed(1)}%`} />
            <DataItem label="Irradiance" value={`${sensorData.irradiance.toFixed(1)} W/m²`} />
            <DataItem label="Wind Speed" value={`${sensorData.windSpeed.toFixed(1)} m/s`} />
            <DataItem label="pressure" value={`${sensorData.pressure.toFixed(1)} hPa`} />
            <DataItem label="Rain" value={`${sensorData.rain.toFixed(1)} mm`} />
            <DataItem label="Cloud Condition" value={`${sensorData.cloud.toFixed(0)} %`} />
          </div>
        </div>
      )}

      {/* New solar panel data panel */}
      {selectedPanel && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '2%',
            width: '250px',
            background: 'white',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ color: 'black' }}>Solar Panel Output</h3>
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: '1.2em',
              cursor: 'pointer',
              color: 'red'
            }}
              onClick={() => {
                setSelectedPanel(null);
              }}>
              X
            </button>
          </div>
          <DataItem
            label="Status"
            value={selectedPanel.isBroken ? 'FAULTY' : 'OPERATIONAL'}
          />
          <DataItem
            label="Generated Energy"
            value={
              selectedPanel.isBroken
                ? '0 Wh'
                : solarData?.generatedEnergy !== undefined
                  ? `${solarData.generatedEnergy.toFixed(0)} Wh`
                  : 'Loading...'
            }
          />
        </div>
      )}

      {/* Time Panel - Always visible when data is loaded */}
      {currentTime ? (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.9)',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center',
            color: 'black' // Set base color for all text
          }}
        >
          <div style={{ fontSize: '14px', color: 'black' }}> Time</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
            {currentTime.toLocaleTimeString()}
          </div>
          {/* <div style={{ fontSize: '12px', color: 'black' }}>
            {currentTime.toLocaleDateString()}
          </div> */}
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px',
            color: 'black'
          }}
        >
          Loading time data...
        </div>
      )}


    </div>
  );
};

export default DigitalTwinsModel;
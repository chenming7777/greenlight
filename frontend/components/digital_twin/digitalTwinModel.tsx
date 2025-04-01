'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface PanelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
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
}

// Define DataSimulator props
interface DataSimulatorProps {
  setSensorData: React.Dispatch<React.SetStateAction<SensorData>>;
  isActive: boolean;
}


// Data Item component
const DataItem = ({ label, value }: DataItemProps) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span style={{ color: '#666' }}>{label}</span>
    <span style={{ fontWeight: 600 }}>
      {typeof value === 'number' ? value.toFixed(1) : value}
    </span>
  </div>
);

// Data Simulator Component
const DataSimulator = ({
  setSensorData,
  isActive
}: {
  setSensorData: React.Dispatch<React.SetStateAction<SensorData>>;
  isActive: boolean;
}) => {
  useFrame(() => {
    if (!isActive) return;
    
    setSensorData({
      temperature: Math.random() * 10 + 20,
      humidity: Math.random() * 20 + 50,
      irradiance: Math.random() * 300 + 800,
      windSpeed: Math.random() * 10 + 10
    });
  });

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
const SolarPanel: React.FC<PanelProps> = ({ position, rotation, color }) => {
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
    <mesh position={position} rotation={rotation}>
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


// Sun animation component
const SunAnimation = ({
  lightRef,
  sunRef
}: {
  lightRef: React.RefObject<THREE.DirectionalLight | null>;
  sunRef: React.RefObject<THREE.Mesh | null>;
}) => {
  useFrame((state) => {
    if (!lightRef.current || !sunRef.current) return;

    const time = state.clock.getElapsedTime() * 0.5; // Animation speed
    const radius = 25; // Horizontal movement range
    const maxHeight = 20; // Maximum height of the sun

    // Create smooth 0-1 oscillation
    const t = (Math.sin(time) + 1) / 2;

    // Parabolic trajectory calculations
    const x = radius * (2 * t - 1); // Horizontal position (-radius to radius)
    const y = maxHeight * (1 - Math.pow((x / radius), 2)); // Parabolic height

    // Update positions with slight depth offset
    lightRef.current.position.set(x, y, 5);
    sunRef.current.position.set(x, y, 5);
  });

  return null;
};


// Sensor Stand component
const SensorStand = ({ 
  onClick // No event parameter needed
}: { 
  onClick: () => void // Simplified type
}) => {
  const poleRef = useRef<THREE.Mesh>(null);



  return (
    <group position={[10, 0, -5]}>
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

  // For light and sun
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const sunRef = useRef<THREE.Mesh>(null);


  // Generate panels with varying shading colors
  const generatePanels = (): React.ReactElement[] => {
    const panels: React.ReactElement[] = [];
    const colorGradient: string[] = [
      '#FF0000',  // Red (high shading loss)
      '#FFA500',  // Orange (medium shading loss)
      '#FFFF00',  // Yellow (low shading loss)
      '#00FF00'   // Green (minimal shading loss)
    ];

    for (let row = 0; row < panelConfig.rows; row++) {
      for (let col = 0; col < panelConfig.columns; col++) {
        const shadeIndex = Math.floor(Math.random() * colorGradient.length);
        const color = colorGradient[shadeIndex];

        panels.push(
          <SolarPanel
            key={`panel-${row}-${col}`}
            position={[
              col * (panelConfig.panelWidth + panelConfig.spacing),
              0,
              row * (panelConfig.panelHeight + panelConfig.spacing)
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
            color={color}
          />
        );
      }
    }
    return panels;
  };


  const [sensorData, setSensorData] = useState({
    temperature: 25,
    humidity: 60,
    irradiance: 1000,
    windSpeed: 15
  });

  const [showPanel, setShowPanel] = useState(false);

  // Simulate data updates
  useFrame(() => {
    if (!showPanel) return;

    setSensorData({
      temperature: Math.random() * 10 + 20,
      humidity: Math.random() * 20 + 50,
      irradiance: Math.random() * 300 + 800,
      windSpeed: Math.random() * 10 + 10
    });
  });

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

          {/* Sun representation with ref */}
          <mesh position={[15, 10, 10]} ref={sunRef}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color="yellow" />
          </mesh>

          {/* Sun animation component */}
          <SunAnimation lightRef={lightRef} sunRef={sunRef} />


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

          {/* Environment sensor */}
          <DataSimulator 
            setSensorData={setSensorData} 
            isActive={showPanel} 
          />
          
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
          <h3 style={{ margin: '0 0 15px' }}>Sensor Data</h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            <DataItem label="Temperature" value={`${sensorData.temperature.toFixed(1)}°C`} />
            <DataItem label="Humidity" value={`${sensorData.humidity.toFixed(0)}%`} />
            <DataItem label="Irradiance" value={`${sensorData.irradiance.toFixed(0)} W/m²`} />
            <DataItem label="Wind Speed" value={`${sensorData.windSpeed.toFixed(1)} m/s`} />
          </div>


          {/* Control Panel */}
          <div style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'rgba(255,255,255,0.8)',
            padding: '10px',
            borderRadius: '5px'
          }}>
            <div>Display Settings</div>
            <label>
              <input type="checkbox" defaultChecked /> Sun Path
            </label>
            <br />
            <label>
              <input type="checkbox" defaultChecked /> Terrain
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

      export default DigitalTwinsModel;
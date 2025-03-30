'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface PanelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

interface HDRIProps {
  isDay: boolean;
}

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
      <planeGeometry args={[2, 2]} />
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

// The main digital twins component
const DigitalTwinsModel: React.FC = () => {

  // Inside DigitalTwinsModel component:
  const panelGroupRef = useRef<THREE.Group>(null);

  // Configuration
  const panelConfig = {
    rows: 5,
    columns: 6,
    panelWidth: 2, // Doubled size
    panelHeight: 2,
    spacing: 0.5 // Increased spacing
  };

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

          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            castShadow
            position={[15, 20, 10]}
            intensity={3}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.001}
          />

          {/* Realistic Grass Terrain */}
          <GrassTerrain />

          {/* Solar Array */}
          <group ref={panelGroupRef} position={[-10, 0, -5]}>
            {generatePanels()}
          </group>

          {/* Sun Representation */}
          <mesh position={[15, 10, 10]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color="yellow" />
          </mesh>

          {/* Controls */}
          <OrbitControls
            target={panelGroupRef.current?.position.toArray() ?? [0, 0, 0]}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.2}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

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
  );
};

export default DigitalTwinsModel;
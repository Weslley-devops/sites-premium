"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

function LightGlassTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      
      // Smooth subtle floating based on mouse
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.5, 0.5, 128, 64]} />
        <meshPhysicalMaterial
          color="#A3CEF1" // Sky blue base
          emissive="#7BA082" // Sage green subtle emissive
          emissiveIntensity={0.2}
          transmission={0.9}
          thickness={1.5}
          roughness={0.1}
          ior={1.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function CTAScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={2} color="#FFFFFF" />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#FFFFFF" castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FCFCFC" />
        <pointLight position={[0, 0, -5]} intensity={2} color="#7BA082" />

        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <LightGlassTorus />
        </PresentationControls>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

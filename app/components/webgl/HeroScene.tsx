"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Premium High-Tech Light Mode 3D Glassmorphism Hero Scene
 * Soft, organic, realistic tones: pearl grey, sage green, light sky blue.
 */
function LightGlassShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollY * -0.002, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Glass Pearl */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.1, 0.1]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.9}
            thickness={1.5}
            roughness={0.05}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </Float>

      {/* Sage Green Floating Ring */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2} floatingRange={[-0.3, 0.3]}>
        <mesh position={[-2.5, -0.5, 1]} castShadow receiveShadow>
          <torusGeometry args={[0.8, 0.2, 32, 64]} />
          <meshPhysicalMaterial
            color="#7BA082" // Sage green
            metalness={0.1}
            roughness={0.2}
            clearcoat={0.8}
            transmission={0.5}
            thickness={0.5}
            ior={1.5}
          />
        </mesh>
      </Float>

      {/* Sky Blue Pill/Capsule */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.4, 0.2]}>
        <mesh position={[3, 1.5, -1]} castShadow receiveShadow>
          <capsuleGeometry args={[0.5, 1, 32, 32]} />
          <meshPhysicalMaterial
            color="#A3CEF1" // Sky blue
            metalness={0.2}
            roughness={0.1}
            clearcoat={1}
            transmission={0.4}
            thickness={0.8}
            ior={1.2}
          />
        </mesh>
      </Float>

      {/* Pearl Grey Icosahedron */}
      <Float speed={2} rotationIntensity={3} floatIntensity={1} floatingRange={[-0.2, 0.4]}>
        <mesh position={[2, -1.5, 0.5]} castShadow receiveShadow>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshPhysicalMaterial
            color="#F2F2F2" // Pearl grey
            metalness={0.5}
            roughness={0.3}
            clearcoat={0.5}
          />
        </mesh>
      </Float>

      {/* Small floating glass orb */}
      <Float speed={3} rotationIntensity={1} floatIntensity={3} floatingRange={[-0.5, 0.5]}>
        <mesh position={[-2, 2, -0.5]} castShadow receiveShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.95}
            thickness={0.5}
            roughness={0}
            ior={1.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#FFFFFF" castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#A3CEF1" />
        <pointLight position={[0, 5, -5]} intensity={2} color="#7BA082" />

        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <LightGlassShapes />
        </PresentationControls>

        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.2}
          scale={20}
          blur={2.5}
          far={10}
          color="#000000"
        />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

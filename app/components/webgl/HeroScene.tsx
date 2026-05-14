"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import * as THREE from "three";
import { distortionVertex, distortionFragment } from "@/app/lib/shaders/distortion";

/**
 * Fullscreen distortion plane — organic noise shader reacting to mouse.
 * The heart of the hero visual.
 * Inspired by: lusion.co, igloo.inc.
 */
function DistortionPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();

  /* Shader uniforms */
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uIntensity: { value: 0.6 },
    }),
    []
  );

  useFrame((state) => {
    const material = meshRef.current?.material as ShaderMaterial;
    if (!material?.uniforms) return;

    material.uniforms.uTime.value = state.clock.getElapsedTime();

    /* Smooth mouse follow for shader */
    const target = new THREE.Vector2(
      (pointer.x + 1) / 2,
      (pointer.y + 1) / 2
    );
    material.uniforms.uMouse.value.lerp(target, 0.05);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={distortionVertex}
        fragmentShader={distortionFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <DistortionPlane />
      </Canvas>
    </div>
  );
}

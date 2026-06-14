"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { HERO_SLIDES } from "@/data/projects";

function DronePanels() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const textures = useTexture(HERO_SLIDES.map((s) => s.src));

  textures.forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
  });

  useLayoutEffect(() => {
    camera.position.set(0, 0.08, 6.2);
    camera.lookAt(0, 0, 0);

    const panels = groupRef.current?.children ?? [];
    if (!panels.length) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.15 });

    panels.forEach((panel, index) => {
      const mesh = panel as THREE.Mesh;
      const start = index * 2.1;

      tl.set(
        mesh.material,
        {
          opacity: index === 0 ? 1 : 0,
        },
        start,
      );
      tl.fromTo(
        mesh.position,
        { z: -1.2, y: 0 },
        { z: 0.35, y: index % 2 === 0 ? 0.06 : -0.04, duration: 1.6, ease: "power1.inOut" },
        start,
      );
      tl.fromTo(
        mesh.scale,
        { x: 1.08, y: 1.08 },
        { x: 1.18, y: 1.18, duration: 1.6, ease: "sine.inOut" },
        start,
      );
      tl.to(
        mesh.rotation,
        { y: index % 2 === 0 ? 0.04 : -0.04, duration: 1.6 },
        start,
      );
      tl.to(
        mesh.material,
        { opacity: 0, duration: 0.55, ease: "power2.in" },
        start + 1.35,
      );
      tl.to(
        camera.position,
        {
          z: 5.2,
          y: 0.04,
          duration: 1.8,
          ease: "sine.inOut",
        },
        start,
      );
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.015;
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, index) => (
        <mesh key={HERO_SLIDES[index].src} position={[0, 0, -index * 0.02]} renderOrder={index}>
          <planeGeometry args={[7.2, 4.2]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={index === 0 ? 1 : 0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneLoader() {
  return (
    <mesh>
      <planeGeometry args={[2, 1.2]} />
      <meshBasicMaterial color="#0A0E17" />
    </mesh>
  );
}

export function HeroDroneCanvas() {
  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 0, 6.2] }}
    >
      <color attach="background" args={["#0A0E17"]} />
      <fog attach="fog" args={["#0A0E17", 8, 18]} />
      <Suspense fallback={<SceneLoader />}>
        <DronePanels />
      </Suspense>
    </Canvas>
  );
}

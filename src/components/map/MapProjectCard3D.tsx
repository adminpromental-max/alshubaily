"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type CardSceneProps = {
  image: string;
  active: boolean;
};

function FloatingCard({ image, active }: CardSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(image);
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const group = groupRef.current;
    if (!group || !active) return;

    const t = state.clock.elapsedTime;
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      Math.sin(t * 0.55) * 0.14 + state.pointer.x * 0.18,
      0.06,
    );
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      Math.sin(t * 0.45) * 0.06 - state.pointer.y * 0.1,
      0.06,
    );
    group.position.y = Math.sin(t * 0.9) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[3.35, 2.05]} />
        <meshBasicMaterial color="#1A1612" transparent opacity={0.35} />
      </mesh>
      <mesh>
        <planeGeometry args={[3.2, 1.92]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[3.28, 2]} />
        <meshBasicMaterial
          color="#C9A962"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

type MapProjectCard3DProps = {
  image: string;
  active?: boolean;
  className?: string;
};

export function MapProjectCard3D({
  image,
  active = true,
  className,
}: MapProjectCard3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.1} />
          <FloatingCard image={image} active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}

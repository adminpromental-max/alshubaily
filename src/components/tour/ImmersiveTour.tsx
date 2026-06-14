"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { useLang } from "@/contexts/lang-context";

gsap.registerPlugin(ScrollTrigger);

type TourSceneProps = {
  images: string[];
  scrollRoot: React.RefObject<HTMLElement | null>;
};

function TourTunnel({ images, scrollRoot }: TourSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const textures = useTexture(images);

  textures.forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  useLayoutEffect(() => {
    const root = scrollRoot.current;
    if (!root || !groupRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(camera.position, {
        z: -images.length * 3.2 + 2,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      groupRef.current?.children.forEach((child, i) => {
        gsap.fromTo(
          child.position,
          { y: 0 },
          {
            y: i % 2 === 0 ? 0.3 : -0.25,
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.5,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [camera, images.length, scrollRoot]);

  useFrame((state) => {
    const targetX = state.pointer.x * 0.45;
    const targetY = state.pointer.y * 0.2;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, camera.position.z - 5);
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, index) => (
        <mesh key={images[index]} position={[0, 0, -index * 3.2]}>
          <planeGeometry args={[8.5, 5.2]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

type ImmersiveTourProps = {
  images: string[];
  titleAr: string;
  titleEn: string;
};

export function ImmersiveTour({ images, titleAr, titleEn }: ImmersiveTourProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-[#0A0E17]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 2], fov: 60, near: 0.1, far: 200 }}
          dpr={[1, 1.75]}
        >
          <color attach="background" args={["#0A0E17"]} />
          <fog attach="fog" args={["#0A0E17", 4, 30]} />
          <Suspense fallback={null}>
            <TourTunnel images={images} scrollRoot={sectionRef} />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,14,23,0.15),rgba(10,14,23,0.8))]" />

        <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-10">
          <p className="text-[11px] tracking-[0.35em] text-[#c9a962]/75 uppercase">
            {t("جولة داخل المشروع", "Inside the Project")}
          </p>
          <h2 className="font-heading mt-2 text-3xl text-white md:text-5xl">
            {t(titleAr, titleEn)}
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/55">
            {t(
              "حرّكي الماوس ومرّري للأسفل — كأنك داخل المشروع",
              "Move your mouse and scroll — as if you're inside the project",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

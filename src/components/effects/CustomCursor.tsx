"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/lang-context";

const LERP = 0.28;

export function CustomCursor() {
  const { t } = useLang();
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor='explore']");
      setHovering(Boolean(el));
    };

    const tick = () => {
      const el = cursorRef.current;
      if (el) {
        pos.current.x += (target.current.x - pos.current.x) * LERP;
        pos.current.y += (target.current.y - pos.current.y) * LERP;
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovering ? "is-hover" : ""}`}
      aria-hidden
    >
      <span className="custom-cursor-label">
        {t("استكشف", "Explore")}
      </span>
    </div>
  );
}

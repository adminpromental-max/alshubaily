"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type MapBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxHeight?: string;
};

export function MapBottomSheet({
  open,
  onClose,
  children,
  maxHeight = "min(42vh, 380px)",
}: MapBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    gsap.set(sheet, { yPercent: open ? 0 : 105, autoAlpha: open ? 1 : 0 });
  }, []);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    if (open) {
      gsap.killTweensOf(sheet);
      gsap.set(sheet, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.fromTo(
        sheet,
        { yPercent: 105 },
        { yPercent: 0, duration: 0.45, ease: "power3.out" },
      );
    } else {
      gsap.killTweensOf(sheet);
      gsap.to(sheet, {
        yPercent: 105,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(sheet, { autoAlpha: 0, pointerEvents: "none" });
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={sheetRef}
      className="map-bottom-sheet"
      style={{ maxHeight }}
      data-lenis-prevent
      role="dialog"
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={onClose}
        className="map-sheet-handle-btn"
        aria-label="Close panel"
      >
        <span className="map-sheet-handle" aria-hidden />
      </button>
      {children}
    </div>
  );
}

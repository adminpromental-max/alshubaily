"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type MapBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** max height as viewport fraction */
  maxHeight?: string;
};

export function MapBottomSheet({
  open,
  onClose,
  children,
  maxHeight = "min(46vh, 420px)",
}: MapBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const sheet = sheetRef.current;
    const backdrop = backdropRef.current;
    if (!sheet || !backdrop) return;

    gsap.set(sheet, { yPercent: 105 });
    gsap.set(backdrop, { display: "none", opacity: 0 });
  }, []);

  useEffect(() => {
    const sheet = sheetRef.current;
    const backdrop = backdropRef.current;
    if (!sheet || !backdrop) return;

    if (open) {
      gsap.set(backdrop, { display: "block" });
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        sheet,
        { yPercent: 105 },
        { yPercent: 0, duration: 0.55, ease: "power3.out" },
      );
    } else {
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => gsap.set(backdrop, { display: "none" }),
      });
      gsap.to(sheet, { yPercent: 105, duration: 0.35, ease: "power2.in" });
    }
  }, [open]);

  return (
    <>
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="map-sheet-backdrop pointer-events-auto"
        style={{ display: "none" }}
      />
      <div
        ref={sheetRef}
        className="map-bottom-sheet pointer-events-auto"
        style={{ maxHeight }}
        data-lenis-prevent
      >
        <div className="map-sheet-handle" aria-hidden />
        {children}
      </div>
    </>
  );
}

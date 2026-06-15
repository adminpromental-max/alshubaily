"use client";

export function AmbientLight() {
  return (
    <div className="ambient-light pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <div className="ambient-orb ambient-orb--a" />
      <div className="ambient-orb ambient-orb--b" />
    </div>
  );
}

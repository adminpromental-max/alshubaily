"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: { src: string; label?: string }[];
}

export function OlympicCircleGallery({ images }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="ocg-wrap">
      <div className="ocg-track">
        {images.map((img, i) => (
          <div
            key={i}
            className={`ocg-item ${hovered === i ? "ocg-item--open" : ""}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            tabIndex={0}
            role="img"
            aria-label={img.label ?? `صورة ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.label ?? ""}
              fill
              unoptimized
              sizes="(max-width:768px) 180px, 400px"
              className="ocg-img"
            />
            {/* ring decoration */}
            <div className="ocg-ring" aria-hidden />
            {/* shimmer on hover */}
            <div className="ocg-shine" aria-hidden />
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div className="ocg-fade ocg-fade--start" aria-hidden />
      <div className="ocg-fade ocg-fade--end" aria-hidden />
    </div>
  );
}

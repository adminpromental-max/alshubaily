"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/lang-context";

export interface GalleryImage {
  src: string;
  label?: string;
  labelAr?: string;
  labelEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

interface Props {
  images: GalleryImage[];
}

export function OlympicCircleGallery({ images }: Props) {
  const { t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", onKey);

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (isMobile) document.body.style.overflow = "hidden";

    const openEl = wrapRef.current?.querySelector(".ocg-item--open");
    openEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  useEffect(() => {
    if (active === null) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [active, close]);

  const toggle = (index: number) => {
    setActive((prev) => (prev === index ? null : index));
  };

  return (
    <div ref={wrapRef} className={`ocg-wrap ${active !== null ? "ocg-wrap--has-active" : ""}`}>
      <div className="ocg-track">
        {images.map((img, i) => {
          const isOpen = active === i;
          const label = img.label ?? (img.labelAr && img.labelEn ? t(img.labelAr, img.labelEn) : undefined);
          const description =
            img.descriptionAr && img.descriptionEn ? t(img.descriptionAr, img.descriptionEn) : undefined;

          return (
            <div
              key={i}
              className={`ocg-item ${isOpen ? "ocg-item--open" : ""}`}
              onClick={() => toggle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={isOpen}
              aria-label={label ?? `صورة ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={label ?? ""}
                fill
                unoptimized
                sizes="(max-width:640px) 280px, 520px"
                className="ocg-img"
              />

              <div className="ocg-ring" aria-hidden />
              <div className="ocg-shine" aria-hidden />

              {label && <span className="ocg-thumb-label">{label}</span>}

              {isOpen && (
                <>
                  <button
                    type="button"
                    className="ocg-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      close();
                    }}
                    aria-label={t("إغلاق", "Close")}
                  >
                    ×
                  </button>
                  <div className="ocg-caption">
                    {label && <p className="ocg-caption-title">{label}</p>}
                    {description && <p className="ocg-caption-desc">{description}</p>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="ocg-fade ocg-fade--start" aria-hidden />
      <div className="ocg-fade ocg-fade--end" aria-hidden />
    </div>
  );
}

"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, X, ChevronLeft } from "lucide-react";
import { useLang } from "@/contexts/lang-context";
import { GEO_REGIONS, GEO_PROJECTS, type GeoRegion, type GeoProject } from "@/data/map-geo";
import { cn } from "@/lib/utils";

// ── Dark CARTO tiles (no API key needed) ─────────────────────────────
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const DARK_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';

// ── Saudi Arabia center ───────────────────────────────────────────────
const KSA_CENTER: [number, number] = [24.0, 45.0];
const KSA_ZOOM = 5;

// Build glowing HTML marker for region clusters
function regionMarkerHtml(color: string, count: number, nameAr: string) {
  return `
    <div class="nm-region-marker" style="--mc:${color}">
      <span class="nm-region-pulse"></span>
      <span class="nm-region-pulse nm-region-pulse--2"></span>
      <span class="nm-region-count">${count}</span>
      <span class="nm-region-label">${nameAr}</span>
    </div>`;
}

// Build glowing HTML marker for individual projects
function projectMarkerHtml(color: string) {
  return `<div class="nm-project-dot" style="--pc:${color}"><span class="nm-project-ring"></span></div>`;
}

type PanelState =
  | { view: "none" }
  | { view: "region"; region: GeoRegion }
  | { view: "project"; project: GeoProject };

export function NightMap() {
  const { t, lang } = useLang();
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const regionMarkersRef = useRef<L.Marker[]>([]);
  const projectMarkersRef = useRef<L.Marker[]>([]);

  const [panel, setPanel] = useState<PanelState>({ view: "none" });
  const [mounted, setMounted] = useState(false);

  // ── Utility ──────────────────────────────────────────────────────────
  const clearProjectMarkers = useCallback(() => {
    projectMarkersRef.current.forEach((m) => m.remove());
    projectMarkersRef.current = [];
  }, []);

  const showProjectsForRegion = useCallback(
    (map: L.Map, regionId: GeoRegion["id"], onSelect: (p: GeoProject) => void) => {
      clearProjectMarkers();
      const projects = GEO_PROJECTS.filter((p) => p.region === regionId);
      const markers = projects.map((project) => {
        const icon = L.divIcon({
          html: projectMarkerHtml(
            GEO_REGIONS.find((r) => r.id === project.region)?.color ?? "#C9A962",
          ),
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const marker = L.marker([project.lat, project.lng], { icon }).addTo(map);
        marker.on("click", () => onSelect(project));
        return marker;
      });
      projectMarkersRef.current = markers;
    },
    [clearProjectMarkers],
  );

  // ── Initialise Leaflet (client-only) ─────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    setMounted(true);

    // Fix Leaflet default icon path issue in Next.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "",
      iconUrl: "",
      shadowUrl: "",
    });

    const map = L.map(containerRef.current, {
      center: KSA_CENTER,
      zoom: KSA_ZOOM,
      zoomControl: false,
      attributionControl: false,
      minZoom: 4,
      maxZoom: 16,
    });

    L.tileLayer(DARK_TILES, {
      attribution: DARK_ATTRIBUTION,
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    // Subtle attribution
    L.control.attribution({ position: "bottomright", prefix: "" }).addTo(map);

    // Custom zoom buttons (bottom-right)
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // ── Region cluster markers ─────────────────────────────────────────
    GEO_REGIONS.forEach((region) => {
      const count = GEO_PROJECTS.filter((p) => p.region === region.id).length;
      const icon = L.divIcon({
        html: regionMarkerHtml(region.color, count, region.nameAr),
        className: "",
        iconSize: [64, 80],
        iconAnchor: [32, 70],
      });

      const marker = L.marker([region.lat, region.lng], { icon }).addTo(map);

      marker.on("click", () => {
        // Zoom to region
        map.flyTo([region.lat, region.lng], region.zoom, {
          duration: 1.4,
          easeLinearity: 0.3,
        });

        // Show project markers after fly-in
        setTimeout(() => {
          showProjectsForRegion(map, region.id, (project) => {
            // Zoom further into project
            map.flyTo([project.lat, project.lng], 14, {
              duration: 1.0,
              easeLinearity: 0.3,
            });
            setPanel({ view: "project", project });
          });
          setPanel({ view: "region", region });
        }, 800);
      });

      regionMarkersRef.current.push(marker);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [showProjectsForRegion]);

  // ── Actions ──────────────────────────────────────────────────────────
  const handleBackToRegion = useCallback(() => {
    if (panel.view !== "project") return;
    const region = GEO_REGIONS.find((r) => r.id === panel.project.region);
    if (!region || !mapRef.current) return;
    mapRef.current.flyTo([region.lat, region.lng], region.zoom, { duration: 1.0 });
    setPanel({ view: "region", region });
  }, [panel]);

  const handleClosePanel = useCallback(() => {
    clearProjectMarkers();
    if (mapRef.current) {
      mapRef.current.flyTo(KSA_CENTER, KSA_ZOOM, { duration: 1.2 });
    }
    setPanel({ view: "none" });
  }, [clearProjectMarkers]);

  // ── Render ────────────────────────────────────────────────────────────
  const regionForProject =
    panel.view === "project"
      ? GEO_REGIONS.find((r) => r.id === panel.project.region)
      : null;

  return (
    <div className="night-map-root">
      {/* Map container */}
      <div ref={containerRef} className="night-map-canvas" />

      {/* Loading shimmer */}
      {!mounted && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d0d10]">
          <div className="night-map-loader" />
        </div>
      )}

      {/* ── Floating panel ─────────────────────────────────────────────── */}
      <div
        className={cn(
          "night-map-panel",
          panel.view !== "none" && "is-open",
        )}
      >
        {/* Region panel */}
        {panel.view === "region" && (
          <div className="nm-panel-inner">
            <div className="nm-panel-header">
              <div>
                <p className="nm-panel-eyebrow">{t("المنطقة", "Region")}</p>
                <h3 className="nm-panel-title">
                  {lang === "ar" ? panel.region.nameAr : panel.region.nameEn}
                </h3>
                <p className="nm-panel-sub">
                  {GEO_PROJECTS.filter((p) => p.region === panel.region.id).length}{" "}
                  {t("مشروع", "projects")}
                </p>
              </div>
              <button onClick={handleClosePanel} className="nm-close-btn" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="nm-project-list">
              {GEO_PROJECTS.filter((p) => p.region === panel.region.id).map((project) => (
                <li key={project.id}>
                  <button
                    type="button"
                    className="nm-project-row"
                    onClick={() => {
                      if (!mapRef.current) return;
                      mapRef.current.flyTo([project.lat, project.lng], 14, { duration: 1.0 });
                      setPanel({ view: "project", project });
                    }}
                  >
                    <span
                      className="nm-project-dot-sm"
                      style={{ background: regionForProject?.color ?? panel.region.color }}
                    />
                    <span className="nm-project-row-name">
                      {lang === "ar" ? project.nameAr : project.nameEn}
                    </span>
                    <ChevronLeft className="h-3.5 w-3.5 shrink-0 text-white/30" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Project panel */}
        {panel.view === "project" && (
          <div className="nm-panel-inner">
            <div className="nm-panel-header">
              <button
                type="button"
                className="nm-back-btn"
                onClick={handleBackToRegion}
              >
                <ChevronLeft className="h-4 w-4" />
                {t("رجوع", "Back")}
              </button>
              <button onClick={handleClosePanel} className="nm-close-btn" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="nm-project-hero">
              <Image
                src={panel.project.heroImage}
                alt={panel.project.nameAr}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="nm-project-hero-overlay" />
            </div>

            <div className="nm-project-info">
              <p className="nm-project-type">
                {lang === "ar" ? panel.project.typeAr : panel.project.typeEn}
              </p>
              <h3 className="nm-project-name">
                {lang === "ar" ? panel.project.nameAr : panel.project.nameEn}
              </h3>
              <p className="nm-project-location">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {lang === "ar"
                  ? GEO_REGIONS.find((r) => r.id === panel.project.region)?.nameAr
                  : GEO_REGIONS.find((r) => r.id === panel.project.region)?.nameEn}
              </p>
              <Link
                href={`/projects/${panel.project.slug}`}
                className="nm-view-btn"
              >
                {t("عرض المشروع", "View Project")}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Instruction hint ─────────────────────────────────────────── */}
      {panel.view === "none" && mounted && (
        <div className="night-map-hint">
          {t("اختر منطقة لاستكشاف مشاريعنا", "Select a region to explore our projects")}
        </div>
      )}
    </div>
  );
}

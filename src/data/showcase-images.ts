import { HERO_SLIDES } from "@/data/projects";
import { REAL_PROJECT_ASSETS } from "@/data/project-assets";

/** Gallery images for the homepage portfolio showcase (no project names). */
export const SHOWCASE_IMAGES = [
  ...Object.values(REAL_PROJECT_ASSETS).flatMap((asset) => asset.gallery),
  ...HERO_SLIDES.map((slide) => slide.src),
].filter((src, index, list) => list.indexOf(src) === index);

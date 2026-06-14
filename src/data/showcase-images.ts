import { HERO_SLIDES } from "@/data/projects";
import {
  beachAsset,
  dammamAsset,
  projectAsset,
} from "@/data/asset-paths";

/** Verified gallery paths for the homepage portfolio showcase. */
export const SHOWCASE_IMAGES = [
  dammamAsset("Hero.jpg"),
  dammamAsset("4.jpg"),
  dammamAsset("5.jpg"),
  dammamAsset("6.jpg"),
  dammamAsset("7.jpg"),
  projectAsset("Twin-Tower", "Hero.jpg"),
  projectAsset("Twin-Tower", "1.jpg"),
  projectAsset("Twin-Tower", "2.jpg"),
  projectAsset("Twin-Tower", "3.jpg"),
  beachAsset("Hero.jpg"),
  beachAsset("1.jpg"),
  beachAsset("2.jpg"),
  beachAsset("3.jpg"),
  ...HERO_SLIDES.map((slide) => slide.src),
].filter((src, index, list) => list.indexOf(src) === index);

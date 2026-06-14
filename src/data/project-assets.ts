/** Real asset paths for projects with uploaded media */
import { dammamAsset } from "@/data/asset-paths";

export const REAL_PROJECT_ASSETS: Record<
  string,
  { hero: string; gallery: string[] }
> = {
  "dammam-olympic-city": {
    hero: dammamAsset("Hero.jpg"),
    gallery: [
      dammamAsset("Hero.jpg"),
      dammamAsset("4.jpg"),
      dammamAsset("5.jpg"),
      dammamAsset("6.jpg"),
      dammamAsset("7.jpg"),
    ],
  },
  "alshubaily-high-rise": {
    hero: "/assets/projects/Twin-Tower/Hero.jpg",
    gallery: [
      "/assets/projects/Twin-Tower/Hero.jpg",
      "/assets/projects/Twin-Tower/1.jpg",
      "/assets/projects/Twin-Tower/2.jpg",
      "/assets/projects/Twin-Tower/3.jpg",
    ],
  },
  "alshubaily-new-beach": {
    hero: encodeURI("/assets/projects/منتجع منزل البحر /Hero.jpg"),
    gallery: [
      encodeURI("/assets/projects/منتجع منزل البحر /Hero.jpg"),
      encodeURI("/assets/projects/منتجع منزل البحر /1.jpg"),
      encodeURI("/assets/projects/منتجع منزل البحر /2.jpg"),
      encodeURI("/assets/projects/منتجع منزل البحر /3.jpg"),
    ],
  },
};

export const FEATURED_SLUGS = [
  "dammam-olympic-city",
  "alshubaily-high-rise",
  "alshubaily-new-beach",
];

/** Flat ASCII paths in /public/assets/showcase/
 *  Upload specs: 1200×1500 px (4:5), JPEG ~80% quality, max ~350 KB each.
 *  Replace 01.jpg … 20.jpg to update the slider. */
export const SHOWCASE_IMAGE_SPECS = {
  width: 1200,
  height: 1500,
  ratio: "4:5",
  format: "JPEG",
  maxFileSizeKb: 350,
  folder: "public/assets/showcase",
  files: Array.from({ length: 20 }, (_, i) =>
    `${String(i + 1).padStart(2, "0")}.jpg`,
  ),
} as const;

export const SHOWCASE_IMAGES = [
  "/assets/showcase/01.jpg",
  "/assets/showcase/02.jpg",
  "/assets/showcase/03.jpg",
  "/assets/showcase/04.jpg",
  "/assets/showcase/05.jpg",
  "/assets/showcase/06.jpg",
  "/assets/showcase/07.jpg",
  "/assets/showcase/08.jpg",
  "/assets/showcase/09.jpg",
  "/assets/showcase/10.jpg",
  "/assets/showcase/11.jpg",
  "/assets/showcase/12.jpg",
  "/assets/showcase/13.jpg",
  "/assets/showcase/14.jpg",
  "/assets/showcase/15.jpg",
  "/assets/showcase/16.jpg",
  "/assets/showcase/17.jpg",
  "/assets/showcase/18.jpg",
  "/assets/showcase/19.jpg",
  "/assets/showcase/20.jpg",
];

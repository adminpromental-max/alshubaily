/** Exact folder names as committed in git / deployed on Vercel */
export const DAMMAM_PROJECT_DIR = "dammam-olympic";
export const BEACH_PROJECT_DIR = "beach-resort";
export const TIDARA_PROJECT_DIR = "tidara-tower";

export function projectAsset(dir: string, file: string) {
  return encodeURI(`/assets/projects/${dir}/${file}`);
}

export function dammamAsset(file: string) {
  return projectAsset(DAMMAM_PROJECT_DIR, file);
}

export function beachAsset(file: string) {
  return projectAsset(BEACH_PROJECT_DIR, file);
}

export function tidaraAsset(file: string) {
  return projectAsset(TIDARA_PROJECT_DIR, file);
}

export const LOGO_DIR = "لوجوهات مجموعة الشبيلي";

export function groupLogo(file: string) {
  return encodeURI(`/assets/${LOGO_DIR}/${file}`);
}

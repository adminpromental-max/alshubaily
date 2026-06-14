/** Exact folder name on disk — do not change without verifying public/assets/projects */
export const DAMMAM_PROJECT_DIR = "مدينه الدمام الأوليمبيه";

export function dammamAsset(file: string) {
  return encodeURI(`/assets/projects/${DAMMAM_PROJECT_DIR}/${file}`);
}

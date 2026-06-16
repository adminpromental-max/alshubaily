const BANNER_BASE = "/assets/Banner-logos";

export type GroupSubsidiary = {
  id: string;
  logo: string;
  nameAr: string;
  nameEn: string;
  chipClass: string;
};

/** Main group logo — used in chairman / vision section */
export const GROUP_HERO_LOGO = "/assets/Banner-logos/group-logo.png";

/** Compact icon — used in the banner header */
export const GROUP_ICON = `${BANNER_BASE}/Icon.png`;

/** Background video for the logo marquee banner — hosted on Cloudinary CDN */
export const BANNER_VIDEO =
  "https://res.cloudinary.com/dfzaghfsv/video/upload/q_auto,f_mp4/v1781615121/banner-video_ciymr0.mov";

export const GROUP_SUBSIDIARIES: GroupSubsidiary[] = [
  {
    id: "development",
    logo: `${BANNER_BASE}/1.png`,
    nameAr: "الشبيلي للتطوير العقاري",
    nameEn: "AlShubaily Real Estate Development",
    chipClass:
      "border-[#C9A962]/35 bg-[#C9A962]/12 text-[#8A6E2F] hover:bg-[#C9A962]/22 hover:border-[#C9A962]/55",
  },
  {
    id: "contracting",
    logo: `${BANNER_BASE}/2.png`,
    nameAr: "الشبيلي للمقاولات",
    nameEn: "AlShubaily Contracting",
    chipClass:
      "border-[#2E6B8A]/35 bg-[#2E6B8A]/10 text-[#1E4A5F] hover:bg-[#2E6B8A]/18 hover:border-[#2E6B8A]/55",
  },
  {
    id: "investment",
    logo: `${BANNER_BASE}/3.png`,
    nameAr: "الشبيلي للاستثمار",
    nameEn: "AlShubaily Investment",
    chipClass:
      "border-[#6B4FA0]/35 bg-[#6B4FA0]/10 text-[#4A3570] hover:bg-[#6B4FA0]/18 hover:border-[#6B4FA0]/55",
  },
  {
    id: "hospitality",
    logo: `${BANNER_BASE}/4.png`,
    nameAr: "الشبيلي للضيافة",
    nameEn: "AlShubaily Hospitality",
    chipClass:
      "border-[#B85C38]/35 bg-[#B85C38]/10 text-[#8A4528] hover:bg-[#B85C38]/18 hover:border-[#B85C38]/55",
  },
  {
    id: "trading",
    logo: `${BANNER_BASE}/5.png`,
    nameAr: "الشبيلي للتجارة",
    nameEn: "AlShubaily Trading",
    chipClass:
      "border-[#3D7A5A]/35 bg-[#3D7A5A]/10 text-[#2A5540] hover:bg-[#3D7A5A]/18 hover:border-[#3D7A5A]/55",
  },
  {
    id: "services",
    logo: `${BANNER_BASE}/6.png`,
    nameAr: "الشبيلي للخدمات",
    nameEn: "AlShubaily Services",
    chipClass:
      "border-[#8B4513]/35 bg-[#8B4513]/10 text-[#6A3410] hover:bg-[#8B4513]/18 hover:border-[#8B4513]/55",
  },
];

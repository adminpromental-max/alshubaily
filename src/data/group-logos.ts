const LOGO_BASE = encodeURI("/assets/لوجوهات مجموعة الشبيلي");

/** Recommended upload specs for transparent PNG logos */
export const GROUP_LOGO_SPECS = {
  hero: {
    width: 800,
    height: 320,
    ratio: "5:2",
    file: "hero.png",
    noteAr: "اللوجو الرئيسي للمجموعة — PNG شفاف بدون خلفية",
    noteEn: "Main group logo — transparent PNG, no background",
  },
  subsidiary: {
    width: 480,
    height: 192,
    ratio: "5:2",
    files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
    noteAr: "لوجوهات الشركات التابعة — PNG شفاف بنفس النسبة",
    noteEn: "Subsidiary logos — transparent PNG with the same ratio",
  },
  retina: {
    hero: { width: 1600, height: 640 },
    subsidiary: { width: 960, height: 384 },
  },
} as const;

export type GroupSubsidiary = {
  id: string;
  logo: string;
  nameAr: string;
  nameEn: string;
  chipClass: string;
};

export const GROUP_HERO_LOGO = `${LOGO_BASE}/hero.png`;

export const GROUP_SUBSIDIARIES: GroupSubsidiary[] = [
  {
    id: "development",
    logo: `${LOGO_BASE}/1.png`,
    nameAr: "الشبيلي للتطوير العقاري",
    nameEn: "AlShubaily Real Estate Development",
    chipClass:
      "border-[#C9A962]/35 bg-[#C9A962]/12 text-[#8A6E2F] hover:bg-[#C9A962]/22 hover:border-[#C9A962]/55",
  },
  {
    id: "contracting",
    logo: `${LOGO_BASE}/2.png`,
    nameAr: "الشبيلي للمقاولات",
    nameEn: "AlShubaily Contracting",
    chipClass:
      "border-[#2E6B8A]/35 bg-[#2E6B8A]/10 text-[#1E4A5F] hover:bg-[#2E6B8A]/18 hover:border-[#2E6B8A]/55",
  },
  {
    id: "investment",
    logo: `${LOGO_BASE}/3.png`,
    nameAr: "الشبيلي للاستثمار",
    nameEn: "AlShubaily Investment",
    chipClass:
      "border-[#6B4FA0]/35 bg-[#6B4FA0]/10 text-[#4A3570] hover:bg-[#6B4FA0]/18 hover:border-[#6B4FA0]/55",
  },
  {
    id: "hospitality",
    logo: `${LOGO_BASE}/4.png`,
    nameAr: "الشبيلي للضيافة",
    nameEn: "AlShubaily Hospitality",
    chipClass:
      "border-[#B85C38]/35 bg-[#B85C38]/10 text-[#8A4528] hover:bg-[#B85C38]/18 hover:border-[#B85C38]/55",
  },
  {
    id: "trading",
    logo: `${LOGO_BASE}/5.png`,
    nameAr: "الشبيلي للتجارة",
    nameEn: "AlShubaily Trading",
    chipClass:
      "border-[#3D7A5A]/35 bg-[#3D7A5A]/10 text-[#2A5540] hover:bg-[#3D7A5A]/18 hover:border-[#3D7A5A]/55",
  },
  {
    id: "services",
    logo: `${LOGO_BASE}/6.png`,
    nameAr: "الشبيلي للخدمات",
    nameEn: "AlShubaily Services",
    chipClass:
      "border-[#8B4513]/35 bg-[#8B4513]/10 text-[#6A3410] hover:bg-[#8B4513]/18 hover:border-[#8B4513]/55",
  },
];

export type ProjectCategoryId =
  | "residential"
  | "commercial"
  | "entertainment"
  | "hotel";

export type ProjectCategory = {
  id: ProjectCategoryId;
  nameAr: string;
  nameEn: string;
  bioAr: string;
  bioEn: string;
  image: string;
};

/** Maps each project slug → category for filters & type cards */
export const PROJECT_CATEGORY_BY_SLUG: Record<string, ProjectCategoryId> = {
  "alshubaily-ahl-albayt": "commercial",
  "rabia-makkah": "residential",
  "hail-corniche": "entertainment",
  "hail-walkway": "entertainment",
  "benban-residence": "residential",
  "alshubaily-residence": "residential",
  "riyadh-boulevard": "entertainment",
  "golf-city": "entertainment",
  "alshubaily-town": "commercial",
  "alshubaily-grand-mall": "commercial",
  "alshubaily-resort": "hotel",
  "alshubaily-port": "commercial",
  "dammam-olympic-city": "entertainment",
  "al-zahraa": "residential",
  "alshubaily-high-rise": "residential",
  "alshubaily-high-rise-2": "residential",
  "sultanat-al-sharq": "commercial",
  "alshubaily-new-beach": "hotel",
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: "residential",
    nameAr: "سكني",
    nameEn: "Residential",
    bioAr: "مجتمعات سكنية فاخرة وأبراج عصرية في أرقى مواقع المملكة.",
    bioEn: "Premium residential communities and contemporary towers across the Kingdom.",
    image: encodeURI("/assets/projects/انواع المشاريع/سكني.jpg"),
  },
  {
    id: "commercial",
    nameAr: "تجاري",
    nameEn: "Commercial",
    bioAr: "وجهات تجارية ومشاريع متعددة الاستخدامات تعزز الحيوية الاقتصادية.",
    bioEn: "Commercial and mixed-use destinations that energize regional economies.",
    image: encodeURI("/assets/projects/انواع المشاريع/تجاري.jpg"),
  },
  {
    id: "entertainment",
    nameAr: "ترفيهي",
    nameEn: "Entertainment",
    bioAr: "مدن رياضية ووجهات ترفيهية وبوليفاردات حيوية للعائلات.",
    bioEn: "Sports cities, leisure destinations, and vibrant boulevards for families.",
    image: encodeURI("/assets/projects/انواع المشاريع/ترفيهي.jpg"),
  },
  {
    id: "hotel",
    nameAr: "فندقي",
    nameEn: "Hospitality",
    bioAr: "منتجعات ووجهات ساحلية بضيافة استثنائية على ساحل الخليج.",
    bioEn: "Resorts and coastal destinations with exceptional Gulf hospitality.",
    image: encodeURI("/assets/projects/انواع المشاريع/فندقي.jpg"),
  },
];

export const SITE_STATS = {
  projects: 18,
  investors: 850,
  requests: 2400,
};

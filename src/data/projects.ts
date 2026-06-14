import { dammamAsset } from "@/data/asset-paths";

export type RegionId = "all" | "mecca" | "hail" | "riyadh" | "eastern";

export type Project = {
  id: number;
  slug: string;
  nameEn: string;
  nameAr: string;
  region: Exclude<RegionId, "all">;
  regionEn: string;
  regionAr: string;
  typeEn: string;
  typeAr: string;
  color: string;
  x: number;
  y: number;
  descriptionEn: string;
  descriptionAr: string;
  heroImage: string;
  gallery: string[];
};

export type Region = {
  id: RegionId;
  nameEn: string;
  nameAr: string;
};

const DEFAULT_GALLERY = [
  "/assets/hero/Hero-1.jpg",
  "/assets/hero/Hero-2.jpg",
  "/assets/hero/Hero-3.jpg",
];

export const REGIONS: Region[] = [
  { id: "all", nameEn: "All Projects", nameAr: "جميع المشاريع" },
  { id: "mecca", nameEn: "Mecca", nameAr: "مكة" },
  { id: "hail", nameEn: "Hail", nameAr: "حائل" },
  { id: "riyadh", nameEn: "Riyadh", nameAr: "الرياض" },
  { id: "eastern", nameEn: "Eastern Region", nameAr: "المنطقة الشرقية" },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "alshubaily-ahl-albayt",
    nameEn: "AlShubaily & Ahl albayt",
    nameAr: "الشبيلي و أهل البيت",
    region: "mecca",
    regionEn: "Mecca",
    regionAr: "مكة",
    typeEn: "Mixed-use",
    typeAr: "متعدد الاستخدامات",
    color: "#8B4513",
    x: 31.5,
    y: 57.5,
    descriptionEn:
      "A landmark mixed-use development in the holy city of Mecca, combining residential and commercial excellence.",
    descriptionAr:
      "مشروع متعدد الاستخدامات في مكة المكرمة يجمع بين التميز السكني والتجاري.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 2,
    slug: "rabia-makkah",
    nameEn: "Rabia Makkah (1)",
    nameAr: "رابية مكة (1)",
    region: "mecca",
    regionEn: "Mecca",
    regionAr: "مكة",
    typeEn: "Residential",
    typeAr: "سكني",
    color: "#2E6B8A",
    x: 28.5,
    y: 63.5,
    descriptionEn:
      "Premium residential community offering modern living in the heart of Mecca.",
    descriptionAr: "مجتمع سكني فاخر يقدم أسلوب حياة عصري في قلب مكة المكرمة.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 3,
    slug: "hail-corniche",
    nameEn: "Hail Corniche",
    nameAr: "كورنيش حائل",
    region: "hail",
    regionEn: "Hail",
    regionAr: "حائل",
    typeEn: "Waterfront",
    typeAr: "واجهة بحرية",
    color: "#4A7C59",
    x: 43.5,
    y: 27.5,
    descriptionEn:
      "A scenic waterfront promenade development along Hail's beautiful landscape.",
    descriptionAr:
      "مشروع كورنيش ساحلي على طول المناظر الطبيعية الخلابة في حائل.",
    heroImage: "/assets/hero/Hero-2.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 4,
    slug: "hail-walkway",
    nameEn: "Hail Walkway",
    nameAr: "حائل واك واي",
    region: "hail",
    regionEn: "Hail",
    regionAr: "حائل",
    typeEn: "Walkway",
    typeAr: "ممشى",
    color: "#3D6B8A",
    x: 45.5,
    y: 31.5,
    descriptionEn:
      "An elegant pedestrian walkway connecting key destinations in Hail region.",
    descriptionAr: "ممشى راقٍ يربط بين أهم الوجهات في منطقة حائل.",
    heroImage: "/assets/hero/Hero-2.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 5,
    slug: "benban-residence",
    nameEn: "Benban Residence",
    nameAr: "بنبان ريزيدنس",
    region: "riyadh",
    regionEn: "Riyadh",
    regionAr: "الرياض",
    typeEn: "Residential",
    typeAr: "سكني",
    color: "#C4783A",
    x: 47.5,
    y: 53.5,
    descriptionEn:
      "Contemporary residential towers in the vibrant Benban district of Riyadh.",
    descriptionAr:
      "أبراج سكنية عصرية في حي بنبان النابض بالحياة في الرياض.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 6,
    slug: "alshubaily-residence",
    nameEn: "AlShubaily Residence",
    nameAr: "الشبيلي ريزيدنس",
    region: "riyadh",
    regionEn: "Riyadh",
    regionAr: "الرياض",
    typeEn: "Luxury",
    typeAr: "فاخر",
    color: "#6B5B7B",
    x: 49.5,
    y: 46.5,
    descriptionEn:
      "Signature luxury residences bearing the AlShubaily name in the capital city.",
    descriptionAr: "مساكن فاخرة تحمل اسم الشبيلي في العاصمة الرياض.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 7,
    slug: "riyadh-boulevard",
    nameEn: "Riyadh Boulevard",
    nameAr: "رياض بوليفارد",
    region: "riyadh",
    regionEn: "Riyadh",
    regionAr: "الرياض",
    typeEn: "Mixed-use",
    typeAr: "متعدد الاستخدامات",
    color: "#D4854A",
    x: 51.5,
    y: 43.5,
    descriptionEn:
      "A vibrant boulevard featuring retail, dining, and entertainment experiences.",
    descriptionAr: "بوليفارد حيوي يضم التجزئة والمطاعم والترفيه.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 8,
    slug: "golf-city",
    nameEn: "Golf City",
    nameAr: "جولف سيتي",
    region: "riyadh",
    regionEn: "Riyadh",
    regionAr: "الرياض",
    typeEn: "Golf",
    typeAr: "جولف",
    color: "#8B6914",
    x: 53.5,
    y: 48.5,
    descriptionEn:
      "An integrated golf community with premium villas and world-class amenities.",
    descriptionAr: "مجتمع جولف متكامل مع فلل فاخرة ومرافق عالمية المستوى.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 9,
    slug: "alshubaily-town",
    nameEn: "AlShubaily Town",
    nameAr: "الشبيلي تاون",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "Town",
    typeAr: "مدينة",
    color: "#5C4033",
    x: 70.5,
    y: 46.5,
    descriptionEn:
      "A master-planned town offering complete lifestyle in the Eastern Province.",
    descriptionAr:
      "مدينة مخططة بعناية تقدم أسلوب حياة متكامل في المنطقة الشرقية.",
    heroImage: "/assets/hero/Hero-2.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 10,
    slug: "alshubaily-grand-mall",
    nameEn: "AlShubaily Grand Mall",
    nameAr: "الشبيلي جراند مول",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "Retail",
    typeAr: "تجاري",
    color: "#2E5A6B",
    x: 72.5,
    y: 48.5,
    descriptionEn:
      "A premier shopping and entertainment destination in the Eastern Region.",
    descriptionAr: "وجهة تسوق وترفيه رائدة في المنطقة الشرقية.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 11,
    slug: "alshubaily-resort",
    nameEn: "AlShubaily Resort",
    nameAr: "الشبيلي ريزورت",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "Resort",
    typeAr: "منتجع",
    color: "#4A6741",
    x: 74.5,
    y: 50.5,
    descriptionEn:
      "A luxury resort offering exceptional hospitality on the Arabian Gulf coast.",
    descriptionAr:
      "منتجع فاخر يقدم ضيافة استثنائية على ساحل الخليج العربي.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 12,
    slug: "alshubaily-port",
    nameEn: "AlShubaily Port",
    nameAr: "الشبيلي بورت",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "Waterfront",
    typeAr: "واجهة بحرية",
    color: "#1E4D6B",
    x: 76.5,
    y: 53.5,
    descriptionEn:
      "A waterfront port development combining marina, retail, and residential spaces.",
    descriptionAr:
      "مشروع ميناء ساحلي يجمع بين المارينا والتجزئة والمساحات السكنية.",
    heroImage: "/assets/projects/Twin-Tower/Hero.jpg",
    gallery: [
      "/assets/projects/Twin-Tower/Hero.jpg",
      "/assets/hero/Hero-1.jpg",
      "/assets/hero/Hero-2.jpg",
      "/assets/hero/Hero-1.jpg",
    ],
  },
  {
    id: 13,
    slug: "dammam-olympic-city",
    nameEn: "Dammam Olympic City",
    nameAr: "مدينة الدمام الأولمبية",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "Sports",
    typeAr: "رياضي",
    color: "#7B4A2E",
    x: 78.5,
    y: 49.5,
    descriptionEn: "A world-class sports and wellness city in the heart of Dammam.",
    descriptionAr: "مدينة رياضية وصحية عالمية المستوى في قلب الدمام.",
    heroImage: dammamAsset("Hero.jpg"),
    gallery: [
      dammamAsset("Hero.jpg"),
      dammamAsset("4.jpg"),
      dammamAsset("5.jpg"),
      dammamAsset("6.jpg"),
    ],
  },
  {
    id: 14,
    slug: "al-zahraa",
    nameEn: "Al-Zahraa Project",
    nameAr: "مشروع الزهراء",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "Residential",
    typeAr: "سكني",
    color: "#5A6B4A",
    x: 73.5,
    y: 44.5,
    descriptionEn:
      "An elegant residential project named after beauty and prosperity.",
    descriptionAr: "مشروع سكني أنيق يحمل اسم الجمال والازدهار.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 15,
    slug: "alshubaily-high-rise",
    nameEn: "AlShubaily High Rise",
    nameAr: "الشبيلي هاي رايز",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "High-rise",
    typeAr: "أبراج",
    color: "#4A3B6B",
    x: 80.5,
    y: 46.5,
    descriptionEn:
      "Iconic high-rise towers defining the skyline of the Eastern Province.",
    descriptionAr: "أبراج شاهقة تحدد أفق المنطقة الشرقية.",
    heroImage: "/assets/projects/Twin-Tower/Hero.jpg",
    gallery: [
      "/assets/projects/Twin-Tower/Hero.jpg",
      "/assets/projects/Twin-Tower/1.jpg",
      "/assets/projects/Twin-Tower/2.jpg",
      "/assets/projects/Twin-Tower/3.jpg",
    ],
  },
  {
    id: 16,
    slug: "alshubaily-high-rise-2",
    nameEn: "AlShubaily High Rise (2)",
    nameAr: "الشبيلي هاي رايز (2)",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "High-rise",
    typeAr: "أبراج",
    color: "#6B4A5A",
    x: 82.5,
    y: 44.5,
    descriptionEn:
      "The second phase of AlShubaily's landmark high-rise development.",
    descriptionAr: "المرحلة الثانية من مشروع الشبيلي الشاهق.",
    heroImage: "/assets/hero/Hero-3.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 17,
    slug: "sultanat-al-sharq",
    nameEn: "Sultanat Al Sharq",
    nameAr: "سلطانة الشرق",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "Mixed-use",
    typeAr: "متعدد الاستخدامات",
    color: "#8B6914",
    x: 84.5,
    y: 48.5,
    descriptionEn:
      "A royal-inspired destination celebrating the heritage of the Eastern Region.",
    descriptionAr: "وجهة مستوحاة من التراث تحتفي بإرث المنطقة الشرقية.",
    heroImage: "/assets/hero/Hero-1.jpg",
    gallery: DEFAULT_GALLERY,
  },
  {
    id: 18,
    slug: "alshubaily-new-beach",
    nameEn: "AlShubaily New Beach",
    nameAr: "الشبيلي نيو بيتش",
    region: "eastern",
    regionEn: "Eastern Region",
    regionAr: "المنطقة الشرقية",
    typeEn: "Beachfront",
    typeAr: "ساحلي",
    color: "#2E6B8A",
    x: 83.5,
    y: 52.5,
    descriptionEn:
      "A stunning beachfront development with pristine shores and luxury amenities.",
    descriptionAr: "مشروع ساحلي خلاب مع شواطئ نقية ومرافق فاخرة.",
    heroImage: encodeURI("/assets/projects/منتجع منزل البحر /Hero.jpg"),
    gallery: [
      encodeURI("/assets/projects/منتجع منزل البحر /Hero.jpg"),
      encodeURI("/assets/projects/منتجع منزل البحر /1.jpg"),
      encodeURI("/assets/projects/منتجع منزل البحر /2.jpg"),
      encodeURI("/assets/projects/منتجع منزل البحر /3.jpg"),
    ],
  },
];

export const HERO_SLIDES = [
  {
    src: "/assets/hero/Hero-1.jpg",
    labelAr: "محفظة المشاريع",
    labelEn: "Project Portfolio",
  },
  {
    src: "/assets/hero/Hero-2.jpg",
    labelAr: "الشبيلي بورت",
    labelEn: "AlShubaily Port",
  },
  {
    src: "/assets/hero/Hero-3.jpg",
    labelAr: "أبراج تيدارا",
    labelEn: "Tidara Towers",
  },
  {
    src: "/assets/hero/Hero-4.jpg",
    labelAr: "مشروع مميز",
    labelEn: "Featured Development",
  },
  {
    src: "/assets/hero/Hero-5.jpg",
    labelAr: "وجهة ساحلية",
    labelEn: "Coastal Destination",
  },
  {
    src: "/assets/hero/Hero-6.jpg",
    labelAr: "استثمار عقاري",
    labelEn: "Real Estate Investment",
  },
  {
    src: "/assets/hero/Hero-7.jpg",
    labelAr: "رؤية المجموعة",
    labelEn: "Group Vision",
  },
];

export function getProjectById(id: number) {
  return PROJECTS.find((p) => p.id === id);
}

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export type RegionCluster = {
  id: Exclude<RegionId, "all">;
  x: number;
  y: number;
  count: number;
  nameAr: string;
  nameEn: string;
};

const REGION_IDS = ["mecca", "hail", "riyadh", "eastern"] as const;

export function getRegionClusters(): RegionCluster[] {
  return REGION_IDS.map((id) => {
    const projects = PROJECTS.filter((p) => p.region === id);
    const region = REGIONS.find((r) => r.id === id)!;
    const x = projects.reduce((sum, p) => sum + p.x, 0) / projects.length;
    const y = projects.reduce((sum, p) => sum + p.y, 0) / projects.length;
    return {
      id,
      x,
      y,
      count: projects.length,
      nameAr: region.nameAr,
      nameEn: region.nameEn,
    };
  });
}

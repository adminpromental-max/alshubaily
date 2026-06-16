/**
 * Real lat/lng coordinates for KSA regions and projects.
 * Used by the Leaflet night map on the About page.
 */

export type GeoRegion = {
  id: "mecca" | "hail" | "riyadh" | "eastern";
  nameAr: string;
  nameEn: string;
  lat: number;
  lng: number;
  zoom: number;        // zoom level when region is focused
  color: string;       // glow colour
};

export type GeoProject = {
  id: number;
  slug: string;
  nameAr: string;
  nameEn: string;
  typeAr: string;
  typeEn: string;
  region: GeoRegion["id"];
  lat: number;
  lng: number;
  heroImage: string;
};

export const GEO_REGIONS: GeoRegion[] = [
  {
    id: "riyadh",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    lat: 24.688,
    lng: 46.722,
    zoom: 11,
    color: "#D4854A",
  },
  {
    id: "mecca",
    nameAr: "مكة المكرمة",
    nameEn: "Mecca",
    lat: 21.389,
    lng: 39.858,
    zoom: 11,
    color: "#8B4513",
  },
  {
    id: "hail",
    nameAr: "حائل",
    nameEn: "Hail",
    lat: 27.526,
    lng: 41.690,
    zoom: 11,
    color: "#4A7C59",
  },
  {
    id: "eastern",
    nameAr: "المنطقة الشرقية",
    nameEn: "Eastern Province",
    lat: 26.433,
    lng: 50.103,
    zoom: 10,
    color: "#2E5A6B",
  },
];

export const GEO_PROJECTS: GeoProject[] = [
  // Mecca projects
  {
    id: 1,
    slug: "alshubaily-ahl-albayt",
    nameAr: "الشبيلي و أهل البيت",
    nameEn: "AlShubaily & Ahl albayt",
    typeAr: "متعدد الاستخدامات",
    typeEn: "Mixed-use",
    region: "mecca",
    lat: 21.4225,
    lng: 39.8262,
    heroImage: "/assets/hero/Hero-1.jpg",
  },
  {
    id: 2,
    slug: "rabia-makkah",
    nameAr: "رابية مكة (1)",
    nameEn: "Rabia Makkah (1)",
    typeAr: "سكني",
    typeEn: "Residential",
    region: "mecca",
    lat: 21.3786,
    lng: 39.8579,
    heroImage: "/assets/hero/Hero-2.jpg",
  },
  {
    id: 13,
    slug: "rabia-makkah-2",
    nameAr: "رابية مكة (2)",
    nameEn: "Rabia Makkah (2)",
    typeAr: "سكني",
    typeEn: "Residential",
    region: "mecca",
    lat: 21.3620,
    lng: 39.8700,
    heroImage: "/assets/hero/Hero-3.jpg",
  },
  // Hail projects
  {
    id: 3,
    slug: "hail-corniche",
    nameAr: "كورنيش حائل",
    nameEn: "Hail Corniche",
    typeAr: "واجهة بحرية",
    typeEn: "Waterfront",
    region: "hail",
    lat: 27.5200,
    lng: 41.6930,
    heroImage: "/assets/hero/Hero-2.jpg",
  },
  {
    id: 4,
    slug: "hail-walkway",
    nameAr: "حائل واك واي",
    nameEn: "Hail Walkway",
    typeAr: "ممشى",
    typeEn: "Walkway",
    region: "hail",
    lat: 27.5380,
    lng: 41.7100,
    heroImage: "/assets/hero/Hero-3.jpg",
  },
  // Riyadh projects
  {
    id: 5,
    slug: "benban-residence",
    nameAr: "بنبان ريزيدنس",
    nameEn: "Benban Residence",
    typeAr: "سكني",
    typeEn: "Residential",
    region: "riyadh",
    lat: 24.7953,
    lng: 46.5775,
    heroImage: "/assets/hero/Hero-1.jpg",
  },
  {
    id: 6,
    slug: "alshubaily-residence",
    nameAr: "الشبيلي ريزيدنس",
    nameEn: "AlShubaily Residence",
    typeAr: "فاخر",
    typeEn: "Luxury",
    region: "riyadh",
    lat: 24.7136,
    lng: 46.6753,
    heroImage: "/assets/hero/Hero-1.jpg",
  },
  {
    id: 7,
    slug: "riyadh-boulevard",
    nameAr: "رياض بوليفارد",
    nameEn: "Riyadh Boulevard",
    typeAr: "متعدد الاستخدامات",
    typeEn: "Mixed-use",
    region: "riyadh",
    lat: 24.7608,
    lng: 46.6441,
    heroImage: "/assets/hero/Hero-1.jpg",
  },
  {
    id: 8,
    slug: "golf-city",
    nameAr: "جولف سيتي",
    nameEn: "Golf City",
    typeAr: "جولف",
    typeEn: "Golf",
    region: "riyadh",
    lat: 24.6220,
    lng: 46.8150,
    heroImage: "/assets/hero/Hero-2.jpg",
  },
  // Eastern Province
  {
    id: 9,
    slug: "alshubaily-town",
    nameAr: "الشبيلي تاون",
    nameEn: "AlShubaily Town",
    typeAr: "مدينة",
    typeEn: "Town",
    region: "eastern",
    lat: 26.4207,
    lng: 50.0880,
    heroImage: "/assets/hero/Hero-2.jpg",
  },
  {
    id: 10,
    slug: "alshubaily-grand-mall",
    nameAr: "الشبيلي جراند مول",
    nameEn: "AlShubaily Grand Mall",
    typeAr: "تجاري",
    typeEn: "Retail",
    region: "eastern",
    lat: 26.3950,
    lng: 50.1160,
    heroImage: "/assets/hero/Hero-1.jpg",
  },
  {
    id: 11,
    slug: "alshubaily-resort",
    nameAr: "الشبيلي ريزورت",
    nameEn: "AlShubaily Resort",
    typeAr: "منتجع",
    typeEn: "Resort",
    region: "eastern",
    lat: 26.2860,
    lng: 50.2040,
    heroImage: "/assets/hero/Hero-1.jpg",
  },
  {
    id: 12,
    slug: "alshubaily-port",
    nameAr: "الشبيلي بورت",
    nameEn: "AlShubaily Port",
    typeAr: "واجهة بحرية",
    typeEn: "Waterfront",
    region: "eastern",
    lat: 26.4400,
    lng: 50.1620,
    heroImage: "/assets/projects/Twin-Tower/Hero.jpg",
  },
];

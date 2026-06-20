import { dammamAsset } from "@/data/asset-paths";

export type DammamHighlight = {
  file: string;
  side: "left" | "right";
  eyebrowAr: string;
  eyebrowEn: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
};

export const DAMMAM_HERO_POSTER = dammamAsset("City-landscape.png");
export const DAMMAM_BANNER = dammamAsset("banner.png");

export const DAMMAM_HIGHLIGHTS: DammamHighlight[] = [
  {
    file: "Football-studium.jpg",
    side: "right",
    eyebrowAr: "استاد رياضي عالمي",
    eyebrowEn: "World-Class Stadium",
    titleAr: "الملعب الأولمبي الرئيسي",
    titleEn: "Main Olympic Stadium",
    bodyAr:
      "يستوعب أكثر من 45,000 متفرج ومصمم وفق أعلى المعايير الدولية لاستضافة البطولات الكبرى والفعاليات متعددة التخصصات، مع تقنيات بث متطورة وتجربة مشاهدة استثنائية في قلب الدمام.",
    bodyEn:
      "Accommodating over 45,000 spectators, designed to the highest international standards for major championships and multi-discipline events, with advanced broadcast technology at the heart of Dammam.",
  },
  {
    file: "Ball-Area.png",
    side: "left",
    eyebrowAr: "ملاعب متعددة",
    eyebrowEn: "Multi-Sport Courts",
    titleAr: "منطقة الكرة",
    titleEn: "Ball Area",
    bodyAr:
      "مجمع رياضي حيوي يضم ملاعب كرة القدم والسلة والطائرة في تصميم حضري مفتوح، يخدم المجتمع المحلي والزوار ويُعد مساحة تدريب وتنافس على مدار العام.",
    bodyEn:
      "A vibrant sports cluster with football, basketball, and volleyball courts in an open urban layout — serving the local community and visitors as a year-round training and competition destination.",
  },
  {
    file: "Polo.png",
    side: "right",
    eyebrowAr: "رياضة فاخرة",
    eyebrowEn: "Elite Sport",
    titleAr: "ملعب البولو",
    titleEn: "Polo Field",
    bodyAr:
      "ملعب بولو عالمي المستوى يجمع بين الأصالة والحداثة، مصمم لاستضافة البطولات الدولية والفعاليات الراقية في أجواء خضراء واسعة تليق بمكانة المدينة الأولمبية.",
    bodyEn:
      "A world-class polo field blending heritage and modernity — designed to host international tournaments and premium events within expansive green surroundings befitting the Olympic city.",
  },
  {
    file: "Runner's-zone..png",
    side: "left",
    eyebrowAr: "ألعاب القوى",
    eyebrowEn: "Athletics",
    titleAr: "منطقة العدّائين",
    titleEn: "Runner's Zone",
    bodyAr:
      "مضمار وممرات مخصصة للجري والماراثون والتدريب اليومي، بمعايير عالمية تدعم الرياضيين المحترفين والهواة وتشجع على أسلوب حياة نشط وصحي.",
    bodyEn:
      "Dedicated tracks and lanes for running, marathons, and daily training — built to international standards supporting elite athletes and enthusiasts alike toward an active lifestyle.",
  },
  {
    file: "Bike-ride.png",
    side: "right",
    eyebrowAr: "تنقل مستدام",
    eyebrowEn: "Sustainable Mobility",
    titleAr: "مسار الدراجات",
    titleEn: "Bike Ride Path",
    bodyAr:
      "شبكة ممشيات ومسارات دراجات تربط بين مرافق المدينة الأولمبية، وتعزز التنقل النشط والاستدامة في تجربة حضرية متكاملة للعائلات والزوار.",
    bodyEn:
      "A network of walkways and cycling paths connecting the Olympic city's facilities — promoting active mobility and sustainability in an integrated urban experience for families and visitors.",
  },
  {
    file: "Walway.png",
    side: "left",
    eyebrowAr: "فضاءات عامة",
    eyebrowEn: "Public Realm",
    titleAr: "الممشى",
    titleEn: "Walkway",
    bodyAr:
      "ممشى حضري أنيق يمتد بين المناطق الرياضية والتجارية، يوفر تجربة مشي مريحة مع إطلالات خضراء ومناطق جلوس تُحيي المدينة على مدار اليوم.",
    bodyEn:
      "An elegant urban promenade linking sports and commercial zones — offering a comfortable walking experience with green views and seating areas that bring the city to life throughout the day.",
  },
  {
    file: "Gulf.png",
    side: "right",
    eyebrowAr: "واجهة بحرية",
    eyebrowEn: "Waterfront",
    titleAr: "الواجهة البحرية",
    titleEn: "Gulf Waterfront",
    bodyAr:
      "كورنيش بحري استثنائي يطل على الخليج العربي، يجمع بين المطاعم والممشيات والأنشطة البحرية في تجربة فريدة تكمل هوية المدينة الرياضية الساحلية.",
    bodyEn:
      "An exceptional corniche overlooking the Arabian Gulf — combining dining, promenades, and waterfront activities in a distinctive experience completing the coastal sports city identity.",
  },
  {
    file: "City-landscape.png",
    side: "left",
    eyebrowAr: "رؤية شاملة",
    eyebrowEn: "Master Vision",
    titleAr: "المدينة الأولمبية",
    titleEn: "Olympic City Landscape",
    bodyAr:
      "منظور شامل للمدينة الأولمبية يُظهر تكامل المرافق الرياضية والمساحات الخضراء والبنية التحتية — تجسيد لرؤية 2030 في بناء وجهة رياضية عالمية بالمنطقة الشرقية.",
    bodyEn:
      "A comprehensive view of the Olympic city showing integrated sports venues, green spaces, and infrastructure — embodying Vision 2030 in building a world-class sports destination in the Eastern Region.",
  },
];

export function dammamImage(file: string) {
  return dammamAsset(file);
}

import { TranslationKey } from "@/lib/i18n";

export const OFFICE_SIZES = [
  { id: "مكتب مغلق", nameKey: "service.shape3.size.closed" as TranslationKey },
  { id: "مكتب مشترك", nameKey: "service.shape3.size.shared" as TranslationKey },
];

export const INVESTOR_TYPES = [
  { id: "فرد", nameKey: "service.shape4.investorType.individual" as TranslationKey },
  { id: "شركة", nameKey: "service.shape4.investorType.company" as TranslationKey },
];

export const INVESTMENT_FIELDS = [
  { id: "تقني", nameKey: "service.shape4.investmentField.tech" as TranslationKey },
  { id: "عقاري", nameKey: "service.shape4.investmentField.realEstate" as TranslationKey },
  { id: "تجاري", nameKey: "service.shape4.investmentField.commercial" as TranslationKey },
  { id: "صناعي", nameKey: "service.shape4.investmentField.industrial" as TranslationKey },
  { id: "أخرى", nameKey: "service.shape4.investmentField.else" as TranslationKey },
];

export const CONNECTION_WAYS = [
  { id: "واتساب", nameKey: "service.shape4.connectionWay.whatsapp" as TranslationKey },
  { id: "بريد إلكتروني", nameKey: "service.shape4.connectionWay.email" as TranslationKey },
  { id: "اتصال هاتفي", nameKey: "service.shape4.connectionWay.phoneCall" as TranslationKey },
];

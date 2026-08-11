import { TranslationKey } from "@/lib/i18n";

export const DESK_TYPES_BY_COUNTRY: Record<
  number,
  { id: string; nameKey: TranslationKey }[]
> = {
  1: [
    { id: "مكتب مغلق خاص", nameKey: "service.shape3.deskType.privateClosed" as TranslationKey },
    { id: "مكتب مشترك", nameKey: "service.shape3.deskType.shared" as TranslationKey },
    { id: "عنوان وطني فقط", nameKey: "service.shape3.deskType.nationalAddress" as TranslationKey },
    { id: "عنوان وطني ورخصة بلدية (فقط)", nameKey: "service.shape3.deskType.nationalAddressLicense" as TranslationKey },
  ],
  2: [
    { id: "مكتب مغلق خاص", nameKey: "service.shape3.deskType.privateClosed" as TranslationKey },
    { id: "مكتب مشترك", nameKey: "service.shape3.deskType.shared" as TranslationKey },
    { id: "عنوان ورخصة مهن (فقط)", nameKey: "service.shape3.deskType.tradeLicense" as TranslationKey },
  ],
};

export const CITIES_BY_COUNTRY: Record<
  number,
  { id: string; nameKey: TranslationKey }[]
> = {
  1: [
    { id: "الرياض", nameKey: "service.shape3.city.riyadh" as TranslationKey },
    { id: "جدة", nameKey: "service.shape3.city.jeddah" as TranslationKey },
  ],
  2: [{ id: "عمان", nameKey: "service.shape3.city.amman" as TranslationKey }],
};

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

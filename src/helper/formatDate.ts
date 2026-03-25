import { format } from "date-fns";
import { enUS } from "date-fns/locale";

type Locale = "en" | "ar";

const ARABIC_MONTHS: Record<string, string> = {
  January: "يناير",
  February: "فبراير",
  March: "مارس",
  April: "أبريل",
  May: "مايو",
  June: "يونيو",
  July: "يوليو",
  August: "أغسطس",
  September: "سبتمبر",
  October: "أكتوبر",
  November: "نوفمبر",
  December: "ديسمبر",
};

export function formatDate(date: Date | string | number | null | undefined, locale: Locale = "en"): string {
  if (!date) return "";

  const normalized = typeof date === "string" ? date.trim().replace(" ", "T") : date;

  const d = new Date(normalized);

  if (isNaN(d.getTime())) return String(date);

  if (locale === "ar") {
    const day = format(d, "d", { locale: enUS });
    const monthEn = format(d, "MMMM", { locale: enUS });
    const year = format(d, "yyyy", { locale: enUS });
    const monthAr = ARABIC_MONTHS[monthEn] ?? monthEn;
    return `${day} ${monthAr} ${year}`;
  }

  return format(d, "MMMM d, yyyy", { locale: enUS });
}
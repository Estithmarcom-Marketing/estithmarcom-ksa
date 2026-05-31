export function siteTitle(pageTitle?: string, locale?: string): string {
  const brand = locale === "en" ? "Estithmarcom" : "استثماركوم";
  if (!pageTitle) return brand;
  return `${brand} | ${pageTitle}`;
}
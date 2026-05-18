"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";

export default function BlogNewsletterBanner() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <section className="relative h-[68px] md:h-17">
      <div className="rounded-lg bg-white w-3/4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 md:h-33.75 flex items-center gap-4 z-50 p-10 shadow-lg">
        <img src="/blog_icon.svg" alt="" />
        <p>{t("blogpage.newsletter")}</p>
      </div>
    </section>
  );
}

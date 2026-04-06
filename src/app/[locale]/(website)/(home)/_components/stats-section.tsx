"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";

export default function StatsSection() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div>
      <div>
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl mb-8">
            {t("stats.title")}
          </h1>
          <p className="max-w-5xl m-auto">{t("stats.desc")}</p>
        </div>
      </div>
    </div>
  );
}

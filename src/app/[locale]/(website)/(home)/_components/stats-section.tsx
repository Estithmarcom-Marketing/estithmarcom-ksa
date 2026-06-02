"use client";

import SpecialHeader from "@/components/global/special-header";
import StateItem from "@/components/stats/state-item";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { StatsType } from "@/lib/types/stats";

export default function StatsSection({highlights}: {highlights: StatsType[]}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  return (
    <div className="container">
      <SpecialHeader header={t("stats.title")} desc={t("stats.desc")} />
      <div className="mt-15 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {highlights.map((el) => (
          <StateItem key={el.id} state={el} />
        ))}
      </div>
    </div>
  );
}

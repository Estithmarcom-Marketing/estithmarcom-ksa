"use client";

import SpecialHeader from "@/components/global/special-header";
import StateItem from "@/components/stats/state-item";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { StatsType } from "@/lib/types/stats";
import { Building2, CreditCard, Presentation, Rocket } from "lucide-react";

export default function StatsSection() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const stats: StatsType[] = [
    {
      id: 1,
      icon: CreditCard,
      title: "الأقامة الاستثماري",
      count: 300,
    },
    {
      id: 2,
      icon: Building2,
      title: "تأسيس الشركات",
      count: 1000,
    },
    {
      id: 3,
      icon: Rocket,
      title: "الاحتضان",
      count: 20,
    },
    {
      id: 4,
      icon: Presentation,
      title: "استشارة مجانية",
      count: 3000,
    },
  ];
  return (
    <div className="container">
      <SpecialHeader header={t("stats.title")} desc={t("stats.desc")} />
      <div className="mt-15 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((el) => (
          <StateItem key={el.id} state={el} />
        ))}
      </div>
    </div>
  );
}

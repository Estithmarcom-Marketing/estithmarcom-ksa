"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { StatsType } from "@/lib/types/stats";

export default function OurNumbersItem({ state }: { state: StatsType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="flex flex-col items-center justify-center lg:w-auto">
        <p className="text-secondary text-[45px] lg:text-[60px] font-bold"> {state.value} +</p>
        <p className="text-[18px] lg:text-[24px] ">{state.label}</p>
    </div>
  );
}

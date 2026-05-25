"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { OurNumbersType } from "@/lib/types/our-numbers";

export default function OurNumbersItem({ ourNumber }: { ourNumber: OurNumbersType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="flex flex-col items-center justify-center lg:w-auto">
        <p className="text-secondary text-[45px] lg:text-[60px] font-bold"> {ourNumber.number} +</p>
        <p className="text-[18px] lg:text-[24px] ">{ourNumber.title}</p>
    </div>
  );
}
